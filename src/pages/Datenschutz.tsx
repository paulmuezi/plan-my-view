import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const Datenschutz = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div className="min-h-screen bg-background flex flex-col">
      <Header variant="contained" />

      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 w-full">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
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
              werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
            </p>
            
            <h3 className="font-medium text-foreground mt-4 mb-1">Datenerfassung auf dieser Website</h3>
            <p><strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong></p>
            <p>
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
            </p>
            
            <p className="mt-2"><strong>Wie erfassen wir Ihre Daten?</strong></p>
            <p>
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Registrierungs- oder Bestellformular eingeben.
            </p>
            <p className="mt-2">
              Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie die Website betreten.
            </p>
            
            <p className="mt-2"><strong>Wofür nutzen wir Ihre Daten?</strong></p>
            <p>
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten (z. B. Login-Bereich, Warenkorb). Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
            </p>
            
            <p className="mt-2"><strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong></p>
            <p>
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">2. Hosting</h2>
            <p>Wir hosten die Inhalte unserer Website bei folgendem Anbieter:</p>
            
            <h3 className="font-medium text-foreground mt-4 mb-1">Hetzner</h3>
            <p>
              Anbieter ist die Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen (nachfolgend Hetzner).
            </p>
            <p className="mt-2">
              Wenn Sie unsere Website besuchen, erfasst Hetzner verschiedene Logfiles inklusive Ihrer IP-Adressen. Details entnehmen Sie der Datenschutzerklärung von Hetzner: <a href="https://www.hetzner.com/de/rechtliches/datenschutz" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.hetzner.com/de/rechtliches/datenschutz</a>.
            </p>
            <p className="mt-2">
              Die Verwendung von Hetzner erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer möglichst zuverlässigen Darstellung, Bereitstellung und Sicherheit unserer Website. Die Datenverarbeitung erfolgt auf Servern in Deutschland (Standort Falkenstein).
            </p>
            
            <h3 className="font-medium text-foreground mt-4 mb-1">Auftragsverarbeitung</h3>
            <p>
              Wir haben einen Vertrag über Auftragsverarbeitung (AVV) mit dem oben genannten Anbieter geschlossen. Hierbei handelt es sich um einen datenschutzrechtlich vorgeschriebenen Vertrag, der gewährleistet, dass dieser die personenbezogenen Daten unserer Websitebesucher nur nach unseren Weisungen und unter Einhaltung der DSGVO verarbeitet.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">3. Allgemeine Hinweise und Pflichtinformationen</h2>
            
            <h3 className="font-medium text-foreground mt-4 mb-1">Datenschutz</h3>
            <p>
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
            
            <h3 className="font-medium text-foreground mt-4 mb-1">Hinweis zur verantwortlichen Stelle</h3>
            <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
            <p className="mt-2">
              Daniel Müller-Zitzke und Paul Müller-Zitzke GbR<br />
              Lehmbuschfeld 14<br />
              30539 Hannover<br /><br />
              Telefon: 015734748616<br />
              E-Mail: info@lageplaner.de
            </p>
            <p className="mt-2">
              Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
            </p>
            
            <h3 className="font-medium text-foreground mt-4 mb-1">Speicherdauer</h3>
            <p>
              Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.
            </p>
            
            <h3 className="font-medium text-foreground mt-4 mb-1">SSL- bzw. TLS-Verschlüsselung</h3>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile. Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
            </p>
            
            <h3 className="font-medium text-foreground mt-4 mb-1">Ihre Rechte als Betroffener</h3>
            <p>Sie haben jederzeit das Recht auf:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Auskunft über Ihre bei uns gespeicherten Daten und deren Verarbeitung (Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger personenbezogener Daten (Art. 16 DSGVO)</li>
              <li>Löschung Ihrer bei uns gespeicherten Daten (Art. 17 DSGVO)</li>
              <li>Einschränkung der Datenverarbeitung (Art. 18 DSGVO)</li>
              <li>Widerspruch gegen die Verarbeitung Ihrer Daten (Art. 21 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
            </ul>
            <p className="mt-2">
              Sofern Sie uns eine Einwilligung erteilt haben, können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen. Beschwerden können Sie an die zuständige Aufsichtsbehörde richten.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. Datenerfassung auf dieser Website</h2>
            
            <h3 className="font-medium text-foreground mt-4 mb-1">Cookies und lokale Speicherung</h3>
            <p>
              Unsere Website verwendet sogenannte „Cookies" bzw. die „Local Storage"-Technik des Browsers. Dabei handelt es sich um kleine Textdateien, die auf Ihrem Endgerät abgelegt werden.
            </p>
            <p className="mt-2">
              Wir verwenden ausschließlich technisch notwendige Cookies/Speicherungen, die zwingend erforderlich sind, um den Login-Bereich, das Kundenkonto und den Warenkorb-Prozess bereitzustellen (sogenannte Session-Cookies).
            </p>
            <p className="mt-2">
              Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an der fehlerfreien und technisch optimierten Bereitstellung unserer Dienste (Login-Funktionalität). Da wir keine Tracking- oder Werbe-Cookies einsetzen, ist keine gesonderte Einwilligung (Cookie-Banner) erforderlich.
            </p>
            
            <h3 className="font-medium text-foreground mt-4 mb-1">Server-Log-Dateien</h3>
            <p>
              Der Provider der Seiten (Hetzner) erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Browsertyp und Browserversion</li>
              <li>Verwendetes Betriebssystem</li>
              <li>Referrer URL (die zuvor besuchte Seite)</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
            <p className="mt-2">
              Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Files erfasst werden.
            </p>
            
            <h3 className="font-medium text-foreground mt-4 mb-1">Registrierung auf dieser Website</h3>
            <p>
              Sie können sich auf unserer Website registrieren, um zusätzliche Funktionen (Bestellhistorie, Download-Bereich) zu nutzen. Die dazu eingegebenen Daten verwenden wir nur zum Zwecke der Nutzung des jeweiligen Angebotes oder Dienstes, für den Sie sich registriert haben. Die bei der Registrierung abgefragten Pflichtangaben müssen vollständig angegeben werden. Anderenfalls werden wir die Registrierung ablehnen.
            </p>
            <p className="mt-2">
              Für wichtige Änderungen etwa beim Angebotsumfang oder bei technisch notwendigen Änderungen nutzen wir die bei der Registrierung angegebene E-Mail-Adresse, um Sie auf diesem Wege zu informieren.
            </p>
            <p className="mt-2">
              Die Verarbeitung der bei der Registrierung eingegebenen Daten erfolgt zum Zwecke der Durchführung des durch die Registrierung begründeten Nutzungsverhältnisses und ggf. zur Anbahnung weiterer Verträge (Art. 6 Abs. 1 lit. b DSGVO).
            </p>
            <p className="mt-2">
              Die erfassten Daten werden gespeichert, solange Sie auf unserer Website registriert sind, und werden anschließend gelöscht. Gesetzliche Aufbewahrungsfristen bleiben unberührt.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">5. Zahlungsabwicklung und Bestellung</h2>
            
            <h3 className="font-medium text-foreground mt-4 mb-1">Verarbeitung von Kunden- und Vertragsdaten</h3>
            <p>
              Wir erheben, verarbeiten und nutzen personenbezogene Daten nur, soweit sie für die Begründung, inhaltliche Ausgestaltung oder Änderung des Rechtsverhältnisses erforderlich sind (Bestandsdaten). Dies erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, der die Verarbeitung von Daten zur Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen gestattet.
            </p>
            
            <h3 className="font-medium text-foreground mt-4 mb-1">Speicherdauer</h3>
            <p>
              Wir speichern Bestelldaten in unseren Systemen für 10 Jahre aus Gründen der ordnungsmäßigen Buchführung und steuerrechtlichen Anforderungen (§ 257 HGB, § 14 UStG). Download-Links sind 30 Tage ab Kaufdatum gültig.
            </p>
            
            <h3 className="font-medium text-foreground mt-4 mb-1">Zahlungsdienstleister Stripe</h3>
            <p>
              Wir wickeln Zahlungen über den Dienstleister Stripe ab. Anbieter für Kunden innerhalb der EU ist die Stripe Payments Europe, Ltd., 1 Grand Canal Street Lower, Grand Canal Dock, Dublin, Irland (nachfolgend „Stripe").
            </p>
            <p className="mt-2">
              Bei der Zahlung werden Ihre Zahlungsdaten (z. B. Name, Zahlungsbetrag, Kontoverbindung, Kreditkartennummer) an Stripe weitergeleitet.
            </p>
            <p className="mt-2">
              <strong>Datenübermittlung in die USA:</strong> Soweit Daten an die Muttergesellschaft Stripe, Inc. in die USA übermittelt werden, erfolgt dies auf Grundlage des EU-US Data Privacy Frameworks (DPF), für das Stripe zertifiziert ist, sowie auf Grundlage von Standardvertragsklauseln der EU-Kommission. Details finden Sie in der Datenschutzerklärung von Stripe: <a href="https://stripe.com/de/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://stripe.com/de/privacy</a>.
            </p>
            <p className="mt-2">
              Die Verarbeitung Ihrer Daten erfolgt zur Erfüllung des Vertrags (Art. 6 Abs. 1 lit. b DSGVO). Ohne die Übermittlung Ihrer Zahlungsdaten kann die Zahlung nicht durchgeführt werden.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">6. Drittanbieter und Kartenmaterial</h2>
            
            <h3 className="font-medium text-foreground mt-4 mb-1">OpenStreetMap</h3>
            <p>
              Wir nutzen den Kartendienst von OpenStreetMap (OSM), um Ihnen den Auswahlbereich für Ihre Liegenschaftskarte anzuzeigen. Anbieterin ist die OpenStreetMap Foundation (OSMF), 132 Maney Hill Road, Sutton Coldfield, West Midlands, B72 1JU, United Kingdom.
            </p>
            <p className="mt-2">
              Wenn Sie den Kartenbereich unserer Website nutzen, wird Ihre IP-Adresse und weitere technische Informationen an die OSMF weitergeleitet, um die Kartendarstellung zu ermöglichen.
            </p>
            <p className="mt-2">
              <strong>Rechtsgrundlage:</strong> Die Nutzung von OpenStreetMap erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote und einer leichten Auffindbarkeit der gewünschten Flurstücke. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar.
            </p>
            <p className="mt-2">
              Soweit Daten in das Vereinigte Königreich (UK) übertragen werden, gilt: Das Vereinigte Königreich gilt datenschutzrechtlich als sicherer Drittstaat (Angemessenheitsbeschluss der EU-Kommission).
            </p>
            <p className="mt-2">
              Weitere Informationen zur Behandlung von Nutzerdaten finden Sie in der Datenschutzerklärung von OpenStreetMap: <a href="https://wiki.osmfoundation.org/wiki/Privacy_Policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://wiki.osmfoundation.org/wiki/Privacy_Policy</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">7. Spezielle Hinweise zum Produkt</h2>
            
            <h3 className="font-medium text-foreground mt-4 mb-1">Hinweise zu ALKIS-Daten</h3>
            <p>
              Die von uns bereitgestellten Lagepläne basieren auf öffentlichen Geodaten (ALKIS) der jeweiligen Bundesländer. Diese Daten sind keine personenbezogenen Daten des Nutzers, sondern öffentliche Sachdaten. Die Nutzung und Weiterverarbeitung durch uns erfolgt gemäß den jeweiligen Lizenzbestimmungen der Länder (z. B. Datenlizenz Deutschland 2.0, Creative Commons).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">8. Widerspruchsrecht (Art. 21 DSGVO)</h2>
            
            <h3 className="font-medium text-foreground mt-4 mb-1">Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)</h3>
            <p>
              Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, haben Sie jederzeit das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, gegen die Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen gestütztes Profiling. Die jeweilige Rechtsgrundlage, auf denen eine Verarbeitung beruht, entnehmen Sie dieser Datenschutzerklärung.
            </p>
            <p className="mt-2">
              Wenn Sie Widerspruch einlegen, werden wir Ihre betroffenen personenbezogenen Daten nicht mehr verarbeiten, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen (Widerspruch nach Art. 21 Abs. 1 DSGVO).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">9. Änderung dieser Datenschutzerklärung</h2>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
            </p>
          </section>

          <p className="text-sm text-muted-foreground pt-6 border-t border-border">
            Stand: Januar 2026
          </p>
        </div>
      </main>

      <Footer />
    </div>;
};
export default Datenschutz;