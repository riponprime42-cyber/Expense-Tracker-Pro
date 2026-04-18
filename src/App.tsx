/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import { Transaction, Category } from './types';
import { DEFAULT_CATEGORIES } from './constants';

export default function App() {
  const [hasStarted, setHasStarted] = useState(() => {
    return localStorage.getItem('hasStarted') === 'true';
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const handleStart = () => {
    setHasStarted(true);
    localStorage.setItem('hasStarted', 'true');
  };

  const handleAddTransaction = (t: Transaction) => {
    setTransactions(prev => [t, ...prev]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  if (!hasStarted) {
    return <LandingPage onGetStarted={handleStart} />;
  }

  return (
    <Dashboard 
      transactions={transactions}
      categories={categories}
      onAddTransaction={handleAddTransaction}
      onDeleteTransaction={handleDeleteTransaction}
      onBackToHome={() => {
        setHasStarted(false);
        localStorage.removeItem('hasStarted');
      }} 
    />
  );
}
