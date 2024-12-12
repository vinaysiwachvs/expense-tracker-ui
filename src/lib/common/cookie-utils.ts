import "server-only"; // https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns
import { cookies } from "next/headers"; // https://nextjs.org/docs/app/api-reference/functions/cookies
import Logger from "@/utils/logger";

const logger = new Logger("lib/common/cookie-utils");

// Log messages for debugging
function log(msg: string, ...args: any) {
	logger.log(msg, "debug", ...args);
}

/**
 * Retrieves the value of a cookie by its key.
 * @param {string} key - The key of the cookie.
 * @returns {Promise<string>} - The value of the cookie or an empty string if not found.
 */
export async function getCookieValue(key: string): Promise<string> {
	const cookieStore = await cookies();
	const token = cookieStore.get(key);
	if (!token) {
		log("Cookie not found with key:", key);
		return "";
	}
	return token.value;
}

/**
 * Sets a cookie with the given key, value, and options.
 * @param {string} key - The key of the cookie.
 * @param {string} value - The value of the cookie.
 * @param {Object} [options] - Additional cookie options like expires or secure.
 */
export async function setCookie(
	key: string,
	value: string,
	options: { expires?: Date; secure?: boolean } = {},
): Promise<void> {
	const cookieStore = await cookies();
	try {
		cookieStore.set({
			name: key,
			value,
			httpOnly: true,
			path: "/",
			...options,
		});
		log("Cookie set with key:", key, value, options);
	} catch (error) {
		log("Error setting cookie:", error);
	}
}

/**
 * Checks if a cookie exists by its key.
 * @param {string} key - The key of the cookie.
 * @returns {Promise<boolean>} - True if the cookie exists, false otherwise.
 */
export async function hasCookie(key: string): Promise<boolean> {
	const cookieStore = await cookies();
	const has = cookieStore.has(key);
	log("Cookie found with key:", key, has);
	return has;
}

/**
 * Deletes a cookie by its key.
 * @param {string} key - The key of the cookie to delete.
 * @returns {Promise<void>}
 */
export async function deleteCookie(key: string): Promise<void> {
	const cookieStore = await cookies();
	cookieStore.delete(key);
	log("Cookie deleted with key:", key);
}

/**
 * Retrieves all cookies as an object.
 * @returns {Promise<Record<string, string>>} - An object containing all cookies.
 */
export async function getAllCookies(): Promise<Record<string, string>> {
	const cookieStore = await cookies();
	const allCookies = cookieStore.getAll();
	log("Retrieved all cookies:", allCookies);
	return allCookies.reduce((acc, cookie) => {
		acc[cookie.name] = cookie.value;
		return acc;
	}, {} as Record<string, string>);
}
