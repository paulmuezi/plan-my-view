import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type PaperFormat = "A4" | "A3";
type Orientation = "Quer" | "Hoch";
type Scale = "1:500" | "1:1000" | "1:2000";

const SettingsPanel = () => {
  const navigate = useNavigate();
  const [paperFormat, setPaperFormat] = useState<PaperFormat>("A4");
  const [orientation, setOrientation] = useState<Orientation>("Quer");
  const [scale, setScale] = useState<Scale>("1:1000");
  const [pdfSelected, setPdfSelected] = useState(true);
  const [dxfSelected, setDxfSelected] = useState(false);

  const basePrice = paperFormat === "A4" ? 10 : 15;
  const dxfPrice = dxfSelected ? 5 : 0;
  const totalPrice = basePrice + dxfPrice;

  const handleGeneratePreview = () => {
    navigate("/checkout", {
      state: {
        paperFormat,
        orientation,
        scale,
        pdfSelected,
        dxfSelected,
        totalPrice
      }
    });
  };

  const canGenerate = pdfSelected || dxfSelected;

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
            {(["A4", "A3"] as PaperFormat[]).map((format) => (
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
            {(["1:500", "1:1000", "1:2000"] as Scale[]).map((s) => (
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

        {/* File Format */}
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">Dateiformat</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="pdf" 
                checked={pdfSelected} 
                onCheckedChange={(checked) => setPdfSelected(checked as boolean)}
              />
              <label htmlFor="pdf" className="text-sm cursor-pointer">PDF</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="dxf" 
                checked={dxfSelected} 
                onCheckedChange={(checked) => setDxfSelected(checked as boolean)}
              />
              <label htmlFor="dxf" className="text-sm cursor-pointer">DXF (+5€)</label>
            </div>
          </div>
        </div>

        {/* Price Display */}
        <div className="pt-2 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Preis:</span>
            <span className="text-lg font-semibold text-primary">{totalPrice}€</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {paperFormat}: {basePrice}€{dxfSelected ? ` + DXF: 5€` : ""}
          </p>
        </div>
      </div>

      <div className="p-3 border-t border-border">
        <Button 
          onClick={handleGeneratePreview} 
          className="w-full" 
          size="sm"
          disabled={!canGenerate}
        >
          Vorschau generieren
        </Button>
      </div>
    </div>
  );
};

export default SettingsPanel;
