export interface IUser {
	_id?: string;
	name: string;
	email: string;
	password: string;
	total_expense: number;
	forgot_password?: boolean;
	is_logged_in?: boolean;
	token?: string;
}
