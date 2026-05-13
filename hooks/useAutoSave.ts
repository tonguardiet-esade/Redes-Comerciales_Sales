import { useState, useEffect, useRef, useCallback } from 'react';
import { ProjectData } from '../types';
import { updateProjectData } from '../lib/db';

const DEBOUNCE_MS = 2000;

export const useAutoSave = (projectId: string | null, currentData: ProjectData) => {
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);

  // Function to actually call the API
  const persistData = useCallback(async (id: string, data: ProjectData) => {
    setSaveStatus('saving');
    try {
      await updateProjectData(id, data);
      setSaveStatus('saved');
      setLastSaved(new Date().toLocaleTimeString());
      
      // Reset to idle after a moment to show the "Saved" tick
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Auto-save failed:', error);
      setSaveStatus('error');
    }
  }, []);

  useEffect(() => {
    // Skip the first render (initial load) to avoid saving what we just fetched
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!projectId) return;

    // Cancel previous timer
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timer (Debounce)
    setSaveStatus('idle'); // Or 'pending' if you want to show "Wait..."
    timeoutRef.current = setTimeout(() => {
      persistData(projectId, currentData);
    }, DEBOUNCE_MS);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentData, projectId, persistData]);

  return { saveStatus, lastSaved };
};