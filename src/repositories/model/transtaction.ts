export interface Transaction {
  id: string;
  title: string;
  description: string;
  value: number;
  user_id: string;
  date: Date;
  type: "INCOME" | "EXPENSE";
  created_at: Date;
  updated_at: Date;
}
