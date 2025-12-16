import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getOrders, formatPrice, Order } from "@/services/orderService";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, Mail, FileText, Download, Package } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (user) {
      setOrders(getOrders(user.id));
      setEditName(user.name || "");
    }
  }, [user]);

  const handleSaveProfile = () => {
    // TODO: Replace with real backend API call
    toast.success("Profil gespeichert (Dummy)");
    setIsEditing(false);
    console.log("📝 [DUMMY PROFILE] Would save name:", editName);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Abgeschlossen</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Ausstehend</Badge>;
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">In Bearbeitung</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Laden...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-2xl font-semibold mb-6">Mein Profil</h1>
        
        <div className="grid gap-6">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5 text-primary" />
                Persönliche Daten
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  <p className="text-foreground py-2">{user.name || "Nicht angegeben"}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  E-Mail-Adresse
                </Label>
                <p className="text-foreground py-2">{user.email}</p>
                {user.emailVerified && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Verifiziert
                  </Badge>
                )}
              </div>
              
              <Separator />
              
              <div className="flex gap-3">
                {isEditing ? (
                  <>
                    <Button onClick={handleSaveProfile}>Speichern</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Abbrechen
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    Bearbeiten
                  </Button>
                )}
                <Button variant="destructive" onClick={handleLogout}>
                  Abmelden
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Order History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Package className="h-5 w-5 text-primary" />
                Bestellhistorie
              </CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Noch keine Bestellungen vorhanden</p>
                  <Button 
                    variant="link" 
                    className="mt-2 text-primary"
                    onClick={() => navigate("/editor")}
                  >
                    Jetzt Lageplan erstellen
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border rounded-lg p-4 space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(order.date)}
                          </p>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>
                      
                      <div className="text-sm space-y-1">
                        <p><span className="text-muted-foreground">Adresse:</span> {order.address}</p>
                        <p>
                          <span className="text-muted-foreground">Format:</span> {order.format} | 
                          <span className="text-muted-foreground"> Maßstab:</span> {order.scale} | 
                          <span className="text-muted-foreground"> Ausrichtung:</span> {order.orientation}
                        </p>
                        <p>
                          <span className="text-muted-foreground">Dateiformate:</span>{" "}
                          {order.fileFormats.map((f) => f.toUpperCase()).join(", ")}
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2 border-t">
                        <p className="font-semibold">{formatPrice(order.total)}</p>
                        
                        {order.downloadLinks && order.status === "completed" && (
                          <div className="flex gap-2">
                            {order.downloadLinks.pdf && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => toast.info("Download würde starten (Dummy)")}
                              >
                                <Download className="h-4 w-4 mr-1" />
                                PDF
                              </Button>
                            )}
                            {order.downloadLinks.dxf && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => toast.info("Download würde starten (Dummy)")}
                              >
                                <Download className="h-4 w-4 mr-1" />
                                DXF
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
