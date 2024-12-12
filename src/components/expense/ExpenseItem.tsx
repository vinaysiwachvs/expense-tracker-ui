import { IExpense } from "@/types/expense";

function ExpenseItem({ expense }: { expense: IExpense }) {
	return (
		<div className='p-5 border rounded-lg hover:shadow-md cursor-pointer'>
			<div className='flex gap-2 items-center justify-between'>
				<div className='flex gap-6 items-center'>
					<h2 className='text-2xl p-2 px-auto w-12 h-12 bg-blue-100 text-primary rounded-full flex items-center justify-center'>
						{expense.name.charAt(0).toUpperCase()}
					</h2>
					<h2 className='font-bold text-3xl'>
						{expense.name.charAt(0).toUpperCase() +
							expense.name.slice(1)}
					</h2>
				</div>
			</div>
			<div className='mt-5'>
				<div className='w-full bg-slate-300 h-2 rounded-full'>
					<div className='bg-primary h-2 rounded-full w-[50%]'></div>
				</div>
			</div>
		</div>
	);
}

export default ExpenseItem;
