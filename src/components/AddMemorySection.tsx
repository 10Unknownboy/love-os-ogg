
import React, { useState } from 'react';
import { Upload, Plus, Heart, X } from 'lucide-react';

interface CustomMemory {
  id: string;
  title: string;
  image: string;
  audioFile: File | null;
}

const AddMemorySection: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [customMemories, setCustomMemories] = useState<CustomMemory[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    audioFile: null as File | null
  });

  React.useEffect(() => {
    const saved = localStorage.getItem('loveWrappedMemories');
    if (saved) {
      try {
        const memories = JSON.parse(saved);
        setCustomMemories(memories.filter((m: CustomMemory) => m.image && m.title));
      } catch (error) {
        console.error('Error loading saved memories:', error);
      }
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          image: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        audioFile: file
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.image) {
      const newMemory: CustomMemory = {
        id: Date.now().toString(),
        title: formData.title,
        image: formData.image,
        audioFile: formData.audioFile
      };

      const updatedMemories = [...customMemories, newMemory];
      setCustomMemories(updatedMemories);
      
      // Save to localStorage (without the audio file for storage limitations)
      const memoriesToSave = updatedMemories.map(m => ({
        id: m.id,
        title: m.title,
        image: m.image,
        audioFile: null // Don't store file in localStorage
      }));
      localStorage.setItem('loveWrappedMemories', JSON.stringify(memoriesToSave));

      // Reset form
      setFormData({
        title: '',
        image: '',
        audioFile: null
      });
      setShowForm(false);
    }
  };

  const removeMemory = (id: string) => {
    const updatedMemories = customMemories.filter(m => m.id !== id);
    setCustomMemories(updatedMemories);
    localStorage.setItem('loveWrappedMemories', JSON.stringify(updatedMemories));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 pb-16">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Create Your Own Memory 💕
        </h2>
        <p className="text-xl text-gray-700 mb-6">
          Add a special moment with your favorite song
        </p>
        
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-3 mx-auto"
          >
            <Plus size={24} />
            Add New Memory
          </button>
        ) : (
          <div className="glass-effect rounded-3xl p-8 max-w-2xl mx-auto border border-pink-200/30 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-700">New Memory</h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Memory Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Our First Concert"
                  className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:border-pink-400 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Memory Image
                </label>
                <div className="border-2 border-dashed border-pink-300 rounded-xl p-6 text-center hover:border-pink-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                    required
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    {formData.image ? (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg mx-auto mb-2"
                      />
                    ) : (
                      <Upload className="mx-auto text-pink-400 mb-2" size={48} />
                    )}
                    <p className="text-gray-600">
                      {formData.image ? 'Change Image' : 'Upload Image'}
                    </p>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Memory Song (Optional)
                </label>
                <div className="border-2 border-dashed border-pink-300 rounded-xl p-4 text-center hover:border-pink-400 transition-colors">
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioUpload}
                    className="hidden"
                    id="audio-upload"
                  />
                  <label htmlFor="audio-upload" className="cursor-pointer">
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                      <Upload size={20} />
                      {formData.audioFile ? formData.audioFile.name : 'Upload Song (.mp3, .wav, etc.)'}
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Create Memory ✨
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Display Custom Memories */}
      {customMemories.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-center text-gray-700 mb-8">
            Your Custom Memories 💝
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customMemories.map((memory) => (
              <div
                key={memory.id}
                className="glass-effect rounded-2xl overflow-hidden shadow-lg border border-pink-200/30 group"
              >
                <div className="relative">
                  <img
                    src={memory.image}
                    alt={memory.title}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => removeMemory(memory.id)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-gray-700 mb-2">{memory.title}</h4>
                  <div className="flex items-center gap-2 text-pink-500">
                    <Heart size={16} />
                    <span className="text-sm">Custom Memory</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMemorySection;
