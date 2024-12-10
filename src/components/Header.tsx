import Image from "next/image";
import Link from "next/link";

function Header() {
	return (
		<div className='p-5 flex justify-between items-center border shadow-sm'>
			<Image
				src={"/logo.svg"}
				alt={"logo"}
				width={160}
				height={100}
				className={""}
			/>
			<div className='mt-8 flex flex-wrap justify-center gap-4'>
				<Link
					className='block w-full rounded bg-primary px-6 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto'
					href='/login'>
					Get Started
				</Link>
			</div>
		</div>
	);
}

export default Header;
