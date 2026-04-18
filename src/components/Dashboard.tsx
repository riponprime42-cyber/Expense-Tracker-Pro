import { useState, useMemo } from 'react';
import type React from 'react';
import { 
  BarChart3, 
  History, 
  Home, 
  Settings, 
  Plus,
  PlusCircle,
  TrendingDown,
  TrendingUp,
  Wallet,
  LogOut,
  ChevronRight,
  Filter,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Transaction, Category } from '../types';
import { DEFAULT_CATEGORIES } from '../constants';
import TransactionsView from './views/TransactionsView';
import HomeView from './views/HomeView';
import ReportsView from './views/ReportsView';
import SettingsView from './views/SettingsView';
import AddTransactionModal from './modals/AddTransactionModal';

interface DashboardProps {
  onBackToHome: () => void;
  transactions: Transaction[];
  categories: Category[];
  onAddTransaction: (t: Transaction) => void;
  onDeleteTransaction: (id: string) => void;
}

type NavView = 'home' | 'history' | 'reports' | 'settings';

export default function Dashboard({ 
  onBackToHome, 
  transactions, 
  categories, 
  onAddTransaction, 
  onDeleteTransaction 
}: DashboardProps) {
  const [activeView, setActiveView] = useState<NavView>('home');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddTransaction = (t: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...t,
      id: Math.random().toString(36).substr(2, 9),
    };
    onAddTransaction(newTransaction);
    setIsAddModalOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-brand-bg text-brand-text-primary overflow-hidden font-sans">
      {/* Header */}
      <header className="px-6 py-4 bg-brand-surface border-b border-brand-border flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-brand-accent-1 to-brand-accent-2 rounded-lg flex items-center justify-center">
            <Wallet className="text-white w-5 h-5" />
          </div>
          <h1 className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-accent-1 to-brand-accent-2 uppercase">ExpensePro</h1>
        </div>
        <button 
          onClick={onBackToHome}
          className="p-2 text-brand-text-secondary hover:text-brand-accent-3 hover:bg-brand-accent-3/10 rounded-xl transition-all"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-xl mx-auto h-full border-x border-brand-border/30">
          <AnimatePresence mode="wait">
            {activeView === 'home' && (
              <HomeView 
                transactions={transactions} 
                categories={categories}
                onAddClick={() => setIsAddModalOpen(true)}
              />
            )}
            {activeView === 'history' && (
              <TransactionsView 
                transactions={transactions} 
                categories={categories}
                onDelete={onDeleteTransaction}
              />
            )}
            {activeView === 'reports' && (
              <ReportsView 
                transactions={transactions} 
                categories={categories}
              />
            )}
            {activeView === 'settings' && (
              <SettingsView 
              />
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddModalOpen(true)}
          className="w-12 h-12 bg-brand-accent-2 rounded-xl shadow-2xl flex items-center justify-center text-white hover:bg-brand-accent-1 transition-all border-2 border-brand-bg active:scale-90"
        >
          <Plus className="w-7 h-7" />
        </motion.button>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-brand-surface/80 backdrop-blur-xl border-t border-brand-border px-6 py-2 flex justify-between items-center z-40">
        <NavItem 
          active={activeView === 'home'} 
          onClick={() => setActiveView('home')} 
          icon={<Home className="w-4 h-4" />} 
          label="Dash" 
        />
        <NavItem 
          active={activeView === 'history'} 
          onClick={() => setActiveView('history')} 
          icon={<History className="w-4 h-4" />} 
          label="Lists" 
        />
        <div className="w-16" /> {/* Spacer for FAB */}
        <NavItem 
          active={activeView === 'reports'} 
          onClick={() => setActiveView('reports')} 
          icon={<BarChart3 className="w-4 h-4" />} 
          label="Stats" 
        />
        <NavItem 
          active={activeView === 'settings'} 
          onClick={() => setActiveView('settings')} 
          icon={<Settings className="w-4 h-4" />} 
          label="Sync" 
        />
      </nav>

      {/* Modals */}
      <AddTransactionModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTransaction}
        categories={categories}
      />
    </div>
  );
}

function NavItem({ active, onClick, icon, label }: { 
  active: boolean, 
  onClick: () => void, 
  icon: React.ReactNode, 
  label: string 
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 transition-all",
        active ? "text-brand-accent-1" : "text-brand-text-secondary"
      )}
    >
      <div className={cn(
        "relative flex flex-col items-center transition-all px-4",
        active && "scale-110"
      )}>
        {icon}
        {active && <motion.div layoutId="nav-dot" className="absolute -bottom-2 w-1.5 h-0.5 rounded-full bg-brand-accent-1" />}
      </div>
      <span className="text-[8px] font-black uppercase tracking-[0.2em]">{label}</span>
    </button>
  );
}
