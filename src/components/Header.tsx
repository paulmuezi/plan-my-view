import { Map, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border h-14">
      <div className="flex items-center justify-between h-full px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Map className="w-5 h-5 text-primary" />
          <span className="font-semibold text-foreground">Lageplaner</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {user.name || user.email}
              </span>
              <Button size="sm" variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Abmelden
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button size="sm">Anmelden</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
