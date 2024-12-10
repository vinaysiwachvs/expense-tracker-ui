function Authform({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<main className='flex flex-col justify-center lg:col-span-7 xl:col-span-6 px-8 py-12'>
			<h1 className='text-2xl font-bold text-gray-800 text-center mb-8'>
				{label}
			</h1>
			{children}
		</main>
	);
}

export default Authform;
