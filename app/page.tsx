'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Home() {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [videoWidth, setVideoWidth] = useState(100); // percentage

  const extractYouTubeId = (youtubeUrl: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
    ];

    for (const pattern of patterns) {
      const match = youtubeUrl.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const handlePlay = () => {
    const id = extractYouTubeId(url);
    if (id) {
      setVideoId(id);
    } else {
      alert('Please enter a valid YouTube URL');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlePlay();
    }
  };

  const decreaseWidth = () => {
    setVideoWidth((prev) => Math.max(prev - 10, 30));
  };

  const increaseWidth = () => {
    setVideoWidth((prev) => Math.min(prev + 10, 100));
  };

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center px-2 py-8">
      <div className="w-full flex flex-col items-center gap-8">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            YouTube Player
          </h1>
          <p className="text-gray-400 text-lg">
            Paste a YouTube link to watch.
          </p>
        </div>

        {/* Input Section */}
        <div className="w-full flex flex-col sm:flex-row gap-3">
          <Input
            type="text"
            placeholder="Paste a YouTube link to watch."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-gray-900 border-gray-700 text-white placeholder-gray-500 rounded-lg h-12 text-base"
          />
          <Button
            onClick={handlePlay}
            className="bg-white text-black hover:bg-gray-200 font-semibold rounded-lg h-12 px-8 transition-colors"
          >
            Play Video
          </Button>
        </div>

        {/* Video Player Section */}
        {videoId && (
          <div className="flex flex-col items-center gap-4 w-full">
            {/* Resize Controls */}
            <div className="flex gap-3">
              <Button
                onClick={decreaseWidth}
                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg px-6 transition-colors"
              >
                − Decrease
              </Button>
              <span className="text-white font-semibold flex items-center px-4">
                {videoWidth}%
              </span>
              <Button
                onClick={increaseWidth}
                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg px-6 transition-colors"
              >
                + Increase
              </Button>
            </div>

            {/* Video Player */}
            <div
              style={{ width: `${videoWidth}%` }}
              className="aspect-video rounded-lg overflow-hidden shadow-2xl bg-gray-900 transition-all duration-300 mx-auto"
            >
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        )}
        
        {!videoId && (
          <div className="w-full aspect-video rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center">
            <p className="text-gray-500 text-center">
              Enter a YouTube link and click Play to watch
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
