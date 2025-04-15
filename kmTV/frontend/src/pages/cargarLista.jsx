import React from 'react';

const CargarLista = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl text-red-500 font-bold mb-4">Carga tu lista IPTV</h1>
      <p className="text-gray-400">Aquí podrás subir un archivo .m3u o ingresar una URL.</p>
    </div>
  );
};

export default CargarLista;
