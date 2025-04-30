import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";

const AdminUsuariosPendientes = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendientes = async () => {
    setLoading(true);
    const auth = getAuth();
    const token = await auth.currentUser.getIdToken();

    const res = await axios.get("http://localhost:3001/api/usuarios/pendientes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUsuarios(res.data);
    setLoading(false);
  };

  const autorizarUsuario = async (id, uid) => {
    const auth = getAuth();
    const token = await auth.currentUser.getIdToken();

    await axios.put(`http://localhost:3001/api/usuarios/${id}/autorizar`, { uid }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchPendientes(); // Recargar la lista
  };

  const eliminarUsuario = async (id) => {
    const auth = getAuth();
    const token = await auth.currentUser.getIdToken();

    await axios.delete(`http://localhost:3001/api/usuarios/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchPendientes(); // Recargar la lista
  };

  useEffect(() => {
    fetchPendientes();
  }, []);

  if (loading) return <p className="text-center mt-8 text-white">Cargando usuarios...</p>;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h2 className="text-3xl font-bold mb-4 text-red-500">Usuarios pendientes</h2>
      {usuarios.length === 0 ? (
        <p className="text-gray-400">No hay usuarios pendientes.</p>
      ) : (
        <table className="w-full border border-red-700 rounded overflow-hidden">
          <thead className="bg-red-800 text-white">
            <tr>
              <th className="py-2 px-4 border-b border-red-700">Correo</th>
              <th className="py-2 px-4 border-b border-red-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id} className="text-center">
                <td className="py-2 px-4 border-b border-red-700">{usuario.email}</td>
                <td className="py-2 px-4 border-b border-red-700">
                  <button
                    onClick={() => autorizarUsuario(usuario.id, usuario.uid)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded mr-2"
                  >
                    Autorizar
                  </button>
                  <button
                    onClick={() => eliminarUsuario(usuario.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsuariosPendientes;
