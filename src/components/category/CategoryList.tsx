import React from "react";
import CreateCategory from "./CreateCategory";
import { getUserCategories } from "@/lib/category";
import { ICategory } from "@/types/category";
import CategoryItem from "./CategoryItem";

async function CategoryList() {
	const categories = await getUserCategories();
	return (
		<div className='mt-7'>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
				<CreateCategory />
				{categories.map((category: ICategory) => (
					<CategoryItem key={category._id} category={category} />
				))}
			</div>
		</div>
	);
}

export default CategoryList;
