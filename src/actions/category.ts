"use server";

import { createCategory, getUserCategories } from "@/lib/category";

export const createCategoryAction = async (payload: { name: string }) => {
	return await createCategory(payload);
};

export const getUserCategoriesAction = async () => {
	return await getUserCategories();
};
