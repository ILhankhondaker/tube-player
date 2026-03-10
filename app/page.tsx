'use client';

import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, Settings, Terminal, Layout, Files, Cpu, 
  Code2, RefreshCw, Command, Monitor, PlayCircle, 
  EyeOff, Laptop, BarChart3
} from 'lucide-react';

type LayoutMode = 'dev' | 'analytics' | 'cinema';

export default function Home() {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [videoWidth, setVideoWidth] = useState(100);
  const [layout, setLayout] = useState<LayoutMode>('dev');

  const extractYouTubeId = useCallback((youtubeUrl: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    ];
    for (const pattern of patterns) {
      const match = youtubeUrl.match(pattern);
      if (match) return match[1];
    }
    return null;
  }, []);

  const handleSync = () => {
    const id = extractYouTubeId(url);
    if (id) setVideoId(id);
  };

  // Panic Button Logic: Press "Escape" to hide everything
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLayout('dev');
        setVideoId(null);
        setUrl('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-500 flex ${
      layout === 'cinema' ? 'bg-[#050505]' : 'bg-[#0d1117]'
    }`}>
      
      {/* 1. SIDEBAR (Hidden in Cinema Mode) */}
      {layout !== 'cinema' && (
        <aside className="w-64 border-r border-white/5 bg-[#010409] hidden md:flex flex-col animate-in slide-in-from-left duration-300">
          <div className="p-4 flex items-center gap-2 text-white font-semibold border-b border-white/5">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <Cpu size={14} />
            </div>
            <span className="text-sm tracking-tight">{layout === 'dev' ? 'Core_Engine_v4' : 'Data_Metrics_v2'}</span>
          </div>
          <nav className="flex-1 p-4 space-y-4">
             {layout === 'dev' ? (
                <>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase text-slate-500 font-bold mb-2">Sources</p>
                    <div className="flex items-center gap-2 text-xs text-slate-300 p-2 bg-white/5 rounded border border-white/10"><Code2 size={14}/> Main.tsx</div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 p-2 hover:bg-white/5 rounded"><Files size={14}/> Utils.ts</div>
                  </div>
                </>
             ) : (
                <>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase text-slate-500 font-bold mb-2">Reports</p>
                    <div className="flex items-center gap-2 text-xs text-slate-300 p-2 bg-white/5 rounded border border-white/10"><BarChart3 size={14}/> Performance</div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 p-2 hover:bg-white/5 rounded"><Monitor size={14}/> Traffic</div>
                  </div>
                </>
             )}
          </nav>
        </aside>
      )}

      {/* 2. MAIN AREA */}
      <main className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-14 border-b border-white/5 bg-[#010409]/80 backdrop-blur-md flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-2 bg-[#161b22] border border-white/10 px-3 py-1.5 rounded-md w-full max-w-md">
              <Search size={14} className="text-slate-500" />
              <input 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSync()}
                placeholder={layout === 'cinema' ? "Paste Video URL..." : "Paste module source or search data..."} 
                className="bg-transparent border-none text-xs w-full outline-none text-slate-200"
              />
            </div>
          </div>

          {/* LAYOUT TOGGLE SYSTEM */}
          <div className="flex items-center gap-2 ml-4">
            <div className="flex bg-[#161b22] p-1 rounded-lg border border-white/10">
              <button 
                onClick={() => setLayout('dev')}
                className={`p-1.5 rounded-md transition-all ${layout === 'dev' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                title="Dev Mode"
              >
                <Terminal size={16} />
              </button>
              <button 
                onClick={() => setLayout('analytics')}
                className={`p-1.5 rounded-md transition-all ${layout === 'analytics' ? 'bg-green-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                title="Analytics Mode"
              >
                <Layout size={16} />
              </button>
              <button 
                onClick={() => setLayout('cinema')}
                className={`p-1.5 rounded-md transition-all ${layout === 'cinema' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                title="Cinema Mode"
              >
                <PlayCircle size={16} />
              </button>
            </div>
            <div className="h-6 w-[1px] bg-white/10 mx-2" />
            <Settings size={18} className="text-slate-500 cursor-pointer hover:text-white" />
          </div>
        </header>

        {/* Workspace Area */}
        <div className="flex-1 p-6 overflow-auto">
          <div className={`${layout === 'cinema' ? 'max-w-7xl' : 'max-w-5xl'} mx-auto space-y-6`}>
            
            {/* Context Header */}
            {layout !== 'cinema' && (
              <div className="flex items-end justify-between border-b border-white/5 pb-6">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    {layout === 'dev' ? 'System_Runtime_Preview' : 'Global_Data_Visualization'}
                    <span className="text-[10px] bg-white/5 text-slate-400 px-2 py-0.5 rounded border border-white/10 uppercase tracking-tighter">Live</span>
                  </h2>
                  <p className="text-slate-500 text-xs mt-1">ID: <code className="bg-white/5 px-1 rounded">{videoId || 'none'}</code></p>
                </div>
                <Button onClick={handleSync} className="bg-white/5 hover:bg-white/10 text-white text-xs border border-white/10 h-8">
                  <RefreshCw size={12} className="mr-2" /> {layout === 'dev' ? 'Sync Module' : 'Refresh Data'}
                </Button>
              </div>
            )}

            {/* Video Container */}
            <div className="flex flex-col items-center">
              {videoId ? (
                <div className="w-full space-y-4">
                  <div className={`flex items-center justify-between ${layout === 'cinema' ? 'hidden' : ''}`}>
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-slate-700" />
                      <div className="w-2 h-2 rounded-full bg-slate-700" />
                    </div>
                    <input 
                        type="range" min="30" max="100" 
                        value={videoWidth} 
                        onChange={(e) => setVideoWidth(parseInt(e.target.value))}
                        className="w-32 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-slate-400"
                    />
                  </div>

                  <div 
                    style={{ width: `${videoWidth}%` }}
                    className={`mx-auto aspect-video bg-black shadow-2xl transition-all duration-500 ease-in-out ${
                        layout === 'cinema' ? 'rounded-[2rem] border-white/5' : 'rounded-xl border-white/10 border'
                    }`}
                  >
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&autoplay=1`}
                      className="w-full h-full"
                      frameBorder="0"
                      allowFullScreen
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full aspect-video border border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center opacity-30">
                  <EyeOff size={48} className="mb-4 text-slate-700" />
                  <p className="text-xs uppercase tracking-[0.2em]">Waiting for input signal...</p>
                </div>
              )}
            </div>

            {/* Fake Logs/Footer (Only in Dev/Analytics) */}
            {layout !== 'cinema' && (
              <div className="bg-black/40 border border-white/5 rounded-lg p-4 font-mono text-[10px] text-slate-500 animate-pulse">
                <p>&gt; [SYSTEM] Layout state: {layout.toUpperCase()}</p>
                <p>&gt; [LOGS] Memory usage stable at 14.2%</p>
                <p>&gt; [INFO] Hot reload enabled for module {videoId || 'N/A'}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}