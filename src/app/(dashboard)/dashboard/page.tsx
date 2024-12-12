import BudgetItem from "@/components/budget/BudgetItem";
import BarChartDashboard from "@/components/dashboard/BarChartDashboard";
import CardInfo from "@/components/dashboard/CardInfo";
import ExpenseList from "@/components/expense/ExpenseList";
import { getUser } from "@/lib/auth";
import { getUserBudgets } from "@/lib/budget";
import { getCookieValue } from "@/lib/common/cookie-utils";
import { getUserExpenses } from "@/lib/expense";
import { IUser } from "@/types/user";
import { jwtDecode } from "jwt-decode";

export default async function Dashboard() {
	const userBudgets = await getUserBudgets();
	const userExpenses = await getUserExpenses();
	const token = await getCookieValue("token");
	let user: IUser | undefined;

	try {
		if (token) {
			const decodedToken: { _id: string } = jwtDecode(token);
			user = await getUser({ id: decodedToken._id });
		}
	} catch (error) {
		console.error("Failed to decode token or fetch user:", error);
	}
	return (
		<div className='p-5'>
			<h2 className='font-bold text-3xl'>Hi, {user?.name}</h2>
			<p className='text-gray-500'>
				Here&apos;s what happening with your money, Let&apos;s manage
				your expense.
			</p>

			<CardInfo budgets={userBudgets} expenses={userExpenses} />
			<div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
				<div className='md:col-span-2'>
					{userBudgets.length > 0 && (
						<BarChartDashboard budgets={userBudgets} />
					)}
					{userExpenses.length > 0 && (
						<>
							<h2 className='text-lg font-bold mt-3'>
								Latest Expenses
							</h2>
							<ExpenseList expenses={userExpenses} />
						</>
					)}
				</div>

				{userBudgets.length > 0 && (
					<div className='flex flex-col gap-5'>
						<h2 className='font-bold text-lg'>Latest Budget</h2>
						{userBudgets.reverse().map((budget) => (
							<BudgetItem key={budget._id} budget={budget} />
						))}
					</div>
				)}
			</div>
		</div>
	);
}
