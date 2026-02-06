import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { loginUser, registerUser } from "../features/auth/services/auth.services";
import { AuthUser } from "../features/auth/utils/types";
import { getAuth, onAuthStateChanged, signOut, User, UserCredential } from "firebase/auth";

// 🔁 Convierte un User de Firebase a AuthUser
const mapFirebaseUserToAuthUser = (user: User): AuthUser => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
});

// 🔐 Tipos del contexto
interface AuthContextType {
  user: AuthUser | null;
  firebaseUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  reloadUser: () => Promise<void>;
}

// 🔁 Contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 🧠 Proveedor del contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true); // Opcional, útil si usas loader

  useEffect(() => {
    const auth = getAuth();

    // 🔄 Mantiene el estado sincronizado con Firebase Auth
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData = mapFirebaseUserToAuthUser(firebaseUser);
        setUser(userData);
        setFirebaseUser(firebaseUser);
      } else {
        setUser(null);
      }
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔑 Iniciar sesión
  const login = async (email: string, password: string) => {
    const userCredential: UserCredential = await loginUser(email, password);
    const userData = mapFirebaseUserToAuthUser(userCredential.user);
    setUser(userData); // Redundante pero útil si quieres efecto inmediato
  };

  // 📝 Registrar nuevo usuario
  const register = async (email: string, password: string) => {
    const userCredential: UserCredential = await registerUser(email, password);
    const userData = mapFirebaseUserToAuthUser(userCredential.user);
    setUser(userData);
  };

  // 🚪 Cerrar sesión
  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
    setUser(null); // Limpieza inmediata
  };

  // 🔁 Refrescar datos del usuario actual
  const reloadUser = async () => {};

  return (
    <AuthContext.Provider value={{ user, firebaseUser,  login, register, logout, reloadUser }}>
      {!isAuthLoading && children}
    </AuthContext.Provider>
  );
};

// 🎣 Hook personalizado para consumir el contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
