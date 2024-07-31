const stripe = require("stripe")("sk_test_51Nf56kLsny6MkgTCjL3SwyCtiBy03zSQh8NREiVnnsTS4sbZTT7Tn1HkFD9mm8e5pKEeJTDKSENkyciL6P5iQk4h00qgMhTKkY");
const express = require("express");
const cors = require('cors');
const app = express();
const port = 4242; // Ensure this matches your server's port
app.use(express.static("public"));
app.use(express.json());

const YOUR_DOMAIN = "http://localhost:4242";

app.post("/create-checkout-session", async (req, res) => {
  const amount = req.body.amount;
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: amount,
          product_data: {
            name: "Donation to OpenMindProjectsFirst",
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    return_url: `${YOUR_DOMAIN}/return.html?session_id={CHECKOUT_SESSION_ID}`,
  });

  res.send({ id: session.id });
});

app.get("/session-status", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  res.send({
    status: session.status,
    customer_email: session.customer_details.email,
  });
});

// Use the cors middleware
app.use(cors());

// Donations route
app.get("/api/donations", async (req, res) => {
  console.log("Inside donations route - new"); // Debugging line added here
  
  try {
    let totalAmount = 0;
    let donationCount = 0;
    let donors = [];

    // Fetch charges (replace 'limit' if you have more than 100 charges)
    const charges = await stripe.charges.list({ limit: 100 });

    charges.data.forEach((charge) => {
      if (charge.paid && !charge.refunded) {
        totalAmount += charge.amount / 100; // Divide by 100 to get the amount in dollars (Stripe stores amounts in cents)
        donationCount++;

        const donor = {
          name: charge.billing_details.name,
          amount: charge.amount / 100, // Format amount here
        };
        donors.push(donor);
      }
    });

    res.json({ totalAmount, donationCount, donors });
  } catch (err) {
    console.error("Error retrieving donations:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));