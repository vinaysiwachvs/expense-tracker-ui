import { IExpense } from "@/types/expense";
import ExpenseItem from "./ExpenseItem";
import AddExpense from "./AddExpense";

function ExpenseList({
	expenses,
	showAddExpense = false,
}: {
	expenses: IExpense[];
	showAddExpense?: boolean;
}) {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6'>
			{showAddExpense && <AddExpense />}
			{expenses.length > 0 &&
				expenses.map((expense) => (
					<ExpenseItem key={expense._id} expense={expense} />
				))}
		</div>
	);
}

export default ExpenseList;
