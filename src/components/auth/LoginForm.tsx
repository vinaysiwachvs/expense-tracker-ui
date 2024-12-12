"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginUserHandler } from "@/actions/auth";
import { useRouter } from "next/navigation";
import CommonButton from "../common/Button";
import { useState } from "react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

// Define the schema with Zod validation
const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z
		.string()
		.min(6, "Password must be at least 6 characters")
		.max(50, "Password must not exceed 50 characters"),
});

const LoginForm = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof loginSchema>) => {
		try {
			setIsLoading(true);
			const response = await loginUserHandler(data);
			if (response && response.token) {
				toast({
					title: "Login successful.",
					variant: "success",
				});
				setIsLoading(false);
				router.push("/");
			}
		} catch (error) {
			toast({
				title: "Login failed.",
				variant: "destructive",
			});
			setIsLoading(false);
			console.log("error", error);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
				{/* Email Input Field */}
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-foreground'>
								Email Address
							</FormLabel>
							<FormControl>
								<Input
									placeholder='Enter your email'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Password Input Field */}
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-foreground'>
								Password
							</FormLabel>
							<FormControl>
								<Input
									type='password'
									placeholder='Enter your password'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Submit Button */}
				<div className='flex flex-col items-center space-y-3'>
					<CommonButton
						type='submit'
						loading={isLoading}
						className='w-full bg-blue-600 text-white py-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
						Login
					</CommonButton>
					<p className='text-sm text-gray-600'>
						Didn&apos;t have an account?{" "}
						<Link href='/register' className='text-blue-600'>
							Register
						</Link>
					</p>
				</div>
			</form>
		</Form>
	);
};

export default LoginForm;
