"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { createBudgetAction } from "@/actions/budget";
import { getUserCategoriesAction } from "@/actions/category";
import { ICategory } from "@/types/category";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { CategoryCombobox } from "../category/CategoryComboBox";
import { Button } from "../ui/button";

const budgetSchema = z.object({
	name: z
		.string()
		.min(1, "Name is required")
		.max(50, "Name must be 50 characters or fewer"),
	total_amount: z.number().positive("Amount must be a positive number"),
});

function CreateBudget() {
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(
		null,
	);
	const [name, setName] = useState("");
	const [total_amount, setTotalAmount] = useState<number>(0);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { toast } = useToast();

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const categories = await getUserCategoriesAction();
				setCategories(categories);
			} catch (error) {
				console.error("Failed to fetch categories:", error);
			}
		};

		fetchCategories();
	}, []);

	const validateAndSubmit = async () => {
		const validation = budgetSchema.safeParse({
			name,
			total_amount,
		});

		if (!validation.success) {
			setError(validation.error.errors[0].message);
			return;
		}

		if (!selectedCategory) {
			setError("Please select a category.");
			return;
		}

		setError(null);

		try {
			setIsLoading(true);
			const response = await createBudgetAction({
				name,
				category: selectedCategory,
				total_amount,
			});
			if (response) {
				toast({
					title: "Budget created successfully.",
					variant: "success",
				});
			}
			setCategories(categories);
			setName("");
			setTotalAmount(0);
		} catch (error) {
			toast({
				title: "Failed to create budget.",
				variant: "destructive",
			});
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<Dialog>
				<DialogTrigger asChild>
					<div className='bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md'>
						<h2 className='text-3xl'>+</h2>
						<h2>Create New Budget</h2>
					</div>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create New Budget</DialogTitle>
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
										placeholder='Enter budget name'
										value={name}
										onChange={(e) =>
											setName(e.target.value)
										}
										className={
											error ? "border-red-500" : ""
										}
									/>
								</div>
								<div className='mt-2'>
									<CategoryCombobox
										categories={categories}
										selectedValue={selectedCategory!}
										onSelect={setSelectedCategory}
									/>
								</div>
								<div className='mt-2'>
									<h2 className='text-black font-medium my-1'>
										Amount (₹)
									</h2>
									<Input
										placeholder='Enter amount'
										value={total_amount}
										onChange={(e) =>
											setTotalAmount(
												Number(e.target.value),
											)
										}
										className={
											error ? "border-red-500" : ""
										}
									/>
								</div>

								{error && (
									<p className='text-red-500 text-sm mt-1'>
										{error}
									</p>
								)}
								<DialogClose asChild>
									<Button
										type='submit'
										disabled={
											isLoading ||
											!total_amount ||
											!selectedCategory
										}
										className='mt-5 w-full'>
										{isLoading
											? "Creating..."
											: "Create Budget"}
									</Button>
								</DialogClose>
							</form>
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default CreateBudget;
