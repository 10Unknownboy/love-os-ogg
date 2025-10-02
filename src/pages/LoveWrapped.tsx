import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageSquare, Phone, Calendar, X } from 'lucide-react';
import MusicCardGallery from '../components/MusicCardGallery';

const LoveWrapped: React.FC = () => {
  const navigate = useNavigate();
  const [showMemories, setShowMemories] = useState(false);
  const [relationshipStats, setRelationshipStats] = useState<any[]>([]);

  useEffect(() => {
    fetch('/files/database/metadata.json')
      .then(res => res.json())
      .then(data => {
        if (data.stats && Array.isArray(data.stats)) {
          setRelationshipStats(data.stats);
        }
      })
      .catch(err => {
        console.error('Error loading stats metadata:', err);
      });
  }, []);

  const getProgressPercentage = (value: string, max: number) => {
    const numValue = parseInt(value.replace(/,/g, ''));
    return Math.min((numValue / max) * 100, 100);
  };

  const renderStatCard = (stat: any, index: number) => {
    const isProgress = stat.type === 'progress';
    const isCounter = stat.type === 'counter';

    return (
      <div
        key={index}
        className="glass-effect rounded-3xl p-8 text-center group cursor-pointer hover:scale-105 transition-all duration-500 animate-bounce-in border border-pink-200/30 shadow-lg"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="text-6xl mb-4 group-hover:animate-pulse">
          {stat.icon}
        </div>
        <h3 className="text-xl font-bold text-gray-700 mb-2">
          {stat.title}
        </h3>

        {isProgress ? (
          <div className="mb-4">
            <p className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
              {stat.value}
            </p>
            <div className="w-full bg-pink-100 rounded-full h-3 mb-2">
              <div
                className="bg-gradient-to-r from-pink-500 to-rose-500 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${getProgressPercentage(stat.value, stat.max)}%`,
                  animationDelay: `${index * 0.2}s`
                }}
              />
            </div>
            <div className="text-xs text-gray-500">
              {getProgressPercentage(stat.value, stat.max).toFixed(1)}% of max
            </div>
          </div>
        ) : isCounter ? (
          <div className="mb-4">
            <div className="text-6xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2 animate-pulse">
              {stat.value}
            </div>
          </div>
        ) : (
          <p className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-3">
            {stat.value}
          </p>
        )}

        <p className="text-gray-600 text-sm italic">
          {stat.subtitle}
        </p>
      </div>
    );
  };

  // MemoriesSection definition omitted for brevity. Include from your original code.

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-lavender-50 to-rose-100 overflow-x-hidden">
      {/* Header section omitted for brevity */}

      {/* MusicCards */}
      <MusicCardGallery />

      {/* Memories Heart Button */}
      {/* Existing memories button code */}

      {/* Stats Dashboard section */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="text-center mb-12">
          <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Love Analytics Dashboard 📊
          </h3>
          <p className="text-xl text-gray-700">
            Your relationship by the numbers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relationshipStats.length > 0
            ? relationshipStats.map((stat, index) => renderStatCard(stat, index))
            : <p>Loading stats...</p>
          }
        </div>
      </div>

      {/* Footer and memories modal as in your original code */}
    </div>
  );
};

export default LoveWrapped;
