import React, { useState, useCallback } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (base64: string, mimeType: string) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
      onImageSelect(result, file.type);
    };
    reader.readAsDataURL(file);
  }, [onImageSelect]);

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ease-in-out text-center cursor-pointer overflow-hidden ${
          isDragging
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={onInputChange}
        />

        {preview ? (
          <div className="relative h-64 w-full flex items-center justify-center">
             <img 
               src={preview} 
               alt="Preview" 
               className="max-h-full max-w-full object-contain rounded-lg shadow-sm"
             />
             <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                <p className="text-white font-medium">Click to change image</p>
             </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="bg-indigo-100 p-4 rounded-full mb-4">
              <Upload className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Upload your photo
            </h3>
            <p className="text-slate-500 text-sm max-w-xs mx-auto">
              Drag and drop or click to browse. Supported formats: JPG, PNG, WEBP.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};