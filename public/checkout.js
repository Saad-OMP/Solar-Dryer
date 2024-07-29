// checkout.js

// Replace with your actual Stripe publishable key
const stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY');

initialize(); // Call initialize() when the page loads

async function initialize() {
  // 1. Fetch the clientSecret from your server
  const fetchClientSecret = async () => {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
      // You might need to send additional data here if required by your server
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  // 2. Initialize Embedded Checkout
  const checkout = await stripe.initEmbeddedCheckout({ 
    clientSecret: await fetchClientSecret(), // Pass the fetched clientSecret 
  });

  // 3. Mount the Embedded Checkout form
  checkout.mount('#checkout'); 
}