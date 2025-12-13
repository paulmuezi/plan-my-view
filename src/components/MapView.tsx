import { useState } from "react";
import { Search, MapPin, Plus, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";

const MapView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [zoom, setZoom] = useState(14);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 1, 20));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 1, 1));

  return (
    <div className="relative flex-1 h-full overflow-hidden rounded-xl">
      {/* Map Background - Placeholder styled as dark map */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-muted"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, hsl(222 47% 15%) 0%, hsl(222 47% 11%) 100%)
          `,
          backgroundSize: '50px 50px, 50px 50px, 100% 100%',
        }}
      >
        {/* Simulated map streets */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 800">
          {/* Main roads */}
          <path d="M0 400 L1000 400" stroke="hsl(187 100% 42%)" strokeWidth="3" fill="none" opacity="0.3" />
          <path d="M500 0 L500 800" stroke="hsl(187 100% 42%)" strokeWidth="3" fill="none" opacity="0.3" />
          
          {/* Secondary roads */}
          <path d="M0 200 L600 200 L600 600" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" fill="none" opacity="0.4" />
          <path d="M200 0 L200 500" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" fill="none" opacity="0.4" />
          <path d="M800 100 L800 700" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" fill="none" opacity="0.4" />
          <path d="M100 600 L900 600" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" fill="none" opacity="0.4" />
          
          {/* Smaller streets */}
          <path d="M300 300 L700 300" stroke="hsl(var(--muted-foreground))" strokeWidth="1" fill="none" opacity="0.3" />
          <path d="M400 150 L400 450" stroke="hsl(var(--muted-foreground))" strokeWidth="1" fill="none" opacity="0.3" />
          <path d="M650 200 L650 500" stroke="hsl(var(--muted-foreground))" strokeWidth="1" fill="none" opacity="0.3" />
          
          {/* Buildings */}
          <rect x="220" y="220" width="60" height="60" fill="hsl(var(--muted))" opacity="0.4" rx="4" />
          <rect x="320" y="340" width="80" height="50" fill="hsl(var(--muted))" opacity="0.4" rx="4" />
          <rect x="450" y="250" width="40" height="40" fill="hsl(var(--muted))" opacity="0.4" rx="4" />
          <rect x="550" y="420" width="70" height="80" fill="hsl(var(--muted))" opacity="0.4" rx="4" />
          <rect x="700" y="300" width="50" height="60" fill="hsl(var(--muted))" opacity="0.4" rx="4" />
          <rect x="150" y="450" width="90" height="40" fill="hsl(var(--muted))" opacity="0.4" rx="4" />
        </svg>

        {/* Center marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <MapPin className="w-10 h-10 text-primary animate-bounce" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-primary/30 rounded-full blur-sm" />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="absolute top-4 left-4 w-80 animate-fade-in">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Ort suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 py-6 glass text-foreground placeholder:text-muted-foreground border-border/50 focus:border-primary focus:ring-primary"
          />
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-2 animate-fade-in">
        <button
          onClick={handleZoomIn}
          className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-secondary transition-colors"
        >
          <Plus className="w-5 h-5 text-foreground" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-secondary transition-colors"
        >
          <Minus className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Scale indicator */}
      <div className="absolute bottom-4 right-4 glass rounded-lg px-3 py-2 text-sm text-muted-foreground animate-fade-in">
        Zoom: {zoom}x
      </div>
    </div>
  );
};

export default MapView;
