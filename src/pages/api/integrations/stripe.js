import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_KEY);
export default async function handler(req, res) {
  // Exemplo de chamada à API do Stripe
  const products = await stripe.products.list();
  res.status(200).json(products);
}
