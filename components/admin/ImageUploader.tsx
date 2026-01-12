'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { ImagePlus, Loader2, X } from 'lucide-react';

interface ImageUploaderProps {
  onImageUploaded: (url: string) => void;
  currentImage?: string;
}

export const ImageUploader = ({ onImageUploaded, currentImage }: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPG, PNG, WEBP)');
      return;
    }

    const client = supabase;
    if (!client) {
      alert('Image uploads are not configured (missing Supabase environment variables).');
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `images/${fileName}`;

      const { error: uploadError } = await client.storage
        .from('blog-content')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = client.storage
        .from('blog-content')
        .getPublicUrl(filePath);

      setPreview(publicUrl);
      onImageUploaded(publicUrl);
    } catch (error: any) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onImageUploaded('');
  };

  return (
    <div className="space-y-4">
      {preview ? (
        <div className="relative group">
          <img 
            src={preview} 
            alt="Cover preview" 
            className="w-full max-h-96 object-contain rounded-lg border-2 border-gray-700 bg-gray-800"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
            Remove
          </button>
        </div>
      ) : (
        <>
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <div className={`cursor-pointer w-full h-32 border-2 border-dashed border-gray-600 hover:border-cyan-400 rounded-lg flex flex-col items-center justify-center gap-2 transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {uploading ? (
                <>
                  <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
                  <span className="text-gray-400">Uploading image...</span>
                </>
              ) : (
                <>
                  <ImagePlus className="h-8 w-8 text-gray-400" />
                  <span className="text-gray-400">Upload Cover Image</span>
                  <span className="text-xs text-gray-500">JPG, PNG, or WEBP</span>
                </>
              )}
            </div>
          </label>
        </>
      )}
    </div>
  );
};

