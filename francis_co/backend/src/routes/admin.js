const express = require('express');
const router = express.Router();
const { pool } = require('../index');

router.get('/stats', async (req,res)=>{
  const products = (await pool.query('SELECT count(*) FROM products')).rows[0].count;
  const customers = (await pool.query('SELECT count(*) FROM customers')).rows[0].count;
  res.json({ products: Number(products), customers: Number(customers) });
});

router.get('/orders', async (req,res)=>{
  const { rows } = await pool.query('SELECT * FROM orders ORDER BY created_at DESC LIMIT 50');
  res.json(rows);
});

module.exports = router;
