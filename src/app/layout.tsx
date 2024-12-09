import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
	title: "Expense Tracker",
	description: "Created by Vinay Siwach",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	);
}
