// src/pages/PlayerTest.jsx
import React from 'react';
import VideoPlayer from '../components/VideoPlayer';

const PlayerTest = () => {
  const testStream = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'; // Canal de prueba

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4 text-red-500">Reproductor kmTV</h1>
      <VideoPlayer src={testStream} />
    </div>
  );
};

export default PlayerTest;
