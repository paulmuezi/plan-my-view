import { useState, useRef, useEffect, useCallback } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMapSettings } from "@/contexts/MapContext";

const GERMANY_CENTER = { lat: 51.1657, lng: 10.4515 };
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

const MapView = () => {
  const { pinPosition, setPinPosition, setAddress, paperFormat, orientation, scale } = useMapSettings();
  const [searchQuery, setSearchQuery] = useState("");
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [center, setCenter] = useState(GERMANY_CENTER);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
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
    const latNum = parseFloat(suggestion.lat);
    const lonNum = parseFloat(suggestion.lon);
    
    setCenter({ lat: latNum, lng: lonNum });
    setPinPosition({ lat: latNum, lng: lonNum });
    setAddress(suggestion.display_name);
    setZoom(17);
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

  // Build OpenStreetMap embed URL with marker
  const mapUrl = pinPosition 
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${pinPosition.lng - 0.003},${pinPosition.lat - 0.002},${pinPosition.lng + 0.003},${pinPosition.lat + 0.002}&layer=mapnik&marker=${pinPosition.lat},${pinPosition.lng}`
    : `https://www.openstreetmap.org/export/embed.html?bbox=${center.lng - 0.5 / zoom},${center.lat - 0.3 / zoom},${center.lng + 0.5 / zoom},${center.lat + 0.3 / zoom}&layer=mapnik`;

  // Calculate bbox display size
  const getBboxInfo = useCallback(() => {
    const dims = PAPER_DIMENSIONS[paperFormat];
    const scaleNum = parseInt(scale.split(":")[1]);
    
    let widthMm = orientation === "Quer" ? dims.width : dims.height;
    let heightMm = orientation === "Quer" ? dims.height : dims.width;
    
    const widthMeters = (widthMm / 1000) * scaleNum;
    const heightMeters = (heightMm / 1000) * scaleNum;
    
    return { widthMeters, heightMeters };
  }, [paperFormat, orientation, scale]);

  const bboxInfo = getBboxInfo();

  return (
    <div className="relative flex-1 h-full overflow-hidden bg-muted">
      {/* OpenStreetMap iframe */}
      <iframe
        src={mapUrl}
        className="absolute inset-0 w-full h-full border-0"
        style={{ filter: "saturate(0.9)" }}
        title="Karte"
      />

      {/* Search Bar with Autocomplete */}
      <div ref={searchRef} className="absolute top-3 left-3 w-80 z-10">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Adresse suchen..."
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
        <div className="absolute bottom-3 left-3 bg-card/95 shadow-sm rounded px-3 py-2 z-10">
          <span className="text-xs text-muted-foreground">Suchen Sie nach einer Adresse, um einen Pin zu setzen</span>
        </div>
      )}

      {/* Bbox info */}
      {pinPosition && (
        <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-card shadow-sm rounded px-2 py-1 z-10">
          <div className="w-3 h-3 border-2 border-primary bg-primary/10 rounded-sm" />
          <span className="text-xs text-muted-foreground">
            {paperFormat} {orientation} · {scale} ({bboxInfo.widthMeters}m × {bboxInfo.heightMeters}m)
          </span>
        </div>
      )}
    </div>
  );
};

export default MapView;
