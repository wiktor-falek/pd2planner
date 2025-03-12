export function loadFromStorage<T>(key: string, defaultValue: T): T {
	const item = localStorage.getItem(key);
	if (item === null) return defaultValue;
	return JSON.parse(item);
}

export function saveToStorage(key: string, value: any) {
	localStorage.setItem(key, JSON.stringify(value));
}

export function removeFromStorage(key: string) {
	localStorage.removeItem(key);
}
