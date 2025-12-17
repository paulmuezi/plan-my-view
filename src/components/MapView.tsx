import { useState, useRef, useEffect, useCallback } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MapContainer, TileLayer, Marker, Rectangle, useMapEvents, useMap as useLeafletMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMap } from "@/contexts/MapContext";

// Fix default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const GERMANY_CENTER: [number, number] = [51.1657, 10.4515];
const DEFAULT_ZOOM = 6;

interface SearchSuggestion {
  display_name: string;
  lat: string;
  lon: string;
}

// Paper dimensions in mm
const PAPER_DIMENSIONS = {
  A4: { width: 297, height: 210 },
  A3: { width: 420, height: 297 },
  A2: { width: 594, height: 420 },
};

// Calculate bbox in meters based on paper format, orientation and scale
const calculateBboxMeters = (
  format: "A4" | "A3" | "A2",
  orientation: "Quer" | "Hoch",
  scale: "1:500" | "1:1000" | "1:2000"
) => {
  const dims = PAPER_DIMENSIONS[format];
  const scaleNum = parseInt(scale.split(":")[1]);
  
  // Paper size in mm, convert to meters at given scale
  let widthMm = orientation === "Quer" ? dims.width : dims.height;
  let heightMm = orientation === "Quer" ? dims.height : dims.width;
  
  // mm on paper * scale = real world meters
  const widthMeters = (widthMm / 1000) * scaleNum;
  const heightMeters = (heightMm / 1000) * scaleNum;
  
  return { width: widthMeters, height: heightMeters };
};

// Convert meters to lat/lng degrees (approximate)
const metersToLatLng = (lat: number, widthMeters: number, heightMeters: number) => {
  const latDelta = heightMeters / 111320; // ~111km per degree latitude
  const lngDelta = widthMeters / (111320 * Math.cos(lat * Math.PI / 180));
  return { latDelta, lngDelta };
};

// Component to handle map clicks
const MapClickHandler = () => {
  const { setPinPosition, setAddress } = useMap();

  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setPinPosition({ lat, lng });
      
      // Reverse geocode to get address
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
        );
        const data = await response.json();
        if (data.display_name) {
          setAddress(data.display_name);
        }
      } catch (error) {
        console.error("Reverse geocoding error:", error);
      }
    },
  });

  return null;
};

// Component to pan to pin position
const MapPanner = ({ position }: { position: [number, number] | null }) => {
  const map = useLeafletMap();
  
  useEffect(() => {
    if (position) {
      map.setView(position, 17);
    }
  }, [map, position]);
  
  return null;
};

const MapView = () => {
  const { pinPosition, setPinPosition, setAddress, paperFormat, orientation, scale } = useMap();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [flyToPosition, setFlyToPosition] = useState<[number, number] | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const fetchSuggestions = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=de&limit=5&addressdetails=1`
      );
      const data = await response.json();
      setSuggestions(data);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  };

  const handleSelectSuggestion = (suggestion: SearchSuggestion) => {
    const lat = parseFloat(suggestion.lat);
    const lng = parseFloat(suggestion.lon);
    
    setPinPosition({ lat, lng });
    setAddress(suggestion.display_name);
    setFlyToPosition([lat, lng]);
    setSearchQuery(suggestion.display_name.split(",")[0]);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Calculate bbox bounds for rectangle
  const getBboxBounds = useCallback((): L.LatLngBoundsExpression | null => {
    if (!pinPosition) return null;
    
    const { width, height } = calculateBboxMeters(paperFormat, orientation, scale);
    const { latDelta, lngDelta } = metersToLatLng(pinPosition.lat, width, height);
    
    return [
      [pinPosition.lat - latDelta / 2, pinPosition.lng - lngDelta / 2],
      [pinPosition.lat + latDelta / 2, pinPosition.lng + lngDelta / 2],
    ];
  }, [pinPosition, paperFormat, orientation, scale]);

  const bboxBounds = getBboxBounds();

  return (
    <div className="relative flex-1 h-full overflow-hidden bg-muted">
      <MapContainer
        center={GERMANY_CENTER}
        zoom={DEFAULT_ZOOM}
        className="absolute inset-0 w-full h-full"
        style={{ filter: "saturate(0.9)" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler />
        <MapPanner position={flyToPosition} />
        
        {pinPosition && (
          <Marker position={[pinPosition.lat, pinPosition.lng]} />
        )}
        
        {bboxBounds && (
          <Rectangle
            bounds={bboxBounds}
            pathOptions={{
              color: "hsl(24, 100%, 50%)",
              weight: 2,
              fillColor: "hsl(24, 100%, 50%)",
              fillOpacity: 0.1,
            }}
          />
        )}
      </MapContainer>

      {/* Search Bar with Autocomplete */}
      <div ref={searchRef} className="absolute top-3 left-3 w-80 z-[1000]">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Adresse suchen oder Karte klicken..."
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            className="pl-8 h-9 text-sm bg-card shadow-md border-border"
          />
        </div>
        
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-lg overflow-hidden">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSelectSuggestion(suggestion)}
                className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors flex items-start gap-2"
              >
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="line-clamp-2">{suggestion.display_name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info text */}
      {!pinPosition && (
        <div className="absolute bottom-3 left-3 bg-card/95 shadow-sm rounded px-3 py-2 z-[1000]">
          <span className="text-xs text-muted-foreground">Klicken Sie auf die Karte, um einen Pin zu setzen</span>
        </div>
      )}

      {/* Bbox info */}
      {pinPosition && (
        <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-card shadow-sm rounded px-2 py-1 z-[1000]">
          <div className="w-3 h-3 border-2 border-primary bg-primary/10 rounded-sm" />
          <span className="text-xs text-muted-foreground">{paperFormat} {orientation} · {scale}</span>
        </div>
      )}
    </div>
  );
};

export default MapView;
