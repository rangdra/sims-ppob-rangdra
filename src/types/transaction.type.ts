export interface ITransaction {
  invoice_number: string;
  transaction_type: string;
  description: string;
  total_amount: number;
  created_on: Date;
}
