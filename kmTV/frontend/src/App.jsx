import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';

// Importación de componentes y páginas
import logo from './assets/logo.png';
import LoadPlaylist from './LoadPlaylist';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPage from './pages/AdminPage';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import AdminUsuariosPendientes from './pages/AdminUsuariosPendientes';
import PlayerTest from './pages/PlayerTest';

// Pantalla de introducción (Splash Screen)
function SplashScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="animate-crtFlash text-center">
        <img src={logo} alt="kmTV Logo" className="w-40 mx-auto drop-shadow-2xl mb-6" />
        <h1 className="text-red-600 text-4xl font-bold tracking-widest animate-pulse">kmTV</h1>
      </div>
    </div>
  );
}

// Ruta protegida básica
function PrivateRoute({ user, children }) {
  return user ? children : <Navigate to="/login" />;
}

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const navigate = useNavigate();

  // Mostrar splash screen al inicio
  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Escuchar autenticación con Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  // Cerrar sesión
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("👋 Usuario cerró sesión");
        navigate('/login');
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  // Mientras carga autenticación
  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        Cargando...
      </div>
    );
  }

  // Mostrar pantalla de introducción
  if (showIntro) return <SplashScreen />;

  // Ruta por defecto según estado del usuario
  const defaultRoute = user ? "/cargar" : "/login";

  return (
    <div>
      {/* Botón de cerrar sesión si está autenticado */}
      {user && (
        <button
          className="p-2 bg-red-600 text-white rounded-md absolute top-4 right-4 z-50"
          onClick={handleSignOut}
        >
          Cerrar sesión
        </button>
      )}

      <Routes>
        <Route
          path="/cargar"
          element={
            <PrivateRoute user={user}>
              <LoadPlaylist />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <RoleProtectedRoute requiredRole="admin">
              <AdminPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/admin/usuarios"
          element={
            <RoleProtectedRoute requiredRole="admin">
              <AdminUsuariosPendientes />
            </RoleProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/test" element={<PlayerTest />} />
        <Route path="*" element={<Navigate to={defaultRoute} />} />
      </Routes>
    </div>
  );
}

export default App;
