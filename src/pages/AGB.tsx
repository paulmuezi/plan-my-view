import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AGB = () => {
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

        <h1 className="text-3xl font-bold text-foreground mb-8">Allgemeine Geschäftsbedingungen</h1>
        
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 1 Geltungsbereich</h2>
            <p>
              (1) Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen der 
              Daniel Müller-Zitzke und Paul Müller-Zitzke GbR, Lehmbuschfeld 14, 30539 Hannover 
              (nachfolgend "Anbieter") und dem Kunden über die Nutzung der Dienste und Kundenkonten unter www.lageplaner.de.
            </p>
            <p>
              (2) Abweichende Bedingungen des Kunden werden nicht anerkannt, es sei denn, der Anbieter 
              stimmt ihrer Geltung ausdrücklich schriftlich zu.
            </p>
            <p>
              (3) Der Anbieter ist berechtigt, diese AGB mit Wirkung für die Zukunft zu ändern. 
              Änderungen werden dem Kunden per E-Mail angekündigt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 2 Vertragsgegenstand und Leistungen</h2>
            <p>
              (1) Der Anbieter stellt eine Online-Plattform zur Verfügung, über die Kunden digitale 
              Liegenschaftskarten auf Basis frei verfügbarer Geodaten der Bundesländer (Open Data) 
              erstellen und herunterladen können.
            </p>
            <p>
              (2) Die erstellten Karten dienen als Planungsgrundlage. Sie ersetzen keine amtlichen 
              Vermessungsunterlagen oder behördlichen Lagepläne für Bauanträge, die eine öffentliche 
              Beurkundung erfordern.
            </p>
            <p>
              (3) Die Verfügbarkeit der Dienste hängt von der technischen Erreichbarkeit der Server 
              der Landesämter ab. Der Anbieter übernimmt keine Garantie für eine durchgehende Verfügbarkeit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 3 Registrierung und Benutzerkonto</h2>
            <p>
              (1) Die Nutzung bestimmter Funktionen setzt eine Registrierung voraus. Der Kunde ist 
              verpflichtet, die bei der Registrierung abgefragten Daten wahrheitsgemäß und vollständig anzugeben.
            </p>
            <p>
              (2) Die Registrierung ist nur juristischen Personen, Personengesellschaften und 
              unbeschränkt geschäftsfähigen natürlichen Personen erlaubt.
            </p>
            <p>
              (3) Mit der Registrierung kommt ein unentgeltlicher Nutzungsvertrag über das Konto zustande. 
              Es besteht kein Anspruch auf eine Registrierung.
            </p>
            <p>
              (4) Der Anbieter ist berechtigt, Benutzerkonten zu sperren oder zu löschen, wenn der Kunde 
              gegen diese AGB verstößt oder falsche Angaben gemacht hat.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 4 Vertragsschluss bei Bestellungen</h2>
            <p>
              (1) Die Darstellung der Produkte ist kein rechtlich bindendes Angebot.
            </p>
            <p>
              (2) Durch Anklicken des Buttons "Kaufen" (oder "Zahlungspflichtig bestellen") gibt der Kunde 
              ein verbindliches Angebot zum Kauf der generierten Karte ab. Der Vertrag kommt zustande, 
              sobald der Download bereitgestellt wird oder eine Auftragsbestätigung per E-Mail erfolgt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 5 Preise und Zahlung</h2>
            <p>
              (1) Die angegebenen Preise sind Endpreise. Gemäß § 19 UStG (Kleinunternehmerregelung) wird 
              keine Umsatzsteuer erhoben und folglich auch nicht ausgewiesen.
            </p>
            <p>
              (2) Die Zahlung ist unmittelbar mit Vertragsschluss fällig.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 6 Lieferung und Datenspeicherung</h2>
            <p>
              (1) Die Lieferung erfolgt digital (PDF/DXF) per Download-Link im Kundenkonto.
            </p>
            <p>
              (2) Der Anbieter bemüht sich, die Dateien im Kundenkonto dauerhaft zum Abruf bereitzuhalten, 
              garantiert dies jedoch nur für einen Zeitraum von 30 Tagen ab Kauf. Der Kunde ist verpflichtet, 
              die Dateien zur eigenen Sicherheit lokal zu speichern.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 7 Widerrufsrecht für digitale Inhalte</h2>
            <p>
              (1) Verbrauchern steht grundsätzlich ein gesetzliches Widerrufsrecht zu.
            </p>
            <p>
              (2) Erlöschen des Widerrufsrechts: Da der Anbieter digitale Inhalte liefert, die nicht auf 
              einem körperlichen Datenträger geliefert werden, erlischt das Widerrufsrecht, sobald mit der 
              Ausführung des Vertrags (Bereitstellung des Downloads) begonnen wurde. Der Kunde stimmt dieser 
              vorzeitigen Ausführung beim Kaufabschluss ausdrücklich zu und bestätigt seine Kenntnis über 
              den Verlust des Widerrufsrechts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 8 Pflichten des Kunden / Geheimhaltung</h2>
            <p>
              (1) Der Kunde ist verpflichtet, seine Zugangsdaten (Passwort) geheim zu halten und vor dem 
              Zugriff Dritter zu schützen.
            </p>
            <p>
              (2) Sollte der Kunde den Verdacht haben, dass Dritte unbefugt Zugriff auf sein Konto erlangt 
              haben, muss er den Anbieter unverzüglich informieren und sein Passwort ändern.
            </p>
            <p>
              (3) Der Kunde haftet für alle Aktivitäten, die unter Verwendung seines Benutzerkontos 
              vorgenommen werden, es sei denn, er hat den Missbrauch nicht zu vertreten.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 9 Nutzungsrechte</h2>
            <p>
              (1) Der Kunde erhält ein einfaches, zeitlich unbeschränktes Nutzungsrecht an den erstellten 
              Karten für private und gewerbliche Zwecke.
            </p>
            <p>
              (2) Der Kunde ist berechtigt, die Karten für eigene Projekte (z. B. Immobilien-Exposés, 
              Planungen) zu nutzen, zu bearbeiten und an Dritte (z. B. Kaufinteressenten, Ämter) weiterzugeben.
            </p>
            <p>
              (3) Untersagt ist der isolierte gewerbliche Weiterverkauf der reinen Datei (Reselling) als 
              eigenständiges Produkt ohne einen damit verbundenen projektbezogenen Mehrwert.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 10 Haftung</h2>
            <p>
              (1) Der Anbieter haftet unbeschränkt für Vorsatz, grobe Fahrlässigkeit und bei Verletzung 
              von Leben, Körper oder Gesundheit.
            </p>
            <p>
              (2) Für leichte Fahrlässigkeit haftet der Anbieter nur bei Verletzung wesentlicher 
              Vertragspflichten (Kardinalpflichten), begrenzt auf den vertragstypischen, vorhersehbaren Schaden.
            </p>
            <p>
              (3) Die Karten basieren auf automatisiert verarbeiteten Daten der Katasterämter. Der Anbieter 
              übernimmt keine Gewähr für die inhaltliche Richtigkeit, Aktualität oder Vollständigkeit dieser 
              behördlichen Basisdaten. Eine Haftung für die Genehmigungsfähigkeit von Bauvorhaben auf Basis 
              dieser Karten wird ausgeschlossen.
            </p>
            <p>
              (4) Für Datenverlust im Kundenkonto haftet der Anbieter nur insoweit, als der Kunde seine Daten 
              durch regelmäßige Backups (lokales Speichern) gesichert hat, sodass diese mit vertretbarem 
              Aufwand wiederhergestellt werden können.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 11 Datenschutz</h2>
            <p>
              Die Verarbeitung personenbezogener Daten erfolgt gemäß der Datenschutzerklärung, abrufbar 
              unter <a href="/datenschutz" className="text-primary hover:underline">www.lageplaner.de/datenschutz</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 12 Schlussbestimmungen</h2>
            <p>
              (1) Es gilt das Recht der Bundesrepublik Deutschland.
            </p>
            <p>
              (2) Sofern der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder 
              öffentlich-rechtliches Sondervermögen ist, ist Gerichtsstand Hannover.
            </p>
            <p>
              (3) Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                https://ec.europa.eu/consumers/odr
              </a>. Wir sind zur Teilnahme nicht verpflichtet.
            </p>
          </section>

          <p className="text-sm text-muted-foreground mt-8">Stand: Januar 2026</p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AGB;
