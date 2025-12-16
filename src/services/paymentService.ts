// Payment Service - Replace with real Stripe implementation later
// Currently uses a mock implementation for development

export type PaymentMethod = 'card' | 'paypal' | 'sepa';

export interface PaymentIntent {
  id: string;
  clientSecret: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'succeeded' | 'failed';
}

export interface PaymentResult {
  success: boolean;
  paymentIntentId?: string;
  error?: string;
}

export interface CreatePaymentIntentData {
  amount: number; // in cents
  currency?: string;
  customerEmail: string;
  metadata?: Record<string, string>;
}

export interface ProcessPaymentData {
  paymentIntentId: string;
  paymentMethod: PaymentMethod;
  // Card details would be handled by Stripe Elements in real implementation
  cardDetails?: {
    // These would never be sent to our backend in a real implementation
    // Stripe Elements handles card details securely
    last4?: string;
  };
}

// Generate a mock payment intent ID
const generatePaymentIntentId = (): string => {
  const random = Math.random().toString(36).substring(2, 15);
  return `pi_mock_${random}`;
};

// Generate a mock client secret
const generateClientSecret = (paymentIntentId: string): string => {
  const random = Math.random().toString(36).substring(2, 15);
  return `${paymentIntentId}_secret_${random}`;
};

// TODO: Replace with real Stripe API call via Edge Function
// This would create a PaymentIntent on the Stripe server
export const createPaymentIntent = async (data: CreatePaymentIntentData): Promise<{ success: boolean; paymentIntent?: PaymentIntent; error?: string }> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const paymentIntentId = generatePaymentIntentId();
  const clientSecret = generateClientSecret(paymentIntentId);

  console.log('=== MOCK CREATE PAYMENT INTENT ===');
  console.log('Amount:', data.amount / 100, data.currency || 'EUR');
  console.log('Customer:', data.customerEmail);
  console.log('Payment Intent ID:', paymentIntentId);
  console.log('==================================');

  // TODO: Replace with actual API call to backend
  /*
  // Example real implementation with Edge Function:
  const response = await fetch('/api/stripe/create-payment-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: data.amount,
      currency: data.currency || 'eur',
      customerEmail: data.customerEmail,
      metadata: data.metadata,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    return { success: false, error: error.message };
  }

  const paymentIntent = await response.json();
  return { success: true, paymentIntent };
  */

  return {
    success: true,
    paymentIntent: {
      id: paymentIntentId,
      clientSecret,
      amount: data.amount,
      currency: data.currency || 'EUR',
      status: 'pending',
    },
  };
};

// TODO: Replace with real Stripe payment processing
// In a real implementation, this would use Stripe.js and Elements
export const processPayment = async (data: ProcessPaymentData): Promise<PaymentResult> => {
  // Simulate payment processing delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log('=== MOCK PROCESS PAYMENT ===');
  console.log('Payment Intent ID:', data.paymentIntentId);
  console.log('Payment Method:', data.paymentMethod);
  console.log('============================');

  // Simulate occasional payment failures (10% chance)
  const shouldFail = Math.random() < 0.1;

  if (shouldFail) {
    console.log('Payment FAILED (simulated)');
    return {
      success: false,
      error: 'Die Zahlung konnte nicht verarbeitet werden. Bitte versuchen Sie es erneut.',
    };
  }

  console.log('Payment SUCCEEDED (simulated)');

  // TODO: Replace with actual Stripe confirmation
  /*
  // Example real implementation with Stripe.js:
  const stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY);
  
  const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: cardElement, // From Stripe Elements
      billing_details: {
        email: customerEmail,
      },
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, paymentIntentId: paymentIntent.id };
  */

  return {
    success: true,
    paymentIntentId: data.paymentIntentId,
  };
};

// Supported payment method configurations
export const PAYMENT_METHODS: { id: PaymentMethod; name: string; icon: string; enabled: boolean }[] = [
  { id: 'card', name: 'Kreditkarte', icon: 'credit-card', enabled: true },
  { id: 'paypal', name: 'PayPal', icon: 'paypal', enabled: true },
  { id: 'sepa', name: 'SEPA Lastschrift', icon: 'bank', enabled: true },
];

// Format amount for display
export const formatPrice = (amountInCents: number, currency: string = 'EUR'): string => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency,
  }).format(amountInCents / 100);
};

// Convert euros to cents
export const eurosToCents = (euros: number): number => {
  return Math.round(euros * 100);
};
