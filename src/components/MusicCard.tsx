
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Heart } from 'lucide-react';

interface Memory {
  id: number;
  image: string;
  title: string;
  song: string;
  audioSrc: string;
}

interface MusicCardProps {
  memory: Memory;
  index: number;
}

const MusicCard: React.FC<MusicCardProps> = ({ memory, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
      });

      audioRef.current.addEventListener('loadstart', () => {
        setIsLoading(true);
      });

      audioRef.current.addEventListener('canplay', () => {
        setIsLoading(false);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
    if (isFlipped && isPlaying) {
      handlePauseMusic();
    }
  };

  const handlePlayMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(console.error);
        setIsPlaying(true);
      }
    }
  };

  const handlePauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Waveform animation bars
  const WaveformAnimation = () => (
    <div className="flex items-center justify-center space-x-1 h-12">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={`bg-gradient-to-t from-pink-400 to-rose-500 rounded-full transition-all duration-300 ${
            isPlaying ? 'animate-pulse' : ''
          }`}
          style={{
            width: '3px',
            height: isPlaying ? `${Math.random() * 30 + 10}px` : '8px',
            animationDelay: `${i * 0.1}s`,
            animationDuration: `${0.5 + Math.random() * 0.5}s`
          }}
        />
      ))}
    </div>
  );

  return (
    <div 
      className="relative w-full h-80 perspective-1000 animate-bounce-in cursor-pointer"
      style={{ animationDelay: `${index * 0.2}s` }}
      onClick={handleCardClick}
    >
      <audio ref={audioRef} src={memory.audioSrc} preload="metadata" />
      
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
        isFlipped ? 'rotate-y-180' : ''
      }`}>
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
          <img 
            src={memory.image} 
            alt={memory.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-bold text-lg drop-shadow-lg">
              {memory.title}
            </h3>
            <p className="text-white/80 text-sm drop-shadow">
              Tap to reveal our song 🎵
            </p>
          </div>
          <Heart className="absolute top-4 right-4 text-white/80 animate-pulse" size={24} />
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-br from-pink-400 via-rose-400 to-purple-500">
          <div className="flex flex-col items-center justify-center h-full p-6 text-white text-center">
            <div className="bg-white/20 rounded-full p-4 mb-4 backdrop-blur-sm">
              <Heart className="text-white animate-pulse" size={32} />
            </div>
            
            <div className="mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 mb-2">
                <span className="text-xs font-semibold">NOW PLAYING</span>
              </div>
              <h3 className="font-bold text-lg mb-1">{memory.song}</h3>
              <p className="text-white/80 text-sm">Our Memory Soundtrack</p>
            </div>

            <WaveformAnimation />

            <button
              onClick={handlePlayMusic}
              disabled={isLoading}
              className="mt-4 bg-white/30 hover:bg-white/40 backdrop-blur-sm rounded-full p-4 transition-all duration-300 hover:scale-110 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="text-white" size={24} />
              ) : (
                <Play className="text-white ml-1" size={24} />
              )}
            </button>
            
            <p className="text-white/60 text-xs mt-3">
              Tap card again to flip back
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicCard;
