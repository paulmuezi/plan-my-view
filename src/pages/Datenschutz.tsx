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
            <h2 className="text-lg font-semibold text-foreground mb-2">3. Ihre Betroffenenrechte</h2>
            <p>Sie haben jederzeit das Recht auf:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Auskunft</strong> über Ihre bei uns gespeicherten Daten und deren Verarbeitung (Art. 15 DSGVO)</li>
              <li><strong>Berichtigung</strong> unrichtiger personenbezogener Daten (Art. 16 DSGVO)</li>
              <li><strong>Löschung</strong> Ihrer bei uns gespeicherten Daten (Art. 17 DSGVO)</li>
              <li><strong>Einschränkung</strong> der Datenverarbeitung, sofern wir Ihre Daten aufgrund gesetzlicher Pflichten noch nicht löschen dürfen (Art. 18 DSGVO)</li>
              <li><strong>Widerspruch</strong> gegen die Verarbeitung Ihrer Daten bei uns (Art. 21 DSGVO)</li>
              <li><strong>Datenübertragbarkeit</strong>, sofern Sie in die Datenverarbeitung eingewilligt haben oder einen Vertrag mit uns abgeschlossen haben (Art. 20 DSGVO)</li>
            </ul>
            <p className="mt-2">
              Sofern Sie uns eine Einwilligung erteilt haben, können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen. 
              Sie können sich jederzeit mit einer Beschwerde an eine Aufsichtsbehörde wenden, z.B. an die zuständige Aufsichtsbehörde 
              Ihres Wohnsitzes oder an die für uns als verantwortliche Stelle zuständige Behörde.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. Datenerfassung auf dieser Website</h2>
            <h3 className="font-medium text-foreground mt-4 mb-1">Wie erfassen wir Ihre Daten?</h3>
            <p>
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen, z.B. bei der Registrierung 
              oder bei einer Bestellung. Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. 
              Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
            </p>
            
            <h3 className="font-medium text-foreground mt-4 mb-1">Wofür nutzen wir Ihre Daten?</h3>
            <p>
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. 
              Bei Bestellungen werden Ihre Daten zur Vertragsabwicklung und Bereitstellung der bestellten Lagepläne verwendet.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">5. Registrierung auf unserer Website</h2>
            <h3 className="font-medium text-foreground mt-4 mb-1">Art und Zweck der Verarbeitung</h3>
            <p>
              Für die Registrierung auf unserer Website benötigen wir einige personenbezogene Daten, die über eine 
              Eingabemaske an uns übermittelt werden (z.B. E-Mail-Adresse, Passwort). Zum Zeitpunkt der Registrierung 
              werden zusätzlich folgende Daten erhoben: IP-Adresse, Datum und Uhrzeit der Registrierung.
            </p>
            <p className="mt-2">
              Ihre Registrierung ist für das Bereithalten bestimmter Inhalte und Leistungen auf unserer Website erforderlich.
            </p>
            
            <h3 className="font-medium text-foreground mt-4 mb-1">Rechtsgrundlage</h3>
            <p>
              Die Verarbeitung der bei der Registrierung eingegebenen Daten erfolgt auf Grundlage einer Einwilligung 
              des Nutzers (Art. 6 Abs. 1 lit. a DSGVO) sowie zur Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO).
            </p>
            
            <h3 className="font-medium text-foreground mt-4 mb-1">Speicherdauer</h3>
            <p>
              Daten werden solange gespeichert, wie das entsprechende Benutzerkonto besteht. Nach Löschung des Kontos 
              werden die Daten gelöscht, sofern keine gesetzlichen Aufbewahrungsfristen entgegenstehen.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">6. Erbringung kostenpflichtiger Leistungen</h2>
            <h3 className="font-medium text-foreground mt-4 mb-1">Art und Zweck der Verarbeitung</h3>
            <p>
              Zur Vertragsabwicklung im Rahmen unserer kostenpflichtigen Leistungen werden von uns zusätzliche Daten 
              erfragt, wie z.B. Rechnungsadresse und Zahlungsangaben.
            </p>
            
            <h3 className="font-medium text-foreground mt-4 mb-1">Rechtsgrundlage</h3>
            <p>
              Die Verarbeitung der Daten, die für den Abschluss des Vertrages erforderlich ist, basiert auf 
              Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
            </p>
            
            <h3 className="font-medium text-foreground mt-4 mb-1">Speicherdauer</h3>
            <p>
              Wir speichern diese Daten in unseren Systemen für 10 Jahre aus Gründen der ordnungsmäßigen Buchführung 
              und steuerrechtlichen Anforderungen (§ 257 HGB, § 14 UStG).
            </p>
            
            <h3 className="font-medium text-foreground mt-4 mb-1">Download-Links</h3>
            <p>
              Download-Links sind 30 Tage ab Kaufdatum gültig. Nach Ablauf dieser Frist werden die Download-Dateien 
              automatisch aus dem System gelöscht.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">7. Zahlungsabwicklung und Drittlandtransfer</h2>
            <p>
              Bei kostenpflichtigen Bestellungen werden Ihre Zahlungsdaten an unseren Zahlungsdienstleister Stripe übermittelt:
            </p>
            <p className="mt-2">
              <strong>Zahlungsanbieter:</strong><br />
              Stripe, Inc.<br />
              510 Townsend Street, San Francisco, CA 94103, USA<br />
              Datenschutzerklärung: <a href="https://stripe.com/de/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://stripe.com/de/privacy</a>
            </p>
            <p className="mt-2">
              <strong>Drittlandtransfer:</strong> Bei der Nutzung von Stripe werden Daten in die Vereinigten Staaten 
              von Amerika übertragen. Stripe ist nach dem EU-US Data Privacy Framework zertifiziert und verwendet 
              zusätzlich Standard-Vertragsklauseln als Datenschutzgarantie.
            </p>
            <p className="mt-2">
              <strong>Datenverarbeitung:</strong> Die Datenverarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO 
              (Vertragserfüllung). Ihre Zahlungsdaten werden ausschließlich zur Abwicklung der Zahlung verwendet und 
              nach Abschluss der Transaktion nicht bei uns gespeichert.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">8. Server-Log-Dateien</h2>
            <p>
              Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, 
              die Ihr Browser automatisch an uns übermittelt. Dies sind: Browsertyp und Browserversion, verwendetes 
              Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse.
            </p>
            <p className="mt-2">
              Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Grundlage für die Datenverarbeitung ist 
              Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der sicheren Bereitstellung der Website).
            </p>
            <p className="mt-2">
              <strong>Speicherdauer:</strong> Die Daten werden nach spätestens 14 Tagen gelöscht, sofern keine 
              sicherheitsrelevanten Ereignisse eine längere Speicherung erfordern.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">9. SSL-/TLS-Verschlüsselung</h2>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine 
              SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des 
              Browsers von "http://" auf "https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">10. Widerspruchsrecht (Art. 21 DSGVO)</h2>
            <p>
              <strong>Einzelfallbezogenes Widerspruchsrecht:</strong> Sie haben das Recht, aus Gründen, die sich aus 
              Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung Sie betreffender personenbezogener 
              Daten, die aufgrund Art. 6 Abs. 1 lit. f DSGVO (Datenverarbeitung auf der Grundlage einer Interessenabwägung) 
              erfolgt, Widerspruch einzulegen.
            </p>
            <p className="mt-2">
              Legen Sie Widerspruch ein, werden wir Ihre personenbezogenen Daten nicht mehr verarbeiten, es sei denn, 
              wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte 
              und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung 
              von Rechtsansprüchen.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">11. ALKIS-Daten und Datenlizenz</h2>
            <p>
              Die Lagepläne werden erstellt auf Basis von ALKIS-Daten (Amtliches Liegenschaftskatasterinformationssystem) 
              der Bundesländer gemäß Datenlizenz Deutschland 2.0. Diese Daten sind Open-Data-Geodaten und unterliegen 
              den Lizenzbedingungen der Datenlizenz Deutschland 2.0. Diese Daten werden von den Bundesländern und 
              Katasterämtern bereitgestellt.
            </p>
            <p className="mt-2">
              Weitere Informationen: <a href="https://www.geokommunikation.de" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.geokommunikation.de</a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">12. Änderung dieser Datenschutzerklärung</h2>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen 
              Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen. 
              Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">13. Kontakt</h2>
            <p>
              Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden:<br /><br />
              Daniel Müller-Zitzke und Paul Müller-Zitzke GbR<br />
              Lehmbuschfeld 14<br />
              30539 Hannover<br /><br />
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
