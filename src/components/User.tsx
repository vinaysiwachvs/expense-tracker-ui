import { IUser } from "@/types/user";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";

function User({ user, title = true }: { user: IUser; title?: boolean }) {
	const handleLogout = async () => {
		console.log("logout");
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<UserHeader user={user} title={title} />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>{user.name}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Button onClick={handleLogout}>
						<LogOut className='mr-2' />
						<span>Log out</span>
					</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function UserHeader({ user, title }: { user: IUser; title: boolean }) {
	return (
		<div className='flex items-center gap-3 cursor-pointer'>
			<div className='w-10 h-10 rounded-full bg-primary flex items-center justify-center text-xl font-semibold text-white'>
				{user.name.charAt(0).toUpperCase()}
			</div>
			<div className='text-gray-800 text-lg font-medium'>
				Welcome, {title ? user.name : user.name.charAt(0).toUpperCase()}
			</div>
		</div>
	);
}

export default User;
