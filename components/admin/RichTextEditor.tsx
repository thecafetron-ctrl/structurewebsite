'use client';

import { useRef, useMemo, useCallback, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const quillRef = useRef<any>(null);
  const [ReactQuill, setReactQuill] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    import('react-quill').then((mod) => {
      setReactQuill(() => mod.default);
    });
  }, []);

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('blog-content')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('blog-content')
          .getPublicUrl(filePath);

        const quill = quillRef.current?.getEditor?.();
        if (quill) {
          const range = quill.getSelection(true);
          if (range) {
            quill.insertEmbed(range.index, 'image', publicUrl);
            quill.setSelection(range.index + 1, 0);
          }
        }
      } catch (error: any) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image: ' + error.message);
      }
    };
    
    input.click();
  }, []);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'align': [] }],
        ['blockquote', 'code-block'],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), [imageHandler]);

  const formats = useMemo(() => [
    'header', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list', 'bullet', 'indent',
    'align',
    'blockquote', 'code-block',
    'link', 'image'
  ], []);

  if (!mounted || !ReactQuill) {
    return <div className="h-64 bg-gray-100 rounded animate-pulse" />;
  }

  return (
    <div className="rich-text-editor bg-white rounded-lg overflow-hidden">
      <ReactQuill
        forwardedRef={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder="Start writing your blog post..."
        className="min-h-[300px]"
      />
      <style jsx global>{`
        .rich-text-editor .ql-toolbar {
          background: #f8f9fa;
          border-color: #e5e7eb;
        }
        .rich-text-editor .ql-container {
          font-size: 16px;
          min-height: 300px;
        }
        .rich-text-editor .ql-editor {
          min-height: 300px;
        }
      `}</style>
    </div>
  );
};

