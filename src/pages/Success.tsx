import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Download, FileText, FileCode, ArrowRight, Home, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface SuccessState {
  orderId: string;
  paperFormat: string;
  orientation: string;
  scale: string;
  pdfSelected: boolean;
  dxfSelected: boolean;
  totalPrice: number;
  customerEmail: string;
  address?: string;
}

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as SuccessState | null;

  if (!state) {
    navigate("/");
    return null;
  }

  const { orderId, paperFormat, orientation, scale, pdfSelected, dxfSelected, totalPrice, customerEmail, address } = state;

  const handleDownloadPDF = () => {
    console.log("Downloading PDF for order:", orderId);
    alert("PDF Download wird gestartet... (Demo)");
  };

  const handleDownloadDXF = () => {
    console.log("Downloading DXF for order:", orderId);
    alert("DXF Download wird gestartet... (Demo)");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="pt-14 flex items-center justify-center flex-1 p-6">
        <div className="max-w-2xl w-full">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Zahlung erfolgreich!
            </h1>
            <p className="text-muted-foreground">
              Vielen Dank für Ihre Bestellung. Eine Bestätigungs-E-Mail wurde an{" "}
              <span className="font-medium text-foreground">{customerEmail}</span> gesendet.
            </p>
          </div>

          {/* Order Details Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                <span>Bestelldetails</span>
                <span className="text-sm font-mono text-muted-foreground">{orderId}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {address && (
                <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg mb-3">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs text-muted-foreground block">Adresse</span>
                    <p className="text-sm font-medium">{address}</p>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Papierformat</span>
                  <p className="font-medium">{paperFormat} {orientation}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Maßstab</span>
                  <p className="font-medium">{scale}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Dateiformate</span>
                  <p className="font-medium">
                    {[pdfSelected && "PDF", dxfSelected && "DXF"].filter(Boolean).join(", ")}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Gesamtpreis</span>
                  <p className="font-medium text-primary">{totalPrice}€</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Download Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Download className="w-4 h-4" />
                Ihre Downloads
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pdfSelected && (
                <Button
                  variant="outline"
                  className="w-full justify-between h-14"
                  onClick={handleDownloadPDF}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-red-500" />
                    <div className="text-left">
                      <p className="font-medium">Lageplan PDF</p>
                      <p className="text-xs text-muted-foreground">{paperFormat} {orientation} | {scale}</p>
                    </div>
                  </div>
                  <Download className="w-4 h-4" />
                </Button>
              )}
              {dxfSelected && (
                <Button
                  variant="outline"
                  className="w-full justify-between h-14"
                  onClick={handleDownloadDXF}
                >
                  <div className="flex items-center gap-3">
                    <FileCode className="w-5 h-5 text-blue-500" />
                    <div className="text-left">
                      <p className="font-medium">Lageplan DXF</p>
                      <p className="text-xs text-muted-foreground">{paperFormat} {orientation} | {scale}</p>
                    </div>
                  </div>
                  <Download className="w-4 h-4" />
                </Button>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                Die Download-Links wurden auch per E-Mail an Sie gesendet und sind 7 Tage gültig.
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1" onClick={() => navigate("/editor")}>
              <ArrowRight className="w-4 h-4 mr-2" />
              Neue Karte erstellen
            </Button>
            <Button className="flex-1" onClick={() => navigate("/")}>
              <Home className="w-4 h-4 mr-2" />
              Zur Startseite
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Success;
