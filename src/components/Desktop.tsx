
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Taskbar from './Taskbar';

const Desktop: React.FC = () => {
  const navigate = useNavigate();

  const apps = [
    {
      id: 'love-wrapped',
      name: 'Love Wrapped 2025',
      icon: '📦',
      route: '/love-wrapped'
    },
    // NOTE: Removed 'dna-of-us' and 'future-vault' apps as requested
    {
      id: 'guess-moment',
      name: 'Guess the Moment',
      icon: '🧠',
      route: '/guess-moment'
    },
    {
      id: 'terminal-love',
      name: 'Terminal of Love',
      icon: '💻',
      route: '/terminal-love'
    }
  ];

  const handleAppClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-love-gradient relative overflow-hidden">
      {/* Floating hearts background */}
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          className="absolute text-love-200 text-xl animate-float opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        >
          💕
        </div>
      ))}

      {/* Desktop content */}
      <div className="pt-8 pl-8 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-4xl">
          {apps.map((app, index) => (
            <div
              key={app.id}
              className="flex flex-col items-center cursor-pointer group animate-bounce-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleAppClick(app.route)}
            >
              <div className="w-20 h-20 glass-effect rounded-2xl flex items-center justify-center text-4xl mb-2 group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg">
                {app.icon}
              </div>
              <span className="text-love-700 text-sm font-medium text-center leading-tight group-hover:text-love-800 transition-colors">
                {app.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Taskbar />
    </div>
  );
};

export default Desktop;
