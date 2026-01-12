'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { Plus, Edit, LogOut, Trash2, Sparkles, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

interface Post {
  id: string;
  title: string;
  slug: string;
  created_at: string;
  published: boolean;
}

function AdminBlogContent() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { signOut } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('id, title, slug, created_at, published')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err: any) {
      console.error('Error fetching posts:', err);
      alert('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchPosts();
    } catch (err: any) {
      console.error('Error deleting post:', err);
      alert('Failed to delete post');
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link href="/admin" className="text-gray-400 hover:text-white text-sm flex items-center gap-2 mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-white mb-2">Newsletter Dashboard</h1>
              <p className="text-gray-400">Manage your newsletter posts</p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/admin/ai-articles"
                className="px-4 py-2 bg-gradient-to-r from-purple-600/20 to-violet-600/20 border border-purple-500/50 hover:border-purple-400 rounded-lg text-purple-400 font-medium flex items-center gap-2 transition-all"
              >
                <Sparkles className="h-4 w-4" />
                AI Articles
              </Link>
              <Link
                href="/admin/blog/new"
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg text-white font-medium flex items-center gap-2 transition-all"
              >
                <Plus className="h-4 w-4" />
                New Post
              </Link>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-300 font-medium flex items-center gap-2 transition-all"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>

          {loading ? (
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-12 text-center">
              <p className="text-gray-400">Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-12 text-center">
              <p className="text-gray-400 mb-4">No posts yet. Create your first post!</p>
              <Link
                href="/admin/blog/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg text-white font-medium transition-all"
              >
                <Plus className="h-4 w-4" />
                Create Post
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-white mb-2">{post.title}</h2>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <span>{format(new Date(post.created_at), 'MMM d, yyyy')}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          post.published 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-gray-700 text-gray-400'
                        }`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/blog/edit/${post.id}`}
                        className="px-3 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-300 text-sm font-medium flex items-center gap-2 transition-all"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
                        className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminBlog() {
  return (
    <ProtectedRoute>
      <AdminBlogContent />
    </ProtectedRoute>
  );
}

