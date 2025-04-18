const BASE_URL = "http://localhost:8080/api/builds";

export async function createBuild(buildCode: string) {
	try {
		const res = await fetch(`${BASE_URL}/`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ buildCode }),
		});
		if (!res.ok) throw new Error(`Create Build POST ${res.status} ${res.statusText}`);

		const data = await res.json();
		return data.buildId as string;
	} catch (e) {
		console.error(e);
		return null;
	}
}

export async function getBuildCode(buildId: string) {
	try {
		const res = await fetch(`${BASE_URL}/${buildId}`, {
			method: "GET",
			// headers: { "Content-Type": "application/json" },
		});
		if (!res.ok) throw new Error(`Create Build POST ${res.status} ${res.statusText}`);

		const data = await res.json();
		return data.buildCode as string;
	} catch (e) {
		console.error(e);
		return null;
	}
}
