import { useState } from "react";
import { Link } from "react-router-dom";
import { Map, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";
import { sendPasswordResetEmail } from "@/services/emailService";

const emailSchema = z.string().trim().email({ message: "Bitte geben Sie eine gültige E-Mail-Adresse ein" });

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate email
    const validation = emailSchema.safeParse(email);
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    setIsLoading(true);

    try {
      const result = await sendPasswordResetEmail(email);
      
      if (result.success) {
        setIsSuccess(true);
      } else {
        toast.error(result.error || "Ein Fehler ist aufgetreten");
      }
    } catch (err) {
      toast.error("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Map className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">Lageplaner</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          {isSuccess ? (
            // Success State
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">E-Mail gesendet</h1>
              <p className="text-muted-foreground text-sm mb-6">
                Falls ein Konto mit <span className="font-medium text-foreground">{email}</span> existiert, 
                haben wir Ihnen eine E-Mail mit Anweisungen zum Zurücksetzen Ihres Passworts gesendet.
              </p>
              <p className="text-muted-foreground text-xs mb-6">
                Bitte überprüfen Sie auch Ihren Spam-Ordner.
              </p>
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Zurück zur Anmeldung
                </Button>
              </Link>
            </div>
          ) : (
            // Form State
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-foreground mb-2">Passwort vergessen?</h1>
                <p className="text-muted-foreground text-sm">
                  Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen einen Link zum Zurücksetzen Ihres Passworts.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="ihre@email.de"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError(null);
                      }}
                      className={`pl-10 ${error ? "border-destructive" : ""}`}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-destructive">{error}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Wird gesendet..." : "Link senden"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3" />
                  Zurück zur Anmeldung
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
