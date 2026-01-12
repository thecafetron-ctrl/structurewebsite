'use client';

export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { 
  FileText, 
  Users, 
  Bot, 
  ChevronRight,
  Loader2
} from 'lucide-react';

function AdminDashboardContent() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({ posts: 0, leads: 0, schedules: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/admin/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    
    try {
      const [postsRes, leadsRes, schedulesRes] = await Promise.all([
        supabase.from('posts').select('id', { count: 'exact', head: true }),
        supabase.from('lead_forms').select('id', { count: 'exact', head: true }),
        supabase.from('ai_article_schedules').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
      ]);

      setStats({
        posts: postsRes.count || 0,
        leads: leadsRes.count || 0,
        schedules: schedulesRes.count || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  if (!user) return null;

  const menuItems = [
    {
      title: 'Newsletter',
      description: 'Manage blog posts and articles',
      icon: FileText,
      href: '/admin/blog',
      stat: `${stats.posts} posts`,
      color: 'bg-cyan-500/10 text-cyan-400',
    },
    {
      title: 'Form Submissions',
      description: 'View lead capture submissions',
      icon: Users,
      href: '/admin/forms',
      stat: `${stats.leads} leads`,
      color: 'bg-purple-500/10 text-purple-400',
    },
    {
      title: 'AI Articles',
      description: 'Schedule AI-generated content',
      icon: Bot,
      href: '/admin/ai-articles',
      stat: `${stats.schedules} pending`,
      color: 'bg-green-500/10 text-green-400',
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <header className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-10">
        <div className="container max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your content and leads</p>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-4">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-4 md:p-6 flex items-center gap-4 hover:bg-gray-800/50 hover:-translate-y-0.5 transition-all cursor-pointer">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-400 hidden sm:block">{item.stat}</span>
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}

