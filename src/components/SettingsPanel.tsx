import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileText, RotateCcw, ZoomIn } from "lucide-react";

type PaperFormat = "A3" | "A4";
type Orientation = "Quer" | "Hoch";
type Scale = "1:1000" | "1:2000";

const SettingsPanel = () => {
  const [paperFormat, setPaperFormat] = useState<PaperFormat>("A4");
  const [orientation, setOrientation] = useState<Orientation>("Quer");
  const [scale, setScale] = useState<Scale>("1:1000");

  const handleGeneratePreview = () => {
    console.log("Generating preview with settings:", { paperFormat, orientation, scale });
  };

  return (
    <div className="glass rounded-xl p-6 w-80 animate-slide-in">
      <h2 className="text-lg font-semibold text-foreground mb-6">Einstellungen</h2>
      
      {/* Paper Format */}
      <div className="mb-6">
        <Label className="flex items-center gap-2 text-muted-foreground mb-3">
          <FileText className="w-4 h-4" />
          Papierformat
        </Label>
        <div className="flex gap-2">
          {(["A3", "A4"] as PaperFormat[]).map((format) => (
            <button
              key={format}
              onClick={() => setPaperFormat(format)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                paperFormat === format
                  ? "bg-primary text-primary-foreground glow-primary"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {format}
            </button>
          ))}
        </div>
      </div>

      {/* Orientation */}
      <div className="mb-6">
        <Label className="flex items-center gap-2 text-muted-foreground mb-3">
          <RotateCcw className="w-4 h-4" />
          Ausrichtung
        </Label>
        <div className="flex gap-2">
          {(["Quer", "Hoch"] as Orientation[]).map((orient) => (
            <button
              key={orient}
              onClick={() => setOrientation(orient)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                orientation === orient
                  ? "bg-primary text-primary-foreground glow-primary"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {orient}
            </button>
          ))}
        </div>
      </div>

      {/* Scale */}
      <div className="mb-8">
        <Label className="flex items-center gap-2 text-muted-foreground mb-3">
          <ZoomIn className="w-4 h-4" />
          Maßstab
        </Label>
        <div className="flex gap-2">
          {(["1:1000", "1:2000"] as Scale[]).map((s) => (
            <button
              key={s}
              onClick={() => setScale(s)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                scale === s
                  ? "bg-primary text-primary-foreground glow-primary"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Preview Button */}
      <Button 
        onClick={handleGeneratePreview}
        className="w-full py-6 text-base font-semibold glow-primary hover:glow-hover transition-all duration-300 animate-pulse-glow"
      >
        Vorschau generieren
      </Button>
    </div>
  );
};

export default SettingsPanel;
