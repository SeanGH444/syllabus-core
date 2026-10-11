const express = require('express');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/:curriculumId', requireAuth, async (req, res) => {
  try {
    const db = req.app.locals.db;
    const [rows] = await db.query('SELECT co_number, po_number, level FROM co_po_mapping WHERE curriculum_id = ?', [req.params.curriculumId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:curriculumId', requireAuth, async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { mappings } = req.body;
    const cid = req.params.curriculumId;

    await db.query('DELETE FROM co_po_mapping WHERE curriculum_id = ?', [cid]);

    if (mappings && mappings.length > 0) {
      const values = mappings.filter(m => m.level).map(m => [cid, m.co, m.po, m.level]);
      if (values.length > 0) {
        await db.query('INSERT INTO co_po_mapping (curriculum_id, co_number, po_number, level) VALUES ?', [values]);
      }
    }

    res.json({ message: 'Mapping saved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
