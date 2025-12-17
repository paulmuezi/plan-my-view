import { Link } from "react-router-dom";
import { Map, ArrowLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Datenschutz = () => {
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

        <h1 className="text-3xl font-bold text-foreground mb-8">Datenschutzerklärung</h1>
        
        <div className="prose prose-sm text-muted-foreground space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">1. Datenschutz auf einen Blick</h2>
            <h3 className="font-medium text-foreground mt-4 mb-1">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, 
              wenn Sie diese Website besuchen.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">2. Datenerfassung auf dieser Website</h2>
            <h3 className="font-medium text-foreground mt-4 mb-1">Wer ist verantwortlich für die Datenerfassung?</h3>
            <p>
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. 
              Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
            </p>
            
            <h3 className="font-medium text-foreground mt-4 mb-1">Wie erfassen wir Ihre Daten?</h3>
            <p>
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. 
              Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">3. Ihre Rechte</h2>
            <p>
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Herkunft, Empfänger und Zweck 
              Ihrer gespeicherten personenbezogenen Daten. Sie haben außerdem ein Recht, die Berichtigung 
              oder Löschung dieser Daten zu verlangen.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. Cookies</h2>
            <p>
              Diese Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt 
              werden und die Ihr Browser speichert. Sie dienen dazu, unser Angebot nutzerfreundlicher zu gestalten.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">5. Zahlungsabwicklung</h2>
            <p>
              Bei Bestellungen werden Ihre Zahlungsdaten an unseren Zahlungsdienstleister übermittelt. 
              Diese Daten werden ausschließlich zur Abwicklung der Zahlung verwendet und nicht gespeichert.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">6. Kontakt</h2>
            <p>
              Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden. 
              Die Kontaktdaten finden Sie im Impressum.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Datenschutz;
