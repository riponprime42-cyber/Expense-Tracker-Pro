/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TransactionType = 'income' | 'expense';

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: TransactionType;
  budgetLimit?: number;
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  note: string;
  date: string; // ISO string
  recurring?: boolean;
}

export interface UserPreferences {
  currency: string;
  language: string;
  theme: 'light' | 'dark';
  isLocked: boolean;
  pin?: string;
}
