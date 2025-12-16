import { Link } from "react-router-dom";
import { Map, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Impressum = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Map className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">Lageplaner</span>
          </Link>
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-12">
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
