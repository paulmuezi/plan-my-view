import { useState } from "react";
import Header from "@/components/Header";
import MapView from "@/components/MapView";
import SettingsPanel from "@/components/SettingsPanel";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Editor = () => {
  const isMobile = useIsMobile();
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 flex overflow-hidden pt-14">
        <MapView />
        
        {isMobile ? (
          <>
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button 
                  size="icon" 
                  className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg"
                >
                  <Settings className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0">
                <SettingsPanel onClose={() => setSheetOpen(false)} />
              </SheetContent>
            </Sheet>
          </>
        ) : (
          <SettingsPanel />
        )}
      </main>
    </div>
  );
};

export default Editor;
