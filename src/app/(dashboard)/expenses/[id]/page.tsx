import BudgetItem from "@/components/budget/BudgetItem";
import AddExpense from "@/components/expense/AddExpense";
import ExpenseItem from "@/components/expense/ExpenseItem";
import ExpenseList from "@/components/expense/ExpenseList";
import { getBudgetById } from "@/lib/budget";
import { getExpenceByBudget } from "@/lib/expense";
import { IBudget } from "@/types/budget";

async function ExpenseId({ params }: { params: { id: string } }) {
	const expenseByBudget = await getExpenceByBudget(params.id);
	const budget = await getBudgetById(params.id);
	return (
		<div className='p-10'>
			<h2 className='text-2xl font-bold'>My Expenses</h2>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6'>
				{budget ? (
					<BudgetItem budget={budget} />
				) : (
					<div className='h-[150px] w-full bg-slate-200 rounded-lg animate-pulse' />
				)}

				<AddExpense budgetInput={budget as IBudget} />
			</div>
			<div className='mt-4 '>
				<h2 className='text-lg font-bold'>Latest Expenses</h2>
				<ExpenseList expenses={expenseByBudget} />
			</div>
		</div>
	);
}

export default ExpenseId;
