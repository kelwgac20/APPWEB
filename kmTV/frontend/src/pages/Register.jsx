// src/pages/Register.jsx
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/cargar');
    } catch (err) {
      setError('Error al crear la cuenta. Inténtalo con otro correo.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="bg-gradient-to-br from-red-800 via-red-950 to-black p-10 rounded-2xl shadow-2xl max-w-md w-full border border-red-700">
        <img src={logo} alt="kmTV Logo" className="w-24 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4 text-center">Registrarse</h2>
        {error && <p className="text-red-400 mb-4 text-sm text-center">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full px-4 py-2 rounded bg-black border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full px-4 py-2 rounded bg-black border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            className="w-full px-4 py-2 rounded bg-black border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition-all py-2 rounded font-semibold"
          >
            Crear cuenta
          </button>
        </form>
        <p className="text-sm mt-4 text-center">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-red-400 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
