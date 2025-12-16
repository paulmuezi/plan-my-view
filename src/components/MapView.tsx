import { useState, useRef, useEffect } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

// Germany center
const GERMANY_CENTER = { lat: 51.1657, lng: 10.4515 };
const DEFAULT_ZOOM = 6;

interface SearchSuggestion {
  display_name: string;
  lat: string;
  lon: string;
}

const MapView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [center, setCenter] = useState(GERMANY_CENTER);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch suggestions as user types
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
    setZoom(17);
    setSearchQuery(suggestion.display_name.split(",")[0]);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        
        {/* Suggestions Dropdown */}
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

      {/* Scale indicator */}
      <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-card shadow-sm rounded px-2 py-1 z-10">
        <div className="w-12 h-0.5 bg-foreground" />
        <span className="text-xs text-muted-foreground">100m</span>
      </div>
    </div>
  );
};

export default MapView;
