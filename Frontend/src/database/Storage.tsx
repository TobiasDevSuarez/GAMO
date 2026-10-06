export const storage = {
  set(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  },

  get<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;
  },

  remove(key: string): void {
    localStorage.removeItem(key);
  },

  clear(): void {
    localStorage.clear();
  },

  exist(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
};