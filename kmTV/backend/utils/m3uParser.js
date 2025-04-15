import fs from 'fs';

export const parseM3U = async (data, isRaw = false) => {
  const content = isRaw ? data : fs.readFileSync(data, 'utf-8');

  const channels = [];
  const lines = content.split('\n');

  let current = {};

  for (const line of lines) {
    if (line.startsWith('#EXTINF:')) {
      const nameMatch = line.match(/,(.*)/);
      current.name = nameMatch ? nameMatch[1].trim() : 'Sin nombre';
    } else if (line.startsWith('http')) {
      current.url = line.trim();
      channels.push({ ...current });
      current = {};
    }
  }

  return channels;
};
