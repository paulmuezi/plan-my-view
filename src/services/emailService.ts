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

// Password Reset Email

export interface PasswordResetEmailData {
  email: string;
  resetToken: string;
  resetUrl: string;
  expiresAt: Date;
}

// Generate password reset email template
export const generatePasswordResetEmail = (data: PasswordResetEmailData): { subject: string; html: string; text: string } => {
  const subject = "Lageplaner - Passwort zurücksetzen";

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
    <h2 style="color: #1f2937; margin-top: 0;">Passwort zurücksetzen</h2>
    
    <p>Sie haben eine Anfrage zum Zurücksetzen Ihres Passworts gestellt.</p>
    
    <p>Klicken Sie auf den folgenden Button, um ein neues Passwort festzulegen:</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${data.resetUrl}" style="display: inline-block; background-color: #f97316; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
        Passwort zurücksetzen
      </a>
    </div>
    
    <p style="color: #6b7280; font-size: 14px;">
      Oder kopieren Sie diesen Link in Ihren Browser:<br>
      <a href="${data.resetUrl}" style="color: #f97316; word-break: break-all;">${data.resetUrl}</a>
    </p>
    
    <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 15px; margin: 20px 0;">
      <p style="margin: 0; color: #92400e; font-size: 14px;">
        <strong>Wichtig:</strong> Dieser Link ist nur 1 Stunde gültig und kann nur einmal verwendet werden.
      </p>
    </div>
    
    <p style="color: #6b7280; font-size: 14px;">
      Falls Sie diese Anfrage nicht gestellt haben, können Sie diese E-Mail ignorieren. 
      Ihr Passwort bleibt unverändert.
    </p>
    
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
Lageplaner - Passwort zurücksetzen

Sie haben eine Anfrage zum Zurücksetzen Ihres Passworts gestellt.

Klicken Sie auf den folgenden Link, um ein neues Passwort festzulegen:
${data.resetUrl}

Wichtig: Dieser Link ist nur 1 Stunde gültig und kann nur einmal verwendet werden.

Falls Sie diese Anfrage nicht gestellt haben, können Sie diese E-Mail ignorieren.
Ihr Passwort bleibt unverändert.

Mit freundlichen Grüßen,
Ihr Lageplaner Team

---
Diese E-Mail wurde automatisch generiert.
© ${new Date().getFullYear()} Lageplaner. Alle Rechte vorbehalten.
  `.trim();

  return { subject, html, text };
};

// Generate a secure reset token
export const generateResetToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// TODO: Replace this mock implementation with real backend API call
export const sendPasswordResetEmail = async (email: string): Promise<EmailResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Generate mock reset token and URL
  const resetToken = generateResetToken();
  const resetUrl = `${window.location.origin}/reset-password?token=${resetToken}`;
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

  const emailData: PasswordResetEmailData = {
    email,
    resetToken,
    resetUrl,
    expiresAt,
  };

  const emailContent = generatePasswordResetEmail(emailData);

  // Mock implementation - log email details to console
  console.log('=== MOCK PASSWORD RESET EMAIL ===');
  console.log('To:', email);
  console.log('Subject:', emailContent.subject);
  console.log('Reset URL:', resetUrl);
  console.log('Token:', resetToken);
  console.log('Expires:', expiresAt.toLocaleString('de-DE'));
  console.log('================================');

  // In development, always return success
  // TODO: Replace with actual API call to backend
  /*
  // Example real implementation:
  const response = await fetch('/api/password-reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      resetToken,
      resetUrl,
      expiresAt: expiresAt.toISOString(),
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
    messageId: `mock-reset-${Date.now()}`,
  };
};

// Email Verification

export interface VerificationEmailData {
  email: string;
  name: string;
  verificationToken: string;
  verificationUrl: string;
  expiresAt: Date;
}

// Generate email verification template
export const generateVerificationEmail = (data: VerificationEmailData): { subject: string; html: string; text: string } => {
  const subject = "Lageplaner - E-Mail-Adresse bestätigen";

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
    <h2 style="color: #1f2937; margin-top: 0;">Willkommen bei Lageplaner!</h2>
    
    <p>Hallo ${data.name},</p>
    
    <p>Vielen Dank für Ihre Registrierung. Bitte bestätigen Sie Ihre E-Mail-Adresse, um Ihr Konto zu aktivieren.</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${data.verificationUrl}" style="display: inline-block; background-color: #f97316; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
        E-Mail bestätigen
      </a>
    </div>
    
    <p style="color: #6b7280; font-size: 14px;">
      Oder kopieren Sie diesen Link in Ihren Browser:<br>
      <a href="${data.verificationUrl}" style="color: #f97316; word-break: break-all;">${data.verificationUrl}</a>
    </p>
    
    <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 15px; margin: 20px 0;">
      <p style="margin: 0; color: #92400e; font-size: 14px;">
        <strong>Wichtig:</strong> Dieser Link ist 24 Stunden gültig.
      </p>
    </div>
    
    <p style="color: #6b7280; font-size: 14px;">
      Falls Sie sich nicht bei Lageplaner registriert haben, können Sie diese E-Mail ignorieren.
    </p>
    
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
Lageplaner - E-Mail-Adresse bestätigen

Hallo ${data.name},

Vielen Dank für Ihre Registrierung. Bitte bestätigen Sie Ihre E-Mail-Adresse, um Ihr Konto zu aktivieren.

Klicken Sie auf den folgenden Link:
${data.verificationUrl}

Wichtig: Dieser Link ist 24 Stunden gültig.

Falls Sie sich nicht bei Lageplaner registriert haben, können Sie diese E-Mail ignorieren.

Mit freundlichen Grüßen,
Ihr Lageplaner Team

---
Diese E-Mail wurde automatisch generiert.
© ${new Date().getFullYear()} Lageplaner. Alle Rechte vorbehalten.
  `.trim();

  return { subject, html, text };
};

// TODO: Replace this mock implementation with real backend API call
export const sendVerificationEmail = async (email: string, name: string, token: string): Promise<EmailResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const verificationUrl = `${window.location.origin}/verify-email?token=${token}&email=${encodeURIComponent(email)}`;
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  const emailData: VerificationEmailData = {
    email,
    name,
    verificationToken: token,
    verificationUrl,
    expiresAt,
  };

  const emailContent = generateVerificationEmail(emailData);

  // Mock implementation - log email details to console
  console.log('=== MOCK VERIFICATION EMAIL ===');
  console.log('To:', email);
  console.log('Subject:', emailContent.subject);
  console.log('Verification URL:', verificationUrl);
  console.log('Token:', token);
  console.log('Expires:', expiresAt.toLocaleString('de-DE'));
  console.log('==============================');

  // TODO: Replace with actual API call to backend
  return {
    success: true,
    messageId: `mock-verify-${Date.now()}`,
  };
};
