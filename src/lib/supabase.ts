import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export interface Lead {
  id?: string
  name: string
  email: string
  company?: string
  phone?: string
  volume?: string
  message?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  created_at?: string
}

// Helper para capturar UTM parameters
export function getUTMParams() {
  if (typeof window === 'undefined') return {}

  const urlParams = new URLSearchParams(window.location.search)
  return {
    utm_source: urlParams.get('utm_source') || undefined,
    utm_medium: urlParams.get('utm_medium') || undefined,
    utm_campaign: urlParams.get('utm_campaign') || undefined,
    utm_content: urlParams.get('utm_content') || undefined,
    utm_term: urlParams.get('utm_term') || undefined,
  }
}

// Helper para criar lead
export async function createLead(data: Lead) {
  const utmParams = getUTMParams()

  const { data: lead, error } = await supabase
    .from('leads')
    .insert([{ ...data, ...utmParams }])
    .select()
    .single()

  if (error) throw error
  return lead
}
