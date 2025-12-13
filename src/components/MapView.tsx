import { useState } from "react";
import { Search, Plus, Minus, Crosshair } from "lucide-react";
import { Input } from "@/components/ui/input";

const MapView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [zoom, setZoom] = useState(14);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 1, 20));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 1, 1));

  return (
    <div className="relative flex-1 h-full overflow-hidden rounded-lg panel">
      {/* Map Background - Professional cartographic style */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: 'hsl(220 20% 14%)',
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      >
        {/* Simulated cadastral map elements */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid slice">
          {/* Property boundaries */}
          <g stroke="hsl(220 10% 35%)" strokeWidth="1" fill="none">
            <rect x="100" y="150" width="200" height="180" />
            <rect x="100" y="330" width="200" height="150" />
            <rect x="300" y="150" width="180" height="330" />
            <rect x="480" y="150" width="220" height="160" />
            <rect x="480" y="310" width="220" height="170" />
            <rect x="700" y="150" width="180" height="330" />
            <rect x="100" y="520" width="380" height="180" />
            <rect x="480" y="520" width="400" height="180" />
          </g>
          
          {/* Roads */}
          <g stroke="hsl(220 10% 45%)" strokeWidth="2" fill="none">
            <path d="M0 140 L1000 140" />
            <path d="M0 490 L1000 490" />
            <path d="M90 0 L90 800" />
            <path d="M490 0 L490 800" />
            <path d="M890 0 L890 800" />
          </g>
          
          {/* Building footprints */}
          <g fill="hsl(220 15% 25%)" stroke="hsl(220 10% 40%)" strokeWidth="0.5">
            <rect x="140" y="200" width="60" height="80" />
            <rect x="220" y="180" width="50" height="50" />
            <rect x="130" y="360" width="80" height="60" />
            <rect x="340" y="200" width="100" height="70" />
            <rect x="350" y="350" width="80" height="90" />
            <rect x="520" y="190" width="70" height="80" />
            <rect x="620" y="180" width="50" height="60" />
            <rect x="510" y="340" width="90" height="100" />
            <rect x="650" y="350" width="40" height="50" />
            <rect x="740" y="200" width="100" height="120" />
            <rect x="750" y="380" width="80" height="60" />
            <rect x="150" y="560" width="120" height="80" />
            <rect x="320" y="580" width="100" height="60" />
            <rect x="520" y="550" width="150" height="100" />
            <rect x="720" y="570" width="120" height="80" />
          </g>

          {/* Parcel numbers */}
          <g fill="hsl(220 10% 50%)" fontSize="10" fontFamily="IBM Plex Sans">
            <text x="180" y="250">142/1</text>
            <text x="180" y="420">142/2</text>
            <text x="370" y="300">143</text>
            <text x="570" y="240">144/1</text>
            <text x="570" y="400">144/2</text>
            <text x="770" y="300">145</text>
            <text x="270" y="620">146</text>
            <text x="660" y="620">147</text>
          </g>
        </svg>

        {/* Center crosshair */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <Crosshair className="w-8 h-8 text-primary opacity-60" strokeWidth={1} />
        </div>
      </div>

      {/* Search Bar */}
      <div className="absolute top-4 left-4 w-72">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Adresse oder Flurstück suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card/95 backdrop-blur-sm border-border text-sm"
          />
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-1">
        <button
          onClick={handleZoomIn}
          className="w-8 h-8 bg-card border border-border rounded flex items-center justify-center hover:bg-secondary transition-colors"
        >
          <Plus className="w-4 h-4 text-foreground" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-8 h-8 bg-card border border-border rounded flex items-center justify-center hover:bg-secondary transition-colors"
        >
          <Minus className="w-4 h-4 text-foreground" />
        </button>
      </div>

      {/* Scale indicator */}
      <div className="absolute bottom-4 right-4 flex items-center gap-3 bg-card/95 backdrop-blur-sm border border-border rounded px-3 py-1.5">
        <div className="flex items-center gap-2">
          <div className="w-16 h-0.5 bg-foreground" />
          <span className="text-xs text-muted-foreground">100m</span>
        </div>
        <span className="text-xs text-muted-foreground border-l border-border pl-3">1:{zoom * 1000}</span>
      </div>

      {/* Coordinates display */}
      <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm border border-border rounded px-3 py-1.5">
        <span className="text-xs text-muted-foreground font-mono">52.5200° N, 13.4050° E</span>
      </div>
    </div>
  );
};

export default MapView;
