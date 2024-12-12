import Logger from "@/utils/logger";
import * as FetchUtils from "./common/fetch-utils";
import { ICategory } from "@/types/category";

const logger = new Logger("lib/category");

const apiUrl = `${process.env.NEXT_PUBLIC_URL}/api/categories`;

export const createCategory = async (payload: { name: string }) => {
	const response = await FetchUtils.post(apiUrl, payload, {
		isWithToken: true,
		isWithCache: false,
	});
	return response;
};

export const getUserCategories = async (): Promise<ICategory[]> => {
	const response = await FetchUtils.get(`${apiUrl}/user`, {
		isWithToken: true,
		isWithCache: false,
	});
	return response;
};
