import React, { createContext, useState, useEffect, ReactNode } from "react";
import { loginUser, registerUser } from "../features/auth/services/auth.services";
import { AuthUser } from "../features/auth/utils/types";
import { UserCredential } from "firebase/auth";

// Función para mapear el usuario de Firebase a AuthUser
const mapFirebaseUserToAuthUser = (userCredential: UserCredential): AuthUser => {
  const user = userCredential.user;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
};

// Definir los tipos para el contexto
interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Componente de proveedor del contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  // Almacenar el usuario en el estado y en localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Función de login
  const login = async (email: string, password: string) => {
    try {
      const userCredential = await loginUser(email, password);
      const userData = mapFirebaseUserToAuthUser(userCredential);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  // Función de registro
  const register = async (email: string, password: string) => {
    try {
      const userCredential = await registerUser(email, password);
      const userData = mapFirebaseUserToAuthUser(userCredential);
      setUser(userData);
    } catch (error) {
      console.error("Error al registrarse:", error);
    }
  };

  // Función de logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto de forma sencilla
export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
