import { createContext, useContext, useState, ReactNode } from "react";

type PaperFormat = "A4" | "A3" | "A2";
type Orientation = "Quer" | "Hoch";
type Scale = "1:500" | "1:1000" | "1:2000";

interface MapPosition {
  lat: number;
  lng: number;
}

interface MapContextType {
  pinPosition: MapPosition | null;
  setPinPosition: (pos: MapPosition | null) => void;
  address: string;
  setAddress: (addr: string) => void;
  paperFormat: PaperFormat;
  setPaperFormat: (format: PaperFormat) => void;
  orientation: Orientation;
  setOrientation: (ori: Orientation) => void;
  scale: Scale;
  setScale: (scale: Scale) => void;
  dxfSelected: boolean;
  setDxfSelected: (selected: boolean) => void;
  pdfSelected: boolean;
  setPdfSelected: (selected: boolean) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [pinPosition, setPinPosition] = useState<MapPosition | null>(null);
  const [address, setAddress] = useState("");
  const [paperFormat, setPaperFormat] = useState<PaperFormat>("A4");
  const [orientation, setOrientation] = useState<Orientation>("Quer");
  const [scale, setScale] = useState<Scale>("1:1000");
  const [dxfSelected, setDxfSelected] = useState(false);
  const [pdfSelected, setPdfSelected] = useState(true);

  return (
    <MapContext.Provider value={{
      pinPosition,
      setPinPosition,
      address,
      setAddress,
      paperFormat,
      setPaperFormat,
      orientation,
      setOrientation,
      scale,
      setScale,
      dxfSelected,
      setDxfSelected,
      pdfSelected,
      setPdfSelected
    }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapSettings = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapSettings must be used within MapProvider");
  }
  return context;
};
