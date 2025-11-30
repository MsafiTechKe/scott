const express = require('express');
const router = express.Router();
const { pool } = require('../index');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || '');

router.post('/create-checkout-session', async (req,res)=>{
  try{
    const { items, customerEmail, successUrl, cancelUrl } = req.body;
    const line_items = items.map(it=>({ price_data: { currency: 'usd', product_data: { name: it.name }, unit_amount: Math.round(it.price*100) }, quantity: it.qty || 1 }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      customer_email: customerEmail,
      success_url: successUrl,
      cancel_url: cancelUrl
    });
    const total = items.reduce((s,i)=> s + (i.price * (i.qty||1)),0);
    const { rows } = await pool.query('INSERT INTO orders(customer_email,total,stripe_pid,status) VALUES($1,$2,$3,$4) RETURNING id',[customerEmail,total, session.id,'pending']);
    res.json({ id: session.id, url: session.url });
  }catch(e){ res.status(500).json({error:e.message}) }
});

module.exports = router;
