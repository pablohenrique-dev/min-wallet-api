export interface Transaction {
  id: string;
  title: string;
  description: string;
  value: number;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}
