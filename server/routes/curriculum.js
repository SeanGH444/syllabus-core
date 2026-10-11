const express = require('express');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
  try {
    const db = req.app.locals.db;
    const [rows] = await db.query('SELECT * FROM curriculum ORDER BY program_name, year_level, semester');
    res.json(rows.map(r => ({ id: r.curriculum_id, programName: r.program_name, yearLevel: r.year_level, semester: r.semester, courseDescription: r.course_description, learningOutcomes: r.learning_outcomes })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
