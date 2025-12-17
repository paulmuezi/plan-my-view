import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getOrders, formatPrice, Order } from "@/services/orderService";
import { changePassword } from "@/services/authService";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { User, Mail, FileText, Download, Package, Key, LogOut, Trash2 } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const { user, isLoading, logout, deleteAccount } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  // Password change state
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

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

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    const result = await deleteAccount();
    setDeleteLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Ihr Konto wurde erfolgreich gelöscht");
      navigate("/");
    }
  };

  const handleChangePassword = async () => {
    if (!user) return;

    if (newPassword !== confirmPassword) {
      toast.error("Passwörter stimmen nicht überein");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Passwort muss mindestens 6 Zeichen lang sein");
      return;
    }

    setPasswordLoading(true);
    const result = await changePassword(user.email, currentPassword, newPassword);
    setPasswordLoading(false);

    if (result.success) {
      toast.success("Passwort erfolgreich geändert");
      setIsChangingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      toast.error(result.error || "Fehler beim Ändern des Passworts");
    }
  };

  const cancelPasswordChange = () => {
    setIsChangingPassword(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
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
      
      <main className="container mx-auto px-4 py-8 pt-20 max-w-4xl">
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
              
              <div className="flex items-center justify-between">
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
                </div>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1">
                      <Trash2 className="h-3 w-3" />
                      Konto löschen
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Konto wirklich löschen?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Diese Aktion kann nicht rückgängig gemacht werden. Ihr Konto und alle 
                        zugehörigen Daten werden dauerhaft gelöscht.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        disabled={deleteLoading}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {deleteLoading ? "Wird gelöscht..." : "Ja, Konto löschen"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>

          {/* Password Change */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Key className="h-5 w-5 text-primary" />
                Passwort ändern
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isChangingPassword ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Aktuelles Passwort</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Neues Passwort</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Neues Passwort bestätigen</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button onClick={handleChangePassword} disabled={passwordLoading}>
                      {passwordLoading ? "Wird geändert..." : "Passwort ändern"}
                    </Button>
                    <Button variant="outline" onClick={cancelPasswordChange}>
                      Abbrechen
                    </Button>
                  </div>
                </div>
              ) : (
                <Button variant="outline" onClick={() => setIsChangingPassword(true)}>
                  Passwort ändern
                </Button>
              )}
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

          {/* Account Actions */}
          <Card>
            <CardContent className="pt-6">
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Abmelden
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
