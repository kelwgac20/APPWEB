import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Welcome = () => {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate('/cargar-lista'); // Ruta a la pantalla de carga
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
      <img src={logo} alt="kmTV Logo" className="w-40 mb-6 drop-shadow-xl" />
      <h1 className="text-4xl font-bold text-red-600 mb-2">Bienvenido a kmTV</h1>
      <p className="mb-8 text-gray-300">Tu centro de entretenimiento IPTV</p>
      <button
        onClick={handleEnter}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-xl shadow-lg transition-all"
      >
        Entrar
      </button>
    </div>
  );
};

export default Welcome;
