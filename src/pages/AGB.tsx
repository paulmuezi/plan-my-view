import { Link } from "react-router-dom";
import { Map, ArrowLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const AGB = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Map className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">Lageplaner</span>
          </Link>
          {user && (
            <Link to="/profile" className="flex items-center gap-2">
              <span className="text-sm text-foreground hidden sm:inline">{user.name || user.email}</span>
              <Button size="icon" variant="outline" className="h-8 w-8">
                <User className="w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-12">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Startseite
        </Link>

        <h1 className="text-3xl font-bold text-foreground mb-8">Allgemeine Geschäftsbedingungen</h1>
        
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 1 Geltungsbereich</h2>
            <p>
              Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen Lageplaner 
              und dem Kunden über die Nutzung der Lageplaner-Dienste. Abweichende Bedingungen des 
              Kunden werden nicht anerkannt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 2 Vertragsgegenstand</h2>
            <p>
              Lageplaner bietet die Erstellung von Lageplänen auf Basis amtlicher Katasterdaten an. 
              Die erstellten Pläne werden digital als PDF oder DXF-Datei bereitgestellt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 3 Vertragsschluss</h2>
            <p>
              Der Vertrag kommt durch Bestellung und Bezahlung eines Lageplans zustande. 
              Mit Abschluss der Zahlung erhält der Kunde Zugang zum bestellten Lageplan.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 4 Preise und Zahlung</h2>
            <p>
              Die aktuellen Preise sind auf der Website ersichtlich. Alle Preise verstehen sich 
              inklusive der gesetzlichen Mehrwertsteuer. Die Zahlung erfolgt vor Bereitstellung 
              des Lageplans.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 5 Widerrufsrecht</h2>
            <p>
              Das Widerrufsrecht erlischt bei digitalen Inhalten, wenn mit der Ausführung des 
              Vertrags begonnen wurde und der Kunde ausdrücklich zugestimmt hat.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 6 Haftung</h2>
            <p>
              Lageplaner haftet nur für Vorsatz und grobe Fahrlässigkeit. Die Haftung für leichte 
              Fahrlässigkeit ist ausgeschlossen, soweit nicht wesentliche Vertragspflichten 
              verletzt werden.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 7 Schlussbestimmungen</h2>
            <p>
              Es gilt deutsches Recht. Gerichtsstand ist, soweit gesetzlich zulässig, der Sitz 
              des Anbieters. Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit 
              der übrigen Bestimmungen unberührt.
            </p>
          </section>

          <p className="text-sm pt-6 border-t border-border">
            Stand: Dezember 2025
          </p>
        </div>
      </main>
    </div>
  );
};

export default AGB;
