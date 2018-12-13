const KEY = "textstat-viewer";

export function getStore<T>(defaultValue: T): T {
    const value = localStorage.getItem(KEY);
    if (!value) {
        return defaultValue;
    }
    try {
        return JSON.parse(value);
    } catch (error) {
        return defaultValue;
    }
}

export function saveStore(value: any) {
    localStorage.setItem(KEY, JSON.stringify(value));
}
