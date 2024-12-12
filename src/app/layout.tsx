import React from "react";
import "./globals.css";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
	title: "Expense Tracker",
	description: "Created by Vinay Siwach",
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang='en'>
			<body>
				<main>{children}</main>
			</body>
			<Toaster />
		</html>
	);
};

export default AuthLayout;
