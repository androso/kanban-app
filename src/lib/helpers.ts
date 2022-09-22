const API = process.env.NEXT_PUBLIC_API_BASE_URL;
export const client = async (endpoint: RequestInfo, options?: RequestInit) => {
	const { body, ...customConfig } = options ?? {};
	const headers = { "Content-Type": "application/json" };

	let config: RequestInit = {
		method: body ? "POST" : "GET",
		...customConfig,
		credentials: "include",
		headers: {
			...headers,
			...customConfig.headers,
		},
	};
	if (body) {
		config.body = JSON.stringify(body);
	}
	let dataReturned;

	const response = await window.fetch(`${API}${endpoint}`, config);

	if (response.ok) {
		dataReturned = await response.json();
		return dataReturned;
	} else {
		const errorMessage = (await response.json()).message;
		return Promise.reject(new Error(errorMessage));
	}
};
