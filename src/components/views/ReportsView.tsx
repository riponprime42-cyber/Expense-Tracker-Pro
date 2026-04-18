/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PieChart as PieChartIcon, 
  BarChart as BarChartIcon, 
  TrendingUp, 
  Download,
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  LineChart, 
  Line,
  CartesianGrid
} from 'recharts';
import { Transaction, Category } from '../../types';
import { cn } from '../../lib/utils';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

interface ReportsViewProps {
  transactions: Transaction[];
  categories: Category[];
  key?: string;
}

export default function ReportsView({ transactions, categories }: ReportsViewProps) {
  const [reportType, setReportType] = useState<'spending' | 'trend'>('spending');

  const categoryData = useMemo(() => {
    const data: { name: string, value: number, color: string }[] = [];
    categories.forEach(cat => {
      const total = transactions
        .filter(t => t.categoryId === cat.id && t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
      if (total > 0) {
        data.push({ name: cat.name, value: total, color: cat.color });
      }
    });
    return data.sort((a, b) => b.value - a.value);
  }, [transactions, categories]);

  const dailyData = useMemo(() => {
    const monthStart = startOfMonth(new Date());
    const monthEnd = endOfMonth(new Date());
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    return days.map(day => {
      const expenses = transactions
        .filter(t => t.type === 'expense' && isSameDay(new Date(t.date), day))
        .reduce((sum, t) => sum + t.amount, 0);
      return {
        name: format(day, 'd'),
        amount: expenses
      };
    });
  }, [transactions]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-6 space-y-8"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-brand-text-primary tracking-tight">Analytics</h2>
          <p className="text-brand-text-secondary text-[10px] font-bold uppercase tracking-widest mt-1">Monthly Reports</p>
        </div>
        <button className="p-2.5 bg-brand-surface border border-brand-border rounded-xl shadow-sm hover:bg-brand-bg transition-all text-brand-text-secondary hover:text-brand-accent-1">
          <Download className="w-5 h-5" />
        </button>
      </div>

      {/* View Switcher */}
      <div className="flex bg-brand-surface border border-brand-border p-1 rounded-xl">
        <button 
          onClick={() => setReportType('spending')}
          className={cn(
            "flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2",
            reportType === 'spending' ? "bg-brand-bg text-brand-accent-1 shadow-sm border border-brand-border" : "text-brand-text-secondary"
          )}
        >
          <PieChartIcon className="w-3.5 h-3.5" /> Classes
        </button>
        <button 
          onClick={() => setReportType('trend')}
          className={cn(
            "flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2",
            reportType === 'trend' ? "bg-brand-bg text-brand-accent-1 shadow-sm border border-brand-border" : "text-brand-text-secondary"
          )}
        >
          <TrendingUp className="w-3.5 h-3.5" /> Patterns
        </button>
      </div>

      <AnimatePresence mode="wait">
        {reportType === 'spending' ? (
          <motion.div 
            key="spending"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-6"
          >
            {/* Pie Chart Card */}
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={85}
                      paddingAngle={6}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b',
                        borderRadius: '12px', 
                        border: '1px solid #334155', 
                        fontSize: '11px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        color: '#f8fafc'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                 <p className="text-[9px] font-bold text-brand-text-secondary uppercase tracking-[0.2em] mb-1">Spent</p>
                 <p className="text-2xl font-bold text-brand-text-primary leading-none tracking-tight">
                   ${categoryData.reduce((s, d) => s + d.value, 0).toLocaleString()}
                 </p>
              </div>
            </div>

            {/* Legend List */}
            <div className="space-y-2">
              {categoryData.map((d, i) => (
                <div key={i} className="flex items-center gap-3 bg-brand-surface p-3 rounded-xl border border-brand-border transition-all hover:bg-brand-bg/50">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  <p className="flex-1 font-bold text-brand-text-primary text-[11px] uppercase tracking-wider">{d.name}</p>
                  <p className="font-bold text-brand-text-primary text-sm">${d.value.toLocaleString()}</p>
                  <div className={cn(
                    "text-[9px] font-black w-10 text-right px-1.5 py-0.5 rounded-md",
                    "bg-brand-bg border border-brand-border text-brand-text-secondary"
                  )}>
                    {Math.round((d.value / categoryData.reduce((s, x) => s + x.value, 0)) * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="trend"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-6"
          >
            {/* Bar Chart Card */}
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-5 shadow-xl">
               <div className="flex justify-between items-center mb-6">
                 <h4 className="text-[10px] font-bold text-brand-text-secondary uppercase tracking-[0.2em]">Spending History</h4>
                 <div className="flex gap-2">
                   <div className="flex items-center gap-1.5">
                     <div className="w-2 h-2 rounded-full bg-brand-accent-2" />
                     <span className="text-[9px] font-bold text-brand-text-secondary uppercase tracking-widest">Outflow</span>
                   </div>
                 </div>
               </div>
               
               <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyData}>
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 'bold' }}
                    />
                    <Tooltip 
                      cursor={{ fill: '#0f172a' }}
                      contentStyle={{ 
                        backgroundColor: '#1e293b',
                        borderRadius: '12px', 
                        border: '1px solid #334155', 
                        fontSize: '11px',
                        color: '#f8fafc'
                      }}
                    />
                    <Bar 
                      dataKey="amount" 
                      fill="#818cf8" 
                      radius={[3, 3, 3, 3]}
                      barSize={8}
                    />
                  </BarChart>
                </ResponsiveContainer>
               </div>
            </div>

            {/* Savings Over Time Summary */}
            <div className="bg-gradient-brand rounded-2xl p-5 text-white overflow-hidden relative border border-brand-border shadow-xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent-1/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
              <div className="relative z-10">
                <h4 className="text-[9px] font-bold text-brand-text-secondary uppercase tracking-[0.2em] mb-3">Strategy Insight</h4>
                <div className="flex items-end gap-2 mb-2">
                  <TrendingUp className="text-brand-success w-6 h-6" />
                  <p className="text-2xl font-bold tracking-tight text-brand-text-primary">+12.5% Growth</p>
                </div>
                <p className="text-[11px] text-brand-text-secondary leading-normal font-medium max-w-xs">
                  Portfolio liquidity increased by 12.5% delta. Capital efficiency is high.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
