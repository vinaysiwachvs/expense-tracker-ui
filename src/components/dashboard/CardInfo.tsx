import { IBudget } from "@/types/budget";
import { IExpense } from "@/types/expense";
import { IUser } from "@/types/user";
import { formatCurrency } from "@/utils/common";
import { PiggyBank, ReceiptText, Wallet } from "lucide-react";

function CardInfo({
	budgets,
	expenses,
}: {
	budgets: IBudget[];
	expenses: IExpense[];
}) {
	const totalBudget = budgets.reduce(
		(acc, budget) => acc + budget.total_amount,
		0,
	);

	const totalExpenses = expenses.reduce(
		(acc, expense) => acc + expense.amount,
		0,
	);

	return (
		<div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
			<div className='p-7 border rounded-lg flex items-center justify-between'>
				<div className=''>
					<h2 className='text-sm'>Total Budget</h2>
					<h2 className='font-bold text-2xl'>
						{formatCurrency(totalBudget)}
					</h2>
				</div>
				<PiggyBank className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
			</div>
			<div className='p-7 border rounded-lg flex items-center justify-between'>
				<div className=''>
					<h2 className='text-sm'>Total Spend</h2>
					<h2 className='font-bold text-2xl'>
						{formatCurrency(totalExpenses)}
					</h2>
				</div>
				<ReceiptText className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
			</div>
			<div className='p-7 border rounded-lg flex items-center justify-between'>
				<div className=''>
					<h2 className='text-sm'>No. of Budget</h2>
					<h2 className='font-bold text-2xl'>{budgets.length}</h2>
				</div>
				<Wallet className='bg-primary p-3 h-12 w-12 rounded-full text-white' />
			</div>
		</div>
	);
}

export default CardInfo;
