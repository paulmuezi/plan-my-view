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
import { useAuth } from "@/contexts/AuthContext";

type PaperFormat = "A4" | "A3" | "A2";
type Orientation = "Quer" | "Hoch";
type Scale = "1:500" | "1:1000" | "1:2000";

const getBasePrice = (format: PaperFormat) => {
  switch (format) {
    case "A4": return 10;
    case "A3": return 15;
    case "A2": return 20;
  }
};

const SettingsPanel = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [paperFormat, setPaperFormat] = useState<PaperFormat>("A4");
  const [orientation, setOrientation] = useState<Orientation>("Quer");
  const [scale, setScale] = useState<Scale>("1:1000");
  const [pdfSelected, setPdfSelected] = useState(true);
  const [dxfSelected, setDxfSelected] = useState(false);

  const basePrice = getBasePrice(paperFormat);
  // PDF + DXF together costs +10€ extra
  const totalPrice = (pdfSelected && dxfSelected) ? basePrice + 10 : basePrice;

  const handleGeneratePreview = () => {
    if (!user) {
      navigate("/login");
      return;
    }
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
          <Select value={paperFormat} onValueChange={(value) => setPaperFormat(value as PaperFormat)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A4">A4</SelectItem>
              <SelectItem value="A3">A3</SelectItem>
              <SelectItem value="A2">A2</SelectItem>
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
              <label htmlFor="dxf" className="text-sm cursor-pointer">DXF</label>
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
            {paperFormat}: {basePrice}€{(pdfSelected && dxfSelected) ? ` + DXF: 10€` : ""}
          </p>
        </div>
      </div>

      <div className="p-3 border-t border-border">
        <Button 
          onClick={handleGeneratePreview} 
          className="w-full py-6 text-base font-semibold" 
          disabled={!canGenerate}
        >
          Vorschau anzeigen
        </Button>
      </div>
    </div>
  );
};

export default SettingsPanel;
