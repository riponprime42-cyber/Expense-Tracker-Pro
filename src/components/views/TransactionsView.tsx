/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  Calendar, 
  Trash2, 
  ChevronDown,
  ArrowUpDown,
  Wallet,
  X
} from 'lucide-react';
import { Transaction, Category } from '../../types';
import { cn } from '../../lib/utils';
import { format } from 'date-fns';

interface TransactionsViewProps {
  transactions: Transaction[];
  categories: Category[];
  onDelete: (id: string) => void;
  key?: string;
}

export default function TransactionsView({ transactions, categories, onDelete }: TransactionsViewProps) {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<string | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(t => {
        const cat = categories.find(c => c.id === t.categoryId);
        const matchesSearch = t.note.toLowerCase().includes(search.toLowerCase()) || 
                             cat?.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = filterCategory === 'all' || t.categoryId === filterCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'date') {
          return sortOrder === 'desc' 
            ? new Date(b.date).getTime() - new Date(a.date).getTime()
            : new Date(a.date).getTime() - new Date(b.date).getTime();
        } else {
          return sortOrder === 'desc' ? b.amount - a.amount : a.amount - b.amount;
        }
      });
  }, [transactions, search, filterCategory, sortBy, sortOrder, categories]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-6 space-y-6"
    >
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-brand-text-primary tracking-tight">Transactions</h2>
          <p className="text-brand-text-secondary text-[10px] font-bold uppercase tracking-widest mt-1">
            {filteredTransactions.length} records found
          </p>
        </div>
        <div className="flex gap-2">
          <button className="p-2.5 bg-brand-surface border border-brand-border rounded-xl shadow-sm hover:bg-brand-bg transition-all active:scale-95">
            <Filter className="w-5 h-5 text-brand-text-secondary" />
          </button>
        </div>
      </div>

      {/* Search and Sort */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-text-secondary w-4 h-4" />
          <input 
            type="text"
            placeholder="Search activity..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-brand-surface border border-brand-border rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-accent-2 transition-all font-medium text-brand-text-primary text-sm placeholder:text-brand-text-secondary/50"
          />
          {search && (
            <button 
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center bg-brand-bg rounded-md hover:bg-brand-border transition-colors"
            >
              <X className="w-3 h-3 text-brand-text-secondary" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <CategoryChip 
            active={filterCategory === 'all'} 
            onClick={() => setFilterCategory('all')} 
            label="All" 
          />
          {categories.map(cat => (
            <CategoryChip 
              key={cat.id}
              active={filterCategory === cat.id} 
              onClick={() => setFilterCategory(cat.id)} 
              label={cat.name} 
              color={cat.color}
            />
          ))}
        </div>

        <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-widest text-brand-text-secondary">
          <button 
            onClick={() => {
              if (sortBy === 'date') setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
              else setSortBy('date');
            }}
            className={cn("flex items-center gap-1 hover:text-brand-accent-2 transition-colors", sortBy === 'date' && "text-brand-text-primary")}
          >
            Sort by Date <ArrowUpDown className="w-2.5 h-2.5" />
          </button>
          <button 
            onClick={() => {
              if (sortBy === 'amount') setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
              else setSortBy('amount');
            }}
            className={cn("flex items-center gap-1 hover:text-brand-accent-2 transition-colors", sortBy === 'amount' && "text-brand-text-primary")}
          >
            Sort by Amount <ArrowUpDown className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="space-y-2">
        {filteredTransactions.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-brand-text-secondary font-bold uppercase tracking-widest text-[10px] italic">No results found</p>
          </div>
        ) : (
          filteredTransactions.map((t) => {
            const category = categories.find(c => c.id === t.categoryId);
            return (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={t.id} 
                className="group relative bg-brand-surface p-3 rounded-xl border border-brand-border shadow-sm flex items-center gap-3 hover:bg-brand-bg/50 transition-all active:scale-[0.99]"
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border border-brand-border/50"
                  style={{ backgroundColor: `${category?.color}10`, color: category?.color }}
                >
                  <Wallet className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className={cn(
                    "text-[8px] font-black uppercase tracking-[0.2em] px-1.5 py-0.5 rounded-md mb-1 inline-block",
                    t.type === 'expense' ? "bg-brand-accent-3/10 text-brand-accent-3" : "bg-brand-success/10 text-brand-success"
                  )}>
                    {category?.name || 'Other'}
                  </span>
                  <p className="text-[10px] text-brand-text-secondary font-bold uppercase tracking-widest block">{format(new Date(t.date), 'MMM dd, HH:mm')}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className={cn(
                    "font-bold text-base leading-tight tracking-tight",
                    t.type === 'expense' ? "text-brand-accent-3" : "text-brand-success"
                  )}>
                    {t.type === 'expense' ? '-' : '+'}${t.amount.toLocaleString()}
                  </p>
                  <p className="text-[9px] font-bold text-brand-text-secondary uppercase tracking-widest line-clamp-1 max-w-[100px]">
                    {t.note || 'No description'}
                  </p>
                </div>
                
                {/* Swipe/Delete Overlay (Simulated) */}
                <button 
                  onClick={() => onDelete(t.id)}
                  className="absolute -right-2 top-1/2 -translate-y-1/2 translate-x-12 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 p-2.5 bg-brand-accent-3 text-white rounded-lg shadow-lg transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}

function CategoryChip({ label, active, onClick, color }: { label: string, active: boolean, onClick: () => void, color?: string, key?: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all border",
        active 
          ? "bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-200" 
          : "bg-white text-slate-400 border-slate-100 hover:border-slate-200"
      )}
      style={active && color ? { backgroundColor: color, borderColor: color } : {}}
    >
      {label}
    </button>
  );
}
