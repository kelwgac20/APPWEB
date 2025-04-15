// src/components/AuthWrapper.jsx
import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const AuthWrapper = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleAuth = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <>
      {isRegistering ? (
        <Register onSwitch={toggleAuth} />
      ) : (
        <Login onSwitch={toggleAuth} />
      )}
    </>
  );
};

export default AuthWrapper;
