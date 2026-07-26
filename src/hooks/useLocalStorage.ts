import { useEffect, useState } from 'react';

const KOSTUDY_STORAGE_EVENT = 'kostudy-local-storage';
type LocalStorageDetail = { key: string; value: unknown };

export function useLocalStorage<T>(key: string, initialValue: T) {
  const readValue = (): T => {
    if (typeof window === 'undefined') return initialValue;
    try { const item = window.localStorage.getItem(key); return item ? JSON.parse(item) : initialValue; }
    catch (error) { console.warn(`Error reading localStorage key "${key}":`, error); return initialValue; }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = (value: T | ((previous: T) => T)) => {
    try {
      setStoredValue((previous) => {
        const next = value instanceof Function ? value(previous) : value;
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(next));
          window.dispatchEvent(new CustomEvent<LocalStorageDetail>(KOSTUDY_STORAGE_EVENT, { detail: { key, value: next } }));
        }
        return next;
      });
    } catch (error) { console.warn(`Error setting localStorage key "${key}":`, error); }
  };

  useEffect(() => {
    setStoredValue(readValue());
    const handleStorage = (event: StorageEvent) => { if (event.key === key) setStoredValue(readValue()); };
    const handleSameTab = (event: Event) => { const detail = (event as CustomEvent<LocalStorageDetail>).detail; if (detail?.key === key) setStoredValue(detail.value as T); };
    window.addEventListener('storage', handleStorage);
    window.addEventListener(KOSTUDY_STORAGE_EVENT, handleSameTab);
    return () => { window.removeEventListener('storage', handleStorage); window.removeEventListener(KOSTUDY_STORAGE_EVENT, handleSameTab); };
  }, [key]);

  return [storedValue, setValue] as const;
}

export default useLocalStorage;
