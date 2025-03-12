export function loadFromStorage<T>(key: string, defaultValue: T): T {
	const item = localStorage.getItem(key);
	if (item === null) return defaultValue;
	const parsed = JSON.parse(item);
	return defaultValue instanceof Set ? new Set(parsed) : parsed;
}

export function saveToStorage(key: string, value: any) {
	localStorage.setItem(key, JSON.stringify(value instanceof Set ? [...value] : value));
}

export function removeFromStorage(key: string) {
	localStorage.removeItem(key);
}
