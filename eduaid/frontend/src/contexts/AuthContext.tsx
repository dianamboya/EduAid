// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Role = "student" | "sponsor" | "verifier" | "admin";

interface User {
  name: string;
  email: string;
  role: Role;
  password: string;
  createdAt: number;
  lastLogin: number;
}

interface SafeUser extends Omit<User, "password"> {}

interface AuthContextType {
  user: SafeUser | null;
  login: (email: string, password: string) => void;
  register: (data: Omit<User, "password" | "createdAt" | "lastLogin">, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ define hook at top level
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<SafeUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("eduaid-current-user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const roleRedirect = (role: Role) => {
    switch (role) {
      case "student": navigate("/dashboard/student"); break;
      case "sponsor": navigate("/dashboard/sponsor"); break;
      case "verifier": navigate("/dashboard/verifier"); break;
      case "admin": navigate("/dashboard/admin"); break;
      default: navigate("/");
    }
  };

  const register = (
    data: Omit<User, "password" | "createdAt" | "lastLogin">,
    password: string
  ) => {
    const allUsers: User[] = JSON.parse(localStorage.getItem("eduaid-users") || "[]");
    const now = Date.now();

    const newUser: User = { ...data, password, createdAt: now, lastLogin: now };
    allUsers.push(newUser);

    localStorage.setItem("eduaid-users", JSON.stringify(allUsers));

    const safeUser: SafeUser = { ...newUser };
    delete (safeUser as any).password;
    localStorage.setItem("eduaid-current-user", JSON.stringify(safeUser));
    setUser(safeUser);

    roleRedirect(newUser.role);
  };

  const login = (email: string, password: string) => {
    const allUsers: User[] = JSON.parse(localStorage.getItem("eduaid-users") || "[]");
    const found = allUsers.find((u) => u.email === email && u.password === password);

    if (found) {
      const updated: User = { ...found, lastLogin: Date.now() };
      const updatedUsers = allUsers.map((u) => (u.email === email ? updated : u));
      localStorage.setItem("eduaid-users", JSON.stringify(updatedUsers));

      const safeUser: SafeUser = { ...updated };
      delete (safeUser as any).password;
      setUser(safeUser);
      localStorage.setItem("eduaid-current-user", JSON.stringify(safeUser));

      roleRedirect(updated.role);
    } else {
      alert("Invalid credentials");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("eduaid-current-user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
