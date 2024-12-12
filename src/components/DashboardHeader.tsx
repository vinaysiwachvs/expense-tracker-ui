import { getUser } from "@/lib/auth";
import { getCookieValue } from "@/lib/common/cookie-utils";
import { IUser } from "@/types/user";
import { jwtDecode } from "jwt-decode";
import User from "./User";

async function DashboardHeader() {
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
		<div className='p-5 shadow-sm border-b flex justify-between'>
			<div className=''>Search Bar</div>
			<div className=''>
				<User user={user as IUser} />
			</div>
		</div>
	);
}

export default DashboardHeader;
