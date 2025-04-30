import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Asegúrate de que esta importación sea correcta
import { useNavigate } from 'react-router-dom';
import { getUserRole } from '../firebase';  // Función para obtener el rol del usuario (ajústala según tu estructura)

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Aquí obtenemos el rol del usuario desde la base de datos de Firebase
      const role = await getUserRole(user.uid);  // Aquí debes tener una función que recupere el rol

      // Guardar el rol en el usuario actual para uso posterior
      user.role = role;  // Agregar el rol al objeto usuario

      // Redirigir al usuario según su rol
      if (role === 'admin') {
        navigate('/admin'); // Redirigir al admin
      } else {
        navigate('/cargar'); // Redirigir a la carga de listas para el resto de usuarios
      }
    } catch (error) {
      console.error("Error al iniciar sesión: ", error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Iniciar sesión</h2>
        <div>
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
