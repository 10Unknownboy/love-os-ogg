import React, { useEffect, useState } from 'react';
import EnhancedMusicCard from './EnhancedMusicCard';

interface SongMetadata {
  title: string;
  artist: string;
  filename: string;
}

const MusicCardGallery: React.FC = () => {
  const [musicMemories, setMusicMemories] = useState<(SongMetadata & { image: string; localAudioSrc: string })[]>([]);

  useEffect(() => {
    fetch('/files/database/metadata.json')
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch metadata: ${res.statusText}`);
        return res.json();
      })
      .then(data => {
        if (!data.songs || !Array.isArray(data.songs)) throw new Error('Missing songs array');
        const memories = data.songs
          .map((item: SongMetadata, index: number) => ({
            ...item,
            image: `/files/database/images/memory${index + 1}.jpg`,
            localAudioSrc: `/files/database/songs/${item.filename}`,
          }))
          .filter((mem: SongMetadata) => mem.title.trim() !== '' || mem.artist.trim() !== '');
        setMusicMemories(memories);
      })
      .catch(err => {
        console.error('Error loading metadata:', err);
        setMusicMemories([]);
      });
  }, []);

  return (
    <div className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
            Memory Music Gallery 🎵
          </h2>
          <p className="text-xl text-gray-700">Flip the cards to play our favorite songs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {musicMemories.length > 0 ? (
            musicMemories.map((memory, index) => (
              <EnhancedMusicCard
                key={index}
                image={memory.image}
                title={memory.title}
                artist={memory.artist}
                localAudioSrc={memory.localAudioSrc}
                index={index}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">Loading music memories...</p>
          )}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg">Each card holds a special memory with its soundtrack 💕</p>
        </div>
      </div>
    </div>
  );
};

export default MusicCardGallery;