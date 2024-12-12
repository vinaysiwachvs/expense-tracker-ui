"use server";

import { createBudget, getUserBudgets } from "@/lib/budget";

export const createBudgetAction = async (payload: {
	name: string;
	category: string;
	total_amount: number;
}) => {
	return await createBudget(payload);
};

export const getUserBudgetsAction = async () => {
	return await getUserBudgets();
};
