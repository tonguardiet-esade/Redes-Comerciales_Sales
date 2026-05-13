import { supabase } from './supabaseClient';
import { Project, ProjectData } from '../types';

const SCHEMA_NAME = 'SalesWin';
const TABLE_NAME = 'SW-SalesWin_Home_projects';

/**
 * Initializes or retrieves the user's "Home" project state.
 * If no record exists, it creates a default one.
 */
export const ensureUserProject = async (userId: string): Promise<Project | null> => {
  try {
    // 1. Try to fetch existing project in the SalesWin schema
    const { data, error } = await supabase
      .schema(SCHEMA_NAME)
      .from(TABLE_NAME)
      .select('*')
      .eq('user_id', userId)
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error fetching project:', error);
      return null;
    }

    // 2. If exists, return it
    if (data) {
      return data as Project;
    }

    // 3. If not, create default
    const defaultData: ProjectData = {
      settings: {
        language: 'es',
        theme: 'light'
      },
      metadata: {
        version: '1.0',
        source: 'SalesWin Home'
      }
    };

    const { data: newData, error: createError } = await supabase
      .schema(SCHEMA_NAME)
      .from(TABLE_NAME)
      .insert([
        {
          user_id: userId,
          project_name: 'SalesWin Dashboard',
          current_step: 1,
          project_data: defaultData
        }
      ])
      .select()
      .single();

    if (createError) {
      console.error('Error creating default project:', createError);
      return null;
    }

    return newData as Project;
  } catch (e) {
    console.error('Unexpected error in ensureUserProject:', e);
    return null;
  }
};

/**
 * Updates the project_data JSONB column.
 * Uses the ID to ensure we are updating the correct record.
 */
export const updateProjectData = async (projectId: string, data: ProjectData) => {
  // We perform a patch update on the JSONB column
  
  const { error } = await supabase
    .schema(SCHEMA_NAME)
    .from(TABLE_NAME)
    .update({ 
      project_data: data,
      last_modified: new Date().toISOString() 
    })
    .eq('id', projectId);

  if (error) {
    throw new Error(error.message);
  }
  
  return true;
};