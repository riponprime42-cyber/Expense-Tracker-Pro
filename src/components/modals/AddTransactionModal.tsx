/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import type React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ChevronRight, 
  Calendar, 
  ArrowRight,
  Plus,
  TrendingDown,
  TrendingUp,
  Tag
} from 'lucide-react';
import { Transaction, Category, TransactionType } from '../../types';
import { cn } from '../../lib/utils';
import { format } from 'date-fns';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (t: Omit<Transaction, 'id'>) => void;
  categories: Category[];
}

export default function AddTransactionModal({ isOpen, onClose, onAdd, categories }: AddTransactionModalProps) {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [categoryId, setCategoryId] = useState(categories.find(c => c.type === 'expense')?.id || '');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(parseFloat(amount))) return;
    
    onAdd({
      amount: parseFloat(amount),
      type,
      categoryId,
      note,
      date: new Date(date).toISOString(),
    });
    
    setAmount('');
    setNote('');
  };

  const activeCategories = categories.filter(c => c.type === type);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-bg/80 backdrop-blur-md z-[100]"
          />
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-brand-surface rounded-t-[2.5rem] z-[101] p-6 max-h-[95vh] overflow-y-auto border-t border-brand-border shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-black text-brand-text-secondary uppercase tracking-[0.3em]">New Log Entry</h2>
              <button 
                onClick={onClose}
                className="p-2 bg-brand-bg rounded-xl border border-brand-border hover:bg-brand-surface transition-colors"
              >
                <X className="w-5 h-5 text-brand-text-secondary" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Type Switcher */}
              <div className="flex bg-brand-bg p-1 rounded-xl border border-brand-border">
                <button 
                  type="button"
                  onClick={() => {
                    setType('expense');
                    setCategoryId(categories.find(c => c.type === 'expense')?.id || '');
                  }}
                  className={cn(
                    "flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2",
                    type === 'expense' ? "bg-brand-accent-3 text-white shadow-lg" : "text-brand-text-secondary"
                  )}
                >
                  <TrendingDown className="w-4 h-4" /> Outflow
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setType('income');
                    setCategoryId(categories.find(c => c.type === 'income')?.id || '');
                  }}
                  className={cn(
                    "flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2",
                    type === 'income' ? "bg-brand-success text-white shadow-lg" : "text-brand-text-secondary"
                  )}
                >
                  <TrendingUp className="w-4 h-4" /> Inflow
                </button>
              </div>

              {/* Amount Input */}
              <div className="text-center py-4 bg-brand-bg border border-brand-border rounded-2xl">
                <p className="text-[9px] font-black text-brand-text-secondary uppercase tracking-[0.3em] mb-1">Quantum Value</p>
                <div className="flex items-center justify-center">
                  <span className="text-2xl font-bold text-brand-text-secondary mr-1 opacity-50">$</span>
                  <input 
                    type="number" 
                    step="0.01"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full text-5xl font-bold text-brand-text-primary focus:outline-none placeholder:text-brand-border text-center tracking-tighter bg-transparent"
                    autoFocus
                  />
                </div>
              </div>

              {/* Category Selection */}
              <div className="space-y-3">
                <p className="text-[9px] font-black text-brand-text-secondary uppercase tracking-[0.3em] px-1">Classification</p>
                <div className="grid grid-cols-4 gap-3">
                  {activeCategories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategoryId(cat.id)}
                      className={cn(
                        "flex flex-col items-center gap-1.5 group transition-all",
                        categoryId === cat.id ? "scale-105" : "opacity-40 grayscale hover:grayscale-0 hover:opacity-100"
                      )}
                    >
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center border border-brand-border relative overflow-hidden"
                        style={{ backgroundColor: `${cat.color}10`, color: cat.color }}
                      >
                        <Tag className="w-5 h-5" />
                        {categoryId === cat.id && (
                          <motion.div layoutId="active-cat" className="absolute inset-0 border-2 border-brand-accent-2 rounded-xl" />
                        )}
                      </div>
                      <span className="text-[9px] font-bold text-brand-text-secondary uppercase tracking-widest truncate w-full text-center">{cat.name}</span>
                    </button>
                  ))}
                  <button className="flex flex-col items-center gap-1.5 group opacity-40">
                    <div className="w-12 h-12 rounded-xl bg-brand-bg flex items-center justify-center border border-dashed border-brand-border text-brand-text-secondary">
                      <Plus className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest">New</span>
                  </button>
                </div>
              </div>

              {/* Note & Date */}
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-brand-bg rounded-xl p-3 flex items-center gap-3 border border-brand-border">
                  <div className="w-8 h-8 bg-brand-surface rounded-lg flex items-center justify-center text-brand-text-secondary border border-brand-border">
                    <PlusCircle className="w-4 h-4 rotate-45" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Reference note..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="flex-1 bg-transparent focus:outline-none font-bold text-brand-text-primary text-xs uppercase tracking-wider placeholder:text-brand-text-secondary/40"
                  />
                </div>
                <div className="bg-brand-bg rounded-xl p-3 flex items-center gap-3 border border-brand-border">
                   <div className="w-8 h-8 bg-brand-surface rounded-lg flex items-center justify-center text-brand-text-secondary border border-brand-border">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <input 
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="flex-1 bg-transparent focus:outline-none font-bold text-brand-text-primary text-xs uppercase tracking-wider"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className={cn(
                  "w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.4em] shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95",
                  type === 'expense' ? "bg-brand-accent-3 text-white shadow-brand-accent-3/20" : "bg-brand-success text-white shadow-brand-success/20"
                )}
              >
                COMMIT TRANSACTION <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function PlusCircle({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
  );
}
