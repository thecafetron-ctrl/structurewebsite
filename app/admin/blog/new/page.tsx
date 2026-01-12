'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { ArrowLeft, Save } from 'lucide-react';

function AdminBlogEditorContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    published: true,
    author: 'Structure',
    cover_image: '',
    external_url: '',
  });

  const handleContentChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, content: value }));
  }, []);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('posts')
        .insert([formData]);

      if (error) throw error;
      router.push('/admin/blog');
    } catch (err: any) {
      console.error('Error saving post:', err);
      alert(err.message || 'Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/admin/blog" className="text-gray-400 hover:text-white text-sm flex items-center gap-2 mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-8">
            <h1 className="text-2xl font-bold text-white mb-8">Create New Post</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter post title"
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Slug *</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="post-slug"
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500">URL-friendly version (auto-generated but editable)</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Author *</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="Author name"
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Cover Image</label>
                <ImageUploader
                  onImageUploaded={(url) => setFormData(prev => ({ ...prev, cover_image: url }))}
                  currentImage={formData.cover_image}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Excerpt *</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Short summary for the blog list"
                  rows={3}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Content *</label>
                <RichTextEditor
                  value={formData.content}
                  onChange={handleContentChange}
                />
              </div>

              <div className="space-y-4 p-6 bg-gray-800/30 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white">External Article (Optional)</h3>
                <p className="text-sm text-gray-400">
                  If this is from another source, provide the URL. A "Read Original" button will be shown.
                </p>
                <input
                  type="url"
                  value={formData.external_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, external_url: e.target.value }))}
                  placeholder="https://example.com/article"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-900"
                />
                <label htmlFor="published" className="text-sm text-gray-300 cursor-pointer">
                  Publish post (make it visible to the public)
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg text-white font-medium flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="h-4 w-4" />
                  {loading ? 'Saving...' : 'Create Post'}
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/admin/blog')}
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-300 font-medium transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminBlogNew() {
  return (
    <ProtectedRoute>
      <AdminBlogEditorContent />
    </ProtectedRoute>
  );
}

