// src/contexts/AuthContext.tsx
import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

type User = {
  name: string;
  email: string;
  role: 'student' | 'sponsor' | 'verifier' | 'admin';
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => void;
  register: (user: User, password: string) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = (email: string, password: string) => {
    const storedUser = JSON.parse(localStorage.getItem(email) || '{}');
    if (storedUser?.email === email) {
      setUser(storedUser);
      navigate(`/dashboard/${storedUser.role}`);
    }
  };

  const register = (newUser: User, password: string) => {
    localStorage.setItem(newUser.email, JSON.stringify(newUser));
    setUser(newUser);
    navigate(`/dashboard/${newUser.role}`);
  };

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
