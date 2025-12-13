import Header from "@/components/Header";
import MapView from "@/components/MapView";
import SettingsPanel from "@/components/SettingsPanel";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main Content */}
      <main className="pt-20 h-screen flex">
        <div className="flex-1 p-4 flex gap-4">
          {/* Map Area */}
          <MapView />
          
          {/* Settings Panel */}
          <SettingsPanel />
        </div>
      </main>
    </div>
  );
};

export default Index;
