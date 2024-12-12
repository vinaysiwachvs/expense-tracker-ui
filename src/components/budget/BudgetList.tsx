import { getUserBudgets } from "@/lib/budget";
import CreateBudget from "./CreateBudget";
import { IBudget } from "@/types/budget";
import BudgetItem from "./BudgetItem";

async function BudgetList() {
	const budgets = await getUserBudgets();
	const numArray = [1, 2, 3, 4, 5, 6, 7];

	return (
		<div className='mt-7'>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
				<CreateBudget />
				{budgets.length > 0
					? budgets
							.reverse()
							.map((budget: IBudget) => (
								<BudgetItem key={budget._id} budget={budget} />
							))
					: numArray.map((index) => (
							<div
								className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'
								key={index}></div>
					  ))}
			</div>
		</div>
	);
}

export default BudgetList;
