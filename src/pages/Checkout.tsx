import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, FileText, FileCode, Check, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { sendOrderConfirmationEmail, generateOrderId, OrderEmailData } from "@/services/emailService";
import { createPaymentIntent, processPayment, eurosToCents, PaymentMethod } from "@/services/paymentService";
import { saveOrder } from "@/services/orderService";
import Header from "@/components/Header";
import previewPdf from "@/assets/preview-checkout-pdf.png";
import previewDxf from "@/assets/preview-checkout-dxf.png";
import { cn } from "@/lib/utils";

interface CheckoutState {
  paperFormat: string;
  orientation: string;
  scale: string;
  pdfSelected: boolean;
  dxfSelected: boolean;
  totalPrice: number;
  address?: string;
  pinPosition?: { lat: number; lng: number };
}

interface CardDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardHolder: string;
}

interface SepaDetails {
  iban: string;
  accountHolder: string;
}

const formatCardNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
};

const formatExpiryDate = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 2) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return digits;
};

const formatIban = (value: string): string => {
  const cleaned = value.replace(/\s/g, '').toUpperCase().slice(0, 22);
  return cleaned.replace(/(.{4})/g, '$1 ').trim();
};

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const state = location.state as CheckoutState | null;
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activePreview, setActivePreview] = useState<'pdf' | 'dxf'>('pdf');
  
  // Card details state
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: '',
  });
  
  // SEPA details state
  const [sepaDetails, setSepaDetails] = useState<SepaDetails>({
    iban: '',
    accountHolder: '',
  });

  if (!state) {
    navigate("/editor");
    return null;
  }

  const { paperFormat, orientation, scale, pdfSelected, dxfSelected, totalPrice, address } = state;
  const basePrice = paperFormat === "A4" ? 10 : paperFormat === "A3" ? 15 : 20;
  const displayAddress = address ? address.split(",").slice(0, 3).join(",") : "Adresse nicht verfügbar";

  const validateCardDetails = (): boolean => {
    if (cardDetails.cardNumber.replace(/\s/g, '').length !== 16) {
      toast.error("Bitte geben Sie eine gültige Kartennummer ein");
      return false;
    }
    if (cardDetails.expiryDate.length !== 5) {
      toast.error("Bitte geben Sie ein gültiges Ablaufdatum ein");
      return false;
    }
    if (cardDetails.cvv.length < 3) {
      toast.error("Bitte geben Sie einen gültigen CVV ein");
      return false;
    }
    if (cardDetails.cardHolder.trim().length < 2) {
      toast.error("Bitte geben Sie den Karteninhaber ein");
      return false;
    }
    return true;
  };

  const validateSepaDetails = (): boolean => {
    const cleanIban = sepaDetails.iban.replace(/\s/g, '');
    if (cleanIban.length < 15 || cleanIban.length > 34) {
      toast.error("Bitte geben Sie eine gültige IBAN ein");
      return false;
    }
    if (sepaDetails.accountHolder.trim().length < 2) {
      toast.error("Bitte geben Sie den Kontoinhaber ein");
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!selectedPayment) {
      toast.error("Bitte wählen Sie eine Zahlungsmethode");
      return;
    }

    // Validate based on payment method
    if (selectedPayment === 'card' && !validateCardDetails()) {
      return;
    }
    if (selectedPayment === 'sepa' && !validateSepaDetails()) {
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const customerEmail = user?.email || "kunde@example.com";
      
      const paymentIntentResult = await createPaymentIntent({
        amount: eurosToCents(totalPrice),
        currency: 'EUR',
        customerEmail,
        metadata: {
          paperFormat,
          orientation,
          scale,
          pdfSelected: String(pdfSelected),
          dxfSelected: String(dxfSelected),
        },
      });
      
      if (!paymentIntentResult.success || !paymentIntentResult.paymentIntent) {
        throw new Error(paymentIntentResult.error || "Payment intent creation failed");
      }
      
      const paymentResult = await processPayment({
        paymentIntentId: paymentIntentResult.paymentIntent.id,
        paymentMethod: selectedPayment,
      });
      
      if (!paymentResult.success) {
        toast.error(paymentResult.error || "Zahlung fehlgeschlagen");
        return;
      }
      
      const orderId = generateOrderId();
      
      const emailData: OrderEmailData = {
        customerEmail,
        customerName: user?.name,
        orderId,
        paperFormat,
        orientation,
        scale,
        pdfSelected,
        dxfSelected,
        totalPrice,
        orderDate: new Date(),
      };
      
      const emailResult = await sendOrderConfirmationEmail(emailData);
      
      if (emailResult.success) {
        console.log("Order completed:", { orderId, paymentIntentId: paymentResult.paymentIntentId, emailMessageId: emailResult.messageId });
      } else {
        console.warn("Email sending failed:", emailResult.error);
      }
      
      if (user) {
        const fileFormats: string[] = [];
        if (pdfSelected) fileFormats.push("pdf");
        if (dxfSelected) fileFormats.push("dxf");
        
        saveOrder(user.id, {
          address: address || "Adresse nicht angegeben",
          format: paperFormat,
          scale,
          orientation,
          fileFormats,
          total: totalPrice,
        });
      }
      
      navigate("/success", { 
        state: { 
          orderId, 
          paperFormat,
          orientation,
          scale,
          pdfSelected,
          dxfSelected,
          totalPrice,
          customerEmail,
          address,
        } 
      });
      
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
    } finally {
      setIsProcessing(false);
    }
  };

  const renderPaymentForm = () => {
    if (!selectedPayment) return null;

    switch (selectedPayment) {
      case 'card':
        return (
          <Card className="mt-3">
            <CardContent className="p-3 space-y-3">
              <div>
                <Label htmlFor="cardHolder" className="text-xs text-muted-foreground">Karteninhaber</Label>
                <Input
                  id="cardHolder"
                  placeholder="Max Mustermann"
                  value={cardDetails.cardHolder}
                  onChange={(e) => setCardDetails(prev => ({ ...prev, cardHolder: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="cardNumber" className="text-xs text-muted-foreground">Kartennummer</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.cardNumber}
                  onChange={(e) => setCardDetails(prev => ({ ...prev, cardNumber: formatCardNumber(e.target.value) }))}
                  className="mt-1"
                  maxLength={19}
                />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Label htmlFor="expiryDate" className="text-xs text-muted-foreground">Gültig bis</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={cardDetails.expiryDate}
                    onChange={(e) => setCardDetails(prev => ({ ...prev, expiryDate: formatExpiryDate(e.target.value) }))}
                    className="mt-1"
                    maxLength={5}
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="cvv" className="text-xs text-muted-foreground">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                    className="mt-1"
                    maxLength={4}
                    type="password"
                  />
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1">
                <Lock className="w-3 h-3" />
                <span>Sichere SSL-verschlüsselte Zahlung</span>
              </div>
            </CardContent>
          </Card>
        );

      case 'paypal':
        return (
          <Card className="mt-3">
            <CardContent className="p-4 text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-[#003087] rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 3.993-.032.17a.804.804 0 0 1-.794.679H8.044a.483.483 0 0 1-.477-.558L7.82 20.5l.164-1.035.012-.077a.805.805 0 0 1 .795-.68h.495c3.238 0 5.774-1.314 6.514-5.12.196-.998.187-1.836-.104-2.48a2.588 2.588 0 0 0-.628-.63z"/>
                  <path d="M18.492 6.764a5.755 5.755 0 0 0-.716-.257 8.923 8.923 0 0 0-1.415-.227 16.64 16.64 0 0 0-1.784-.09H9.43a.805.805 0 0 0-.795.68l-1.113 7.054-.032.203a.805.805 0 0 1 .795-.68h1.655c3.833 0 6.834-1.557 7.71-6.06.026-.134.048-.264.067-.39a3.903 3.903 0 0 0-.608-.233h-.617z"/>
                  <path d="M8.635 6.87a.805.805 0 0 1 .795-.68h5.148c.61 0 1.178.04 1.703.12.151.023.298.05.442.08.143.03.283.064.42.102.069.019.136.04.202.061.344.113.654.258.92.437.373-2.373-.003-3.988-1.287-5.45C15.54.032 13.286 0 11.557 0H5.57a.911.911 0 0 0-.9.77L2.003 19.504a.545.545 0 0 0 .539.63h3.92l.984-6.234 1.19-7.03z"/>
                </svg>
              </div>
              <p className="text-sm text-muted-foreground">
                Sie werden zu PayPal weitergeleitet, um die Zahlung abzuschließen.
              </p>
              <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <Lock className="w-3 h-3" />
                <span>Sichere Zahlung über PayPal</span>
              </div>
            </CardContent>
          </Card>
        );

      case 'sepa':
        return (
          <Card className="mt-3">
            <CardContent className="p-3 space-y-3">
              <div>
                <Label htmlFor="accountHolder" className="text-xs text-muted-foreground">Kontoinhaber</Label>
                <Input
                  id="accountHolder"
                  placeholder="Max Mustermann"
                  value={sepaDetails.accountHolder}
                  onChange={(e) => setSepaDetails(prev => ({ ...prev, accountHolder: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="iban" className="text-xs text-muted-foreground">IBAN</Label>
                <Input
                  id="iban"
                  placeholder="DE89 3704 0044 0532 0130 00"
                  value={sepaDetails.iban}
                  onChange={(e) => setSepaDetails(prev => ({ ...prev, iban: formatIban(e.target.value) }))}
                  className="mt-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Mit dem Fortfahren erteilen Sie uns ein SEPA-Lastschriftmandat. Der Betrag wird innerhalb von 2-3 Werktagen abgebucht.
              </p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1">
                <Lock className="w-3 h-3" />
                <span>Sichere SSL-verschlüsselte Zahlung</span>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  const isPaymentComplete = (): boolean => {
    if (!selectedPayment) return false;
    
    switch (selectedPayment) {
      case 'card':
        return (
          cardDetails.cardNumber.replace(/\s/g, '').length === 16 &&
          cardDetails.expiryDate.length === 5 &&
          cardDetails.cvv.length >= 3 &&
          cardDetails.cardHolder.trim().length >= 2
        );
      case 'paypal':
        return true; // PayPal just requires selection
      case 'sepa':
        return (
          sepaDetails.iban.replace(/\s/g, '').length >= 15 &&
          sepaDetails.accountHolder.trim().length >= 2
        );
      default:
        return false;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 flex overflow-hidden pt-14">
        {/* Preview Section - Left */}
        <div className="flex-1 flex flex-col items-center justify-center overflow-auto p-6 relative">
          {/* Preview Card */}
          <div className="max-w-lg w-full shadow-lg rounded-lg overflow-hidden border border-border bg-card">
            {!pdfSelected && !dxfSelected ? (
              <div className="p-8 text-center text-muted-foreground">
                Keine Vorschau verfügbar
              </div>
            ) : (
              <img 
                src={
                  pdfSelected && dxfSelected 
                    ? (activePreview === 'pdf' ? previewPdf : previewDxf)
                    : (pdfSelected ? previewPdf : previewDxf)
                } 
                alt={`${pdfSelected && dxfSelected ? activePreview.toUpperCase() : (pdfSelected ? 'PDF' : 'DXF')} Vorschau`}
                className="w-full h-auto object-contain"
              />
            )}
          </div>

          {/* Elegant Toggle - fixed at bottom, only show when both formats selected */}
          {pdfSelected && dxfSelected && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 p-1 bg-muted/95 backdrop-blur-sm rounded-full shadow-lg border border-border">
              <button
                onClick={() => setActivePreview('pdf')}
                className={cn(
                  "inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                  activePreview === 'pdf' 
                    ? "bg-background text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <FileText className="w-3.5 h-3.5" />
                PDF
              </button>
              <button
                onClick={() => setActivePreview('dxf')}
                className={cn(
                  "inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                  activePreview === 'dxf' 
                    ? "bg-background text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <FileCode className="w-3.5 h-3.5" />
                DXF
              </button>
            </div>
          )}
        </div>

        {/* Payment Section - Right */}
        <div className="w-80 bg-card border-l border-border flex flex-col">
          <div className="p-3 border-b border-border">
            <button 
              onClick={() => navigate("/editor")}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück zum Editor
            </button>
          </div>

          <div className="p-3 flex-1 overflow-auto space-y-4">
            <h2 className="text-sm font-semibold">Bestellung abschließen</h2>

            <Card>
              <CardHeader className="pb-2 pt-3 px-3">
                <CardTitle className="text-xs text-muted-foreground font-normal">Zusammenfassung</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 px-3 pb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Adresse</span>
                  <span className="text-right max-w-36 truncate" title={address}>{displayAddress}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Papierformat</span>
                  <span>{paperFormat} {orientation}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Maßstab</span>
                  <span>{scale}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Dateiformate</span>
                  <div className="flex gap-2">
                    {pdfSelected && (
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" /> PDF
                      </span>
                    )}
                    {dxfSelected && (
                      <span className="flex items-center gap-1">
                        <FileCode className="w-3 h-3" /> DXF
                      </span>
                    )}
                  </div>
                </div>
                <div className="border-t border-border pt-2 mt-2">
                  {pdfSelected && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{paperFormat} Karte (PDF)</span>
                      <span>{basePrice}€</span>
                    </div>
                  )}
                  {dxfSelected && !pdfSelected && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">DXF</span>
                      <span>{basePrice}€</span>
                    </div>
                  )}
                  {pdfSelected && dxfSelected && (
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-muted-foreground">DXF Format</span>
                      <span>+10€</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold mt-2 pt-2 border-t border-border">
                    <span>Gesamt</span>
                    <span className="text-primary">{totalPrice}€</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">Zahlungsmethode</Label>
              <div className="space-y-2">
                <Button 
                  variant={selectedPayment === "card" ? "default" : "outline"} 
                  className="w-full justify-start gap-3 h-10"
                  onClick={() => setSelectedPayment("card")}
                >
                  <CreditCard className="w-4 h-4" />
                  Kreditkarte
                  {selectedPayment === "card" && <Check className="w-4 h-4 ml-auto" />}
                </Button>
                <Button 
                  variant={selectedPayment === "paypal" ? "default" : "outline"} 
                  className="w-full justify-start gap-3 h-10"
                  onClick={() => setSelectedPayment("paypal")}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 3.993-.032.17a.804.804 0 0 1-.794.679H8.044a.483.483 0 0 1-.477-.558L7.82 20.5l.164-1.035.012-.077a.805.805 0 0 1 .795-.68h.495c3.238 0 5.774-1.314 6.514-5.12.196-.998.187-1.836-.104-2.48a2.588 2.588 0 0 0-.628-.63z"/>
                    <path d="M18.492 6.764a5.755 5.755 0 0 0-.716-.257 8.923 8.923 0 0 0-1.415-.227 16.64 16.64 0 0 0-1.784-.09H9.43a.805.805 0 0 0-.795.68l-1.113 7.054-.032.203a.805.805 0 0 1 .795-.68h1.655c3.833 0 6.834-1.557 7.71-6.06.026-.134.048-.264.067-.39a3.903 3.903 0 0 0-.608-.233h-.617z"/>
                    <path d="M8.635 6.87a.805.805 0 0 1 .795-.68h5.148c.61 0 1.178.04 1.703.12.151.023.298.05.442.08.143.03.283.064.42.102.069.019.136.04.202.061.344.113.654.258.92.437.373-2.373-.003-3.988-1.287-5.45C15.54.032 13.286 0 11.557 0H5.57a.911.911 0 0 0-.9.77L2.003 19.504a.545.545 0 0 0 .539.63h3.92l.984-6.234 1.19-7.03z"/>
                  </svg>
                  PayPal
                  {selectedPayment === "paypal" && <Check className="w-4 h-4 ml-auto" />}
                </Button>
                <Button 
                  variant={selectedPayment === "sepa" ? "default" : "outline"} 
                  className="w-full justify-start gap-3 h-10"
                  onClick={() => setSelectedPayment("sepa")}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                  SEPA Lastschrift
                  {selectedPayment === "sepa" && <Check className="w-4 h-4 ml-auto" />}
                </Button>
              </div>

              {/* Payment Form based on selection */}
              {renderPaymentForm()}
            </div>
          </div>

          <div className="p-3 border-t border-border">
            <Button 
              className="w-full py-6 text-base font-semibold" 
              onClick={handlePayment}
              disabled={isProcessing || !isPaymentComplete()}
            >
              {isProcessing ? "Verarbeitung..." : `Jetzt kaufen (${totalPrice}€)`}
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Mit dem Kauf akzeptieren Sie unsere AGB und Datenschutzrichtlinien.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
