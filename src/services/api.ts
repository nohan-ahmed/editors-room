import { supabase } from '../lib/supabase';

export interface Project {
  id: string;
  display_id: string;
  title: string;
  category: string;
  image_url: string;
  year: string;
  description: string;
  is_featured: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url: string;
  linkedin_url?: string;
  twitter_url?: string;
  github_url?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar_url: string;
  rating: number;
}

export const api = {
  storage: {
    getOptimizedUrl: (path: string, options: { width?: number; quality?: number } = {}) => {
      const { width = 800, quality = 80 } = options;
      const baseUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/render/image/public`;
      return `${baseUrl}/${path}?width=${width}&quality=${quality}`;
    }
  },
  projects: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data as Project[];
    },
    getFeatured: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_featured', true)
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data as Project[];
    }
  },
  team: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data as TeamMember[];
    }
  },
  testimonials: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data as Testimonial[];
    }
  }
};
