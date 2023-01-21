export type Transaction = {
  id?: number;
  from: number;
  to: number;
  memo?: string;
  description?: string;
  date: Date;
  pending: boolean;
};
