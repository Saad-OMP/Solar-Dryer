// This is your test secret API key.
const stripe = require('stripe')('sk_test_51Nf56kLsny6MkgTCjL3SwyCtiBy03zSQh8NREiVnnsTS4sbZTT7Tn1HkFD9mm8e5pKEeJTDKSENkyciL6P5iQk4h00qgMhTKkY');
const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.json()); 

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-checkout-session', async (req, res) => {
  const amount = req.body.amount; 
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: amount,
          product_data: {
            name: 'Donation to OpenMindProjectsFirst',
          },
        },
        quantity: 1, 
      },
    ],
    mode: 'payment',
    return_url: `${YOUR_DOMAIN}/return.html?session_id={CHECKOUT_SESSION_ID}`,
  });

  res.send({ id: session.id }); 
});

app.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
});

app.listen(4242, () => console.log('Running on port 4242'));