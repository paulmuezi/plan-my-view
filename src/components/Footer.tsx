import { Link } from "react-router-dom";
import { Map } from "lucide-react";

const Footer = () => {
  return (
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
            <Link to="/quelldaten" className="hover:text-foreground transition-colors">Quelldaten</Link>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 Lageplaner
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
