require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const { Pool } = require('pg');

app.use(cors());
app.use(bodyParser.json({limit: '1mb'}));

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// run migrations (basic)
const fs = require('fs');
const path = require('path');
(async ()=>{
  try{
    const sql = fs.readFileSync(path.join(__dirname,'../models/migrations.sql'),'utf8');
    await pool.query(sql);
    console.log('Migrations ran');
  }catch(e){ console.error('Migration error', e.message) }
})();

app.get('/api/health',(req,res)=> res.json({ok:true}));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/admin', require('./routes/admin'));

// Basic webhook endpoint for Stripe (raw body required) - route mounts separately
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || '');
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

// raw body needed for webhook verification
const rawBody = (req, res, next) => {
  if (req.originalUrl === '/api/orders/webhook') {
    bodyParser.raw({type: '*/*'})(req, res, next);
  } else next();
};
app.use(rawBody);

app.post('/api/orders/webhook', (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object;
    console.log('PaymentIntent was successful!', pi.id);
  }
  res.json({received: true});
});

app.listen(port, ()=>console.log('Server listening on',port));
module.exports = { pool };
