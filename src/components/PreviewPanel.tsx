import { useState } from "react";
import { useMapSettings } from "@/contexts/MapContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import previewPdf from "@/assets/preview-pdf.png";
import previewDxf from "@/assets/preview-dxf.png";

const PreviewPanel = () => {
  const { pinPosition, dxfSelected, pdfSelected } = useMapSettings();
  const [activeTab, setActiveTab] = useState<"pdf" | "dxf">("pdf");

  if (!pinPosition) {
    return null;
  }

  // Only show if at least one format is selected
  if (!pdfSelected && !dxfSelected) {
    return null;
  }

  // If only one format is selected, show that one without tabs
  if (pdfSelected && !dxfSelected) {
    return (
      <div className="absolute bottom-4 left-4 z-[1000] bg-card rounded-lg shadow-lg border border-border overflow-hidden">
        <div className="p-2 border-b border-border bg-muted/50">
          <span className="text-xs font-medium text-muted-foreground">Vorschau PDF</span>
        </div>
        <img 
          src={previewPdf} 
          alt="PDF Vorschau" 
          className="w-64 h-auto"
        />
      </div>
    );
  }

  if (!pdfSelected && dxfSelected) {
    return (
      <div className="absolute bottom-4 left-4 z-[1000] bg-card rounded-lg shadow-lg border border-border overflow-hidden">
        <div className="p-2 border-b border-border bg-muted/50">
          <span className="text-xs font-medium text-muted-foreground">Vorschau DXF</span>
        </div>
        <img 
          src={previewDxf} 
          alt="DXF Vorschau" 
          className="w-64 h-auto"
        />
      </div>
    );
  }

  // Both formats selected - show tabs
  return (
    <div className="absolute bottom-4 left-4 z-[1000] bg-card rounded-lg shadow-lg border border-border overflow-hidden">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "pdf" | "dxf")}>
        <div className="p-2 border-b border-border bg-muted/50">
          <TabsList className="h-7">
            <TabsTrigger value="pdf" className="text-xs px-3 py-1">PDF</TabsTrigger>
            <TabsTrigger value="dxf" className="text-xs px-3 py-1">DXF</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="pdf" className="m-0">
          <img 
            src={previewPdf} 
            alt="PDF Vorschau" 
            className="w-64 h-auto"
          />
        </TabsContent>
        <TabsContent value="dxf" className="m-0">
          <img 
            src={previewDxf} 
            alt="DXF Vorschau" 
            className="w-64 h-auto"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PreviewPanel;
