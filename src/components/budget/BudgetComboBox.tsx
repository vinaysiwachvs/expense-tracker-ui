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
import { IBudget } from "@/types/budget";

interface BudgetComboBoxProps {
	budgets: IBudget[];
	selectedValue: string;
	onValueChange: (value: string) => void;
	disabled?: boolean;
}

export default function BudgetComboBox({
	budgets,
	selectedValue,
	onValueChange,
	disabled = false,
}: BudgetComboBoxProps) {
	const [open, setOpen] = useState(false);

	const handleSelect = (value: string) => {
		onValueChange(value);
		setOpen(false);
	};

	const selectedBudgetName =
		budgets.find((budget) => budget._id === selectedValue)?.name ||
		"Select Budget...";

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={open}
					className={cn(
						"w-full justify-between",
						disabled && "opacity-50 cursor-not-allowed",
					)}
					disabled={disabled}>
					{!disabled ? selectedBudgetName : budgets[0].name}
					<ChevronsUpDown className='opacity-50' />
				</Button>
			</PopoverTrigger>
			{!disabled && (
				<PopoverContent className='w-full p-0'>
					<Command>
						<CommandList>
							<CommandGroup>
								{budgets.map((budget) => (
									<CommandItem
										key={budget._id}
										value={budget._id}
										onSelect={() =>
											handleSelect(budget._id as string)
										}>
										{budget.name}
										<Check
											className={cn(
												"ml-auto",
												selectedValue === budget._id
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
			)}
		</Popover>
	);
}
