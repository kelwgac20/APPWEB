import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import logo from './assets/logo.png';

import LoadPlaylist from './LoadPlaylist';
import Login from './pages/Login';
import Register from './pages/Register';

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

// 🔐 Ruta protegida para usuarios autenticados
function PrivateRoute({ user, children }) {
  return user ? children : <Navigate to="/login" />;
}

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const navigate = useNavigate();

  // Evitar mostrar la intro por más tiempo de lo necesario
  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Verificar el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoadingAuth(false); // Ahora se marca como cargado solo cuando el auth state cambia
    });
    return () => unsubscribe();
  }, []);

  // Cerrar sesión
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("👋 Usuario cerrado sesión");
        navigate('/login'); // Redirige a login después de cerrar sesión
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  // Mostrar loading mientras se verifica la autenticación
  if (loadingAuth) return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">
      Cargando...
    </div>
  );

  // Mostrar la intro solo cuando el usuario aún no esté autenticado
  if (showIntro) return <SplashScreen />;

  return (
    <div>
      {/* Botón para cerrar sesión */}
      {user && (
        <button
          className="p-2 bg-red-600 text-white rounded-md absolute top-4 right-4"
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          element={<Navigate to={user ? "/cargar" : "/login"} />}
        />
      </Routes>
    </div>
  );
}

export default App;
