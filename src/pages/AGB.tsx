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
              schriftlich zugestimmt hat. Etwaige vor Vertragsschluss getroffene besondere Vereinbarungen und 
              Nebenabreden werden nur Vertragsinhalt, wenn der Anbieter diese ausdrücklich schriftlich bestätigt.
            </p>
            <p>
              (3) Verbraucher im Sinne dieser AGB ist jede natürliche Person, die ein Rechtsgeschäft zu Zwecken 
              abschließt, die überwiegend weder ihrer gewerblichen noch ihrer selbständigen beruflichen Tätigkeit 
              zugerechnet werden können. Unternehmer ist jede natürliche oder juristische Person, die bei Abschluss 
              eines Rechtsgeschäfts in Ausübung ihrer gewerblichen oder selbständigen beruflichen Tätigkeit handelt.
            </p>
            <p>
              (4) Der Anbieter behält sich vor, diese Allgemeinen Geschäftsbedingungen mit Wirkung für die Zukunft 
              zu ändern. Eine rückwirkende Änderung erfolgt nur zur Erfüllung einer gesetzlich oder behördlich 
              angeordneten Verpflichtung oder wenn dies für den Kunden vorteilhaft ist. Bei wesentlichen Änderungen 
              wird der Kunde per E-Mail informiert.
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
            <p>
              (3) Gegenstand der Leistungserbringung sind geografische Informationsdienstleistungen. Sie beinhalten 
              in keinem Fall irgendwelche Rechte an Software, Lizenzrechte oder sonstige Immaterialgüterrechte, 
              soweit nicht ausdrücklich anders vereinbart.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 3 Vertragsschluss und Registrierung</h2>
            <p>
              (1) Die Darstellung der Produkte auf der Website stellt kein rechtlich bindendes Angebot, 
              sondern eine Aufforderung zur Bestellung dar.
            </p>
            <p>
              (2) Der Kunde gibt durch Klicken des Buttons "Kostenpflichtig bestellen" ein verbindliches 
              Kaufangebot ab. Der Vertrag kommt mit Übermittlung der Auftragsbestätigung per E-Mail oder 
              mit Bereitstellung der Dateien zum Download zustande.
            </p>
            <p>
              (3) Um bestimmte Leistungen nutzen zu können, kann sich der Kunde registrieren. Der Kunde 
              verpflichtet sich zur wahrheitsgemäßen und vollständigen Angabe der bei der Registrierung 
              abgefragten Daten und ist verpflichtet, Änderungen der angegebenen Daten unverzüglich mitzuteilen.
            </p>
            <p>
              (4) Das automatisierte Registrieren von Benutzerkonten ist nicht gestattet.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 4 Preise und Zahlung</h2>
            <p>
              (1) Die auf der Website angegebenen Preise sind Endpreise und enthalten die gesetzliche 
              Umsatzsteuer. Es fallen keine zusätzlichen Versandkosten an, da es sich um digitale Produkte handelt.
            </p>
            <p>
              (2) Die Zahlung erfolgt über die angebotenen Zahlungsmethoden (z.B. Kreditkarte) vor 
              Bereitstellung des Lageplans. Der Lageplan wird unmittelbar nach Zahlungseingang zum Download 
              bereitgestellt.
            </p>
            <p>
              (3) Die vom Anbieter gestellten Rechnungen sind, sofern keine Zahlungsfrist vermerkt ist und 
              nichts anderes vereinbart wurde, sofort fällig. Im Verzugsfall ist der Anbieter berechtigt, 
              Verzugszinsen gemäß den gesetzlichen Vorschriften zu verlangen.
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
            <p>
              (3) Der Anbieter behält sich das Recht vor, die Dienste aus technischen Gründen vorübergehend 
              auszusetzen. Die Dienste unterliegen laufenden Änderungen und Anpassungen.
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
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 7 Nutzungsrechte und Urheberrecht</h2>
            <p>
              (1) Mit vollständiger Zahlung erhält der Kunde ein einfaches, zeitlich unbeschränktes Nutzungsrecht 
              an dem erstellten Lageplan für private und gewerbliche Zwecke.
            </p>
            <p>
              (2) Der Anbieter behält sich bezüglich der Website, Software und deren Inhalten sämtliche Urheber- 
              und sonstigen Schutzrechte vor. Es ist untersagt, die Webseiten des Anbieters oder deren Inhalte 
              ganz oder teilweise mittels technischer Hilfsmittel darzustellen (z.B. "Framing").
            </p>
            <p>
              (3) Nutzungsrechte werden dem Kunden nur in dem Ausmaß eingeräumt, als dies zur Erfüllung des 
              Vertragszweckes zwingend notwendig ist. Im Zweifel werden nur Nutzungsrechte und keine Urheber- 
              und Eigentumsrechte übertragen.
            </p>
            <p>
              (4) Eine Weitergabe oder der Weiterverkauf der erstellten Lagepläne an Dritte ist nur mit 
              ausdrücklicher schriftlicher Zustimmung des Anbieters gestattet. Der Kunde ist ohne vorherige 
              schriftliche Genehmigung durch den Anbieter nicht berechtigt, die erbrachten Dienstleistungen 
              an Dritte weiterzuverkaufen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 8 Sorgfaltspflichten des Kunden</h2>
            <p>
              (1) Alle vom Anbieter bereitgestellten Informationen und Daten sind vertraulich zu behandeln.
            </p>
            <p>
              (2) Der Kunde verpflichtet sich, sein Benutzerkonto und insbesondere seine Zugangsdaten (Passwort) 
              nicht anderen Personen zur Verfügung zu stellen, sie zu schützen und vor Zugriffen Dritter sicher 
              aufzubewahren.
            </p>
            <p>
              (3) Der Kunde verpflichtet sich, seine Kontaktinformationen und sonstigen Angaben bei der 
              Registrierung wahrheitsgetreu auszufüllen und seinen Zugang nicht missbräuchlich oder übermäßig 
              zu nutzen.
            </p>
            <p>
              (4) Der Kunde hat jegliche Handlungen zu unterlassen, die gesetzlich verboten sind oder die einen 
              negativen Einfluss auf den Anbieter haben können. Dies umfasst insbesondere: Hacking-Versuche, 
              Spam, übermäßiges automatisiertes Herunterladen oder sonstige missbräuchliche Nutzung der Dienste.
            </p>
            <p>
              (5) Der Kunde ist für jeden Schaden verantwortlich, der aus einer Nichtbeachtung seiner 
              Sorgfaltspflichten oder einem Verstoß gegen Urheberrechte entsteht.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 9 Haftung und Gewährleistung</h2>
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
              (3) Der Anbieter ist bemüht, den eigenen Datenbestand zu pflegen. Der Kunde nimmt zur Kenntnis, 
              dass Daten und Informationen bis zu einem gewissen Maß trotzdem Fehler enthalten können. Der 
              Anbieter schließt jegliche Garantie und Gewährleistung, insbesondere für Vollständigkeit, 
              Aktualität, Richtigkeit, Verwertbarkeit oder Eignung der Daten zu einem bestimmten Zweck, aus, 
              soweit gesetzlich zulässig.
            </p>
            <p>
              (4) Die Lagepläne basieren auf frei verfügbaren Geodaten (OpenStreetMap). Der Anbieter übernimmt 
              keine Gewähr für die Vollständigkeit, Richtigkeit und Aktualität dieser Daten. Die Pläne ersetzen 
              keine amtlichen Vermessungsunterlagen.
            </p>
            <p>
              (5) Soweit gesetzlich zulässig, ist die Haftung des Anbieters in jedem Fall auf denjenigen Betrag 
              beschränkt, welcher dem Kunden für das entsprechende Produkt in Rechnung gestellt wurde. In keinem 
              Fall haftet der Anbieter für Folgeschäden oder entgangenen Gewinn.
            </p>
            <p>
              (6) Der Anbieter haftet nicht für schadhafte Technik, Betriebsunterbrechungen, die durch Störungen 
              aller Art entstehen oder die der Störungsbehebung, der Wartung und der Einführung neuer 
              Technologien dienen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 10 Datenschutz</h2>
            <p>
              Informationen zur Verarbeitung personenbezogener Daten finden Sie in unserer Datenschutzerklärung 
              unter <a href="/datenschutz" className="text-primary hover:underline">www.lageplaner.de/datenschutz</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 11 Streitbeilegung</h2>
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
            <h2 className="text-xl font-semibold text-foreground mb-3">§ 12 Schlussbestimmungen</h2>
            <p>
              (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
            </p>
            <p>
              (2) Sofern der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches 
              Sondervermögen ist, ist Gerichtsstand für alle Streitigkeiten aus diesem Vertrag Hannover.
            </p>
            <p>
              (3) Änderungen oder Ergänzungen des Vertrags einschließlich dieser Klausel bedürfen zu ihrer 
              Wirksamkeit der Schriftform. Die Schriftform wird auch gewahrt durch die Übersendung per E-Mail.
            </p>
            <p>
              (4) Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit 
              der übrigen Bestimmungen unberührt. An die Stelle der unwirksamen Bestimmung soll eine wirksame 
              und durchführbare Regelung treten, deren Wirkungen der wirtschaftlichen Zielsetzung am nächsten 
              kommen.
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
