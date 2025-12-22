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
              (nachfolgend "Anbieter") und dem Kunden über die Nutzung der Lageplaner-Dienste unter www.lageplaner.de.
            </p>
            <p>
              (2) Abweichende, entgegenstehende oder ergänzende Allgemeine Geschäftsbedingungen des Kunden 
              werden nur dann und insoweit Vertragsbestandteil, als der Anbieter ihrer Geltung ausdrücklich 
              schriftlich zugestimmt hat.
            </p>
            <p>
              (3) Verbraucher im Sinne dieser AGB ist jede natürliche Person, die ein Rechtsgeschäft zu Zwecken 
              abschließt, die überwiegend weder ihrer gewerblichen noch ihrer selbständigen beruflichen Tätigkeit 
              zugerechnet werden können. Unternehmer ist jede natürliche oder juristische Person, die bei Abschluss 
              eines Rechtsgeschäfts in Ausübung ihrer gewerblichen oder selbständigen beruflichen Tätigkeit handelt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 2 Vertragsgegenstand</h2>
            <p>
              (1) Der Anbieter bietet die Erstellung von digitalen Lageplänen auf Basis frei verfügbarer 
              Geodaten (OpenStreetMap) an. Die erstellten Pläne werden digital als PDF- und/oder DXF-Datei 
              zum Download bereitgestellt.
            </p>
            <p>
              (2) Die Lagepläne dienen informativen Zwecken. Sie ersetzen keine amtlichen Vermessungsunterlagen 
              oder behördlichen Lagepläne und erheben keinen Anspruch auf katasteramtliche Genauigkeit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 3 Vertragsschluss</h2>
            <p>
              (1) Die Darstellung der Produkte auf der Website stellt kein rechtlich bindendes Angebot, 
              sondern eine Aufforderung zur Bestellung dar.
            </p>
            <p>
              (2) Der Kunde gibt durch Klicken des Buttons "Kostenpflichtig bestellen" ein verbindliches 
              Kaufangebot ab. Der Vertrag kommt mit Übermittlung der Auftragsbestätigung per E-Mail oder 
              mit Bereitstellung der Dateien zum Download zustande.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 4 Preise und Zahlung</h2>
            <p>
              (1) Die auf der Website angegebenen Preise sind Endpreise und enthalten die gesetzliche 
              Umsatzsteuer. Es fallen keine zusätzlichen Versandkosten an, da es sich um digitale Produkte handelt.
            </p>
            <p>
              (2) Die Zahlung erfolgt über die angebotenen Zahlungsmethoden (z.B. Kreditkarte, PayPal) vor 
              Bereitstellung des Lageplans. Der Lageplan wird unmittelbar nach Zahlungseingang zum Download 
              bereitgestellt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 5 Lieferung</h2>
            <p>
              (1) Die Lieferung erfolgt durch Bereitstellung der digitalen Dateien (PDF/DXF) zum Download.
            </p>
            <p>
              (2) Nach erfolgter Zahlung erhält der Kunde einen Download-Link per E-Mail. Der Download-Link 
              ist für einen Zeitraum von 30 Tagen gültig.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 6 Widerrufsrecht</h2>
            <p>
              (1) Verbraucher haben grundsätzlich ein 14-tägiges Widerrufsrecht.
            </p>
            <p>
              (2) Das Widerrufsrecht erlischt bei Verträgen zur Lieferung von nicht auf einem körperlichen 
              Datenträger befindlichen digitalen Inhalten, wenn der Anbieter mit der Ausführung des Vertrags 
              begonnen hat, nachdem der Verbraucher ausdrücklich zugestimmt hat, dass der Anbieter mit der 
              Ausführung des Vertrags vor Ablauf der Widerrufsfrist beginnt, und der Verbraucher seine Kenntnis 
              davon bestätigt hat, dass er durch seine Zustimmung mit Beginn der Ausführung des Vertrags sein 
              Widerrufsrecht verliert.
            </p>
            <p>
              (3) Der Kunde wird vor Abschluss der Bestellung auf den Verlust des Widerrufsrechts hingewiesen 
              und muss diesem ausdrücklich zustimmen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 7 Nutzungsrechte</h2>
            <p>
              (1) Mit vollständiger Zahlung erhält der Kunde ein einfaches, zeitlich unbeschränktes Nutzungsrecht 
              an dem erstellten Lageplan für private und gewerbliche Zwecke.
            </p>
            <p>
              (2) Eine Weitergabe oder der Weiterverkauf der erstellten Lagepläne an Dritte ist nur mit 
              ausdrücklicher schriftlicher Zustimmung des Anbieters gestattet.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 8 Haftung</h2>
            <p>
              (1) Der Anbieter haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie für Schäden 
              aus der Verletzung des Lebens, des Körpers oder der Gesundheit.
            </p>
            <p>
              (2) Bei leichter Fahrlässigkeit haftet der Anbieter nur bei Verletzung wesentlicher 
              Vertragspflichten (Kardinalpflichten). In diesem Fall ist die Haftung auf den vertragstypischen, 
              vorhersehbaren Schaden begrenzt.
            </p>
            <p>
              (3) Die Lagepläne basieren auf frei verfügbaren Geodaten. Der Anbieter übernimmt keine Gewähr 
              für die Vollständigkeit, Richtigkeit und Aktualität der Daten. Die Pläne ersetzen keine amtlichen 
              Vermessungsunterlagen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 9 Datenschutz</h2>
            <p>
              Informationen zur Verarbeitung personenbezogener Daten finden Sie in unserer Datenschutzerklärung 
              unter <a href="/datenschutz" className="text-primary hover:underline">www.lageplaner.de/datenschutz</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 10 Streitbeilegung</h2>
            <p>
              (1) Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
            <p>
              (2) Wir sind nicht bereit und nicht verpflichtet, an einem Streitbeilegungsverfahren vor einer 
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 11 Schlussbestimmungen</h2>
            <p>
              (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
            </p>
            <p>
              (2) Sofern der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches 
              Sondervermögen ist, ist Gerichtsstand für alle Streitigkeiten aus diesem Vertrag Hannover.
            </p>
            <p>
              (3) Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit 
              der übrigen Bestimmungen unberührt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Anbieter</h2>
            <p>
              Daniel Müller-Zitzke und Paul Müller-Zitzke GbR<br />
              Lehmbuschfeld 14<br />
              30539 Hannover<br /><br />
              E-Mail: info@lageplaner.de<br />
              Telefon: 015734748616<br />
              USt-IdNr.: DE454320505
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

export default AGB;
