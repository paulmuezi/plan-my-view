import { Link } from "react-router-dom";
import { Map, ArrowLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Impressum = () => {
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
            <Link to="/profile">
              <Button size="icon" variant="ghost">
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

        <h1 className="text-3xl font-bold text-foreground mb-8">Impressum</h1>
        
        <div className="prose prose-sm text-muted-foreground space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Angaben gemäß § 5 TMG</h2>
            <p>
              [Firmenname]<br />
              [Straße und Hausnummer]<br />
              [PLZ und Ort]
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Kontakt</h2>
            <p>
              Telefon: [Telefonnummer]<br />
              E-Mail: [E-Mail-Adresse]
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Vertreten durch</h2>
            <p>[Name des Vertretungsberechtigten]</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Registereintrag</h2>
            <p>
              Eintragung im Handelsregister<br />
              Registergericht: [Amtsgericht]<br />
              Registernummer: [HRB-Nummer]
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              [USt-IdNr.]
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Haftungsausschluss</h2>
            <p>
              Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. 
              Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Impressum;
