import { Map } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Map className="w-5 h-5 text-primary" />
          </div>
          <span className="text-lg font-semibold text-foreground tracking-tight">Lageplaner</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a 
            href="#about" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Über uns
          </a>
        </nav>

        {/* Login Button */}
        <Button variant="outline" size="sm">
          Anmelden
        </Button>
      </div>
    </header>
  );
};

export default Header;
