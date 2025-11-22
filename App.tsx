import React, { useState } from 'react';
import { ImageUpload } from './components/ImageUpload';
import { PromptEditor } from './components/PromptEditor';
import { ResultDisplay } from './components/ResultDisplay';
import { generateEditedImage } from './services/gemini';
import { AppState } from './types';
import { Layers, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>(
    "Change the background of this image to be a modern, bright IT company office with glass walls and tech vibes. The person is a software engineer. Keep the person intact and realistic, just replace the outdoor background."
  );
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (base64: string, type: string) => {
    setOriginalImage(base64);
    setMimeType(type);
    setError(null);
  };

  const handleGenerate = async () => {
    if (!originalImage || !prompt) return;

    setAppState(AppState.LOADING);
    setError(null);

    try {
      const result = await generateEditedImage(originalImage, mimeType, prompt);
      setGeneratedImage(result);
      setAppState(AppState.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setError("Failed to generate image. Please try again. " + (err.message || ''));
      setAppState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setAppState(AppState.IDLE);
    setGeneratedImage(null);
    // We keep the original image and prompt for easier retry/adjustments
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-2 rounded-lg text-white">
               <Layers className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-violet-700">
              DevProfile
            </span>
            <span className="bg-indigo-50 text-indigo-700 text-xs px-2 py-0.5 rounded-full font-medium border border-indigo-100">
              AI Enhanced
            </span>
          </div>
          <a 
            href="#" 
            className="text-slate-500 hover:text-indigo-600 text-sm font-medium transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            By Gemini 2.5
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Intro */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Professionalize Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              Profile Photo
            </span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Upload your casual photo and let our AI transform the background into a professional tech environment instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Controls */}
          <div className="lg:col-span-5 space-y-8">
            
            <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <span className="bg-indigo-100 text-indigo-600 w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">1</span>
                Upload Photo
              </h2>
              <ImageUpload onImageSelect={handleImageSelect} />
            </section>

            <section className={`bg-white rounded-2xl shadow-sm border border-slate-100 p-6 transition-opacity duration-300 ${!originalImage ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <span className="bg-indigo-100 text-indigo-600 w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">2</span>
                Customize & Generate
              </h2>
              <PromptEditor 
                prompt={prompt} 
                setPrompt={setPrompt} 
                onGenerate={handleGenerate}
                isLoading={appState === AppState.LOADING}
                disabled={!originalImage}
              />
            </section>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div className="bg-indigo-50 rounded-xl p-4 flex items-start space-x-3">
              <Zap className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-indigo-800">
                <p className="font-semibold mb-1">Pro Tip</p>
                <p>Ensure the subject is well-lit and clearly visible for the best background replacement results.</p>
              </div>
            </div>

          </div>

          {/* Right Column: Preview / Results */}
          <div className="lg:col-span-7">
             {appState === AppState.SUCCESS && generatedImage && originalImage ? (
                <ResultDisplay 
                  originalImage={originalImage}
                  generatedImage={generatedImage}
                  onReset={handleReset}
                />
             ) : (
                <div className="h-full min-h-[500px] bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                   {appState === AppState.LOADING ? (
                      <div className="flex flex-col items-center animate-pulse">
                         <div className="w-24 h-24 bg-slate-200 rounded-full mb-4"></div>
                         <div className="h-4 bg-slate-200 rounded w-48 mb-2"></div>
                         <div className="h-3 bg-slate-200 rounded w-32"></div>
                         <p className="mt-8 text-indigo-600 font-medium">Magic is happening...</p>
                      </div>
                   ) : (
                      <>
                        <div className="w-64 h-48 bg-slate-200 rounded-lg mb-6 opacity-50 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-150%] animate-[shimmer_2s_infinite]"></div>
                        </div>
                        <h3 className="text-xl font-semibold text-slate-500 mb-2">Ready to Transform</h3>
                        <p className="max-w-xs mx-auto">Upload an image and click Enhance to see the professional result here.</p>
                      </>
                   )}
                </div>
             )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;