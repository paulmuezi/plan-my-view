import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Map, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyEmail, user } = useAuth();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    const verify = async () => {
      if (!token || !email) {
        setStatus("error");
        setErrorMessage("Ungültiger Verifizierungslink. Bitte fordern Sie einen neuen Link an.");
        return;
      }

      const { error } = await verifyEmail(email, token);

      if (error) {
        setStatus("error");
        setErrorMessage(error);
      } else {
        setStatus("success");
        toast.success("E-Mail erfolgreich verifiziert!");
      }
    };

    verify();
  }, [token, email, verifyEmail]);

  // Redirect if already logged in and verified
  useEffect(() => {
    if (user && status === "success") {
      const timer = setTimeout(() => {
        navigate("/editor");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [user, status, navigate]);

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

      {/* Verification Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm text-center">
          {status === "loading" && (
            <>
              <Loader2 className="w-16 h-16 text-primary mx-auto mb-6 animate-spin" />
              <h1 className="text-2xl font-bold text-foreground mb-2">
                E-Mail wird verifiziert...
              </h1>
              <p className="text-muted-foreground text-sm">
                Bitte warten Sie einen Moment.
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h1 className="text-2xl font-bold text-foreground mb-2">
                E-Mail verifiziert!
              </h1>
              <p className="text-muted-foreground text-sm mb-6">
                Ihr Konto wurde erfolgreich aktiviert. Sie werden in Kürze weitergeleitet.
              </p>
              <Button asChild className="w-full">
                <Link to="/editor">Zum Editor</Link>
              </Button>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="w-16 h-16 text-destructive mx-auto mb-6" />
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Verifizierung fehlgeschlagen
              </h1>
              <p className="text-muted-foreground text-sm mb-6">
                {errorMessage}
              </p>
              <div className="space-y-3">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/register">Erneut registrieren</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link to="/login">Zur Anmeldung</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
