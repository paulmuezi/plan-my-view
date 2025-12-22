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

// GeoJSON URLs - using a simpler, more reliable source for Germany
const GERMANY_GEOJSON_URL = "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson";
const BAVARIA_GEOJSON_URL = "https://raw.githubusercontent.com/isellsoap/deutschern-and-maps/main/data/1_deutschland/4_laender/2_hoch.geo.json";

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

    // Add OSM tile layer first (base layer)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Create panes for proper layering
    map.createPane("maskPane");
    map.getPane("maskPane")!.style.zIndex = "400";
    
    map.createPane("borderPane");
    map.getPane("borderPane")!.style.zIndex = "410";
    
    map.createPane("bavariaPane");
    map.getPane("bavariaPane")!.style.zIndex = "420";

    // Load Germany GeoJSON and create mask
    fetch(GERMANY_GEOJSON_URL)
      .then(res => res.json())
      .then(data => {
        const germany = data.features.find(
          (f: any) => f.properties.ADMIN === "Germany" || f.properties.name === "Germany"
        );
        
        if (germany) {
          germanyGeoJsonRef.current = germany;
          
          // Create outer world bounds (large rectangle)
          const worldCoords: L.LatLngExpression[] = [
            [-90, -180],
            [-90, 180],
            [90, 180],
            [90, -180],
          ];
          
          // Extract Germany coordinates for the hole
          const germanyHoles: L.LatLngExpression[][] = [];
          
          if (germany.geometry.type === "Polygon") {
            germanyHoles.push(
              germany.geometry.coordinates[0].map((coord: number[]) => [coord[1], coord[0]] as L.LatLngExpression)
            );
          } else if (germany.geometry.type === "MultiPolygon") {
            germany.geometry.coordinates.forEach((polygon: number[][][]) => {
              germanyHoles.push(
                polygon[0].map((coord: number[]) => [coord[1], coord[0]] as L.LatLngExpression)
              );
            });
          }
          
          // Create mask polygon (world with Germany as hole)
          L.polygon([worldCoords, ...germanyHoles], {
            fillColor: "#f1f5f9",
            fillOpacity: 1,
            stroke: false,
            pane: "maskPane",
            interactive: false,
          }).addTo(map);
          
          // Add Germany border
          L.geoJSON(germany, {
            style: {
              fillColor: "transparent",
              fillOpacity: 0,
              color: "#94a3b8",
              weight: 2,
            },
            pane: "borderPane",
            interactive: false,
          }).addTo(map);
        }
      })
      .catch(err => console.error("Failed to load Germany GeoJSON:", err));

    // Load Bavaria overlay - try multiple sources
    const loadBavaria = async () => {
      // Try primary source first
      try {
        const res = await fetch("https://raw.githubusercontent.com/openpolitics/geojson-germany/refs/heads/main/states/bavaria.geojson");
        if (res.ok) {
          const bavariaGeoJson = await res.json();
          bavariaGeoJsonRef.current = bavariaGeoJson;
          L.geoJSON(bavariaGeoJson, {
            style: {
              fillColor: "#cbd5e1",
              fillOpacity: 0.75,
              color: "#64748b",
              weight: 2,
            },
            pane: "bavariaPane",
            interactive: false,
          }).addTo(map);
          return;
        }
      } catch (e) {
        console.log("Primary Bavaria source failed, trying fallback...");
      }

      // Fallback: Create a simple Bavaria polygon from known coordinates
      const bavariaCoords: L.LatLngExpression[] = [
        [47.27, 8.97], [47.5, 9.5], [47.58, 10.18], [47.55, 10.45],
        [47.4, 10.87], [47.31, 10.99], [47.42, 11.17], [47.49, 11.09],
        [47.58, 11.21], [47.59, 11.86], [47.5, 12.13], [47.64, 12.22],
        [47.68, 12.76], [47.63, 13.01], [47.72, 13.05], [47.84, 12.88],
        [48.11, 12.86], [48.2, 13.02], [48.33, 13.03], [48.52, 13.44],
        [48.77, 13.84], [49.02, 13.52], [49.12, 13.4], [49.31, 12.9],
        [49.53, 12.52], [49.79, 12.48], [49.93, 12.4], [50.07, 12.32],
        [50.27, 12.09], [50.32, 11.94], [50.39, 11.88], [50.47, 11.6],
        [50.38, 11.23], [50.24, 11.04], [50.26, 10.73], [50.02, 10.44],
        [49.87, 10.13], [49.79, 9.94], [49.58, 9.8], [49.43, 9.4],
        [49.79, 9.11], [49.94, 9.4], [50.03, 9.51], [50.02, 9.87],
        [49.91, 9.99], [49.8, 9.93], [49.65, 9.94], [49.47, 10.1],
        [49.0, 10.13], [48.87, 10.12], [48.7, 10.04], [48.52, 10.03],
        [48.4, 10.1], [48.13, 9.95], [47.98, 9.99], [47.82, 10.1],
        [47.58, 9.6], [47.54, 9.48], [47.54, 9.6], [47.48, 9.73],
        [47.27, 8.97]
      ];
      
      bavariaGeoJsonRef.current = { 
        type: "Polygon", 
        coordinates: [bavariaCoords.map(c => [c[1], c[0]])] 
      };
      
      L.polygon(bavariaCoords, {
        fillColor: "#cbd5e1",
        fillOpacity: 0.75,
        color: "#64748b",
        weight: 2,
        pane: "bavariaPane",
        interactive: false,
      }).addTo(map);
    };

    loadBavaria();

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
    <div className="relative flex-1 h-full overflow-hidden" style={{ backgroundColor: "#f8fafc" }}>
      {/* Leaflet Map */}
      <div 
        ref={mapContainerRef} 
        className="absolute inset-0 w-full h-full"
        style={{ 
          filter: "saturate(0.9)",
          backgroundColor: "#f8fafc",
        }}
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
