import React, { useState } from 'react';

function LoadPlaylist() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    setError('');
  };

  const parseM3U = (data) => {
    const lines = data.split('\n');
    const channelsData = [];
    let currentChannel = null;

    lines.forEach(line => {
      if (line.startsWith('#EXTINF')) {
        if (currentChannel) channelsData.push(currentChannel);
        const name = line.split(',')[1];
        currentChannel = { name };
      } else if (line.startsWith('http') || line.startsWith('www')) {
        if (currentChannel) currentChannel.url = line;
      }
    });

    if (currentChannel) channelsData.push(currentChannel);
    return channelsData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!file && !url) {
      setError('Por favor, selecciona un archivo o pega una URL.');
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const channelsData = parseM3U(reader.result);
        setChannels(channelsData);
      };
      reader.readAsText(file);
    }

    if (url) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.text();
          const channelsData = parseM3U(data);
          setChannels(channelsData);
        } else {
          setError('No se pudo obtener la lista desde la URL.');
        }
      } catch (err) {
        setError('Error al cargar la lista desde la URL.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <div className="bg-gradient-to-br from-red-800 via-red-950 to-black p-10 rounded-2xl shadow-2xl max-w-md w-full text-center border border-red-700">
        <h2 className="text-3xl font-bold mb-4">Sube tu lista IPTV</h2>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-4 max-w-md w-full">
          <div>
            <label className="block text-sm font-semibold mb-2">Sube un archivo .m3u</label>
            <input
              type="file"
              accept=".m3u"
              onChange={handleFileChange}
              className="px-4 py-2 bg-black text-white border border-red-500 rounded-full w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">O pega una URL</label>
            <input
              type="text"
              value={url}
              onChange={handleUrlChange}
              placeholder="https://tusitio.com/lista.m3u"
              className="px-4 py-2 bg-black text-white border border-red-500 rounded-full w-full"
            />
          </div>
          <button type="submit" className="bg-red-600 hover:bg-red-700 transition-all px-6 py-2 rounded-full font-semibold shadow-md">
            Cargar Lista
          </button>
        </form>

        {error && <p className="text-red-600 mt-4">{error}</p>}

        {channels.length > 0 && (
          <div className="mt-6 text-left">
            <h3 className="text-xl font-bold">Canales</h3>
            <ul className="mt-4 space-y-2">
              {channels.map((channel, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
                  <span>{channel.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoadPlaylist;
