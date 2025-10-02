
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Music, Volume2 } from 'lucide-react';

interface EnhancedMusicCardProps {
  image: string;
  title: string;
  artist: string;
  spotifyUrl?: string;
  localAudioSrc?: string;
  index?: number;
}

const EnhancedMusicCard: React.FC<EnhancedMusicCardProps> = ({ 
  image, 
  title, 
  artist, 
  spotifyUrl, 
  localAudioSrc,
  index = 0 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
    
    // If flipping back to front, pause the music
    if (isFlipped && isPlaying) {
      handlePauseMusic();
    }
  };

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Try Spotify first, fallback to local audio
      if (spotifyUrl) {
        // Open Spotify in new tab
        window.open(spotifyUrl, '_blank');
        setIsPlaying(true);
      } else if (localAudioSrc) {
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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  // Animated waveform bars
  const WaveformVisualization = () => (
    <div className="flex items-center justify-center space-x-1 h-16 my-4">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className={`bg-gradient-to-t from-pink-400 via-rose-500 to-purple-500 rounded-full transition-all duration-300 ${
            isPlaying ? 'animate-pulse' : ''
          }`}
          style={{
            width: '4px',
            height: isPlaying ? `${Math.random() * 40 + 15}px` : '12px',
            animationDelay: `${i * 0.1}s`,
            animationDuration: `${0.8 + Math.random() * 0.6}s`
          }}
        />
      ))}
    </div>
  );

  return (
    <div 
      className="relative w-80 h-96 perspective-1000 cursor-pointer group"
      style={{ animationDelay: `${index * 0.15}s` }}
      onClick={handleCardClick}
    >
      {/* Hidden audio element for local playback */}
      {localAudioSrc && (
        <audio ref={audioRef} src={localAudioSrc} preload="metadata" />
      )}
      
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
        isFlipped ? 'rotate-y-180' : ''
      }`}>
        
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 bg-gradient-to-br from-pink-100 to-rose-100">
          <div className="relative h-2/3 overflow-hidden">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="font-bold text-xl mb-2 drop-shadow-lg">
              {title}
            </h3>
            <p className="text-white/90 text-sm mb-3 drop-shadow">
              by {artist}
            </p>
            <div className="flex items-center gap-2 text-white/80 text-xs">
              <Music size={16} />
              <span>Tap to play music 🎵</span>
            </div>
          </div>
          
          {/* Floating music note animation */}
          <div className="absolute top-4 right-4 text-white/70 animate-float">
            <Volume2 size={24} />
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500">
          <div className="flex flex-col items-center justify-center h-full p-8 text-white text-center relative">
            
            {/* Now Playing Badge */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-white/30 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold tracking-wide">NOW PLAYING</span>
              </div>
            </div>

            {/* Album Art Placeholder */}
            <div className="w-24 h-24 bg-white/20 rounded-2xl mb-6 flex items-center justify-center backdrop-blur-sm">
              <Music className="text-white/80" size={32} />
            </div>
            
            {/* Song Info */}
            <h3 className="font-bold text-2xl mb-2 text-center leading-tight">
              {title}
            </h3>
            <p className="text-white/90 text-lg mb-6">
              {artist}
            </p>

            {/* Waveform Visualization */}
            <WaveformVisualization />

            {/* Progress Bar (for local audio) */}
            {localAudioSrc && duration > 0 && (
              <div className="w-full mb-4">
                <div className="flex justify-between text-xs text-white/70 mb-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-white rounded-full h-2 transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            )}

            {/* Play/Pause Button */}
            <button
              onClick={handlePlayPause}
              disabled={isLoading}
              className="bg-white/30 hover:bg-white/40 backdrop-blur-sm rounded-full p-5 transition-all duration-300 hover:scale-110 disabled:opacity-50 mb-4"
            >
              {isLoading ? (
                <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="text-white" size={32} />
              ) : (
                <Play className="text-white ml-1" size={32} />
              )}
            </button>
            
            {/* Service indicator */}
            <p className="text-white/60 text-xs">
              {spotifyUrl ? 'Playing on Spotify' : 'Local audio'}
            </p>
            
            <p className="text-white/50 text-xs mt-2">
              Tap card to flip back
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedMusicCard;
