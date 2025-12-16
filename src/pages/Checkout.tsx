import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Map, ArrowLeft, CreditCard, FileText, FileCode, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface CheckoutState {
  paperFormat: string;
  orientation: string;
  scale: string;
  pdfSelected: boolean;
  dxfSelected: boolean;
  totalPrice: number;
}

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as CheckoutState | null;
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!state) {
    navigate("/editor");
    return null;
  }

  const { paperFormat, orientation, scale, pdfSelected, dxfSelected, totalPrice } = state;
  const basePrice = paperFormat === "A4" ? 10 : paperFormat === "A3" ? 15 : 20;

  const handlePayment = () => {
    if (!selectedPayment) {
      toast.error("Bitte wählen Sie eine Zahlungsmethode");
      return;
    }
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Zahlung erfolgreich! Ihr Download wird vorbereitet...");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border h-14">
        <div className="flex items-center justify-between h-full px-4">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Map className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">Lageplaner</span>
          </Link>
          <Button variant="ghost" size="sm" onClick={() => navigate("/editor")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zum Editor
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-14 flex h-[calc(100vh-56px)]">
        {/* Preview Section - Left */}
        <div className="flex-1 bg-muted/30 p-6 flex items-center justify-center">
          <div className="bg-card border border-border rounded-lg shadow-lg p-4 max-w-2xl w-full">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Kartenvorschau</h3>
            <div 
              className={`bg-background border border-border rounded relative ${
                orientation === "Quer" ? "aspect-[1.414/1]" : "aspect-[1/1.414]"
              }`}
            >
              {/* Simplified map preview */}
              <svg className="w-full h-full" viewBox="0 0 400 300">
                {/* Background */}
                <rect fill="hsl(var(--muted))" width="400" height="300" opacity="0.3" />
                
                {/* Roads */}
                <path d="M0,150 L400,150" stroke="hsl(var(--muted-foreground))" strokeWidth="8" opacity="0.4" />
                <path d="M200,0 L200,300" stroke="hsl(var(--muted-foreground))" strokeWidth="6" opacity="0.4" />
                
                {/* Property boundaries */}
                <rect x="50" y="50" width="100" height="80" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.6" />
                <rect x="160" y="50" width="80" height="80" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.6" />
                <rect x="250" y="50" width="100" height="80" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.6" />
                <rect x="50" y="170" width="100" height="100" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.6" />
                <rect x="250" y="170" width="100" height="100" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.6" />
                
                {/* Buildings */}
                <rect x="70" y="70" width="40" height="30" fill="hsl(var(--muted-foreground))" opacity="0.3" />
                <rect x="270" y="70" width="50" height="40" fill="hsl(var(--muted-foreground))" opacity="0.3" />
                <rect x="70" y="200" width="60" height="40" fill="hsl(var(--muted-foreground))" opacity="0.3" />
                
                {/* Parcel numbers */}
                <text x="100" y="115" fontSize="10" fill="hsl(var(--foreground))" textAnchor="middle" opacity="0.7">234/5</text>
                <text x="200" y="100" fontSize="10" fill="hsl(var(--foreground))" textAnchor="middle" opacity="0.7">234/6</text>
                <text x="300" y="115" fontSize="10" fill="hsl(var(--foreground))" textAnchor="middle" opacity="0.7">235/1</text>
                <text x="100" y="240" fontSize="10" fill="hsl(var(--foreground))" textAnchor="middle" opacity="0.7">236/2</text>
                <text x="300" y="240" fontSize="10" fill="hsl(var(--foreground))" textAnchor="middle" opacity="0.7">236/3</text>
              </svg>
              
              {/* Scale indicator */}
              <div className="absolute bottom-2 left-2 bg-background/90 px-2 py-1 rounded text-xs">
                Maßstab {scale}
              </div>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              Format: {paperFormat} {orientation} | Maßstab: {scale}
            </div>
          </div>
        </div>

        {/* Payment Section - Right */}
        <div className="w-96 bg-card border-l border-border p-6 flex flex-col">
          <h2 className="text-lg font-semibold mb-6">Bestellung abschließen</h2>

          {/* Order Summary */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Zusammenfassung</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
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
              <div className="border-t border-border pt-3 mt-3">
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
                <div className="flex justify-between font-semibold mt-3 pt-3 border-t border-border">
                  <span>Gesamt</span>
                  <span className="text-primary">{totalPrice}€</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card className="flex-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Zahlungsmethode</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant={selectedPayment === "card" ? "default" : "outline"} 
                className="w-full justify-start gap-3 h-12"
                onClick={() => setSelectedPayment("card")}
              >
                <CreditCard className="w-5 h-5" />
                Kreditkarte
                {selectedPayment === "card" && <Check className="w-4 h-4 ml-auto" />}
              </Button>
              <Button 
                variant={selectedPayment === "paypal" ? "default" : "outline"} 
                className="w-full justify-start gap-3 h-12"
                onClick={() => setSelectedPayment("paypal")}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 3.993-.032.17a.804.804 0 0 1-.794.679H8.044a.483.483 0 0 1-.477-.558L7.82 20.5l.164-1.035.012-.077a.805.805 0 0 1 .795-.68h.495c3.238 0 5.774-1.314 6.514-5.12.196-.998.187-1.836-.104-2.48a2.588 2.588 0 0 0-.628-.63z"/>
                  <path d="M18.492 6.764a5.755 5.755 0 0 0-.716-.257 8.923 8.923 0 0 0-1.415-.227 16.64 16.64 0 0 0-1.784-.09H9.43a.805.805 0 0 0-.795.68l-1.113 7.054-.032.203a.805.805 0 0 1 .795-.68h1.655c3.833 0 6.834-1.557 7.71-6.06.026-.134.048-.264.067-.39a3.903 3.903 0 0 0-.608-.233h-.617z"/>
                  <path d="M8.635 6.87a.805.805 0 0 1 .795-.68h5.148c.61 0 1.178.04 1.703.12.151.023.298.05.442.08.143.03.283.064.42.102.069.019.136.04.202.061.344.113.654.258.92.437.373-2.373-.003-3.988-1.287-5.45C15.54.032 13.286 0 11.557 0H5.57a.911.911 0 0 0-.9.77L2.003 19.504a.545.545 0 0 0 .539.63h3.92l.984-6.234 1.19-7.03z"/>
                </svg>
                PayPal
                {selectedPayment === "paypal" && <Check className="w-4 h-4 ml-auto" />}
              </Button>
              <Button 
                variant={selectedPayment === "sepa" ? "default" : "outline"} 
                className="w-full justify-start gap-3 h-12"
                onClick={() => setSelectedPayment("sepa")}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
                SEPA Lastschrift
                {selectedPayment === "sepa" && <Check className="w-4 h-4 ml-auto" />}
              </Button>
            </CardContent>
          </Card>

          {/* Pay Button */}
          <Button 
            className="w-full mt-6 h-12 text-base" 
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? "Verarbeitung..." : `Jetzt bezahlen (${totalPrice}€)`}
          </Button>
          
          <p className="text-xs text-muted-foreground text-center mt-4">
            Mit dem Kauf akzeptieren Sie unsere AGB und Datenschutzrichtlinien.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
