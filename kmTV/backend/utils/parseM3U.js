export const parseM3U = (content) => {
    const lines = content.split('\n');
    const channels = [];
  
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
  
      if (line.startsWith('#EXTINF')) {
        const nextLine = lines[i + 1]?.trim();
        const channel = {
          name: '',
          url: '',
          logo: '',
          group: '',
        };
  
        // Extraer info con regex
        const nameMatch = line.match(/,(.*)$/);
        const logoMatch = line.match(/tvg-logo="(.*?)"/);
        const groupMatch = line.match(/group-title="(.*?)"/);
  
        channel.name = nameMatch ? nameMatch[1] : 'Sin nombre';
        channel.logo = logoMatch ? logoMatch[1] : null;
        channel.group = groupMatch ? groupMatch[1] : null;
        channel.url = nextLine || '';
  
        if (channel.url && channel.url.startsWith('http')) {
          channels.push(channel);
        }
      }
    }
  
    return channels;
  };
  