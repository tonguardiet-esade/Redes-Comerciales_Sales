import { en } from './i18n/en';
import { Session } from '@supabase/supabase-js';

export type Language = 'en' | 'es' | 'ca' | 'fr' | 'de' | 'it';
export type Theme = 'light' | 'dark';

export type Translations = typeof en & {
    userDropdown: {
        name: string;
        editProfile: string;
        logout: string;
    },
    webinarModal: {
        title: string;
        subtitle: string;
        generatorTitle: string;
        managerTitle: string;
        accessButton: string;
    },
    automationModal: {
        title: string;
        subtitle: string;
        hubspotTitle: string;
        linkedinTitle: string;
        gmailTitle: string;
        accessButton: string;
        comingSoon: string;
    },
    login: {
      welcomeTitle: string;
      welcomeSubtitle: string;
      emailLabel: string;
      emailPlaceholder: string;
      passwordLabel: string;
      passwordPlaceholder: string;
      forgotPassword: string;
      submitButton: string;
      submitting: string;
      errorGeneric: string;
      errorInvalidLogin: string;
    }
};

export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translations;
}

export interface User {
  id: string;
  email?: string;
  username?: string; // Kept for compatibility if we store it in metadata
  user_metadata?: {
    [key: string]: any;
  };
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// --- DB PERSISTENCE TYPES ---

export interface ProjectSettings {
  language: Language;
  theme: Theme;
}

export interface ProjectMetadata {
  source: string;
  version: string;
}

export interface ProjectData {
  settings?: ProjectSettings;
  metadata?: ProjectMetadata;
  [key: string]: any; // Flexible JSONB
}

export interface Project {
  id: string;
  user_id: string;
  project_name: string;
  current_step: number;
  last_modified: string;
  created_at: string;
  project_data: ProjectData;
}