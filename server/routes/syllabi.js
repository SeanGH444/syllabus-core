const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '..', process.env.UPLOAD_DIR || 'uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

router.get('/', requireAuth, async (req, res) => {
  try {
    const db = req.app.locals.db;
    let query = `SELECT s.*, u.first_name, u.last_name, c.program_name FROM syllabi s JOIN users u ON s.user_id = u.user_id LEFT JOIN curriculum c ON s.curriculum_id = c.curriculum_id`;
    const params = [];

    if (req.session.user.role === 'faculty') {
      query += ' WHERE s.user_id = ?';
      params.push(req.session.user.id);
    }

    query += ' ORDER BY s.uploaded_at DESC';
    const [rows] = await db.query(query, params);

    res.json(rows.map(r => ({
      id: r.syllabus_id,
      userId: r.user_id,
      curriculumId: r.curriculum_id,
      filePath: r.file_path,
      title: r.title,
      courseCode: r.course_code,
      status: r.status,
      version: r.version,
      adminComment: r.admin_comment,
      uploadedAt: r.uploaded_at,
      updatedAt: r.updated_at,
      faculty: `${r.first_name} ${r.last_name}`,
      program: r.program_name || '',
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', requireAuth, upload.single('file'), async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { title, courseCode, curriculumId } = req.body;
    const filePath = req.file ? `/uploads/${req.file.filename}` : null;

    const [result] = await db.query(
      'INSERT INTO syllabi (user_id, curriculum_id, file_path, title, course_code, status) VALUES (?, ?, ?, ?, ?, ?)',
      [req.session.user.id, curriculumId || null, filePath, title, courseCode, 'submitted']
    );

    await db.query(
      'INSERT INTO submission_logs (syllabus_id, user_id, action, notes) VALUES (?, ?, ?, ?)',
      [result.insertId, req.session.user.id, 'upload', 'Syllabus uploaded']
    );

    res.json({ id: result.insertId, message: 'Syllabus uploaded' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', requireAuth, upload.single('file'), async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { title, courseCode, curriculumId, status, adminComment, version } = req.body;
    const filePath = req.file ? `/uploads/${req.file.filename}` : undefined;

    const fields = [];
    const params = [];

    if (title !== undefined) { fields.push('title = ?'); params.push(title); }
    if (courseCode !== undefined) { fields.push('course_code = ?'); params.push(courseCode); }
    if (curriculumId !== undefined) { fields.push('curriculum_id = ?'); params.push(curriculumId); }
    if (status !== undefined) { fields.push('status = ?'); params.push(status); }
    if (adminComment !== undefined) { fields.push('admin_comment = ?'); params.push(adminComment); }
    if (version !== undefined) { fields.push('version = ?'); params.push(version); }
    if (filePath) { fields.push('file_path = ?'); params.push(filePath); }

    if (fields.length === 0) return res.status(400).json({ error: 'No fields to update' });

    params.push(req.params.id);
    await db.query(`UPDATE syllabi SET ${fields.join(', ')} WHERE syllabus_id = ?`, params);

    if (status) {
      const actionMap = { approved: 'approve', rejected: 'reject', for_revision: 'revision', submitted: 'submit' };
      const action = actionMap[status] || 'update';
      await db.query('INSERT INTO submission_logs (syllabus_id, user_id, action, notes) VALUES (?, ?, ?, ?)', [req.params.id, req.session.user.id, action, `Status changed to ${status}`]);
    }

    res.json({ message: 'Syllabus updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const db = req.app.locals.db;
    await db.query('DELETE FROM syllabi WHERE syllabus_id = ?', [req.params.id]);
    res.json({ message: 'Syllabus deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
