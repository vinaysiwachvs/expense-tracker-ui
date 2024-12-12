import Logger from "@/utils/logger";
import * as FetchUtils from "./common/fetch-utils";
import { IExpense } from "@/types/expense";

const logger = new Logger("lib/expense");

const apiUrl = `${process.env.NEXT_PUBLIC_URL}/api/expenses`;

export const createExpense = async (payload: {}) => {
	const response = await FetchUtils.post(apiUrl, payload, {
		isWithToken: true,
		isWithCache: false,
	});
	return response;
};

export const getUserExpenses = async (): Promise<IExpense[]> => {
	const response = await FetchUtils.get(`${apiUrl}/user`, {
		isWithToken: true,
		isWithCache: false,
	});
	return response;
};

export const getExpenceByBudget = async (id: string): Promise<IExpense[]> => {
	const response = await FetchUtils.get(`${apiUrl}/budget/${id}`, {
		isWithToken: true,
		isWithCache: false,
	});
	return response;
};
