
import React from 'react';
import MusicCardGallery from '../components/MusicCardGallery';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-lavender-50 to-rose-100">
      <div className="text-center py-16 px-6">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent mb-6">
          Love OS
        </h1>
        <p className="text-xl text-gray-700 mb-12">
          Welcome to your personalized love experience
        </p>
      </div>
      
      {/* NOTE: Added MusicCardGallery to showcase the flip cards */}
      <MusicCardGallery />
    </div>
  );
};

export default Index;
