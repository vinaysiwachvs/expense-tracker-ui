import "server-only";
import { revalidateTag } from "next/cache";
import { getCookieValue } from "./cookie-utils";
import Logger from "@/utils/logger";

export type RequestOptions = {
	isWithToken: boolean;
	isWithCache?: boolean;
	cacheTags?: string[];
};

const logger = new Logger("lib/common/FetchUtils");

// Utility function to fetch data from the server
const fetchData = async (
	url: string,
	method: string,
	body: any,
	requestOptions: RequestOptions,
) => {
	try {
		const requestInput = await createRequestInput(
			method,
			body,
			requestOptions,
		);

		logger.log(
			`Request to ${method} URL:`,
			"debug",
			url,
			body,
			requestInput,
		);

		const rawResponse = await fetch(url, requestInput);
		const result = (await rawResponse.json()) || {};

		if (!rawResponse.ok) {
			throw new Error(
				`${rawResponse.status}: ${rawResponse.statusText}: ${result.message}`,
			);
		}

		if (requestOptions.cacheTags?.length) {
			requestOptions.cacheTags.forEach(revalidateTag);
		}

		logger.log(`Response from ${method} URL:`, "debug", url, result);

		return result;
	} catch (error) {
		const err = error as Error;
		logger.log(
			`Error in FetchUtils for ${method} URL:`,
			"error",
			url,
			err.message,
		);
		throw err;
	}
};

// GET request handler
export const get = async (url: string, requestOptions: RequestOptions) =>
	fetchData(url, "GET", null, requestOptions);

// POST request handler
export const post = async (
	url: string,
	body: any,
	requestOptions: RequestOptions,
) => fetchData(url, "POST", body, requestOptions);

// PATCH request handler
export const patch = async (
	url: string,
	body: any,
	requestOptions: RequestOptions,
) => fetchData(url, "PATCH", body, requestOptions);

// DELETE request handler
export const deleteData = async (
	url: string,
	requestOptions: RequestOptions,
	body?: any,
) => fetchData(url, "DELETE", body, requestOptions);

// Create the request input object
const createRequestInput = async (
	method: string,
	body: any,
	options: RequestOptions,
) => {
	const requestInput: Record<string, any> = {
		method,
		headers: { "Content-Type": "application/json" },
	};

	if (body) {
		requestInput.body = JSON.stringify(body);
	}

	if (options.isWithToken) {
		const token = await fetchAccessToken();
		if (!token) {
			throw new Error("Authorization token not found.");
		}
		requestInput.headers["Authorization"] = `Bearer ${token}`;
	}

	if (options.isWithCache) {
		requestInput.next = { tags: options.cacheTags };
	} else {
		requestInput.cache = "no-cache";
	}

	return requestInput;
};

// Fetch the access token from cookies
const fetchAccessToken = async (): Promise<string> => {
	const token = await getCookieValue("token");
	logger.log("Fetched token:", "debug", token);
	return token;
};
