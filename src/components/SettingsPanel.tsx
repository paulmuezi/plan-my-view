import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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
    <div className="w-64 bg-card border-l border-border flex flex-col">
      <div className="p-3 border-b border-border">
        <h2 className="text-sm font-semibold">Einstellungen</h2>
      </div>
      
      <div className="p-3 space-y-4 flex-1">
        {/* Paper Format */}
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">Papierformat</Label>
          <div className="flex gap-1">
            {(["A3", "A4"] as PaperFormat[]).map((format) => (
              <button
                key={format}
                onClick={() => setPaperFormat(format)}
                className={`flex-1 py-1.5 px-2 rounded text-sm transition-colors ${
                  paperFormat === format
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {format}
              </button>
            ))}
          </div>
        </div>

        {/* Orientation */}
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">Ausrichtung</Label>
          <div className="flex gap-1">
            {(["Quer", "Hoch"] as Orientation[]).map((orient) => (
              <button
                key={orient}
                onClick={() => setOrientation(orient)}
                className={`flex-1 py-1.5 px-2 rounded text-sm transition-colors ${
                  orientation === orient
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {orient}
              </button>
            ))}
          </div>
        </div>

        {/* Scale */}
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">Maßstab</Label>
          <div className="flex gap-1">
            {(["1:1000", "1:2000"] as Scale[]).map((s) => (
              <button
                key={s}
                onClick={() => setScale(s)}
                className={`flex-1 py-1.5 px-2 rounded text-sm transition-colors ${
                  scale === s
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-3 border-t border-border">
        <Button onClick={handleGeneratePreview} className="w-full" size="sm">
          Vorschau generieren
        </Button>
      </div>
    </div>
  );
};

export default SettingsPanel;
