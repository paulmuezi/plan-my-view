import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

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
    <div className="panel rounded-lg w-72 flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-sm font-semibold text-foreground">Einstellungen</h2>
      </div>
      
      <div className="p-4 space-y-5 flex-1">
        {/* Paper Format */}
        <div>
          <Label className="text-xs text-muted-foreground uppercase tracking-wide mb-2 block">
            Papierformat
          </Label>
          <div className="flex gap-2">
            {(["A3", "A4"] as PaperFormat[]).map((format) => (
              <button
                key={format}
                onClick={() => setPaperFormat(format)}
                className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-all duration-150 ${
                  paperFormat === format
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {format}
              </button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Orientation */}
        <div>
          <Label className="text-xs text-muted-foreground uppercase tracking-wide mb-2 block">
            Ausrichtung
          </Label>
          <div className="flex gap-2">
            {(["Quer", "Hoch"] as Orientation[]).map((orient) => (
              <button
                key={orient}
                onClick={() => setOrientation(orient)}
                className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-all duration-150 ${
                  orientation === orient
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {orient}
              </button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Scale */}
        <div>
          <Label className="text-xs text-muted-foreground uppercase tracking-wide mb-2 block">
            Maßstab
          </Label>
          <div className="flex gap-2">
            {(["1:1000", "1:2000"] as Scale[]).map((s) => (
              <button
                key={s}
                onClick={() => setScale(s)}
                className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-all duration-150 ${
                  scale === s
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Preview Button */}
      <div className="p-4 border-t border-border">
        <Button 
          onClick={handleGeneratePreview}
          className="w-full"
        >
          Vorschau generieren
        </Button>
      </div>
    </div>
  );
};

export default SettingsPanel;
