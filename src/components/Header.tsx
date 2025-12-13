import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <MapPin className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-foreground">Lageplaner</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a 
            href="#about" 
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            About
          </a>
        </nav>

        {/* Login Button */}
        <Button 
          variant="default"
          className="glow-primary hover:glow-hover transition-all duration-300"
        >
          Anmelden
        </Button>
      </div>
    </header>
  );
};

export default Header;
