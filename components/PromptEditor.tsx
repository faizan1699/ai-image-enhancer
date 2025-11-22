import React from 'react';
import { Sparkles } from 'lucide-react';

interface PromptEditorProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  disabled: boolean;
}

export const PromptEditor: React.FC<PromptEditorProps> = ({ 
  prompt, 
  setPrompt, 
  onGenerate,
  isLoading,
  disabled
}) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center space-x-2 text-indigo-900 font-semibold">
        <Sparkles className="w-5 h-5 text-indigo-600" />
        <span>How should we enhance it?</span>
      </div>
      <textarea
        className="w-full p-4 rounded-xl border border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none h-32 text-slate-700"
        placeholder="Describe how you want to change the background..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={onGenerate}
        disabled={disabled || isLoading}
        className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
          disabled || isLoading
            ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-indigo-500/30 hover:scale-[1.02]'
        }`}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Generating...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            <span>Enhance Photo</span>
          </>
        )}
      </button>
    </div>
  );
};