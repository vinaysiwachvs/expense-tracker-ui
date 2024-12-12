"use client";

import {
	ChartBar,
	LayoutGrid,
	PiggyBank,
	ReceiptText,
	ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SideNav() {
	const menuList = [
		{
			id: 1,
			name: "Dashboard",
			icon: LayoutGrid,
			path: "/dashboard",
		},
		{
			id: 2,
			name: "Categories",
			icon: ChartBar,
			path: "/categories",
		},
		{
			id: 3,
			name: "Budgets",
			icon: PiggyBank,
			path: "/budgets",
		},
		{
			id: 4,
			name: "Expenses",
			icon: ReceiptText,
			path: "/expenses",
		},
	];

	const path = usePathname();

	return (
		<div className='h-screen p-5 border shadow-sm'>
			<Link href={"/"} className='block cursor-pointer'>
				<Image
					src={"/logo.svg"}
					alt={"logo"}
					width={160}
					height={100}
				/>
			</Link>
			<div className='mt-5'>
				{menuList.map((item) => (
					<Link key={item.id} href={item.path}>
						<h2
							className={`flex gap-2 items-center font-medium p-5 cursor-pointer rounded-md hover:text-primary hover:bg-blue-100 mb-2 ${
								path === item.path
									? "text-primary bg-blue-100"
									: ""
							}`}>
							<item.icon />
							{item.name}
						</h2>
					</Link>
				))}
			</div>
		</div>
	);
}

export default SideNav;
