import Header from "@/components/Header";
import MapView from "@/components/MapView";
import SettingsPanel from "@/components/SettingsPanel";

const Editor = () => {
  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 flex overflow-hidden pt-14">
        <MapView />
        <SettingsPanel />
      </main>
    </div>
  );
};

export default Editor;
