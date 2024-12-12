import { getUser } from "@/lib/auth";
import { getCookieValue } from "@/lib/common/cookie-utils";
import { IUser } from "@/types/user";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import User from "./User";

async function Header() {
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
		<div className='p-5 flex justify-between items-center border shadow-sm'>
			<Image src={"/logo.svg"} alt={"logo"} width={160} height={100} />
			<div className='mt-8 flex flex-wrap justify-center gap-4 items-center'>
				{user ? (
					<User user={user as IUser} />
				) : (
					<Link
						href='/login'
						className='block w-full rounded bg-primary px-6 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto'>
						Get Started
					</Link>
				)}
			</div>
		</div>
	);
}

export default Header;
