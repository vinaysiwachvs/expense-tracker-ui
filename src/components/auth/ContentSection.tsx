import React from "react";

function ContentSection() {
	return (
		<section className='relative flex items-center justify-center lg:col-span-5 xl:col-span-6 bg-gradient-to-tr from-blue-500 to-blue-800 text-white'>
			<div className='p-8 lg:p-12 text-center'>
				<h2 className='text-2xl font-bold sm:text-3xl'>
					Welcome to Expense Tracker 💰
				</h2>
				<p className='mt-4 text-lg leading-relaxed'>
					Start managing your budget and saving more today. Get
					started now!
				</p>
			</div>
		</section>
	);
}

export default ContentSection;
