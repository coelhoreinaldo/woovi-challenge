import { useState } from 'react';

export default function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setStoredValue(value);
  };

  const removeValue = () => {
    localStorage.removeItem(key);
  }

  return [storedValue, setValue, removeValue];
}