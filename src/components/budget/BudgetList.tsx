import { getUserBudgets } from "@/lib/budget";
import CreateBudget from "./CreateBudget";
import { IBudget } from "@/types/budget";
import BudgetItem from "./BudgetItem";

async function BudgetList() {
	const budgets = await getUserBudgets();

	return (
		<div className='mt-7'>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
				<CreateBudget />
				{budgets.length > 0 &&
					budgets
						.reverse()
						.map((budget: IBudget) => (
							<BudgetItem key={budget._id} budget={budget} />
						))}
			</div>
		</div>
	);
}

export default BudgetList;
