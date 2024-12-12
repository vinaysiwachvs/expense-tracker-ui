import CategoryList from "@/components/category/CategoryList";

function Category() {
	return (
		<div className='p-10'>
			<h2 className='font-bold text-3xl'>My Categories</h2>
			<CategoryList />
		</div>
	);
}

export default Category;
