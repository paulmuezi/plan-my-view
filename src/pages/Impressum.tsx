import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Impressum = () => {
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

        <h1 className="text-3xl font-bold text-foreground mb-8">Impressum</h1>
        
        <div className="prose prose-sm text-muted-foreground space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Angaben gemäß § 5 DDG</h2>
            <p>
              Daniel Müller-Zitzke und Paul Müller-Zitzke GbR<br />
              Lehmbuschfeld 14<br />
              30539 Hannover
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Vertreten durch</h2>
            <p>
              Daniel Müller-Zitzke<br />
              Paul Müller-Zitzke
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Kontakt</h2>
            <p>
              Telefon: 015734748616<br />
              E-Mail: info@lageplaner.de
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              DE454320505
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Redaktionell verantwortlich</h2>
            <p>
              Daniel Müller-Zitzke<br />
              Lehmbuschfeld 14<br />
              30539 Hannover
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">EU-Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                https://ec.europa.eu/consumers/odr/
              </a>.
            </p>
            <p className="mt-2">
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Haftung für Inhalte und Links</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. 
              Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen. 
              Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
            </p>
            <p className="mt-2">
              Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. 
              Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Impressum;
