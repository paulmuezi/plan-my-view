import { useState, useRef, useEffect, useCallback } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMapSettings } from "@/contexts/MapContext";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Germany bounds for restricting the map view
const GERMANY_BOUNDS: L.LatLngBoundsExpression = [
  [47.27, 5.87], // Southwest
  [55.1, 15.04], // Northeast
];

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

// All German states for loading boundaries
const GERMAN_STATES = [
  "Baden-Württemberg", "Bayern", "Berlin", "Brandenburg", "Bremen",
  "Hamburg", "Hessen", "Mecklenburg-Vorpommern", "Niedersachsen",
  "Nordrhein-Westfalen", "Rheinland-Pfalz", "Saarland", "Sachsen",
  "Sachsen-Anhalt", "Schleswig-Holstein", "Thüringen"
];

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

// Helper function to check if point is inside polygon using ray casting
const isPointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
  const [x, y] = point;
  let inside = false;
  
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    
    if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
      inside = !inside;
    }
  }
  
  return inside;
};

// Check if point is in GeoJSON geometry
const isPointInGeoJSON = (lat: number, lng: number, geoJson: any): boolean => {
  if (!geoJson) return false;
  
  const geometry = geoJson.geometry || geoJson;
  if (!geometry || !geometry.coordinates) return false;
  
  const point: [number, number] = [lng, lat]; // GeoJSON uses [lng, lat]
  
  if (geometry.type === "Polygon") {
    return isPointInPolygon(point, geometry.coordinates[0]);
  } else if (geometry.type === "MultiPolygon") {
    return geometry.coordinates.some((polygon: number[][][]) => 
      isPointInPolygon(point, polygon[0])
    );
  }
  
  return false;
};

