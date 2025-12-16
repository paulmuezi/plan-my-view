import { useState } from "react";
import { Link } from "react-router-dom";
import { Map, PanelRightClose, PanelRight, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import MapView from "@/components/MapView";
import SettingsPanel from "@/components/SettingsPanel";

const Editor = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header matching Home page style */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Map className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">Lageplaner</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="h-8 w-8"
              title={sidebarOpen ? "Seitenleiste ausblenden" : "Seitenleiste einblenden"}
            >
              {sidebarOpen ? (
                <PanelRightClose className="w-4 h-4" />
              ) : (
                <PanelRight className="w-4 h-4" />
              )}
            </Button>
            {user ? (
              <>
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {user.name || user.email}
                </span>
                <Button size="sm" variant="outline" onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Abmelden
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button size="sm" variant="outline">Anmelden</Button>
              </Link>
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex overflow-hidden">
        <MapView />
        {sidebarOpen && <SettingsPanel />}
      </main>
    </div>
  );
};

export default Editor;
