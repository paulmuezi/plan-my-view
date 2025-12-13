import { useState } from "react";
import { Search, Plus, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";

const MapView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [zoom, setZoom] = useState(14);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 1, 20));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 1, 1));

  return (
    <div className="relative flex-1 h-full overflow-hidden bg-muted">
      {/* Map Background - Clean cadastral style */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: '#f5f5f0',
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      >
        {/* Cadastral map elements */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid slice">
          {/* Roads */}
          <g fill="#e8e8e0" stroke="#ccc" strokeWidth="0.5">
            <rect x="0" y="130" width="1000" height="20" />
            <rect x="0" y="480" width="1000" height="20" />
            <rect x="80" y="0" width="20" height="800" />
            <rect x="480" y="0" width="20" height="800" />
            <rect x="880" y="0" width="20" height="800" />
          </g>
          
          {/* Property boundaries */}
          <g stroke="#999" strokeWidth="0.5" fill="none">
            <rect x="110" y="160" width="180" height="150" />
            <rect x="110" y="320" width="180" height="150" />
            <rect x="300" y="160" width="170" height="310" />
            <rect x="510" y="160" width="180" height="150" />
            <rect x="510" y="320" width="180" height="150" />
            <rect x="700" y="160" width="170" height="310" />
            <rect x="110" y="510" width="360" height="140" />
            <rect x="510" y="510" width="360" height="140" />
          </g>
          
          {/* Buildings */}
          <g fill="#ddd" stroke="#aaa" strokeWidth="0.5">
            <rect x="140" y="190" width="50" height="70" />
            <rect x="210" y="180" width="40" height="40" />
            <rect x="130" y="350" width="70" height="50" />
            <rect x="330" y="200" width="80" height="60" />
            <rect x="340" y="340" width="60" height="80" />
            <rect x="540" y="190" width="60" height="70" />
            <rect x="620" y="180" width="40" height="50" />
            <rect x="530" y="340" width="80" height="80" />
            <rect x="640" y="350" width="35" height="45" />
            <rect x="730" y="200" width="90" height="100" />
            <rect x="740" y="370" width="60" height="50" />
            <rect x="150" y="540" width="100" height="70" />
            <rect x="310" y="550" width="80" height="50" />
            <rect x="550" y="530" width="120" height="80" />
            <rect x="720" y="550" width="100" height="60" />
          </g>

          {/* Parcel numbers */}
          <g fill="#666" fontSize="11" fontFamily="IBM Plex Sans">
            <text x="175" y="240">142/1</text>
            <text x="175" y="400">142/2</text>
            <text x="365" y="320">143</text>
            <text x="580" y="240">144/1</text>
            <text x="580" y="400">144/2</text>
            <text x="765" y="320">145</text>
            <text x="270" y="590">146</text>
            <text x="670" y="590">147</text>
          </g>
        </svg>

        {/* Center marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-4 h-4 border-2 border-primary rounded-full bg-primary/20" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="absolute top-3 left-3 w-64">
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
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-3 left-3 flex flex-col shadow-sm rounded overflow-hidden">
        <button
          onClick={handleZoomIn}
          className="w-7 h-7 bg-card border-b border-border flex items-center justify-center hover:bg-muted transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-7 h-7 bg-card flex items-center justify-center hover:bg-muted transition-colors"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Scale indicator */}
      <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-card shadow-sm rounded px-2 py-1">
        <div className="w-12 h-0.5 bg-foreground" />
        <span className="text-xs text-muted-foreground">100m</span>
      </div>
    </div>
  );
};

export default MapView;
