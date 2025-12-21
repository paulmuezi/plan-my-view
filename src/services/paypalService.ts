// ============================================
// PAYPAL SERVICE - PRODUCTION READY
// ============================================
// TODO: Replace with your real PayPal credentials
// Get your credentials at: https://developer.paypal.com/
// ============================================

// ============================================
// BACKEND CODE - Copy this to your server
// ============================================
// This code should run on your backend (Node.js/Express)
// DO NOT expose your client secret in frontend code!
// ============================================

/*
// === SERVER-SIDE CODE (Node.js/Express) ===
// File: server/routes/paypal.js

const express = require('express');
const router = express.Router();

// TODO: Replace with your real PayPal credentials
const PAYPAL_CLIENT_ID = 'YOUR_PAYPAL_CLIENT_ID';
const PAYPAL_CLIENT_SECRET = 'YOUR_PAYPAL_CLIENT_SECRET';

// Use sandbox for testing, live for production
const PAYPAL_API_URL = process.env.NODE_ENV === 'production'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

// Get PayPal access token
async function getPayPalAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
  
  const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
}

// Create PayPal Order
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency = 'EUR', description } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const accessToken = await getPayPalAccessToken();

    const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: currency,
            value: amount.toFixed(2),
          },
          description: description || 'Lageplan Bestellung',
        }],
        application_context: {
          brand_name: 'Lageplaner',
          landing_page: 'NO_PREFERENCE',
          user_action: 'PAY_NOW',
          return_url: `${process.env.FRONTEND_URL}/success`,
          cancel_url: `${process.env.FRONTEND_URL}/checkout`,
        },
      }),
    });

    const order = await response.json();
    
    console.log('✅ PayPal Order created:', order.id);

    res.json({
      success: true,
      orderId: order.id,
      approvalUrl: order.links.find(link => link.rel === 'approve')?.href,
    });
  } catch (error) {
    console.error('❌ PayPal Error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Capture PayPal Order (after user approves)
router.post('/capture-order', async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ error: 'Order ID required' });
    }

    const accessToken = await getPayPalAccessToken();

    const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const capture = await response.json();

    if (capture.status === 'COMPLETED') {
      console.log('✅ PayPal Payment captured:', orderId);
      
      // TODO: Fulfill the order, send email, etc.
      
      res.json({
        success: true,
        orderId: capture.id,
        status: capture.status,
      });
    } else {
      res.status(400).json({
        success: false,
        error: 'Payment not completed',
        status: capture.status,
      });
    }
  } catch (error) {
    console.error('❌ PayPal Capture Error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// PayPal Webhook handler
router.post('/webhook', async (req, res) => {
  try {
    const event = req.body;
    
    // TODO: Verify webhook signature for production
    // https://developer.paypal.com/docs/api-basics/notifications/webhooks/

    switch (event.event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED':
        console.log('✅ Payment captured:', event.resource.id);
        // TODO: Fulfill order
        break;
        
      case 'PAYMENT.CAPTURE.DENIED':
        console.log('❌ Payment denied:', event.resource.id);
        // TODO: Notify customer
        break;
        
      default:
        console.log('Unhandled PayPal event:', event.event_type);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('❌ PayPal Webhook Error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
*/

// ============================================
// FRONTEND CODE - Use this in your React app
// ============================================

export interface PayPalOrderResult {
  success: boolean;
  orderId?: string;
  approvalUrl?: string;
  error?: string;
}

export interface CreatePayPalOrderRequest {
  amount: number; // Amount in euros (not cents!)
  currency?: string;
  description?: string;
}

// TODO: Replace with your actual backend URL
const BACKEND_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend.com/api' 
  : 'http://localhost:3001/api';

/**
 * Create a PayPal order via your backend
 */
export const createPayPalOrder = async (
  data: CreatePayPalOrderRequest
): Promise<PayPalOrderResult> => {
  try {
    const response = await fetch(`${BACKEND_URL}/paypal/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create PayPal order');
    }

    const result = await response.json();
    return {
      success: true,
      orderId: result.orderId,
      approvalUrl: result.approvalUrl,
    };
  } catch (error: any) {
    console.error('❌ PayPal Order Error:', error);
    return {
      success: false,
      error: error.message || 'PayPal order creation failed',
    };
  }
};

/**
 * Capture a PayPal order after user approval
 */
export const capturePayPalOrder = async (
  orderId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch(`${BACKEND_URL}/paypal/capture-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to capture PayPal payment');
    }

    return { success: true };
  } catch (error: any) {
    console.error('❌ PayPal Capture Error:', error);
    return {
      success: false,
      error: error.message || 'PayPal payment capture failed',
    };
  }
};

// ============================================
// PAYPAL REACT SDK SETUP
// ============================================
/*
// Install: npm install @paypal/react-paypal-js

// In your main App.tsx or a provider:
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

// TODO: Replace with your PayPal client ID
const PAYPAL_CLIENT_ID = 'YOUR_PAYPAL_CLIENT_ID';

function App() {
  return (
    <PayPalScriptProvider options={{
      'client-id': PAYPAL_CLIENT_ID,
      currency: 'EUR',
    }}>
      <YourCheckoutComponent />
    </PayPalScriptProvider>
  );
}

// In your Checkout component:
function PayPalCheckout({ amount, onSuccess, onError }) {
  return (
    <PayPalButtons
      style={{ layout: 'vertical' }}
      createOrder={async () => {
        const result = await createPayPalOrder({
          amount: amount,
          currency: 'EUR',
          description: 'Lageplan Bestellung',
        });
        
        if (!result.success) {
          throw new Error(result.error);
        }
        
        return result.orderId;
      }}
      onApprove={async (data) => {
        const result = await capturePayPalOrder(data.orderID);
        
        if (result.success) {
          onSuccess(data.orderID);
        } else {
          onError(result.error);
        }
      }}
      onError={(err) => {
        console.error('PayPal Error:', err);
        onError('PayPal payment failed');
      }}
    />
  );
}
*/

// ============================================
// HELPER FUNCTIONS
// ============================================

export const formatPayPalAmount = (euros: number): string => {
  return euros.toFixed(2);
};
