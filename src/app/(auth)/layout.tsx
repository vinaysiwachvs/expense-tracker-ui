import React from "react";
import "../globals.css";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang='en'>
			<body>
				<main>{children}</main>
			</body>
		</html>
	);
};

export default AuthLayout;
