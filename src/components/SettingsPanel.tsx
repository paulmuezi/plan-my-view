import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    navigate("/login");
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
          <Select value={paperFormat} onValueChange={(value) => setPaperFormat(value as PaperFormat)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A4">A4 (10€)</SelectItem>
              <SelectItem value="A3">A3 (15€)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Orientation */}
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">Ausrichtung</Label>
          <Select value={orientation} onValueChange={(value) => setOrientation(value as Orientation)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Quer">Querformat</SelectItem>
              <SelectItem value="Hoch">Hochformat</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Scale */}
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">Maßstab</Label>
          <Select value={scale} onValueChange={(value) => setScale(value as Scale)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1:500">1:500</SelectItem>
              <SelectItem value="1:1000">1:1000</SelectItem>
              <SelectItem value="1:2000">1:2000</SelectItem>
            </SelectContent>
          </Select>
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
          Lageplan erstellen
        </Button>
      </div>
    </div>
  );
};

export default SettingsPanel;
