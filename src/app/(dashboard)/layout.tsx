import SideNav from "@/components/SideNav";

function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className=''>
			<div className='fixed md:w-64 hidden md:block '>
				<SideNav />
			</div>
			<div className='md:ml-64 '>{children}</div>
		</div>
	);
}

export default DashboardLayout;
