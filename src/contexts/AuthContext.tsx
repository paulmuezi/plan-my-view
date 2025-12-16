import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { sendVerificationEmail } from "@/services/emailService";

// Mock user type - replace with your real user type later
interface User {
  id: string;
  email: string;
  name?: string;
  emailVerified?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  pendingVerification: string | null; // Email awaiting verification
  login: (email: string, password: string) => Promise<{ error?: string }>;
  loginWithGoogle: () => Promise<{ error?: string }>;
  register: (email: string, password: string, name: string) => Promise<{ error?: string }>;
  verifyEmail: (email: string, token: string) => Promise<{ error?: string }>;
  resendVerificationEmail: (email: string) => Promise<{ error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock storage keys
const MOCK_USER_KEY = "lageplaner_mock_user";
const MOCK_USERS_KEY = "lageplaner_mock_users";
const MOCK_VERIFICATION_TOKENS_KEY = "lageplaner_verification_tokens";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingVerification, setPendingVerification] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(MOCK_USER_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Helper to get mock users database
  const getMockUsers = (): Record<string, { password: string; name: string; emailVerified: boolean }> => {
    const users = localStorage.getItem(MOCK_USERS_KEY);
    return users ? JSON.parse(users) : {};
  };

  // Helper to save mock users database
  const saveMockUsers = (users: Record<string, { password: string; name: string; emailVerified: boolean }>) => {
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
  };

  // Helper to get verification tokens
  const getVerificationTokens = (): Record<string, { token: string; expires: number }> => {
    const tokens = localStorage.getItem(MOCK_VERIFICATION_TOKENS_KEY);
    return tokens ? JSON.parse(tokens) : {};
  };

  // Helper to save verification tokens
  const saveVerificationTokens = (tokens: Record<string, { token: string; expires: number }>) => {
    localStorage.setItem(MOCK_VERIFICATION_TOKENS_KEY, JSON.stringify(tokens));
  };

  // Generate verification token
  const generateVerificationToken = (): string => {
    return Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  // TODO: Replace with real authentication
  const login = async (email: string, password: string): Promise<{ error?: string }> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const users = getMockUsers();
    const userRecord = users[email];

    if (!userRecord) {
      return { error: "Benutzer nicht gefunden" };
    }

    if (userRecord.password !== password) {
      return { error: "Falsches Passwort" };
    }

    // TODO: Remove this check when connecting to real backend that handles email verification
    if (!userRecord.emailVerified) {
      setPendingVerification(email);
      return { error: "Bitte bestätigen Sie zuerst Ihre E-Mail-Adresse" };
    }

    const loggedInUser: User = {
      id: btoa(email),
      email,
      name: userRecord.name,
      emailVerified: userRecord.emailVerified,
    };

    localStorage.setItem(MOCK_USER_KEY, JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    return {};
  };

  // TODO: Replace with real Google OAuth
  const loginWithGoogle = async (): Promise<{ error?: string }> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock Google login - creates a demo user (Google accounts are pre-verified)
    const mockGoogleUser: User = {
      id: "google_demo_user",
      email: "demo@google.com",
      name: "Google Demo User",
      emailVerified: true,
    };

    localStorage.setItem(MOCK_USER_KEY, JSON.stringify(mockGoogleUser));
    setUser(mockGoogleUser);
    return {};
  };

  // TODO: Replace with real registration
  const register = async (email: string, password: string, name: string): Promise<{ error?: string }> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const users = getMockUsers();

    if (users[email]) {
      return { error: "E-Mail bereits registriert" };
    }

    // Save new user (not verified yet)
    users[email] = { password, name, emailVerified: false };
    saveMockUsers(users);

    // Generate and store verification token
    const token = generateVerificationToken();
    const tokens = getVerificationTokens();
    tokens[email] = {
      token,
      expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    };
    saveVerificationTokens(tokens);

    // Send verification email (mock)
    await sendVerificationEmail(email, name, token);

    // Set pending verification state
    setPendingVerification(email);

    return {};
  };

  // TODO: Replace with real email verification
  const verifyEmail = async (email: string, token: string): Promise<{ error?: string }> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const tokens = getVerificationTokens();
    const tokenRecord = tokens[email];

    if (!tokenRecord) {
      return { error: "Kein Verifizierungstoken gefunden" };
    }

    if (tokenRecord.token !== token) {
      return { error: "Ungültiger Verifizierungstoken" };
    }

    if (Date.now() > tokenRecord.expires) {
      return { error: "Verifizierungstoken abgelaufen. Bitte fordern Sie einen neuen an." };
    }

    // Mark user as verified
    const users = getMockUsers();
    if (users[email]) {
      users[email].emailVerified = true;
      saveMockUsers(users);
    }

    // Remove used token
    delete tokens[email];
    saveVerificationTokens(tokens);

    // Auto-login after verification
    const verifiedUser: User = {
      id: btoa(email),
      email,
      name: users[email]?.name,
      emailVerified: true,
    };

    localStorage.setItem(MOCK_USER_KEY, JSON.stringify(verifiedUser));
    setUser(verifiedUser);
    setPendingVerification(null);

    return {};
  };

  // TODO: Replace with real resend verification
  const resendVerificationEmail = async (email: string): Promise<{ error?: string }> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const users = getMockUsers();
    const userRecord = users[email];

    if (!userRecord) {
      return { error: "Benutzer nicht gefunden" };
    }

    if (userRecord.emailVerified) {
      return { error: "E-Mail bereits verifiziert" };
    }

    // Generate new token
    const token = generateVerificationToken();
    const tokens = getVerificationTokens();
    tokens[email] = {
      token,
      expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    };
    saveVerificationTokens(tokens);

    // Send verification email (mock)
    await sendVerificationEmail(email, userRecord.name, token);

    return {};
  };

  const logout = () => {
    localStorage.removeItem(MOCK_USER_KEY);
    setUser(null);
    setPendingVerification(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        pendingVerification,
        login,
        loginWithGoogle,
        register,
        verifyEmail,
        resendVerificationEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
