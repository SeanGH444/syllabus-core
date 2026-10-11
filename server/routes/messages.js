const express = require('express');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/:syllabusId', requireAuth, async (req, res) => {
  try {
    const db = req.app.locals.db;
    const [rows] = await db.query(`
      SELECT m.*, u.first_name, u.last_name
      FROM messages m
      JOIN users u ON m.sender_id = u.user_id
      WHERE m.syllabus_id = ?
      ORDER BY m.created_at ASC
    `, [req.params.syllabusId]);
    res.json(rows.map(r => ({ id: r.message_id, syllabusId: r.syllabus_id, senderId: r.sender_id, receiverId: r.receiver_id, text: r.message_text, isRead: r.is_read, time: r.created_at, sender: `${r.first_name} ${r.last_name}` })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:syllabusId', requireAuth, async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { receiverId, text } = req.body;
    const [result] = await db.query('INSERT INTO messages (syllabus_id, sender_id, receiver_id, message_text) VALUES (?, ?, ?, ?)', [req.params.syllabusId, req.session.user.id, receiverId, text]);
    res.json({ id: result.insertId, message: 'Message sent' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/read/:syllabusId', requireAuth, async (req, res) => {
  try {
    const db = req.app.locals.db;
    await db.query('UPDATE messages SET is_read = 1 WHERE syllabus_id = ? AND receiver_id = ?', [req.params.syllabusId, req.session.user.id]);
    res.json({ message: 'Messages marked as read' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
