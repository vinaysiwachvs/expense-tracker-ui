import Logger from "@/utils/logger";
import * as FetchUtils from "./common/fetch-utils";
import { IBudget } from "@/types/budget";

// eslint-disable-next-line
const logger = new Logger("lib/budget");

const apiUrl = `${process.env.NEXT_PUBLIC_URL}/api/budgets`;

export const createBudget = async (payload: {
	name: string;
	category: string;
	total_amount: number;
}) => {
	const response = await FetchUtils.post(apiUrl, payload, {
		isWithToken: true,
		isWithCache: false,
	});
	return response;
};

export const getBudgetById = async (id: string): Promise<IBudget> => {
	const response = await FetchUtils.get(`${apiUrl}/${id}`, {
		isWithToken: true,
		isWithCache: false,
	});
	return response;
};

export const getUserBudgets = async (): Promise<IBudget[]> => {
	const response = await FetchUtils.get(`${apiUrl}/user`, {
		isWithToken: true,
		isWithCache: false,
	});
	return response;
};
