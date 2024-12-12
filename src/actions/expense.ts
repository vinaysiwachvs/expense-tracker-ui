"use server";

import { createExpense, getUserExpenses } from "@/lib/expense";

export const createExpenseAction = async (payload: {
	name: string;
	amount: number;
	budget: string;
}) => {
	const response = await createExpense(payload);
	return response;
};

export const getUserExpensesAction = async () => {
	return await getUserExpenses();
};
