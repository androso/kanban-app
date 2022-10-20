const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export const client = async (
	endpoint: RequestInfo,
	options?: RequestInit | null,
	method: string = "GET"
) => {
	const { body, ...customConfig } = options ?? {};
	const headers = { "Content-Type": "application/json" };

	let config: RequestInit = {
		method: body && method === "GET" ? "POST" : method,
		...customConfig,
		credentials: "include",
		headers: {
			...headers,
			...customConfig.headers,
		},
	};

	if (body) {
		config.body = body;
	}

	const response = await window.fetch(`${API}${endpoint}`, config);

	if (response.ok) {
		try {
			const responseParsed = await response.clone().json();
			return responseParsed;
		} catch (e) {
			return response.text();
		}
	} else if (!response.ok) {
		const errorMessage = response.status;
		return Promise.reject(new Error(errorMessage.toString()));
	} else {
		return response;
	}
};

export const customTimePause = async (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
