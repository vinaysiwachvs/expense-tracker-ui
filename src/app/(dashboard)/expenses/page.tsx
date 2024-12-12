import AddExpense from "@/components/expense/AddExpense";
import ExpenseList from "@/components/expense/ExpenseList";
import { getUserExpenses } from "@/lib/expense";

async function Expenses() {
	const expenses = await getUserExpenses();
	return (
		<div className='p-10'>
			<h2 className='font-bold text-3xl'>My Expenses</h2>
			<div className='mt-6'>
				<AddExpense />
				<ExpenseList expenses={expenses} />
			</div>
		</div>
	);
}

export default Expenses;
