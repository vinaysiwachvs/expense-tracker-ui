import { IBudget } from "@/types/budget";
import { getUserCategories } from "@/lib/category";
import Link from "next/link";

async function BudgetItem({ budget }: { budget: IBudget }) {
	const categories = await getUserCategories();
	const catName = categories.find((cat) => cat._id === budget.category)?.name;

	const progressPercentage = Math.min(
		(budget.used_amount / budget.total_amount) * 100,
		100,
	);

	return (
		<Link
			href={`/expenses/${budget._id}`}
			className='p-5 border rounded-lg hover:shadow-md cursor-pointer'>
			<div className='flex gap-2 items-center justify-between'>
				<div className='flex gap-2 items-center'>
					<h2 className='text-2xl p-2 px-auto w-12 h-12 bg-blue-100 text-primary rounded-full flex items-center justify-center'>
						{budget.name.charAt(0).toUpperCase()}
					</h2>

					<div>
						<h2 className='font-bold'>{budget.name}</h2>
						<h2 className='font-bold text-gray-500 text-sm'>
							{catName}
						</h2>
					</div>
				</div>

				<h2 className='font-bold text-primary'>
					₹{budget.total_amount}
				</h2>
			</div>
			<div className='mt-5'>
				<div className='flex items-center justify-between mb-3'>
					<h2 className='text-xs font-semibold text-slate-400'>
						₹{budget.used_amount} spend
					</h2>
					<h2 className='text-xs font-semibold text-slate-400'>
						₹{budget.total_amount - budget.used_amount} remaining
					</h2>
				</div>
				<div className='w-full bg-slate-300 h-2 rounded-full'>
					<div
						className='bg-primary h-2 rounded-full'
						style={{ width: `${progressPercentage}%` }}></div>
				</div>
			</div>
		</Link>
	);
}

export default BudgetItem;
