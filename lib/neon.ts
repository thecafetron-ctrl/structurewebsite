import { neon } from '@neondatabase/serverless';

// Get the database URL from environment variables
const DATABASE_URL = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;

if (!DATABASE_URL) {
  console.warn('Warning: DATABASE_URL or NEON_DATABASE_URL not set');
}

// Create a SQL query function
export const sql = DATABASE_URL ? neon(DATABASE_URL) : null;

// Types for the leads table
export interface PlaybookLead {
  id?: number;
  full_name: string;
  email: string;
  company: string;
  role: string;
  company_size: string;
  phone?: string;
  source: string;
  created_at?: string;
  status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  notes?: string;
}

// Helper function to insert a lead
export async function insertLead(lead: Omit<PlaybookLead, 'id' | 'created_at'>): Promise<PlaybookLead | null> {
  if (!sql) {
    console.error('Database not configured');
    return null;
  }

  try {
    const result = await sql`
      INSERT INTO playbook_leads (full_name, email, company, role, company_size, phone, source, status)
      VALUES (${lead.full_name}, ${lead.email}, ${lead.company}, ${lead.role}, ${lead.company_size}, ${lead.phone || null}, ${lead.source}, 'new')
      RETURNING *
    `;
    return result[0] as PlaybookLead;
  } catch (error) {
    console.error('Error inserting lead:', error);
    throw error;
  }
}

// Helper function to get all leads
export async function getLeads(): Promise<PlaybookLead[]> {
  if (!sql) {
    console.error('Database not configured');
    return [];
  }

  try {
    const result = await sql`
      SELECT * FROM playbook_leads 
      ORDER BY created_at DESC
    `;
    return result as PlaybookLead[];
  } catch (error) {
    console.error('Error fetching leads:', error);
    throw error;
  }
}

// Helper function to update lead status
export async function updateLeadStatus(id: number, status: PlaybookLead['status'], notes?: string): Promise<PlaybookLead | null> {
  if (!sql) {
    console.error('Database not configured');
    return null;
  }

  try {
    const result = await sql`
      UPDATE playbook_leads 
      SET status = ${status}, notes = COALESCE(${notes || null}, notes)
      WHERE id = ${id}
      RETURNING *
    `;
    return result[0] as PlaybookLead;
  } catch (error) {
    console.error('Error updating lead:', error);
    throw error;
  }
}
