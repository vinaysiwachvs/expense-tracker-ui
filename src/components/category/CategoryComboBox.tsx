"use client";

import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandGroup,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ICategory } from "@/types/category";

interface CategoryComboboxProps {
	categories: ICategory[];
	selectedValue: string;
	onSelect: (value: string) => void;
}

export function CategoryCombobox({
	categories,
	selectedValue,
	onSelect,
}: CategoryComboboxProps) {
	const [open, setOpen] = useState(false);

	const handleSelect = (currentValue: string) => {
		onSelect(currentValue);
		setOpen(false);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={open}
					className='w-full justify-between'>
					{selectedValue
						? categories.find(
								(category) => category.name === selectedValue,
						  )?.name
						: "Select Category..."}
					<ChevronsUpDown className='opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-full p-0'>
				<Command>
					<CommandList>
						<CommandGroup>
							{categories.map((category) => (
								<CommandItem
									key={category._id}
									value={category.name}
									onSelect={() =>
										handleSelect(category.name)
									}>
									{category.name}
									<Check
										className={cn(
											"ml-auto",
											selectedValue === category.name
												? "opacity-100"
												: "opacity-0",
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
