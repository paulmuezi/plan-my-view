import { useState, useRef, useEffect, useCallback } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMapSettings } from "@/contexts/MapContext";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon
const defaultIcon = L.icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const GERMANY_CENTER: L.LatLngExpression = [51.1657, 10.4515];
const DEFAULT_ZOOM = 6;

interface SearchSuggestion {
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    road?: string;
    house_number?: string;
    postcode?: string;
    state?: string;
    city?: string;
    town?: string;
    village?: string;
  };
}

// Paper dimensions in mm
const PAPER_DIMENSIONS = {
  A4: { width: 297, height: 210 },
  A3: { width: 420, height: 297 },
  A2: { width: 594, height: 420 },
};

// Format German address
const formatGermanAddress = (address: SearchSuggestion["address"]): string => {
  if (!address) return "";
  
  const street = address.road || "";
  const number = address.house_number || "";
  const postcode = address.postcode || "";
  const city = address.city || address.town || address.village || "";
  const state = address.state || "";
  
  const streetLine = number ? `${street} ${number}` : street;
  const cityLine = postcode ? `${postcode} ${city}` : city;
  
  return [streetLine, cityLine, state].filter(Boolean).join(", ");
};

const MapView = () => {
  const { pinPosition, setPinPosition, setAddress, paperFormat, orientation, scale } = useMapSettings();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const rectangleRef = useRef<L.Rectangle | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate bbox bounds
  const calculateBboxBounds = useCallback((lat: number, lng: number): L.LatLngBoundsExpression => {
    const dims = PAPER_DIMENSIONS[paperFormat];
    const scaleNum = parseInt(scale.split(":")[1]);
    
    let widthMm = orientation === "Quer" ? dims.width : dims.height;
    let heightMm = orientation === "Quer" ? dims.height : dims.width;
    
    const widthMeters = (widthMm / 1000) * scaleNum;
    const heightMeters = (heightMm / 1000) * scaleNum;
    
    const latDelta = heightMeters / 111320;
    const lngDelta = widthMeters / (111320 * Math.cos(lat * Math.PI / 180));
    
    return [
      [lat - latDelta / 2, lng - lngDelta / 2],
      [lat + latDelta / 2, lng + lngDelta / 2],
    ];
  }, [paperFormat, orientation, scale]);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: GERMANY_CENTER,
      zoom: DEFAULT_ZOOM,
      zoomControl: false, // We'll add custom position
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Add zoom control to bottom left
    L.control.zoom({ position: "bottomleft" }).addTo(map);

    // Handle map clicks
    map.on("click", async (e) => {
      const { lat, lng } = e.latlng;
      setPinPosition({ lat, lng });
      
      // Reverse geocode
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
        );
        const data = await response.json();
        if (data.address) {
          const formattedAddress = formatGermanAddress(data.address);
          setAddress(formattedAddress || data.display_name);
        }
      } catch (error) {
        console.error("Reverse geocoding error:", error);
      }
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [setPinPosition, setAddress]);

  // Update marker and rectangle when pin position changes
  useEffect(() => {
    if (!mapRef.current) return;

    // Update marker
    if (pinPosition) {
      if (markerRef.current) {
        markerRef.current.setLatLng([pinPosition.lat, pinPosition.lng]);
      } else {
        markerRef.current = L.marker([pinPosition.lat, pinPosition.lng], { icon: defaultIcon })
          .addTo(mapRef.current);
      }
    } else if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }
  }, [pinPosition]);

  // Update rectangle when pin position or settings change
  useEffect(() => {
    if (!mapRef.current) return;

    if (rectangleRef.current) {
      rectangleRef.current.remove();
      rectangleRef.current = null;
    }

    if (pinPosition) {
      const bounds = calculateBboxBounds(pinPosition.lat, pinPosition.lng);
      rectangleRef.current = L.rectangle(bounds, {
        color: "hsl(24, 100%, 50%)",
        weight: 2,
        fillColor: "hsl(24, 100%, 50%)",
        fillOpacity: 0.1,
      }).addTo(mapRef.current);
    }
  }, [pinPosition, calculateBboxBounds]);

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
    const formattedAddress = formatGermanAddress(suggestion.address);
    setAddress(formattedAddress || suggestion.display_name);
    
    if (mapRef.current) {
      mapRef.current.setView([lat, lng], 17);
    }
    
    setSearchQuery(suggestion.address?.road 
      ? `${suggestion.address.road}${suggestion.address.house_number ? ` ${suggestion.address.house_number}` : ""}`
      : suggestion.display_name.split(",")[0]
    );
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

  // Get bbox info for display
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
      {/* Leaflet Map */}
      <div 
        ref={mapContainerRef} 
        className="absolute inset-0 w-full h-full"
        style={{ filter: "saturate(0.9)" }}
      />

      {/* Search Bar with Autocomplete */}
      <div ref={searchRef} className="absolute top-3 left-3 w-80 z-[1000]">
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
                <span className="line-clamp-2">
                  {formatGermanAddress(suggestion.address) || suggestion.display_name}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bbox info */}
      {pinPosition && (
        <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-card shadow-sm rounded px-2 py-1 z-[1000]">
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
