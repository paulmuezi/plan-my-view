// Email Service - Replace with real backend implementation later
// Currently uses a mock implementation for development

export interface OrderEmailData {
  customerEmail: string;
  customerName?: string;
  orderId: string;
  paperFormat: string;
  orientation: string;
  scale: string;
  pdfSelected: boolean;
  dxfSelected: boolean;
  totalPrice: number;
  orderDate: Date;
}

export interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Email template for order confirmation
export const generateOrderConfirmationEmail = (data: OrderEmailData): { subject: string; html: string; text: string } => {
  const formatList = [
    data.pdfSelected ? 'PDF' : null,
    data.dxfSelected ? 'DXF' : null,
  ].filter(Boolean).join(' + ');

  const subject = `Lageplaner Bestellbestätigung - ${data.orderId}`;

  const html = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #f97316; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">Lageplaner</h1>
  </div>
  
  <div style="background-color: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
    <h2 style="color: #1f2937; margin-top: 0;">Vielen Dank für Ihre Bestellung!</h2>
    
    <p>Sehr geehrte/r ${data.customerName || 'Kunde/Kundin'},</p>
    
    <p>Ihre Bestellung wurde erfolgreich aufgenommen. Hier sind die Details:</p>
    
    <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e5e7eb;">
      <h3 style="margin-top: 0; color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 10px;">Bestelldetails</h3>
      
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Bestellnummer:</td>
          <td style="padding: 8px 0; font-weight: bold;">${data.orderId}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Bestelldatum:</td>
          <td style="padding: 8px 0;">${data.orderDate.toLocaleDateString('de-DE', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Papierformat:</td>
          <td style="padding: 8px 0;">${data.paperFormat}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Ausrichtung:</td>
          <td style="padding: 8px 0;">${data.orientation === 'landscape' ? 'Querformat' : 'Hochformat'}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Maßstab:</td>
          <td style="padding: 8px 0;">${data.scale}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Dateiformat:</td>
          <td style="padding: 8px 0;">${formatList}</td>
        </tr>
        <tr style="border-top: 2px solid #e5e7eb;">
          <td style="padding: 12px 0; color: #1f2937; font-weight: bold;">Gesamtpreis:</td>
          <td style="padding: 12px 0; font-weight: bold; color: #f97316; font-size: 18px;">${data.totalPrice}€</td>
        </tr>
      </table>
    </div>
    
    <p>Ihre Karte wird in Kürze generiert und Ihnen per E-Mail zugestellt.</p>
    
    <p>Bei Fragen stehen wir Ihnen gerne zur Verfügung.</p>
    
    <p style="margin-bottom: 0;">Mit freundlichen Grüßen,<br><strong>Ihr Lageplaner Team</strong></p>
  </div>
  
  <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
    <p>Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht auf diese Nachricht.</p>
    <p>© ${new Date().getFullYear()} Lageplaner. Alle Rechte vorbehalten.</p>
  </div>
</body>
</html>
  `.trim();

  const text = `
Lageplaner - Bestellbestätigung

Sehr geehrte/r ${data.customerName || 'Kunde/Kundin'},

Vielen Dank für Ihre Bestellung!

Bestelldetails:
- Bestellnummer: ${data.orderId}
- Bestelldatum: ${data.orderDate.toLocaleDateString('de-DE')}
- Papierformat: ${data.paperFormat}
- Ausrichtung: ${data.orientation === 'landscape' ? 'Querformat' : 'Hochformat'}
- Maßstab: ${data.scale}
- Dateiformat: ${formatList}
- Gesamtpreis: ${data.totalPrice}€

Ihre Karte wird in Kürze generiert und Ihnen per E-Mail zugestellt.

Bei Fragen stehen wir Ihnen gerne zur Verfügung.

Mit freundlichen Grüßen,
Ihr Lageplaner Team

---
Diese E-Mail wurde automatisch generiert.
© ${new Date().getFullYear()} Lageplaner. Alle Rechte vorbehalten.
  `.trim();

  return { subject, html, text };
};

// Generate a unique order ID
export const generateOrderId = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `LP-${timestamp}-${random}`;
};

// TODO: Replace this mock implementation with real backend API call
// Example integration points:
// - Resend API via Edge Function
// - SendGrid API
// - AWS SES
// - Custom SMTP server
export const sendOrderConfirmationEmail = async (data: OrderEmailData): Promise<EmailResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const emailContent = generateOrderConfirmationEmail(data);

  // Mock implementation - log email details to console
  console.log('=== MOCK EMAIL SERVICE ===');
  console.log('To:', data.customerEmail);
  console.log('Subject:', emailContent.subject);
  console.log('Order ID:', data.orderId);
  console.log('Total:', data.totalPrice + '€');
  console.log('========================');

  // In development, always return success
  // TODO: Replace with actual API call to backend
  /*
  // Example real implementation:
  const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: data.customerEmail,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    return { success: false, error: error.message };
  }

  const result = await response.json();
  return { success: true, messageId: result.messageId };
  */

  return {
    success: true,
    messageId: `mock-${Date.now()}`,
  };
};
