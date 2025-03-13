export function loadFromStorage<T>(key: string, defaultValue: any): T {
	const item = localStorage.getItem(key);
	if (item === null) return defaultValue;
	try {
		const parsed = JSON.parse(item);
		return parsed;
	} catch {
		console.error(`Failed to parse '${key}' data`);
		return defaultValue;
	}
}

export function saveToStorage(key: string, value: any) {
	localStorage.setItem(key, JSON.stringify(value));
}

export function removeFromStorage(key: string) {
	localStorage.removeItem(key);
}
