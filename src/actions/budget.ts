"use server";

import { createBudget, getUserBudgets } from "@/lib/budget";

export const createBudgetAction = async (payload: {}) => {
	return await createBudget(payload);
};

export const getUserBudgetsAction = async () => {
	return await getUserBudgets();
};
