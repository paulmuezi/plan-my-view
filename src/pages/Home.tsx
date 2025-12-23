import { Link } from "react-router-dom";
import { Map, Search, Settings, Download, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header variant="contained" />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-6">
              <CheckCircle className="w-4 h-4" />
              Aktuelle Katasterdaten bundesweit
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              Lageplan erstellen
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Erstellen Sie professionelle Auszüge aus dem Liegenschaftskataster – 
              schnell, einfach und rechtssicher.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to={user ? "/editor" : "/login"}>
                <Button size="lg" className="px-10 py-7 text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 group">
                  Jetzt Lageplan erstellen
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <span className="text-sm text-muted-foreground">Kostenlose Vorschau</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="wie-es-funktioniert" className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              So einfach funktioniert's
            </h2>
            <p className="text-muted-foreground">In drei Schritten zum fertigen Lageplan</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-6">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-card border border-border rounded-xl p-6 h-full hover:border-primary/50 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-lg">Adresse suchen</h3>
                <p className="text-muted-foreground text-sm">
                  Geben Sie die gewünschte Adresse ein und wählen Sie das passende Grundstück aus.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-card border border-border rounded-xl p-6 h-full hover:border-primary/50 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-primary" />
                </div>
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-lg">Format konfigurieren</h3>
                <p className="text-muted-foreground text-sm">
                  Wählen Sie Papierformat, Ausrichtung und Maßstab nach Ihren Anforderungen.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-card border border-border rounded-xl p-6 h-full hover:border-primary/50 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Download className="w-6 h-6 text-primary" />
                </div>
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-lg">Herunterladen</h3>
                <p className="text-muted-foreground text-sm">
                  Laden Sie Ihren Lageplan als PDF oder DXF herunter – sofort verfügbar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="preise" className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Transparente Preise
            </h2>
            <p className="text-muted-foreground">Keine versteckten Kosten, keine Abonnements</p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="bg-card border-2 border-primary rounded-2xl p-8 relative overflow-hidden">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">Lageplan</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-foreground">ab 10€</span>
                  <span className="text-muted-foreground ml-1">pro Plan</span>
                </div>
                <ul className="text-left space-y-3 mb-6">
                  <li className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">Amtliche Katasterdaten</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">PDF & DXF Format</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">Sofort verfügbar</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">Bundesweit (außer Bayern)</span>
                  </li>
                </ul>
                <Link to={user ? "/editor" : "/login"} className="block">
                  <Button className="w-full py-6 text-base font-semibold">
                    Lageplan erstellen
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Map className="w-4 h-4 text-primary" />
              <span className="font-medium text-foreground text-sm">Lageplaner</span>
            </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/impressum" className="hover:text-foreground transition-colors">Impressum</Link>
              <Link to="/datenschutz" className="hover:text-foreground transition-colors">Datenschutz</Link>
              <Link to="/agb" className="hover:text-foreground transition-colors">AGB</Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Lageplaner
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
