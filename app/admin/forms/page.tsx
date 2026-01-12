'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { ArrowLeft, Users, Loader2, Mail, Phone, Building2, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface LeadForm {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  scale: string;
  ai_area: string;
  timeline: string;
  created_at: string;
  source_url: string | null;
}

function AdminFormsContent() {
  const [leads, setLeads] = useState<LeadForm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('lead_forms')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (err: any) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Link href="/admin" className="text-gray-400 hover:text-white text-sm flex items-center gap-2 mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Users className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Form Submissions</h1>
              <p className="text-gray-400">View and manage lead capture submissions</p>
            </div>
          </div>

          {loading ? (
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-12 text-center">
              <Loader2 className="h-8 w-8 animate-spin text-cyan-400 mx-auto" />
            </div>
          ) : leads.length === 0 ? (
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-12 text-center">
              <Users className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No form submissions yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {leads.map((lead) => (
                <div key={lead.id} className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{lead.full_name}</h3>
                      <p className="text-gray-400 text-sm">{lead.role} at {lead.company}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      {format(new Date(lead.created_at), 'PPP p')}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-cyan-400" />
                      <a href={`mailto:${lead.email}`} className="text-cyan-400 hover:text-cyan-300">{lead.email}</a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-green-400" />
                      <a href={`tel:${lead.phone}`} className="text-green-400 hover:text-green-300">{lead.phone}</a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="h-4 w-4 text-purple-400" />
                      <span className="text-gray-300">{lead.scale}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-amber-400" />
                      <span className="text-gray-300">{lead.timeline}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm">
                      {lead.ai_area}
                    </span>
                    {lead.source_url && (
                      <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-lg text-sm">
                        Source: {lead.source_url}
                      </span>
                    )}
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

export default function AdminForms() {
  return (
    <ProtectedRoute>
      <AdminFormsContent />
    </ProtectedRoute>
  );
}

