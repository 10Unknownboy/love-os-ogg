import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface LockScreenProps {
  onUnlock: () => void;
}

const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognitionConstructor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognitionConstructor();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript.toLowerCase().trim();
        setTranscript(transcript);
        
        if (transcript.includes('open')) {
          setIsListening(false);
          recognition.stop();
          setTimeout(() => {
            onUnlock();
          }, 1000);
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      setRecognition(recognition);
    }
  }, [onUnlock]);

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      setIsListening(false);
      recognition.stop();
    }
  };

  // Create floating hearts
  const hearts = Array.from({ length: 6 }, (_, i) => (
    <div
      key={i}
      className={`absolute text-love-300 text-2xl animate-float`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`
      }}
    >
      💕
    </div>
  ));

  return (
    <div className="min-h-screen bg-love-gradient flex items-center justify-center relative overflow-hidden">
      {hearts}
      
      <div className="text-center z-10 animate-fade-in-up">
        <div className="mb-8">
          <Heart className="mx-auto text-love-500 w-24 h-24 animate-pulse-heart" />
        </div>
        
        <h1 className="text-6xl font-bold text-love-700 mb-4 text-shadow">
          Love OS
        </h1>
        
        <div className="glass-effect rounded-2xl p-8 mx-4 max-w-md">
          <p className="text-2xl text-love-600 mb-6 font-semibold">
            Locked with Love 💝
          </p>
          
          <p className="text-love-500 mb-8">
            Say "I love you" to unlock your heart
          </p>
          
          {!isListening ? (
            <button
              onClick={startListening}
              className="bg-love-500 hover:bg-love-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🎤 Start Voice Unlock
            </button>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-3 h-3 bg-love-500 rounded-full animate-pulse"></div>
                <span className="text-love-600">Listening for your sweet voice...</span>
              </div>
              
              {transcript && (
                <p className="text-sm text-love-400 italic">
                  "{transcript}"
                </p>
              )}
              
              <button
                onClick={stopListening}
                className="bg-love-300 hover:bg-love-400 text-love-700 px-6 py-2 rounded-full transition-all duration-300"
              >
                Stop Listening
              </button>
            </div>
          )}
        </div>
        <p className="text-love-500 mt-6 text-sm">
          Made with love
        </p>
      </div>
    </div>
  );
};

export default LockScreen;


