import { Link } from "react-router-dom";
import { Map, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Map className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">Lageplaner</span>
          </div>
          <nav className="flex items-center gap-4">
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Über uns
            </a>
            <Button size="sm">Anmelden</Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-foreground mb-3">
            Amtliche Lagepläne erstellen
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Erstellen Sie professionelle Lagepläne für Bauanträge, Genehmigungen und offizielle Dokumente.
          </p>
        </div>

        <div className="flex justify-center mb-16">
          <Link to="/editor">
            <Button size="lg" className="px-8">
              Lageplan erstellen
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-md p-5">
            <Map className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-medium text-foreground mb-1">Katasterdaten</h3>
            <p className="text-sm text-muted-foreground">
              Zugriff auf aktuelle Kataster- und Flurstückdaten.
            </p>
          </div>
          <div className="bg-card border border-border rounded-md p-5">
            <FileText className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-medium text-foreground mb-1">Verschiedene Formate</h3>
            <p className="text-sm text-muted-foreground">
              Export in A3 oder A4, Hoch- oder Querformat.
            </p>
          </div>
          <div className="bg-card border border-border rounded-md p-5">
            <Download className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-medium text-foreground mb-1">PDF-Export</h3>
            <p className="text-sm text-muted-foreground">
              Maßstabsgetreue Lagepläne als PDF herunterladen.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="max-w-5xl mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          © 2024 Lageplaner. Alle Rechte vorbehalten.
        </div>
      </footer>
    </div>
  );
};

export default Home;
