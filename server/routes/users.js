const express = require('express');
const bcrypt = require('bcryptjs');
const { requireAuth, requireAdmin } = require('../middleware/auth');
const router = express.Router();

router.get('/', requireAdmin, async (req, res) => {
  try {
    const db = req.app.locals.db;
    const [rows] = await db.query('SELECT user_id, email, role, first_name, last_name, created_at FROM users');
    res.json(rows.map(r => ({ id: r.user_id, email: r.email, role: r.role, firstName: r.first_name, lastName: r.last_name, createdAt: r.created_at })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', requireAdmin, async (req, res) => {
  try {
    const { email, password, role, firstName, lastName } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const db = req.app.locals.db;
    const [result] = await db.query('INSERT INTO users (email, password_hash, role, first_name, last_name) VALUES (?, ?, ?, ?, ?)', [email, hash, role, firstName, lastName]);
    res.json({ id: result.insertId, email, role, firstName, lastName });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const db = req.app.locals.db;
    await db.query('DELETE FROM users WHERE user_id = ?', [req.params.id]);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
