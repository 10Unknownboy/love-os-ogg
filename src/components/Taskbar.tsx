
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

const Taskbar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 glass-effect border-t border-love-200">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left side - Love OS branding */}
        <div className="flex items-center space-x-2">
          <Heart className="w-6 h-6 text-love-500 animate-pulse-heart" />
          <span className="text-love-700 font-bold text-lg">Love OS</span>
        </div>

        {/* Right side - Clock with animated heart */}
        <div className="flex items-center space-x-3 bg-white/20 rounded-lg px-4 py-2">
          <div className="text-right">
            <div className="text-love-700 font-bold text-lg">
              {formatTime(currentTime)}
            </div>
            <div className="text-love-500 text-sm">
              {formatDate(currentTime)}
            </div>
          </div>
          <Heart className="w-5 h-5 text-love-400 animate-pulse-heart" />
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
