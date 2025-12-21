// ============================================
// STRIPE SERVICE - PRODUCTION READY
// ============================================
// TODO: Replace STRIPE_SECRET_KEY with your real key
// Get your key at: https://dashboard.stripe.com/apikeys
// ============================================

// ============================================
// BACKEND CODE - Copy this to your server
// ============================================
// This code should run on your backend (Node.js/Express)
// DO NOT expose your secret key in frontend code!
// ============================================

/*
// === SERVER-SIDE CODE (Node.js/Express) ===
// File: server/routes/stripe.js

const express = require('express');
const Stripe = require('stripe');

const router = express.Router();

// TODO: Replace with your real Stripe secret key
const stripe = new Stripe('sk_test_XXXXXXXXXXXXXXXXXXXXXXXX', {
  apiVersion: '2024-12-18.acacia',
});

// Create Payment Intent
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'eur', customerEmail, metadata } = req.body;

    // Validate input
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // Create or retrieve customer
    let customer;
    const existingCustomers = await stripe.customers.list({
      email: customerEmail,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        email: customerEmail,
      });
    }

    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Amount in cents
      currency: currency.toLowerCase(),
      customer: customer.id,
      metadata: metadata || {},
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log('✅ PaymentIntent created:', paymentIntent.id);

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('❌ Stripe Error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Webhook handler for Stripe events
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  // TODO: Replace with your webhook signing secret
  const webhookSecret = 'whsec_XXXXXXXXXXXXXXXXXXXXXXXX';

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('⚠️ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('✅ Payment succeeded:', paymentIntent.id);
      // TODO: Fulfill the order, send email, etc.
      break;
      
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('❌ Payment failed:', failedPayment.id);
      // TODO: Notify customer about failed payment
      break;
      
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

module.exports = router;
*/

// ============================================
// FRONTEND CODE - Use this in your React app
// ============================================

export interface StripePaymentIntent {
  clientSecret: string;
  paymentIntentId: string;
}

export interface CreatePaymentIntentRequest {
  amount: number; // Amount in cents
  currency?: string;
  customerEmail: string;
  metadata?: Record<string, string>;
}

export interface StripePaymentResult {
  success: boolean;
  paymentIntentId?: string;
  error?: string;
}

// TODO: Replace with your actual backend URL
const BACKEND_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend.com/api' 
  : 'http://localhost:3001/api';

/**
 * Create a Stripe PaymentIntent via your backend
 */
export const createStripePaymentIntent = async (
  data: CreatePaymentIntentRequest
): Promise<{ success: boolean; clientSecret?: string; paymentIntentId?: string; error?: string }> => {
  try {
    const response = await fetch(`${BACKEND_URL}/stripe/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create payment intent');
    }

    const result = await response.json();
    return {
      success: true,
      clientSecret: result.clientSecret,
      paymentIntentId: result.paymentIntentId,
    };
  } catch (error: any) {
    console.error('❌ Stripe PaymentIntent Error:', error);
    return {
      success: false,
      error: error.message || 'Payment initialization failed',
    };
  }
};

/**
 * Confirm payment using Stripe.js (client-side)
 * This should be called after loading Stripe.js
 */
export const confirmStripePayment = async (
  stripe: any, // Stripe instance from @stripe/stripe-js
  elements: any, // Stripe Elements instance
  clientSecret: string,
  returnUrl: string
): Promise<StripePaymentResult> => {
  try {
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: returnUrl,
      },
      redirect: 'if_required',
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    if (paymentIntent && paymentIntent.status === 'succeeded') {
      return {
        success: true,
        paymentIntentId: paymentIntent.id,
      };
    }

    return {
      success: false,
      error: 'Payment not completed',
    };
  } catch (error: any) {
    console.error('❌ Stripe Payment Confirmation Error:', error);
    return {
      success: false,
      error: error.message || 'Payment confirmation failed',
    };
  }
};

// ============================================
// STRIPE.JS SETUP - Add to your app
// ============================================
/*
// Install: npm install @stripe/stripe-js @stripe/react-stripe-js

// In your main App.tsx or a provider:
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// TODO: Replace with your publishable key
const stripePromise = loadStripe('pk_test_XXXXXXXXXXXXXXXXXXXXXXXX');

function App() {
  return (
    <Elements stripe={stripePromise}>
      <YourCheckoutComponent />
    </Elements>
  );
}

// In your Checkout component:
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

function CheckoutForm({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) return;

    const result = await confirmStripePayment(
      stripe,
      elements,
      clientSecret,
      window.location.origin + '/success'
    );

    if (result.success) {
      // Redirect to success page
    } else {
      // Show error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit">Pay Now</button>
    </form>
  );
}
*/

// ============================================
// HELPER FUNCTIONS
// ============================================

export const eurosToCents = (euros: number): number => {
  return Math.round(euros * 100);
};

export const centsToEuros = (cents: number): number => {
  return cents / 100;
};

export const formatPrice = (cents: number): string => {
  return `${(cents / 100).toFixed(2).replace('.', ',')} €`;
};
