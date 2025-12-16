import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Mock user type - replace with your real user type later
interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  loginWithGoogle: () => Promise<{ error?: string }>;
  register: (email: string, password: string, name: string) => Promise<{ error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user storage key
const MOCK_USER_KEY = "lageplaner_mock_user";
const MOCK_USERS_KEY = "lageplaner_mock_users";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(MOCK_USER_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Helper to get mock users database
  const getMockUsers = (): Record<string, { password: string; name: string }> => {
    const users = localStorage.getItem(MOCK_USERS_KEY);
    return users ? JSON.parse(users) : {};
  };

  // Helper to save mock users database
  const saveMockUsers = (users: Record<string, { password: string; name: string }>) => {
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
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

    const loggedInUser: User = {
      id: btoa(email),
      email,
      name: userRecord.name,
    };

    localStorage.setItem(MOCK_USER_KEY, JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    return {};
  };

  // TODO: Replace with real Google OAuth
  const loginWithGoogle = async (): Promise<{ error?: string }> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock Google login - creates a demo user
    const mockGoogleUser: User = {
      id: "google_demo_user",
      email: "demo@google.com",
      name: "Google Demo User",
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

    // Save new user
    users[email] = { password, name };
    saveMockUsers(users);

    // Auto-login after registration
    const newUser: User = {
      id: btoa(email),
      email,
      name,
    };

    localStorage.setItem(MOCK_USER_KEY, JSON.stringify(newUser));
    setUser(newUser);
    return {};
  };

  const logout = () => {
    localStorage.removeItem(MOCK_USER_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, loginWithGoogle, register, logout }}>
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
