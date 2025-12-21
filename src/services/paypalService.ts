// ============================================
// PAYPAL SERVICE - PRODUCTION READY
// ============================================
// Merchant Account Details:
// Name: Paul Müller-Zitzke
// IBAN: DE40 1101 0101 5588 2656 09
// BIC: SOBKDEB2XXX
// ============================================
// PayPal Sandbox Credentials:
// Client ID: AW1TZSnbXgP3a7THouEigNdhAcAGYlJkyDSiqKeT1lYmP-5_8coRKrhvaWE4PXimdy--pcsevSz0attv
// Secret: EKRycvvx78yB1YrVpqWAIFFewIA7FQu3fOER_zBfj_3kN8dG57Gbexf62sQZw9NIU4w5BQ0-X998a9W0
// ============================================

// ============================================
// BACKEND CODE - COPY & PASTE READY
// ============================================

/*
===============================================
OPTION 1: NODE.JS/EXPRESS SERVER
===============================================
File: server/routes/paypal.js

Copy the code below into your backend:
-----------------------------------------------

const express = require('express');
const router = express.Router();

// PayPal Sandbox Credentials (replace with production keys later)
const PAYPAL_CLIENT_ID = 'AW1TZSnbXgP3a7THouEigNdhAcAGYlJkyDSiqKeT1lYmP-5_8coRKrhvaWE4PXimdy--pcsevSz0attv';
const PAYPAL_SECRET = 'EKRycvvx78yB1YrVpqWAIFFewIA7FQu3fOER_zBfj_3kN8dG57Gbexf62sQZw9NIU4w5BQ0-X998a9W0';

// Sandbox URL (change to https://api-m.paypal.com for production)
const PAYPAL_API_URL = 'https://api-m.sandbox.paypal.com';

// Get PayPal Access Token
async function getPayPalAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64');
  
  const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  
  if (!response.ok) {
    console.error('PayPal Auth Error:', data);
    throw new Error(data.error_description || 'Failed to get PayPal access token');
  }
  
  return data.access_token;
}

// POST /api/paypal/create-order
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency = 'EUR', description, returnUrl, cancelUrl } = req.body;
    
    console.log('Creating PayPal order:', { amount, currency, description });
    
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
          description: description || 'Karten-Bestellung',
        }],
        application_context: {
          brand_name: 'Paul Müller-Zitzke Maps',
          landing_page: 'NO_PREFERENCE',
          user_action: 'PAY_NOW',
          return_url: returnUrl || 'http://localhost:5173/success',
          cancel_url: cancelUrl || 'http://localhost:5173/checkout',
        },
      }),
    });

    const order = await response.json();
    
    if (!response.ok) {
      console.error('PayPal Create Order Error:', order);
      throw new Error(order.message || 'Failed to create order');
    }

    console.log('✅ PayPal Order Created:', order.id);
    
    res.json({
      success: true,
      orderId: order.id,
      approvalUrl: order.links.find(l => l.rel === 'approve')?.href,
    });
  } catch (error) {
    console.error('❌ PayPal Create Order Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/paypal/capture-order
router.post('/capture-order', async (req, res) => {
  try {
    const { orderId } = req.body;
    
    console.log('Capturing PayPal order:', orderId);
    
    const accessToken = await getPayPalAccessToken();
    
    const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const captureData = await response.json();
    
    if (!response.ok) {
      console.error('PayPal Capture Error:', captureData);
      throw new Error(captureData.message || 'Failed to capture order');
    }

    console.log('✅ PayPal Payment Captured:', captureData.id);
    console.log('Status:', captureData.status);
    
    res.json({
      success: true,
      transactionId: captureData.id,
      status: captureData.status,
      payer: captureData.payer,
    });
  } catch (error) {
    console.error('❌ PayPal Capture Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;

-----------------------------------------------
In your main server.js add:
-----------------------------------------------

const express = require('express');
const cors = require('cors');
const paypalRoutes = require('./routes/paypal');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/paypal', paypalRoutes);

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});

===============================================
*/

