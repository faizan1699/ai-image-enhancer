import React, { useState } from 'react';
import { Download, Maximize2, X, RefreshCw } from 'lucide-react';

interface ResultDisplayProps {
  originalImage: string;
  generatedImage: string;
  onReset: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ 
  originalImage, 
  generatedImage,
  onReset
}) => {
  const [viewMode, setViewMode] = useState<'compare' | 'generated'>('generated');
  const [showModal, setShowModal] = useState(false);

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'enhanced-profile.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full animate-in fade-in zoom-in duration-500">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-semibold text-slate-800">Result</h3>
          <div className="flex space-x-2">
            <button 
              onClick={() => setViewMode(viewMode === 'compare' ? 'generated' : 'compare')}
              className="text-xs font-medium px-3 py-1.5 rounded-full bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
            >
              {viewMode === 'compare' ? 'Show Result Only' : 'Compare'}
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="relative group">
            {viewMode === 'compare' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Original</p>
                   <img src={originalImage} alt="Original" className="w-full rounded-lg shadow-sm" />
                </div>
                <div className="space-y-2">
                   <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider text-center">Enhanced</p>
                   <img src={generatedImage} alt="Generated" className="w-full rounded-lg shadow-md ring-2 ring-indigo-500/20" />
                </div>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                 <img src={generatedImage} alt="Generated" className="w-full object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                    <button 
                      onClick={() => setShowModal(true)}
                      className="bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 transition mr-4"
                    >
                      <Maximize2 className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={downloadImage}
                      className="bg-white text-indigo-600 p-3 rounded-full hover:bg-indigo-50 transition shadow-lg"
                    >
                      <Download className="w-6 h-6" />
                    </button>
                 </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 bg-slate-50 flex justify-center">
            <button 
              onClick={onReset}
              className="flex items-center space-x-2 text-slate-500 hover:text-indigo-600 transition-colors px-4 py-2 rounded-lg hover:bg-indigo-50"
            >
               <RefreshCw className="w-4 h-4" />
               <span>Start Over</span>
            </button>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200">
           <button 
             onClick={() => setShowModal(false)}
             className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
           >
             <X className="w-8 h-8" />
           </button>
           <img src={generatedImage} alt="Full view" className="max-h-[90vh] max-w-full rounded-lg shadow-2xl" />
        </div>
      )}
    </div>
  );
};