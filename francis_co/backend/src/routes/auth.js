const express = require('express');
const router = express.Router();
const { pool } = require('../index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'change-me';

router.post('/register', async (req,res)=>{
  const { email, password, name } = req.body;
  if(!email || !password) return res.status(400).json({error:'Missing'});
  const hashed = await bcrypt.hash(password, 10);
  try{
    const { rows } = await pool.query('INSERT INTO customers(email,name,password_hash) VALUES($1,$2,$3) RETURNING id,email,name,is_admin',[email,name,hashed]);
    const user = rows[0];
    const token = jwt.sign({ id:user.id, email:user.email, is_admin:user.is_admin }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user });
  }catch(e){ res.status(400).json({error:e.message}) }
});

router.post('/login', async (req,res)=>{
  const { email, password } = req.body;
  const { rows } = await pool.query('SELECT * FROM customers WHERE email=$1',[email]);
  const user = rows[0];
  if (!user) return res.status(401).json({error:'Invalid'});
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({error:'Invalid'});
  const token = jwt.sign({ id:user.id, email:user.email, is_admin:user.is_admin }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, email: user.email, name: user.name, is_admin: user.is_admin } });
});

module.exports = router;
