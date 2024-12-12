export interface IBudget {
	_id?: string;
	name: string;
	category: string;
	total_amount: number;
	used_amount: number;
	created_by: string;
	created_at?: Date;
	updated_by: string;
	updated_at?: Date;
}
