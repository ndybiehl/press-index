import Stripe from "stripe";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

export const PLATFORM_FEE_BPS = 800;

export function applicationFeeAmount(totalCents: number) {
  const fee = Math.round(totalCents * (PLATFORM_FEE_BPS / 10000));
  return Math.max(50, fee);
}
