import Link from "next/link";

function RegisterForm() {
	return (
		<form className='space-y-6'>
			<div>
				<label
					htmlFor='name'
					className='block text-sm font-medium text-gray-700'>
					Name
				</label>
				<input
					type='text'
					id='name'
					name='name'
					placeholder='Vinay Siwach'
					required
					className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
				/>
			</div>

			{/* Email */}
			<div>
				<label
					htmlFor='email'
					className='block text-sm font-medium text-gray-700'>
					Email Address
				</label>
				<input
					type='email'
					id='email'
					name='email'
					placeholder='vinay@mail.com'
					required
					className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
				/>
			</div>

			{/* Password Fields */}
			<div>
				<label
					htmlFor='password'
					className='block text-sm font-medium text-gray-700'>
					Password
				</label>
				<input
					type='password'
					id='password'
					name='password'
					required
					placeholder='••••••••'
					className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
				/>
			</div>

			{/* Submit Button */}
			<div className='flex flex-col items-center space-y-3'>
				<button
					type='submit'
					className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
					Sign Up
				</button>
				<p className='text-sm text-gray-600'>
					Already have an account?{" "}
					<Link href='/login' className='text-blue-600'>
						Log in
					</Link>
				</p>
			</div>
		</form>
	);
}

export default RegisterForm;
