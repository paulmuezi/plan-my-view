import { useState, useEffect } from "react";
import { Search, Plus, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Germany center (excluding Bavaria - shifted slightly northwest)
const GERMANY_CENTER: [number, number] = [51.5, 9.5];
const DEFAULT_ZOOM = 6;

// Bounds for Germany excluding Bavaria (approximate)
const GERMANY_BOUNDS: [[number, number], [number, number]] = [
  [47.3, 5.9],   // Southwest
  [55.1, 15.0],  // Northeast
];

const MapController = ({ zoom }: { zoom: number }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setZoom(zoom);
  }, [zoom, map]);

  return null;
};

const MapView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 1, 18));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 1, 4));

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    // Simple geocoding using Nominatim (OpenStreetMap)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&countrycodes=de&limit=1`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        // Check if location is in Bavaria (roughly)
        const latNum = parseFloat(lat);
        const lonNum = parseFloat(lon);
        
        // Bavaria approximate bounds
        const isInBavaria = latNum >= 47.2 && latNum <= 50.6 && lonNum >= 8.9 && lonNum <= 13.9;
        
        if (isInBavaria) {
          alert("Diese Region (Bayern) ist leider nicht verfügbar.");
          return;
        }
        
        // Pan to location
        const mapElement = document.querySelector('.leaflet-container') as any;
        if (mapElement && mapElement._leaflet_map) {
          mapElement._leaflet_map.setView([latNum, lonNum], 14);
        }
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div className="relative flex-1 h-full overflow-hidden bg-muted">
      <MapContainer
        center={GERMANY_CENTER}
        zoom={DEFAULT_ZOOM}
        maxBounds={GERMANY_BOUNDS}
        maxBoundsViscosity={1.0}
        minZoom={4}
        maxZoom={18}
        className="absolute inset-0 w-full h-full z-0"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController zoom={zoom} />
      </MapContainer>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="absolute top-3 left-3 w-64 z-[1000]">
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
      <div className="absolute bottom-3 left-3 flex flex-col shadow-sm rounded overflow-hidden z-[1000]">
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
      <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-card shadow-sm rounded px-2 py-1 z-[1000]">
        <div className="w-12 h-0.5 bg-foreground" />
        <span className="text-xs text-muted-foreground">100m</span>
      </div>

      {/* Bavaria restriction notice */}
      <div className="absolute top-3 right-3 bg-card/90 shadow-sm rounded px-2 py-1 z-[1000]">
        <span className="text-xs text-muted-foreground">🇩🇪 Deutschland (ohne Bayern)</span>
      </div>
    </div>
  );
};

export default MapView;
