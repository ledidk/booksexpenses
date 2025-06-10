export interface Book {
  id: string;
  title: string;
  author: string;
  publishingDate: string;
  categoryId: string;
  distributionExpense: number;
  isbn?: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  color: string;
}

export interface ExpenseReport {
  categoryId: string;
  categoryName: string;
  totalExpense: number;
  bookCount: number;
  averageExpense: number;
}