import Header from "@/components/Header";
import MapView from "@/components/MapView";
import SettingsPanel from "@/components/SettingsPanel";

const Index = () => {
  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 flex pt-14">
        <MapView />
        <SettingsPanel />
      </main>
    </div>
  );
};

export default Index;
