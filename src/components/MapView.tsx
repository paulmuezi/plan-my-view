import { useState, useRef, useEffect } from "react";
import { Search, Plus, Minus, MousePointer, Pentagon, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Canvas as FabricCanvas, Polygon, Point } from "fabric";
import { toast } from "sonner";

// Germany center (excluding Bavaria - shifted slightly northwest)
const GERMANY_CENTER = { lat: 51.5, lng: 9.5 };
const DEFAULT_ZOOM = 6;

const MapView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [center, setCenter] = useState(GERMANY_CENTER);
  const [activeTool, setActiveTool] = useState<"select" | "polygon">("select");
  const [isDrawing, setIsDrawing] = useState(false);
  const [polygonPoints, setPolygonPoints] = useState<{ x: number; y: number }[]>([]);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = new FabricCanvas(canvasRef.current, {
      width: container.clientWidth,
      height: container.clientHeight,
      backgroundColor: "transparent",
      selection: true,
    });

    setFabricCanvas(canvas);

    // Handle resize
    const handleResize = () => {
      canvas.setDimensions({
        width: container.clientWidth,
        height: container.clientHeight,
      });
      canvas.renderAll();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.dispose();
    };
  }, []);

  // Handle canvas clicks for polygon drawing
  useEffect(() => {
    if (!fabricCanvas) return;

    const handleCanvasClick = (e: any) => {
      if (activeTool !== "polygon") return;
      
      const pointer = fabricCanvas.getPointer(e.e);
      setPolygonPoints(prev => [...prev, { x: pointer.x, y: pointer.y }]);
      setIsDrawing(true);
    };

    const handleDoubleClick = () => {
      if (activeTool !== "polygon" || polygonPoints.length < 3) return;
      
      // Create the polygon
      const points = polygonPoints.map(p => new Point(p.x, p.y));
      const polygon = new Polygon(points, {
        fill: "rgba(234, 88, 12, 0.3)",
        stroke: "#ea580c",
        strokeWidth: 2,
        selectable: true,
        hasControls: true,
      });
      
      fabricCanvas.add(polygon);
      fabricCanvas.renderAll();
      
      setPolygonPoints([]);
      setIsDrawing(false);
      toast.success("Flurstück markiert!");
    };

    fabricCanvas.on("mouse:down", handleCanvasClick);
    fabricCanvas.on("mouse:dblclick", handleDoubleClick);

    return () => {
      fabricCanvas.off("mouse:down", handleCanvasClick);
      fabricCanvas.off("mouse:dblclick", handleDoubleClick);
    };
  }, [fabricCanvas, activeTool, polygonPoints]);

  // Draw temporary polygon preview
  useEffect(() => {
    if (!fabricCanvas || polygonPoints.length === 0) return;

    // Remove old preview (last added non-selectable polygon)
    const objects = fabricCanvas.getObjects();
    const preview = objects.find((obj: any) => obj.selectable === false && obj.evented === false);
    if (preview) fabricCanvas.remove(preview);

    if (polygonPoints.length >= 2) {
      const points = polygonPoints.map(p => new Point(p.x, p.y));
      const previewPolygon = new Polygon(points, {
        fill: "rgba(234, 88, 12, 0.15)",
        stroke: "#ea580c",
        strokeWidth: 1,
        strokeDashArray: [5, 5],
        selectable: false,
        evented: false,
      });
      fabricCanvas.add(previewPolygon);
    }

    fabricCanvas.renderAll();
  }, [fabricCanvas, polygonPoints]);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 1, 18));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 1, 4));

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&countrycodes=de&limit=1`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        const latNum = parseFloat(lat);
        const lonNum = parseFloat(lon);
        
        const isInBavaria = latNum >= 47.2 && latNum <= 50.6 && lonNum >= 8.9 && lonNum <= 13.9;
        
        if (isInBavaria) {
          toast.error("Diese Region (Bayern) ist leider nicht verfügbar.");
          return;
        }
        
        setCenter({ lat: latNum, lng: lonNum });
        setZoom(14);
        toast.success("Standort gefunden!");
      } else {
        toast.error("Adresse nicht gefunden.");
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Suche fehlgeschlagen.");
    }
  };

  const handleClearSelection = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "transparent";
    fabricCanvas.renderAll();
    setPolygonPoints([]);
    setIsDrawing(false);
    toast.success("Auswahl gelöscht!");
  };

  const handleDeleteSelected = () => {
    if (!fabricCanvas) return;
    const activeObjects = fabricCanvas.getActiveObjects();
    if (activeObjects.length > 0) {
      activeObjects.forEach(obj => fabricCanvas.remove(obj));
      fabricCanvas.discardActiveObject();
      fabricCanvas.renderAll();
      toast.success("Flurstück entfernt!");
    }
  };

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${center.lng - 0.5 / zoom},${center.lat - 0.3 / zoom},${center.lng + 0.5 / zoom},${center.lat + 0.3 / zoom}&layer=mapnik`;

  return (
    <div ref={containerRef} className="relative flex-1 h-full overflow-hidden bg-muted">
      {/* OpenStreetMap iframe */}
      <iframe
        src={mapUrl}
        className="absolute inset-0 w-full h-full border-0"
        style={{ filter: "saturate(0.9)" }}
        title="Karte"
      />

      {/* Fabric.js Canvas Overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10"
        style={{ pointerEvents: activeTool === "select" ? "auto" : "auto" }}
      />

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="absolute top-3 left-3 w-64 z-20">
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

      {/* Tool Bar */}
      <div className="absolute top-3 left-72 flex gap-1 z-20 bg-card shadow-sm rounded p-1">
        <Button
          type="button"
          variant={activeTool === "select" ? "default" : "ghost"}
          size="sm"
          onClick={() => {
            setActiveTool("select");
            setPolygonPoints([]);
            setIsDrawing(false);
          }}
          className="h-7 w-7 p-0"
          title="Auswählen"
        >
          <MousePointer className="w-3.5 h-3.5" />
        </Button>
        <Button
          type="button"
          variant={activeTool === "polygon" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTool("polygon")}
          className="h-7 w-7 p-0"
          title="Flurstück zeichnen"
        >
          <Pentagon className="w-3.5 h-3.5" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleDeleteSelected}
          className="h-7 w-7 p-0"
          title="Ausgewähltes löschen"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* Drawing Instructions */}
      {activeTool === "polygon" && (
        <div className="absolute top-14 left-3 bg-card/95 shadow-sm rounded px-2 py-1 z-20">
          <span className="text-xs text-muted-foreground">
            {isDrawing 
              ? `${polygonPoints.length} Punkte • Doppelklick zum Abschließen`
              : "Klicken Sie auf die Karte um Punkte zu setzen"
            }
          </span>
        </div>
      )}

      {/* Zoom Controls */}
      <div className="absolute bottom-3 left-3 flex flex-col shadow-sm rounded overflow-hidden z-20">
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
      <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-card shadow-sm rounded px-2 py-1 z-20">
        <div className="w-12 h-0.5 bg-foreground" />
        <span className="text-xs text-muted-foreground">100m</span>
      </div>

      {/* Bavaria restriction notice */}
      <div className="absolute top-3 right-3 bg-card/90 shadow-sm rounded px-2 py-1 z-20">
        <span className="text-xs text-muted-foreground">🇩🇪 Deutschland (ohne Bayern)</span>
      </div>

      {/* Clear All Button */}
      <div className="absolute bottom-3 left-12 z-20">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleClearSelection}
          className="h-7 text-xs bg-card"
        >
          Alle löschen
        </Button>
      </div>
    </div>
  );
};

export default MapView;
