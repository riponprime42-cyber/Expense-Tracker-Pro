/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Category } from './types';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'Food', icon: 'Utensils', color: '#FF6B6B', type: 'expense' },
  { id: '2', name: 'Transport', icon: 'Car', color: '#4DABF7', type: 'expense' },
  { id: '3', name: 'Shopping', icon: 'ShoppingBag', color: '#FCC419', type: 'expense' },
  { id: '4', name: 'Bills', icon: 'Receipt', color: '#51CF66', type: 'expense' },
  { id: '5', name: 'Education', icon: 'BookOpen', color: '#845EF7', type: 'expense' },
  { id: '6', name: 'Health', icon: 'Activity', color: '#FF8787', type: 'expense' },
  { id: '7', name: 'Entertainment', icon: 'Film', color: '#BE4BDB', type: 'expense' },
  { id: '8', name: 'Others', icon: 'MoreHorizontal', color: '#868E96', type: 'expense' },
  { id: '9', name: 'Salary', icon: 'Wallet', color: '#12B886', type: 'income' },
  { id: '10', name: 'Gift', icon: 'Gift', color: '#FAB005', type: 'income' },
];

export const CURRENCIES = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'JPY', symbol: '¥' },
  { code: 'INR', symbol: '₹' },
];

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
];
