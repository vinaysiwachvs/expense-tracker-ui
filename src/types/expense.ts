export interface IExpense {
	_id?: string;
	name: string;
	amount: number;
	category: string;
	created_by: string;
	created_at: Date;
	updated_by: string;
	updated_at: Date;
}
