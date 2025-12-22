import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Datenschutz = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header variant="contained" />

      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 w-full">
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
              wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert 
              werden können.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">2. Verantwortliche Stelle</h2>
            <p>
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
            </p>
            <p className="mt-2">
              Daniel Müller-Zitzke und Paul Müller-Zitzke GbR<br />
              Lehmbuschfeld 14<br />
              30539 Hannover<br /><br />
              Telefon: 015734748616<br />
              E-Mail: info@lageplaner.de
            </p>
            <p className="mt-2">
              Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über 
              die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">3. Datenerfassung auf dieser Website</h2>
            <h3 className="font-medium text-foreground mt-4 mb-1">Wie erfassen wir Ihre Daten?</h3>
            <p>
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen, z.B. durch Eingabe in ein Kontaktformular 
              oder bei einer Bestellung. Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. 
              Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
            </p>
            
            <h3 className="font-medium text-foreground mt-4 mb-1">Wofür nutzen wir Ihre Daten?</h3>
            <p>
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. 
              Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden. Bei Bestellungen werden Ihre Daten 
              zur Vertragsabwicklung und Bereitstellung der bestellten Lagepläne verwendet.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. Ihre Rechte</h2>
            <p>
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Herkunft, Empfänger und Zweck 
              Ihrer gespeicherten personenbezogenen Daten. Sie haben außerdem ein Recht auf Berichtigung, 
              Sperrung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz 
              können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden. Des Weiteren 
              steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">5. Cookies</h2>
            <p>
              Diese Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt 
              werden und die Ihr Browser speichert. Sie dienen dazu, unser Angebot nutzerfreundlicher, effektiver 
              und sicherer zu machen. Die meisten der von uns verwendeten Cookies sind sogenannte "Session-Cookies". 
              Sie werden nach Ende Ihres Besuchs automatisch gelöscht. Andere Cookies bleiben auf Ihrem Endgerät 
              gespeichert, bis Sie diese löschen. Sie können Ihren Browser so einstellen, dass Sie über das Setzen 
              von Cookies informiert werden und Cookies nur im Einzelfall erlauben.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">6. Server-Log-Dateien</h2>
            <p>
              Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, 
              die Ihr Browser automatisch an uns übermittelt. Dies sind: Browsertyp und Browserversion, verwendetes 
              Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse. 
              Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Grundlage für die Datenverarbeitung ist 
              Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">7. Zahlungsabwicklung</h2>
            <p>
              Bei kostenpflichtigen Bestellungen werden Ihre Zahlungsdaten (z.B. Kreditkartendaten, PayPal-Informationen) 
              an unsere Zahlungsdienstleister (Stripe, PayPal) übermittelt. Die Datenverarbeitung erfolgt auf Grundlage 
              von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung). Ihre Zahlungsdaten werden ausschließlich zur Abwicklung 
              der Zahlung verwendet und nach Abschluss der Transaktion nicht bei uns gespeichert.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">8. SSL-/TLS-Verschlüsselung</h2>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine 
              SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des 
              Browsers von "http://" auf "https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">9. Kontakt</h2>
            <p>
              Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden:<br /><br />
              E-Mail: info@lageplaner.de<br />
              Telefon: 015734748616
            </p>
          </section>

          <p className="text-sm pt-6 border-t border-border">
            Stand: Dezember 2025
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Datenschutz;
