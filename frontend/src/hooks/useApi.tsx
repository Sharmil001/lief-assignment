import { useState } from "react";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestParams {
	url: string;
	method?: HttpMethod;
	payload?: any;
	headers?: Record<string, string>;
}

interface ApiResponse<T> {
	data: T | null;
	isLoading: boolean;
	error: any;
	request: (params: RequestParams) => Promise<T>;
}

export function useApi<T = any>(): ApiResponse<T> {
	const [data, setData] = useState<T | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<any>(null);

	const request = async ({
		url,
		method = "GET",
		payload,
		headers = {},
	}: RequestParams): Promise<T> => {
		setIsLoading(true);
		setError(null);

		try {
			const isFormData = payload instanceof FormData;

			const response = await fetch(url, {
				method,
				headers: isFormData
					? headers
					: { "Content-Type": "application/json", ...headers },
				body:
					method !== "GET" && method !== "DELETE"
						? isFormData
							? payload
							: JSON.stringify(payload)
						: undefined,
			});

			if (!response.ok) {
				throw new Error(`HTTP ${response.status} - ${response.statusText}`);
			}

			const text = await response.text();
			const jsonData = text ? (JSON.parse(text) as T) : ({} as T);

			setData(jsonData);
			return jsonData;
		} catch (err) {
			setError(err);
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	return { data, isLoading, error, request };
}
