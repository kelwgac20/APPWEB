// src/components/RoleProtectedRoute.jsx

import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRole } from '../services/firebase';
import { auth } from '../firebase'; // Tu instancia de firebase auth

const RoleProtectedRoute = ({ children, requiredRole }) => {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRole = await getUserRole(user.uid);
        console.log("Rol del usuario:", userRole); // <-- CONSOLE LOG AQUI
        setRole(userRole);
      }
      setLoading(false);
    };

    fetchUserRole();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex justify-center items-center">Cargando permisos...</div>;
  }

  if (role !== requiredRole) {
    console.warn("Acceso denegado. Rol requerido:", requiredRole, "Rol actual:", role);
    return <Navigate to="/cargar" />;
  }

  return children;
};

export default RoleProtectedRoute;
