import { Map, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  variant?: "default" | "contained";
  showLoginButton?: boolean;
  rightContent?: React.ReactNode;
}

const Header = ({ variant = "default", showLoginButton = true, rightContent }: HeaderProps) => {
  const { user } = useAuth();

  const containerClass = variant === "contained" 
    ? "max-w-6xl mx-auto px-4 h-14 flex items-center justify-between"
    : "flex items-center justify-between h-full px-4";

  return (
    <header className={`border-b border-border bg-card/80 backdrop-blur-sm ${variant === "default" ? "fixed top-0 left-0 right-0 z-50 h-14" : "sticky top-0 z-50"}`}>
      <div className={containerClass}>
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Map className="w-5 h-5 text-primary" />
          <span className="font-semibold text-foreground">Lageplaner</span>
        </Link>

        <nav className="flex items-center gap-2">
          {rightContent}
          {user ? (
            <Link to="/profile" className="flex items-center gap-2">
              <span className="text-[11px] text-muted-foreground hidden sm:inline">{user.name || user.email}</span>
              <Button size="icon" variant="ghost" className="h-8 w-8">
                <User className="w-4 h-4" />
              </Button>
            </Link>
          ) : showLoginButton ? (
            <Link to="/login">
              <Button size="sm" variant="outline">Anmelden</Button>
            </Link>
          ) : null}
        </nav>
      </div>
    </header>
  );
};

export default Header;
