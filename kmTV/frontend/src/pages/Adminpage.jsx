import { useEffect, useState } from 'react';

function AdminPage() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch('/api/users', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // o tu método actual
      }
    })
      .then(res => res.json())
      .then(data => setUsuarios(data));
  }, []);

  const cambiarRol = (uid, nuevoRol) => {
    fetch(`/api/auth/role/${uid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ newRole: nuevoRol })
    })
      .then(res => res.json())
      .then(() => {
        alert('✅ Rol actualizado');
        window.location.reload();
      });
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl mb-4">👑 Panel de Admin</h1>
      <ul>
        {usuarios.map((u) => (
          <li key={u.uid} className="mb-2">
            {u.email} - Rol actual: <strong>{u.role}</strong>
            <button
              className="ml-4 bg-blue-600 px-3 py-1 rounded"
              onClick={() => cambiarRol(u.uid, u.role === 'admin' ? 'cliente' : 'admin')}
            >
              Cambiar a {u.role === 'admin' ? 'cliente' : 'admin'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;