/*
===============================================
OPTION 2: SUPABASE EDGE FUNCTION (Deno)
===============================================
File: supabase/functions/paypal/index.ts

Copy the code below:
-----------------------------------------------

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// PayPal Sandbox Credentials
const PAYPAL_CLIENT_ID = Deno.env.get('PAYPAL_CLIENT_ID') || 'AW1TZSnbXgP3a7THouEigNdhAcAGYlJkyDSiqKeT1lYmP-5_8coRKrhvaWE4PXimdy--pcsevSz0attv';
const PAYPAL_SECRET = Deno.env.get('PAYPAL_SECRET') || 'EKRycvvx78yB1YrVpqWAIFFewIA7FQu3fOER_zBfj_3kN8dG57Gbexf62sQZw9NIU4w5BQ0-X998a9W0';
const PAYPAL_API_URL = 'https://api-m.sandbox.paypal.com';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function getPayPalAccessToken(): Promise<string> {
  const auth = btoa(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`);
  
  const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  if (!response.ok) {
    console.error('PayPal Auth Error:', data);
    throw new Error(data.error_description || 'Auth failed');
  }
  return data.access_token;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const action = url.pathname.split('/').pop();
    const body = await req.json();

    // CREATE ORDER
    if (action === 'create-order') {
      const { amount, currency = 'EUR', description, returnUrl, cancelUrl } = body;
      
      console.log('Creating PayPal order:', { amount, currency, description });
      
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
            description: description || 'Karten-Bestellung',
          }],
          application_context: {
            brand_name: 'Paul Müller-Zitzke Maps',
            landing_page: 'NO_PREFERENCE',
            user_action: 'PAY_NOW',
            return_url: returnUrl,
            cancel_url: cancelUrl,
          },
        }),
      });

      const order = await response.json();
      
      if (!response.ok) {
        console.error('PayPal Create Order Error:', order);
        throw new Error(order.message || 'Failed to create order');
      }

      console.log('✅ PayPal Order Created:', order.id);

      return new Response(JSON.stringify({
        success: true,
        orderId: order.id,
        approvalUrl: order.links.find((l: any) => l.rel === 'approve')?.href,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // CAPTURE ORDER
    if (action === 'capture-order') {
      const { orderId } = body;
      
      console.log('Capturing PayPal order:', orderId);
      
      const accessToken = await getPayPalAccessToken();
      
      const response = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const captureData = await response.json();
      
      if (!response.ok) {
        console.error('PayPal Capture Error:', captureData);
        throw new Error(captureData.message || 'Failed to capture order');
      }

      console.log('✅ PayPal Payment Captured:', captureData.id);

      return new Response(JSON.stringify({
        success: true,
        transactionId: captureData.id,
        status: captureData.status,
        payer: captureData.payer,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Unknown action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('❌ PayPal Error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

-----------------------------------------------
Add to supabase/config.toml:
-----------------------------------------------

[functions.paypal]
verify_jwt = false

===============================================
*/

// ============================================
// FRONTEND CODE (Ready to Use)
// ============================================

export interface PayPalOrderResult {
  success: boolean;
  orderId?: string;
  approvalUrl?: string;
  error?: string;
}

export interface CreatePayPalOrderRequest {
  amount: number; // Amount in EUR (not cents!)
  currency?: string;
  description?: string;
}

// Backend URL - Change this when you have a backend
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001/api';

/**
 * Create a PayPal order via backend
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
      body: JSON.stringify({
        amount: data.amount,
        currency: data.currency || 'EUR',
        description: data.description || 'Karten-Bestellung',
        returnUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/checkout`,
      }),
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
): Promise<{ success: boolean; transactionId?: string; error?: string }> => {
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

    const result = await response.json();
    return { 
      success: true,
      transactionId: result.transactionId,
    };
  } catch (error: any) {
    console.error('❌ PayPal Capture Error:', error);
    return {
      success: false,
      error: error.message || 'PayPal payment capture failed',
    };
  }
};

/**
 * Redirect user to PayPal for payment
 */
export const redirectToPayPal = (approvalUrl: string): void => {
  window.location.href = approvalUrl;
};

/**
 * Format amount for PayPal (2 decimal places)
 */
export const formatPayPalAmount = (euros: number): string => {
  return euros.toFixed(2);
};

// ============================================
// CHECKOUT USAGE EXAMPLE
// ============================================
/*
import { createPayPalOrder, redirectToPayPal } from '@/services/paypalService';
import { toast } from 'sonner';

const handlePayPalPayment = async () => {
  setIsProcessing(true);
  
  const result = await createPayPalOrder({
    amount: 29.99,  // EUR
    currency: 'EUR',
    description: 'Custom Map A4',
  });

  if (result.success && result.approvalUrl) {
    // User wird zu PayPal weitergeleitet
    redirectToPayPal(result.approvalUrl);
  } else {
    toast.error(result.error || 'PayPal Fehler');
    setIsProcessing(false);
  }
};
*/
