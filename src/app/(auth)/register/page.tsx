import Authform from "@/components/auth/AuthForm";
import ContentSection from "@/components/auth/ContentSection";
import RegisterForm from "@/components/auth/RegisterForm";

function Register() {
	return (
		<section className='bg-gray-50 min-h-screen flex items-center justify-center'>
			<div className='lg:grid lg:grid-cols-12 lg:gap-6 lg:max-w-screen-xl mx-auto shadow-md bg-white rounded-lg'>
				{/* Left Section */}
				<ContentSection />
				{/* Right Section */}
				<Authform label={"Register Here"}>
					<RegisterForm />
				</Authform>
			</div>
		</section>
	);
}

export default Register;
