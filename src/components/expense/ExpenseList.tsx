import { IExpense } from "@/types/expense";
import ExpenseItem from "./ExpenseItem";
import AddExpense from "./AddExpense";

function ExpenseList({ expenses }: { expenses: IExpense[] }) {
	const numsArray = [1, 2, 3, 4, 5, 6];
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6'>
			{expenses.length > 0
				? expenses.map((expense) => (
						<ExpenseItem key={expense._id} expense={expense} />
				  ))
				: numsArray.map((index) => (
						<div
							key={index}
							className='h-[150px] w-full bg-slate-200 rounded-lg animate-pulse'
						/>
				  ))}
		</div>
	);
}

export default ExpenseList;
