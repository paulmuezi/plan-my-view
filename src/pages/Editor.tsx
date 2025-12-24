import Header from "@/components/Header";
import MapView from "@/components/MapView";
import SettingsPanel from "@/components/SettingsPanel";
import PreviewPanel from "@/components/PreviewPanel";

const Editor = () => {
  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 flex overflow-hidden pt-14">
        <div className="relative flex-1">
          <MapView />
          <PreviewPanel />
        </div>
        <SettingsPanel />
      </main>
    </div>
  );
};

export default Editor;
