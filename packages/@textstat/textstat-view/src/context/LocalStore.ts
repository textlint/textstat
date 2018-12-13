const KEY = "textstat-viewer";

export function getStore<T>(defaultValue: T): T {
    if (!!process.env.REACT_APP_NAVI) {
        return defaultValue;
    }
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
    if (!!process.env.REACT_APP_NAVI) {
        return;
    }
    localStorage.setItem(KEY, JSON.stringify(value));
}
