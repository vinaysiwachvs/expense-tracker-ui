"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { IBudget } from "@/types/budget";
import BudgetComboBox from "../budget/BudgetComboBox";
import { createExpenseAction } from "@/actions/expense";
import { getUserBudgetsAction } from "@/actions/budget";

const expenseSchema = z.object({
	name: z
		.string()
		.min(1, "Category name is required")
		.max(50, "Category name must be 50 characters or fewer"),
	amount: z.number().positive("Amount must be a positive number"),
	budget: z
		.string()
		.min(1, "Category name is required")
		.max(50, "Category name must be 50 characters or fewer"),
});

function AddExpense({ budgetInput }: { budgetInput?: IBudget }) {
	const [budgets, setBudgets] = useState<IBudget[]>([]);
	const [name, setName] = useState("");
	const [amount, setAmount] = useState(0);
	const [budget, setBudget] = useState<string>(
		budgetInput ? (budgetInput._id as string) : "",
	);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { toast } = useToast();

	useEffect(() => {
		const fetchBudgets = async () => {
			try {
				const budgets = await getUserBudgetsAction();
				setBudgets(budgets);
			} catch (error) {
				console.error("Failed to fetch categories:", error);
			}
		};

		fetchBudgets();
	}, []);

	const validateAndSubmit = async () => {
		const validation = expenseSchema.safeParse({ name, amount, budget });
		if (!validation.success) {
			setError(validation.error.errors[0].message);
			return;
		}
		setError(null);

		try {
			setIsLoading(true);
			const response = await createExpenseAction({
				name,
				amount,
				budgetId: budget,
			});
			if (response) {
				toast({
					title: "Expense created successfully.",
					variant: "success",
				});
			}

			setName("");
			setBudget("");
			setAmount(0);
		} catch (error) {
			toast({
				title: "Failed to create expense.",
				variant: "destructive",
			});
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className='bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md'>
					<h2 className='text-3xl'>+</h2>
					<h2>Create New Expense</h2>
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create New Expense</DialogTitle>
					<DialogDescription>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								validateAndSubmit();
							}}
							className='space-y-6'>
							<div className='mt-2'>
								<h2 className='text-black font-medium my-1'>
									Name
								</h2>
								<Input
									placeholder='Apples'
									value={name}
									onChange={(e) => setName(e.target.value)}
									className={error ? "border-red-500" : ""}
								/>
								{error && (
									<p className='text-red-500 text-sm mt-1'>
										{error}
									</p>
								)}
							</div>
							<div className='mt-2'>
								<BudgetComboBox
									budgets={
										budgetInput ? [budgetInput] : budgets
									}
									selectedValue={budget!}
									onValueChange={setBudget}
									disabled={!!budgetInput}
								/>
							</div>
							<div className='mt-2'>
								<h2 className='text-black font-medium my-1'>
									Amount
								</h2>
								<Input
									placeholder='50'
									value={amount}
									onChange={(e) =>
										setAmount(Number(e.target.value))
									}
									className={error ? "border-red-500" : ""}
								/>
								{error && (
									<p className='text-red-500 text-sm mt-1'>
										{error}
									</p>
								)}
							</div>
							<DialogClose asChild>
								<Button
									type='submit'
									disabled={
										isLoading || !name || !amount || !budget
									}
									className='mt-5 w-full'>
									{isLoading
										? "Creating..."
										: "Create Expense"}
								</Button>
							</DialogClose>
						</form>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}

export default AddExpense;
