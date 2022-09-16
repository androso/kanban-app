const API = process.env.NEXT_PUBLIC_API_BASE_URL
export const client = async (endpoint: RequestInfo, options?: RequestInit) => {
	const { body, ...customConfig } = options ?? {};
	
	const headers = { 'Content-Type': 'application/json' };

	let config: RequestInit = {
		method: body ? 'POST' : 'GET',
		...customConfig,
		headers: {
			...headers,
			...customConfig.headers
		},

	}
	if (body) {
		config.body = JSON.stringify(body);
	}
	let dataReturned;
	try {
		const response = await window.fetch(`${API}${endpoint}`, config);
		console.log(response);
		dataReturned = await response.json();
		
		if (response.ok) {
			return dataReturned;
		}
		throw new Error(response.statusText);
	} catch (e: unknown) {
		if (e instanceof Error) {
			return Promise.reject(e.message);
		}

	}
}