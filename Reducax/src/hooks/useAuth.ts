import { useState, useEffect } from "react";

interface User {
  id: number;
  username: string;
  email: string;
  avatar?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula verificación de autenticación
    // En producción, aquí verificarías el token o sesión
    const checkAuth = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
};