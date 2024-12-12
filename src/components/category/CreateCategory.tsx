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
import { useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { createCategoryAction } from "@/actions/category";

const categorySchema = z.object({
	name: z
		.string()
		.min(1, "Category name is required")
		.max(50, "Category name must be 50 characters or fewer"),
});

function CreateCategory() {
	const [name, setName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { toast } = useToast();

	const validateAndSubmit = async () => {
		const validation = categorySchema.safeParse({ name });
		if (!validation.success) {
			setError(validation.error.errors[0].message);
			return;
		}
		setError(null);

		try {
			setIsLoading(true);
			const response = await createCategoryAction({ name });

			if (response) {
				toast({
					title: "Category created successfully.",
					variant: "success",
				});
			}
			setName("");
		} catch (error) {
			toast({
				title: "Failed to create category.",
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
						<h2>Create New Category</h2>
					</div>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create New Category</DialogTitle>
						<DialogDescription>
							<form
								onSubmit={(e) => {
									e.preventDefault();
									validateAndSubmit();
								}}
								className='space-y-6'>
								<div className='mt-2'>
									<h2 className='text-black font-medium my-1'>
										Category Name
									</h2>
									<Input
										placeholder='Food'
										value={name}
										onChange={(e) =>
											setName(e.target.value)
										}
										className={
											error ? "border-red-500" : ""
										}
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
										disabled={isLoading || !name}
										className='mt-5 w-full'>
										{isLoading
											? "Creating..."
											: "Create Category"}
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

export default CreateCategory;
