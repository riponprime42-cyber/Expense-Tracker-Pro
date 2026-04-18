/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingDown, 
  TrendingUp, 
  Wallet,
  ArrowRight,
  PlusCircle,
  CreditCard
} from 'lucide-react';
import { Transaction, Category } from '../../types';
import { cn } from '../../lib/utils';
import { format } from 'date-fns';

interface HomeViewProps {
  transactions: Transaction[];
  categories: Category[];
  onAddClick: () => void;
  key?: string;
}

export default function HomeView({ transactions, categories, onAddClick }: HomeViewProps) {
  const stats = useMemo(() => {
    let income = 0;
    let expenses = 0;
    
    transactions.forEach(t => {
      if (t.type === 'income') income += t.amount;
      else expenses += t.amount;
    });

    const budgetGoal = 5000; // Mock budget
    const remainingBudget = Math.max(0, budgetGoal - expenses);
    const savings = income - expenses;

    return { income, expenses, remainingBudget, savings, budgetGoal };
  }, [transactions]);

  const recentTransactions = useMemo(() => {
    return transactions.slice(0, 5);
  }, [transactions]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-6 space-y-8"
    >
      {/* Greeting */}
      <div>
        <h2 className="text-2xl font-bold text-brand-text-primary">Hello, Alex! 👋</h2>
        <p className="text-brand-text-secondary text-sm">Here's your finance summary for April</p>
      </div>

      {/* Main Balance Card */}
      <div className="relative overflow-hidden bg-gradient-brand rounded-2xl p-6 text-white border border-brand-border shadow-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent-2/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
        
        <div className="relative z-10">
          <p className="text-brand-text-secondary text-[10px] font-bold mb-1 uppercase tracking-[0.2em]">Total Savings</p>
          <h3 className="text-4xl font-bold mb-8 tracking-tight">
            ${stats.savings.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-brand-bg/40 backdrop-blur-md rounded-xl p-3 border border-brand-border">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-5 h-5 bg-brand-success/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="text-brand-success w-3 h-3" />
                </div>
                <span className="text-[9px] uppercase font-bold tracking-widest text-brand-text-secondary">Income</span>
              </div>
              <p className="font-bold text-base">${stats.income.toLocaleString()}</p>
            </div>
            
            <div className="bg-brand-bg/40 backdrop-blur-md rounded-xl p-3 border border-brand-border">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-5 h-5 bg-brand-warning/20 rounded-full flex items-center justify-center">
                  <TrendingDown className="text-brand-warning w-3 h-3" />
                </div>
                <span className="text-[9px] uppercase font-bold tracking-widest text-brand-text-secondary">Expenses</span>
              </div>
              <p className="font-bold text-base">${stats.expenses.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Planner Alert Card */}
      <div className="bg-brand-surface rounded-2xl p-5 border border-brand-border shadow-sm overflow-hidden relative group">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h4 className="font-bold text-brand-text-primary text-sm uppercase tracking-wider">Budget Progress</h4>
            <p className="text-[10px] text-brand-text-secondary font-bold uppercase tracking-widest mt-0.5">Goal: ${stats.budgetGoal.toLocaleString()}</p>
          </div>
          <p className="text-[10px] font-bold text-brand-accent-1 bg-brand-accent-1/10 px-2 py-1 rounded-md uppercase tracking-wider">
            {Math.round((stats.expenses / stats.budgetGoal) * 100)}% Used
          </p>
        </div>
        
        <div className="h-2 bg-brand-bg rounded-full overflow-hidden border border-brand-border mb-2">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, (stats.expenses / stats.budgetGoal) * 100)}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={cn(
              "h-full rounded-full",
              stats.expenses > stats.budgetGoal ? "bg-brand-warning" : "bg-brand-accent-2"
            )}
          />
        </div>
        <p className="text-[9px] text-right font-bold text-brand-text-secondary uppercase tracking-[0.15em]">
          ${stats.remainingBudget.toLocaleString()} Available
        </p>
      </div>

      {/* Recent Activity */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h4 className="font-bold text-brand-text-secondary flex items-center gap-2 uppercase tracking-widest text-[10px]">
            Recent Transactions
          </h4>
          <button className="text-[10px] font-bold text-brand-accent-2 uppercase tracking-widest hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            History <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-2">
          {recentTransactions.length === 0 ? (
            <div className="bg-brand-surface border border-dashed border-brand-border rounded-2xl p-10 text-center">
              <div className="w-10 h-10 bg-brand-bg rounded-xl flex items-center justify-center mx-auto mb-3 border border-brand-border">
                <CreditCard className="w-5 h-5 text-brand-text-secondary/40" />
              </div>
              <p className="text-[10px] font-bold text-brand-text-secondary uppercase tracking-widest mb-1">No Activity</p>
            </div>
          ) : (
            recentTransactions.map((t) => {
              const category = categories.find(c => c.id === t.categoryId);
              return (
                <div key={t.id} className="group bg-brand-surface p-3 rounded-xl border border-brand-border shadow-sm flex items-center gap-3 hover:bg-brand-bg/50 transition-all active:scale-[0.99]">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border border-brand-border/50"
                    style={{ backgroundColor: `${category?.color}10`, color: category?.color }}
                  >
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-brand-text-primary text-sm truncate">{category?.name || 'Others'}</p>
                    <p className="text-[10px] text-brand-text-secondary font-bold uppercase tracking-widest">{format(new Date(t.date), 'MMM dd')}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={cn(
                      "font-bold text-base leading-tight",
                      t.type === 'expense' ? "text-brand-accent-3" : "text-brand-success"
                    )}>
                      {t.type === 'expense' ? '-' : '+'}${t.amount.toLocaleString()}
                    </p>
                    <p className="text-[9px] font-bold text-brand-text-secondary uppercase tracking-widest truncate max-w-[80px]">
                      {t.note || 'Cash'}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
  );
}
