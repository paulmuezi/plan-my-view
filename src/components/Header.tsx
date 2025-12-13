import { Map } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border h-14">
      <div className="flex items-center justify-between h-full px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Map className="w-5 h-5 text-primary" />
          <span className="font-semibold text-foreground">Lageplaner</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <a 
            href="#about" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Über uns
          </a>
          <Button size="sm">
            Anmelden
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
