import { useState, useEffect } from 'react';
import { GeneratedApp } from '../types/aiGenerator';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'generatedApps';

export const useGeneratedApps = () => {
  const [apps, setApps] = useState<GeneratedApp[]>([]);

  useEffect(() => {
    loadApps();
  }, []);

  const loadApps = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedApps = JSON.parse(stored);
        // Convert date strings back to Date objects
        const appsWithDates = parsedApps.map((app: any) => ({
          ...app,
          createdAt: new Date(app.createdAt)
        }));
        setApps(appsWithDates);
      }
    } catch (error) {
      console.error('Error loading generated apps:', error);
      setApps([]);
    }
  };

  const saveApp = (
    name: string,
    description: string,
    htmlContent: string,
    prompt: string,
    category?: string
  ): GeneratedApp => {
    const newApp: GeneratedApp = {
      id: uuidv4(),
      name,
      description,
      htmlContent,
      createdAt: new Date(),
      prompt,
      category
    };

    const updatedApps = [newApp, ...apps];
    setApps(updatedApps);
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedApps));
    } catch (error) {
      console.error('Error saving app:', error);
    }

    return newApp;
  };

  const deleteApp = (id: string) => {
    const updatedApps = apps.filter(app => app.id !== id);
    setApps(updatedApps);
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedApps));
    } catch (error) {
      console.error('Error deleting app:', error);
    }
  };

  const updateApp = (id: string, updates: Partial<GeneratedApp>) => {
    const updatedApps = apps.map(app => 
      app.id === id ? { ...app, ...updates } : app
    );
    setApps(updatedApps);
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedApps));
    } catch (error) {
      console.error('Error updating app:', error);
    }
  };

  const getApp = (id: string): GeneratedApp | undefined => {
    return apps.find(app => app.id === id);
  };

  const clearAllApps = () => {
    setApps([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing apps:', error);
    }
  };

  return {
    apps,
    saveApp,
    deleteApp,
    updateApp,
    getApp,
    clearAllApps,
    loadApps
  };
};