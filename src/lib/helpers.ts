const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export const client = async (
	endpoint: RequestInfo,
	options?: RequestInit | null,
	method: string = "GET"
) => {
	const { body, ...customConfig } = options ?? {};
	const headers = { "Content-Type": "application/json" };

	let config: RequestInit = {
		method: body ? "POST" : method,
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

	let dataReturned;

	const response = await window.fetch(`${API}${endpoint}`, config);
	// todo: should we return something like {message: string, status: number} from the server?
	// todo if we don't, we shouldn't .json() the response.
	if (response.status === 204) {
		return response;
	} else if (response.ok) {
		dataReturned = await response.json();
		return dataReturned;
	} else if (response.status === 404) {
		return Promise.reject(new Error(response.statusText));
	} else {
		const errorMessage = await response.json();
		return Promise.reject(new Error(errorMessage.message));
	}
};

export const customTimePause = async (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
