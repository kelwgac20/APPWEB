import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Asegúrate de tener la configuración de Firebase bien
import logo from "../assets/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/cargar"); // Redirige al usuario a la pantalla de cargar lista
    } catch (err) {
      setError("Error al iniciar sesión: " + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-4">
      <div className="bg-gradient-to-br from-red-800 via-red-950 to-black p-10 rounded-2xl shadow-2xl max-w-md w-full text-center border border-red-700">
        <img
          src={logo}
          alt="kmTV Logo"
          className="w-32 mx-auto mb-6 drop-shadow-lg"
        />
        <h1 className="text-4xl font-extrabold tracking-wide mb-4">
          Bienvenido a <span className="text-red-500">kmTV</span>
        </h1>
        <p className="text-gray-300 mb-6">Inicia sesión para continuar.</p>

        {/* Formulario de inicio de sesión */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-700 focus:outline-none"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Contraseña */}
          <div>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-700 focus:outline-none"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Mostrar el error si lo hay */}
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}

          {/* Botón de login */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition-all px-6 py-2 rounded-full font-semibold shadow-md"
          >
            Iniciar sesión
          </button>
        </form>

        {/* Enlace al registro */}
        <p className="text-sm mt-4 text-gray-300">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-red-400 hover:text-red-600 font-semibold underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