// Create SVG pattern for hatching effect
const createHatchPattern = () => {
  const svgNS = "http://www.w3.org/2000/svg";
  
  // Check if pattern already exists
  if (document.getElementById("hatch-pattern-defs")) return;
  
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("id", "hatch-pattern-defs");
  svg.setAttribute("width", "0");
  svg.setAttribute("height", "0");
  svg.style.position = "absolute";
  
  const defs = document.createElementNS(svgNS, "defs");
  
  const pattern = document.createElementNS(svgNS, "pattern");
  pattern.setAttribute("id", "hatch");
  pattern.setAttribute("patternUnits", "userSpaceOnUse");
  pattern.setAttribute("width", "8");
  pattern.setAttribute("height", "8");
  pattern.setAttribute("patternTransform", "rotate(45)");
  
  const rect = document.createElementNS(svgNS, "rect");
  rect.setAttribute("width", "8");
  rect.setAttribute("height", "8");
  rect.setAttribute("fill", "#e2e8f0");
  
  const line = document.createElementNS(svgNS, "line");
  line.setAttribute("x1", "0");
  line.setAttribute("y1", "0");
  line.setAttribute("x2", "0");
  line.setAttribute("y2", "8");
  line.setAttribute("stroke", "#94a3b8");
  line.setAttribute("stroke-width", "3");
  
  pattern.appendChild(rect);
  pattern.appendChild(line);
  defs.appendChild(pattern);
  svg.appendChild(defs);
  document.body.appendChild(svg);
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
  const germanyGeoJsonRef = useRef<any>(null);
  const bavariaGeoJsonRef = useRef<any>(null);

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

  // Check if click is in allowed area (Germany but not Bavaria)
  const isClickAllowed = useCallback((lat: number, lng: number): boolean => {
    const inGermany = germanyGeoJsonRef.current && isPointInGeoJSON(lat, lng, germanyGeoJsonRef.current);
    const inBavaria = bavariaGeoJsonRef.current && isPointInGeoJSON(lat, lng, bavariaGeoJsonRef.current);
    
    return inGermany && !inBavaria;
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Create hatch pattern for Bavaria
    createHatchPattern();

    // Use stored pin position as center if available
    const initialCenter: L.LatLngExpression = pinPosition 
      ? [pinPosition.lat, pinPosition.lng] 
      : GERMANY_CENTER;
    const initialZoom = pinPosition ? 17 : DEFAULT_ZOOM;

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      zoomControl: false,
      maxBounds: GERMANY_BOUNDS,
      maxBoundsViscosity: 1.0,
      minZoom: 6,
    });

    mapRef.current = map;

    // German OSM tiles with German labels and warmer colors
    L.tileLayer("https://tile.openstreetmap.de/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    // Create panes for proper layering
    map.createPane("maskPane");
    map.getPane("maskPane")!.style.zIndex = "400";
    
    map.createPane("borderPane");
    map.getPane("borderPane")!.style.zIndex = "410";
    
    map.createPane("statesPane");
    map.getPane("statesPane")!.style.zIndex = "415";
    
    map.createPane("bavariaPane");
    map.getPane("bavariaPane")!.style.zIndex = "420";

    // Helper: Create mask from GeoJSON (world with hole)
    const createMaskFromGeoJSON = (geoJson: any) => {
      const worldCoords: L.LatLngExpression[] = [
        [-90, -180],
        [-90, 180],
        [90, 180],
        [90, -180],
      ];
      
      const holes: L.LatLngExpression[][] = [];
      const geometry = geoJson.geometry || geoJson;
      
      if (geometry.type === "Polygon") {
        holes.push(
          geometry.coordinates[0].map((coord: number[]) => [coord[1], coord[0]] as L.LatLngExpression)
        );
      } else if (geometry.type === "MultiPolygon") {
        geometry.coordinates.forEach((polygon: number[][][]) => {
          holes.push(
            polygon[0].map((coord: number[]) => [coord[1], coord[0]] as L.LatLngExpression)
          );
        });
      }
      
      return [worldCoords, ...holes];
    };

    // Load Germany boundary from OSM Nominatim
    const loadGermanyFromOSM = async () => {
      try {
        const response = await fetch(
          "https://nominatim.openstreetmap.org/search?q=Deutschland&format=geojson&polygon_geojson=1&limit=1&accept-language=de",
          { headers: { "User-Agent": "MapEditor/1.0", "Accept-Language": "de" } }
        );
        
        if (!response.ok) throw new Error("Nominatim request failed");
        
        const data = await response.json();
        
        if (data.features && data.features.length > 0) {
          const germany = data.features[0];
          germanyGeoJsonRef.current = germany;
          
          // Create mask (world with Germany hole)
          const maskCoords = createMaskFromGeoJSON(germany);
          L.polygon(maskCoords, {
            fillColor: "#fafaf9",
            fillOpacity: 1,
            stroke: false,
            pane: "maskPane",
            interactive: false,
          }).addTo(map);
          
          // Main Germany border (no shadow)
          L.geoJSON(germany, {
            style: {
              fillColor: "transparent",
              fillOpacity: 0,
              color: "#78716c",
              weight: 2,
            },
            pane: "borderPane",
            interactive: false,
          }).addTo(map);
          
          console.log("Germany loaded from OSM Nominatim");
        }
      } catch (error) {
        console.error("OSM Nominatim failed for Germany:", error);
      }
    };

    // Load all Bundesländer boundaries from OSM Nominatim (exact OSM data)
    const loadAllStatesFromOSM = async () => {
      const stateNames = [
        "Baden-Württemberg", "Bayern", "Berlin", "Brandenburg", "Bremen",
        "Hamburg", "Hessen", "Mecklenburg-Vorpommern", "Niedersachsen",
        "Nordrhein-Westfalen", "Rheinland-Pfalz", "Saarland", "Sachsen",
        "Sachsen-Anhalt", "Schleswig-Holstein", "Thüringen"
      ];
      
      for (const stateName of stateNames) {
        try {
          // Add small delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 100));
          
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(stateName)},Deutschland&format=geojson&polygon_geojson=1&limit=1&accept-language=de`,
            { headers: { "User-Agent": "MapEditor/1.0", "Accept-Language": "de" } }
          );
          
          if (!response.ok) continue;
          
          const data = await response.json();
          
          if (data.features && data.features.length > 0) {
            const state = data.features[0];
            const isBavaria = stateName === "Bayern";
            
            if (isBavaria) {
              // Store Bavaria for click detection
              bavariaGeoJsonRef.current = state;
              
              // Bavaria with hatching pattern - base layer
              L.geoJSON(state, {
                style: {
                  fillColor: "#e7e5e4",
                  fillOpacity: 0.85,
                  color: "#78716c",
                  weight: 2,
                },
                pane: "bavariaPane",
                interactive: false,
              }).addTo(map);
              
              // Add dashed overlay for hatching effect
              L.geoJSON(state, {
                style: {
                  fillColor: "transparent",
                  fillOpacity: 0,
                  color: "#57534e",
                  weight: 2,
                  dashArray: "6, 4",
                },
                pane: "bavariaPane",
                interactive: false,
              }).addTo(map);
              
            } else {
              // Other states: subtle border only
              L.geoJSON(state, {
                style: {
                  fillColor: "transparent",
                  fillOpacity: 0,
                  color: "#a8a29e",
                  weight: 1,
                },
                pane: "statesPane",
                interactive: false,
              }).addTo(map);
            }
          }
        } catch (error) {
          console.error(`Failed to load ${stateName}:`, error);
        }
      }
      
      console.log("All German states loaded from OSM");
    };

    // Load boundaries
    loadGermanyFromOSM();
    loadAllStatesFromOSM();

    // Add zoom control to bottom left
    L.control.zoom({ position: "bottomleft" }).addTo(map);

    // Handle map clicks
    map.on("click", async (e) => {
      const { lat, lng } = e.latlng;
      
      // Check if click is in allowed area
      if (!isClickAllowed(lat, lng)) {
        return; // Ignore clicks outside Germany or inside Bavaria
      }
      
      setPinPosition({ lat, lng });
      
      // Reverse geocode
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1&accept-language=de`
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

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [setPinPosition, setAddress, isClickAllowed]);

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
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=de&limit=5&addressdetails=1&accept-language=de`
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
    <div className="relative flex-1 h-full overflow-hidden" style={{ backgroundColor: "#f8fafc" }}>
      {/* Leaflet Map */}
      <div 
        ref={mapContainerRef} 
        className="absolute inset-0 w-full h-full"
        style={{ backgroundColor: "#f8fafc" }}
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
            className="pl-8 h-9 text-sm bg-card/95 backdrop-blur-sm shadow-lg border-border/50"
          />
        </div>
        
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-card/95 backdrop-blur-sm border border-border/50 rounded-md shadow-lg overflow-hidden">
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
        <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-card/95 backdrop-blur-sm shadow-lg rounded-lg px-3 py-1.5 z-[1000]">
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
