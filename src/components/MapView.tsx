import { useState, useRef } from "react";
import { Search, Plus, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";

// Germany center (excluding Bavaria - shifted slightly northwest)
const GERMANY_CENTER = { lat: 51.5, lng: 9.5 };
const DEFAULT_ZOOM = 6;

const MapView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [center, setCenter] = useState(GERMANY_CENTER);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 1, 18));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 1, 4));

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&countrycodes=de&limit=1`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        const latNum = parseFloat(lat);
        const lonNum = parseFloat(lon);
        
        // Bavaria approximate bounds
        const isInBavaria = latNum >= 47.2 && latNum <= 50.6 && lonNum >= 8.9 && lonNum <= 13.9;
        
        if (isInBavaria) {
          alert("Diese Region (Bayern) ist leider nicht verfügbar.");
          return;
        }
        
        setCenter({ lat: latNum, lng: lonNum });
        setZoom(14);
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  // Build OpenStreetMap embed URL
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${center.lng - 0.5 / zoom},${center.lat - 0.3 / zoom},${center.lng + 0.5 / zoom},${center.lat + 0.3 / zoom}&layer=mapnik&marker=${center.lat},${center.lng}`;

  return (
    <div className="relative flex-1 h-full overflow-hidden bg-muted">
      {/* OpenStreetMap iframe */}
      <iframe
        ref={iframeRef}
        src={mapUrl}
        className="absolute inset-0 w-full h-full border-0"
        style={{ filter: "saturate(0.9)" }}
        title="Karte"
      />

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="absolute top-3 left-3 w-64 z-10">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Adresse suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-8 text-sm bg-card shadow-sm"
          />
        </div>
      </form>

      {/* Zoom Controls */}
      <div className="absolute bottom-3 left-3 flex flex-col shadow-sm rounded overflow-hidden z-10">
        <button
          type="button"
          onClick={handleZoomIn}
          className="w-7 h-7 bg-card border-b border-border flex items-center justify-center hover:bg-muted transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          className="w-7 h-7 bg-card flex items-center justify-center hover:bg-muted transition-colors"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Scale indicator */}
      <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-card shadow-sm rounded px-2 py-1 z-10">
        <div className="w-12 h-0.5 bg-foreground" />
        <span className="text-xs text-muted-foreground">100m</span>
      </div>

      {/* Bavaria restriction notice */}
      <div className="absolute top-3 right-3 bg-card/90 shadow-sm rounded px-2 py-1 z-10">
        <span className="text-xs text-muted-foreground">🇩🇪 Deutschland (ohne Bayern)</span>
      </div>
    </div>
  );
};

export default MapView;
