const express = require('express');
const router = express.Router();
const { pool } = require('../index');

router.get('/', async (req,res)=>{
  try{
    const { rows } = await pool.query('SELECT id,name,price,summary,image_url FROM products ORDER BY id DESC LIMIT 50');
    res.json(rows);
  }catch(e){ res.status(500).json({error:e.message}) }
});

router.get('/:id', async (req,res)=>{
  const { id } = req.params;
  const { rows } = await pool.query('SELECT * FROM products WHERE id=$1',[id]);
  if(!rows[0]) return res.status(404).json({error:'Not found'});
  res.json(rows[0]);
});

router.post('/', async (req,res)=>{
  const { name, summary, description, price, image_url } = req.body;
  try{
    const { rows } = await pool.query('INSERT INTO products(name,summary,description,price,image_url) VALUES($1,$2,$3,$4,$5) RETURNING *',[name,summary,description,price,image_url]);
    res.json(rows[0]);
  }catch(e){ res.status(500).json({error:e.message}) }
});

module.exports = router;
