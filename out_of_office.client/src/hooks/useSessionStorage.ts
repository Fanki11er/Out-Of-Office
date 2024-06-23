import { useState } from "react";

export const useSessionStorage = <T>(keyName: string) => {
  const [storedValue, setStoredValue] = useState<T | null>(() => {
    try {
      const value = window.sessionStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value) as T;
      }
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  });

  const setValue = (newValue: T) => {
    try {
      window.sessionStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      console.error(err);
    }
    setStoredValue(newValue);
  };
  return { storedValue, setValue };
};
