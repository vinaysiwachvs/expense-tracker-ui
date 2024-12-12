"use server";

import { loginUser, registertUser } from "@/lib/auth";
import { setCookie } from "@/lib/common/cookie-utils";

export async function registerUserHandler(payload: {
	name: string;
	email: string;
	password: string;
}): Promise<{ _id: string; token: string; message: string }> {
	const response = await registertUser(payload);
	if (response) {
		await setCookie("token", response.token);
	}

	return response;
}

export const loginUserHandler = async (payload: {
	email: string;
	password: string;
}) => {
	const response = await loginUser(payload);
	if (response) {
		await setCookie("token", response.token);
	}

	return response;
};
