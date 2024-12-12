import Logger from "@/utils/logger";
import * as FetchUtils from "./common/fetch-utils";
import { IUser } from "@/types/user";

const logger = new Logger("lib/auth");

const registerapiUrl = `${process.env.NEXT_PUBLIC_URL}/api/users`;

export async function registertUser(payload: {
	name: string;
	email: string;
	password: string;
}): Promise<{ _id: string; token: string; message: string }> {
	const response = await FetchUtils.post(registerapiUrl, payload, {
		isWithToken: false,
		isWithCache: false,
	});
	return response;
}

export async function loginUser(payload: {
	email: string;
	password: string;
}): Promise<{ token: string; message: string }> {
	const response = await FetchUtils.post(`${registerapiUrl}/login`, payload, {
		isWithToken: false,
		isWithCache: false,
	});
	return response;
}

export async function getUser({ id }: { id: string }): Promise<IUser> {
	const response = await FetchUtils.get(`${registerapiUrl}/${id}`, {
		isWithToken: true,
		isWithCache: false,
	});
	return response;
}
