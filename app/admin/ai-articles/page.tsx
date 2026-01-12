'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { supabase } from '@/lib/supabase/client';
import { localApi } from '@/lib/localApi';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { format } from 'date-fns';
import {
  ArrowLeft,
  Sparkles,
  Search,
  Clock,
  Zap,
  Calendar,
  Loader2,
  RefreshCw,
  Trash2,
  Plus,
  Globe,
  Bot,
  Newspaper,
  TrendingUp,
  Send,
  CheckCircle,
  XCircle,
  Rocket,
  Timer,
  Link2,
} from 'lucide-react';

interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  source: string;
  date?: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  actionResult?: any;
  timestamp: Date;
}

interface ScheduledPost {
  id: string;
  topic_category: string;
  scheduled_time: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  post_id?: string;
}

function AdminAIArticlesContent() {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'assistant' | 'autopost' | 'schedule'>('assistant');
  
  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `**Ready to publish!** Just tell me what to write about.

Examples:
- "Publish article about AI route optimization"
- "Embed this: https://example.com/article"
- "Search warehouse automation"

I'll publish immediately - no questions asked.`,
      timestamp: new Date(),
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  
  // Topic recommendations state
  const [recommendedTopics, setRecommendedTopics] = useState<SearchResult[]>([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  
  // Scheduling state
  const [schedules, setSchedules] = useState<ScheduledPost[]>([]);
  const [scheduleTime, setScheduleTime] = useState('');
  const [scheduleCategory, setScheduleCategory] = useState<'logistics' | 'ai' | 'both'>('both');
  const [loadingSchedules, setLoadingSchedules] = useState(false);

  // Auto-post state
  const [autoPostEnabled, setAutoPostEnabled] = useState(false);
  const [autoPostArticlesPerDay, setAutoPostArticlesPerDay] = useState(1);
  const [autoPostInterval, setAutoPostInterval] = useState(24);
  const [autoPostCategory, setAutoPostCategory] = useState<'logistics' | 'ai' | 'both'>('both');
  const [autoPostLoading, setAutoPostLoading] = useState(false);
  const [manualPostCount, setManualPostCount] = useState(1);
  const [manualPosting, setManualPosting] = useState(false);
  const [progressLog, setProgressLog] = useState<{step: string; message: string; status: string; timestamp: string}[]>([]);
  const [customTopic, setCustomTopic] = useState('');

  useEffect(() => {
    fetchSchedules();
    fetchAutoPostStatus();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const fetchAutoPostStatus = async () => {
    try {
      const data = await localApi.getAutoPostStatus();
      setAutoPostEnabled(data.enabled || false);
      setAutoPostArticlesPerDay(data.articlesPerDay || 1);
      setAutoPostInterval(data.intervalHours || 24);
      setAutoPostCategory(data.category || 'both');
    } catch (err) {
      console.log('Auto-post status not available');
    }
  };

  const fetchSchedules = async () => {
    if (!supabase) {
      setLoadingSchedules(false);
      return;
    }
    
    setLoadingSchedules(true);
    try {
      const { data, error } = await supabase
        .from('ai_article_schedules')
        .select('*')
        .order('scheduled_time', { ascending: true });
      
      if (error) throw error;
      setSchedules((data || []).map((item: any) => ({
        id: item.id,
        topic_category: item.topic_category,
        scheduled_time: item.scheduled_time,
        status: item.status as 'pending' | 'completed' | 'failed',
        created_at: item.created_at,
        post_id: item.post_id || undefined,
      })));
    } catch (err: any) {
      console.log('Schedules not available:', err.message);
    } finally {
      setLoadingSchedules(false);
    }
  };

  const toggleAutoPost = async () => {
    setAutoPostLoading(true);
    try {
      const newEnabled = !autoPostEnabled;
      const data = await localApi.configureAutoPost({
        enabled: newEnabled,
        articlesPerDay: autoPostArticlesPerDay,
        intervalHours: autoPostInterval,
        category: autoPostCategory,
        postImmediately: newEnabled,
      });
      
      setAutoPostEnabled(data.enabled);
      alert(newEnabled 
        ? `Auto-posting enabled! Will generate ${autoPostArticlesPerDay} article(s) every ${autoPostInterval} hours`
        : 'Auto-posting disabled'
      );
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setAutoPostLoading(false);
    }
  };

  const pollProgress = async () => {
    try {
      const data = await localApi.getProgress();
      if (data.log && data.log.length > 0) {
        setProgressLog(data.log);
      }
    } catch (err) {
      // Ignore
    }
  };

  const triggerManualPosts = async () => {
    if (!supabase) {
      alert('Database connection not available');
      return;
    }
    
    setManualPosting(true);
    setProgressLog([]);
    
    const progressInterval = setInterval(pollProgress, 1000);
    
    try {
      for (let i = 0; i < manualPostCount; i++) {
        setProgressLog(prev => [...prev, { step: 'generate', message: `Generating article ${i + 1}...`, status: 'running', timestamp: new Date().toISOString() }]);
        
        const genData = await localApi.generateCompleteArticle(
          i === 0 ? customTopic : undefined,
          autoPostCategory
        );
        
        if (!genData.success) throw new Error(genData.error);
        
        setProgressLog(prev => [...prev, { step: 'publish', message: 'Publishing...', status: 'running', timestamp: new Date().toISOString() }]);
        
        const { error } = await supabase
          .from('posts')
          .insert({
            title: genData.article.title,
            slug: genData.article.slug,
            excerpt: genData.article.excerpt,
            content: genData.article.content,
            cover_image: genData.article.cover_image || '',
            author: 'Structure AI',
            published: true,
          });
        
        if (error) throw error;
        
        setProgressLog(prev => [...prev, { step: 'done', message: `Published: "${genData.article.title}"`, status: 'complete', timestamp: new Date().toISOString() }]);
      }
      
      alert(`✅ Successfully created ${manualPostCount} article(s)!`);
      setCustomTopic('');
    } catch (err: any) {
      console.error('Error:', err);
      alert('Error: ' + err.message);
    } finally {
      clearInterval(progressInterval);
      setManualPosting(false);
    }
  };

  const getTopicRecommendations = async () => {
    setLoadingRecommendations(true);
    setChatLoading(true);
    
    const userMessage: ChatMessage = {
      role: 'user',
      content: 'Give me fresh topic recommendations for articles. Search for the latest trending news in logistics and AI.',
      timestamp: new Date(),
    };
    setChatMessages(prev => [...prev, userMessage]);

    try {
      const data = await localApi.chat(
        [...chatMessages, userMessage].map(m => ({
          role: m.role,
          content: m.content,
        }))
      );

      if (data.error) throw new Error(data.error);

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.message,
        actionResult: data.actionResult,
        timestamp: new Date(),
      };

      setChatMessages(prev => [...prev, assistantMessage]);

      if (data.actionResult?.type === 'search_results') {
        setRecommendedTopics(data.actionResult.results);
      }
    } catch (err: any) {
      console.error('Recommendation error:', err);
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: `⚠️ **Local Server Not Running**

Please start the local AI server:

\`\`\`
cd server && npm install && npm start
\`\`\`

The server should run on http://localhost:3001`,
        timestamp: new Date(),
      }]);
    } finally {
      setLoadingRecommendations(false);
      setChatLoading(false);
    }
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim() || chatLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: chatInput,
      timestamp: new Date(),
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setChatLoading(true);

    try {
      const data = await localApi.chat(
        [...chatMessages, userMessage].map(m => ({
          role: m.role,
          content: m.content,
        }))
      );

      if (data.error) throw new Error(data.error);

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.message,
        actionResult: data.actionResult,
        timestamp: new Date(),
      };

      setChatMessages(prev => [...prev, assistantMessage]);

      if (data.actionResult) {
        switch (data.actionResult.type) {
          case 'search_results':
            setRecommendedTopics(data.actionResult.results);
            break;
          case 'article_published':
            alert(`Article published: "${data.actionResult.title}"`);
            break;
        }
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: `❌ **Error:** ${err.message}

Make sure the local server is running: \`cd server && npm start\``,
        timestamp: new Date(),
      }]);
    } finally {
      setChatLoading(false);
    }
  };

  const createSchedule = async () => {
    if (!scheduleTime) {
      alert('Please select when you want the AI to post');
      return;
    }

    if (!supabase) {
      alert('Database connection not available');
      return;
    }

    try {
      const { error } = await supabase
        .from('ai_article_schedules')
        .insert({
          topic_category: scheduleCategory,
          scheduled_time: new Date(scheduleTime).toISOString(),
          status: 'pending',
        });

      if (error) throw error;

      alert('Schedule created! AI will generate and post an article at the scheduled time.');
      setScheduleTime('');
      fetchSchedules();
    } catch (err: any) {
      console.error('Schedule error:', err);
      alert('Failed to create schedule: ' + err.message);
    }
  };

  const deleteSchedule = async (id: string) => {
    if (!confirm('Delete this schedule?')) return;
    
    if (!supabase) {
      alert('Database connection not available');
      return;
    }
    
    try {
      const { error } = await supabase
        .from('ai_article_schedules')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchSchedules();
    } catch (err: any) {
      alert('Delete failed: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href="/admin/blog" className="text-gray-400 hover:text-white text-sm flex items-center gap-2 mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl">
                <Bot className="h-6 w-6 text-white" />
              </div>
              AI Article Generator
            </h1>
            <p className="text-gray-400 mt-2">
              Chat with AI to create articles, get recommendations, and schedule posts
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {[
              { id: 'assistant', label: 'AI Assistant', icon: Bot },
              { id: 'autopost', label: 'Auto-Post', icon: Rocket },
              { id: 'schedule', label: 'Schedules', icon: Calendar },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all ${
                  activeTab === tab.id
                    ? 'bg-violet-500/20 text-violet-400 border border-violet-500/50'
                    : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:border-gray-600'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* AI Assistant Tab */}
          {activeTab === 'assistant' && (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Chat Panel */}
              <div className="lg:col-span-2 bg-gray-900/50 backdrop-blur-xl border-2 border-violet-500/30 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-gray-800 bg-gradient-to-r from-violet-500/10 to-purple-500/10">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Bot className="h-5 w-5 text-violet-400" />
                    AI Content Assistant
                  </h2>
                  <p className="text-sm text-gray-400">Ask for topics, create articles, or schedule posts</p>
                </div>
                
                {/* Messages */}
                <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((message, idx) => (
                    <div
                      key={idx}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-cyan-500 text-white rounded-br-md'
                            : 'bg-gray-800 text-gray-100 rounded-bl-md'
                        }`}
                      >
                        <div className="text-sm prose prose-invert max-w-none">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                        <div className={`text-xs mt-2 ${message.role === 'user' ? 'text-cyan-200' : 'text-gray-500'}`}>
                          {format(message.timestamp, 'h:mm a')}
                        </div>
                      </div>
                    </div>
                  ))}
                  {chatLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-800 rounded-2xl rounded-bl-md px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin text-violet-400" />
                          <span className="text-sm text-gray-300">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-800 bg-gray-800/30">
                  <div className="flex gap-2">
                    <input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask for recommendations, create articles, or schedule posts..."
                      onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendChatMessage()}
                      disabled={chatLoading}
                      className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                    <button
                      onClick={sendChatMessage}
                      disabled={chatLoading || !chatInput.trim()}
                      className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 rounded-lg text-white transition-all disabled:opacity-50"
                    >
                      {chatLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </button>
                  </div>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    <button
                      onClick={getTopicRecommendations}
                      disabled={loadingRecommendations}
                      className="px-3 py-1 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm text-gray-300 flex items-center gap-1 transition-all"
                    >
                      {loadingRecommendations ? <Loader2 className="h-3 w-3 animate-spin" /> : <TrendingUp className="h-3 w-3" />}
                      Get Topics
                    </button>
                    <button
                      onClick={() => setChatInput('Publish an article about AI-powered logistics optimization')}
                      className="px-3 py-1 bg-violet-500/20 border border-violet-500/50 rounded-lg text-sm text-violet-400 flex items-center gap-1"
                    >
                      <Rocket className="h-3 w-3" />
                      Publish Article
                    </button>
                  </div>
                </div>
              </div>

              {/* Topic Recommendations Sidebar */}
              <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-gray-800">
                  <h2 className="text-lg font-semibold text-white flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-400" />
                      Trending Topics
                    </span>
                    <button onClick={getTopicRecommendations} disabled={loadingRecommendations} className="p-1 hover:bg-gray-800 rounded">
                      <RefreshCw className={`h-4 w-4 text-gray-400 ${loadingRecommendations ? 'animate-spin' : ''}`} />
                    </button>
                  </h2>
                </div>
                <div className="p-4 max-h-[450px] overflow-y-auto">
                  {recommendedTopics.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                      <Newspaper className="h-10 w-10 mb-2 opacity-50" />
                      <p className="text-sm text-center">Click "Get Topics" to load recommendations</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {recommendedTopics.map((topic, idx) => (
                        <div key={idx} className="p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-violet-500/50 transition-colors">
                          <h4 className="font-medium text-sm text-white line-clamp-2 mb-1">{topic.title}</h4>
                          <p className="text-xs text-gray-400 line-clamp-2 mb-2">{topic.snippet}</p>
                          <span className="px-2 py-0.5 bg-gray-700 rounded text-xs text-gray-300">{topic.source}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Auto-Post Tab */}
          {activeTab === 'autopost' && (
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Auto-Post Settings */}
              <div className="bg-gray-900/50 backdrop-blur-xl border-2 border-violet-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-violet-400" />
                    Auto-Post Settings
                  </h2>
                  <button
                    onClick={toggleAutoPost}
                    disabled={autoPostLoading}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      autoPostEnabled
                        ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                        : 'bg-gray-800 text-gray-400 border border-gray-700'
                    }`}
                  >
                    {autoPostEnabled ? 'Active' : 'Inactive'}
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Posts Per Day</label>
                    <select
                      value={autoPostArticlesPerDay}
                      onChange={(e) => setAutoPostArticlesPerDay(parseInt(e.target.value))}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    >
                      {[1, 2, 3, 4, 5].map(n => (
                        <option key={n} value={n}>{n} article(s)/day</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Interval (hours)</label>
                    <select
                      value={autoPostInterval}
                      onChange={(e) => setAutoPostInterval(parseInt(e.target.value))}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    >
                      {[1, 2, 4, 6, 8, 12, 24].map(n => (
                        <option key={n} value={n}>Every {n} hour(s)</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                    <select
                      value={autoPostCategory}
                      onChange={(e) => setAutoPostCategory(e.target.value as any)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    >
                      <option value="logistics">Logistics & Supply Chain</option>
                      <option value="ai">Artificial Intelligence</option>
                      <option value="both">AI + Logistics (Mixed)</option>
                    </select>
                  </div>

                  <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Timer className="h-4 w-4" />
                      <span>AI finds SEO topics, writes 1200+ word articles with cover images.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Manual Post */}
              <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-6">
                  <Zap className="h-5 w-5 text-amber-400" />
                  Publish Articles Now
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Custom Topic (Optional)</label>
                    <input
                      value={customTopic}
                      onChange={(e) => setCustomTopic(e.target.value)}
                      placeholder="e.g., How AI is revolutionizing last-mile delivery"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Leave empty for AI to pick trending SEO topics</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Number of Articles</label>
                    <select
                      value={manualPostCount}
                      onChange={(e) => setManualPostCount(parseInt(e.target.value))}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      {[1, 2, 3, 4, 5].map(n => (
                        <option key={n} value={n}>{n} article(s)</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={triggerManualPosts}
                    disabled={manualPosting}
                    className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {manualPosting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Generating {manualPostCount} article(s)...
                      </>
                    ) : (
                      <>
                        <Rocket className="h-4 w-4" />
                        Generate & Publish {manualPostCount} Article(s)
                      </>
                    )}
                  </button>

                  {/* Progress Log */}
                  {(manualPosting || progressLog.length > 0) && (
                    <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                      <h4 className="font-medium text-sm mb-3 flex items-center gap-2 text-white">
                        <Bot className="h-4 w-4 text-violet-400" />
                        Live Progress
                      </h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto font-mono text-xs">
                        {progressLog.map((log, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className={`flex-shrink-0 ${
                              log.status === 'complete' ? 'text-green-400' : 
                              log.status === 'error' ? 'text-red-400' : 
                              'text-blue-400'
                            }`}>
                              {log.status === 'complete' ? '✓' : log.status === 'error' ? '✗' : '→'}
                            </span>
                            <span className="text-gray-500">[{log.step}]</span>
                            <span className="text-gray-300">{log.message}</span>
                          </div>
                        ))}
                        {manualPosting && (
                          <div className="flex items-center gap-2 text-blue-400">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            <span>Processing...</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-6">
                  <Clock className="h-5 w-5 text-blue-400" />
                  Create Schedule
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Topic Category</label>
                    <select
                      value={scheduleCategory}
                      onChange={(e) => setScheduleCategory(e.target.value as any)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="logistics">Logistics & Supply Chain</option>
                      <option value="ai">Artificial Intelligence</option>
                      <option value="both">AI in Logistics (Combined)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Schedule Time</label>
                    <input
                      type="datetime-local"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      min={new Date().toISOString().slice(0, 16)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    onClick={createSchedule}
                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all"
                  >
                    <Plus className="h-4 w-4" />
                    Add Schedule
                  </button>
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-6">
                  <Calendar className="h-5 w-5 text-purple-400" />
                  Scheduled Posts
                </h2>
                <div className="max-h-[350px] overflow-y-auto">
                  {loadingSchedules ? (
                    <div className="flex items-center justify-center h-32">
                      <Loader2 className="h-6 w-6 animate-spin text-violet-400" />
                    </div>
                  ) : schedules.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                      <Clock className="h-12 w-12 mb-2 opacity-50" />
                      <p>No scheduled posts</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {schedules.map((schedule) => (
                        <div key={schedule.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                schedule.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                schedule.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                                'bg-gray-700 text-gray-300'
                              }`}>
                                {schedule.status}
                              </span>
                              <span className="px-2 py-0.5 bg-gray-700 rounded text-xs text-gray-300">
                                {schedule.topic_category}
                              </span>
                            </div>
                            <p className="text-sm font-medium text-white">
                              {format(new Date(schedule.scheduled_time), 'PPP p')}
                            </p>
                          </div>
                          <button
                            onClick={() => deleteSchedule(schedule.id)}
                            className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminAIArticles() {
  return (
    <ProtectedRoute>
      <AdminAIArticlesContent />
    </ProtectedRoute>
  );
}

