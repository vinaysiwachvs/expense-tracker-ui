import { getBudgetById } from "@/lib/budget";
import { IExpense } from "@/types/expense";
import { formatCurrency } from "@/utils/common";

async function ExpenseItem({ expense }: { expense: IExpense }) {
	const budget = await getBudgetById(expense.budget);
	const percentage = Math.min(
		(expense.amount / budget.total_amount) * 100,
		100,
	);
	return (
		<div className='p-5 border rounded-lg hover:shadow-md cursor-pointer'>
			<div className='flex gap-2 items-center justify-between'>
				<div className='flex gap-2 items-center'>
					<h2 className='text-2xl p-2 px-auto w-12 h-12 bg-blue-100 text-primary rounded-full flex items-center justify-center'>
						{expense.name.charAt(0).toUpperCase()}
					</h2>
					<div>
						<h2 className='font-bold'>
							{expense.name.charAt(0).toUpperCase() +
								expense.name.slice(1)}
						</h2>
						<h2 className='font-bold text-gray-500 text-sm'>
							{budget?.name}
						</h2>
					</div>
				</div>
				<h2 className='font-bold text-primary'>
					{formatCurrency(expense.amount)}
				</h2>
			</div>
			<div className='mt-5'>
				<div className='flex items-center mb-3'>
					<h2 className='text-xs font-semibold text-slate-400'>
						{formatCurrency(expense.amount)} spend of{" "}
						{formatCurrency(budget.total_amount)}
					</h2>
				</div>
				<div className='w-full bg-slate-300 h-2 rounded-full'>
					<div
						className='bg-primary h-2 rounded-full'
						style={{ width: `${percentage}%` }}
					/>
				</div>
			</div>
		</div>
	);
}

export default ExpenseItem;
