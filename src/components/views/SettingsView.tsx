/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import type React from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Cloud, 
  Moon, 
  DollarSign, 
  HelpCircle,
  ChevronRight,
  Lock,
  LogOut,
  Smartphone
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../contexts/ThemeContext';

export default function SettingsView() {
  const { theme, toggleTheme } = useTheme();
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('en');

  const darkMode = theme === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-6 space-y-8"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-brand-text-primary tracking-tight">Settings</h2>
          <p className="text-brand-text-secondary text-[10px] font-bold uppercase tracking-widest mt-1">Profile Configuration</p>
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-brand-surface rounded-2xl p-5 border border-brand-border shadow-xl flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-brand-bg flex items-center justify-center border border-brand-border overflow-hidden shrink-0">
           <img src="https://picsum.photos/seed/user/200/200" alt="Avatar" referrerPolicy="no-referrer" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-brand-text-primary text-base">Alex Thompson</h3>
          <p className="text-[10px] text-brand-text-secondary font-bold uppercase tracking-widest">alex.saving@hq.com</p>
          <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 bg-brand-accent-1/10 rounded-md border border-brand-accent-1/20">
             <div className="w-1 h-1 rounded-full bg-brand-accent-1" />
             <span className="text-[8px] font-black text-brand-accent-1 uppercase tracking-[0.2em]">Enterprise Elite</span>
          </div>
        </div>
        <button className="p-2.5 bg-brand-bg rounded-xl text-brand-text-secondary hover:text-brand-accent-1 border border-brand-border transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Settings Groups */}
      <div className="space-y-6">
        <SettingsGroup title="Core System">
          <SettingsItem 
            icon={<Moon className="w-5 h-5" />} 
            label="Density Mode" 
            control={
              <button 
                onClick={toggleTheme}
                className={cn(
                  "w-10 h-6 rounded-lg transition-all relative border border-brand-border",
                  darkMode ? "bg-brand-accent-2" : "bg-brand-bg"
                )}
              >
                <motion.div 
                  animate={{ x: darkMode ? 18 : 3 }}
                  className="absolute top-1 w-3.5 h-3.5 bg-white rounded-md shadow-sm"
                />
              </button>
            }
          />
          <SettingsItem 
            icon={<DollarSign className="w-5 h-5" />} 
            label="Valuation" 
            value={currency}
            onClick={() => setCurrency(currency === 'USD' ? 'EUR' : 'USD')}
          />
          <SettingsItem 
            icon={<Globe className="w-5 h-5" />} 
            label="Localization" 
            value="Global/EN"
          />
        </SettingsGroup>

        <SettingsGroup title="Internalized Security">
          <SettingsItem 
            icon={<Shield className="w-5 h-5" />} 
            label="Access Control" 
            value="Biometric"
          />
          <SettingsItem 
            icon={<Cloud className="w-5 h-5" />} 
            label="Replication" 
            value="Automatic"
          />
        </SettingsGroup>

        <SettingsGroup title="Documentation">
          <SettingsItem icon={<HelpCircle className="w-5 h-5" />} label="Terminal Help" />
          <SettingsItem icon={<Lock className="w-5 h-5" />} label="Protocol Privacy" />
        </SettingsGroup>
      </div>

      <button className="w-full py-3.5 bg-brand-bg border border-brand-accent-3/30 text-brand-accent-3 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-2 hover:bg-brand-accent-3/10 transition-colors">
        <LogOut className="w-4 h-4 text-brand-accent-3" /> Deauthenticate
      </button>
      
      <p className="text-center text-[9px] text-brand-text-secondary font-black uppercase tracking-[0.3em] pb-10">
        EXPENSE PRO CORE VERSION 2.4.0
      </p>
    </motion.div>
  );
}

function SettingsGroup({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h4 className="text-[9px] font-black text-brand-text-secondary uppercase tracking-[0.2em] pl-2 mb-2">{title}</h4>
      <div className="bg-brand-surface rounded-xl border border-brand-border shadow-sm overflow-hidden">
        {children}
      </div>
    </div>
  );
}

function SettingsItem({ icon, label, value, onClick, control }: { 
  icon: React.ReactNode, 
  label: string, 
  value?: string, 
  onClick?: () => void,
  control?: React.ReactNode
}) {
  const isClickable = !!onClick && !control;
  const Tag = isClickable ? 'button' : 'div';

  return (
    <Tag 
      onClick={onClick}
      className={cn(
        "w-full p-4 flex items-center gap-3 transition-colors border-b border-brand-border last:border-0 text-left",
        isClickable && "hover:bg-brand-bg/50 cursor-pointer"
      )}
    >
      <div className="w-9 h-9 rounded-lg bg-brand-bg flex items-center justify-center text-brand-text-secondary shrink-0 border border-brand-border/50">
        {icon}
      </div>
      <span className="flex-1 text-left font-bold text-brand-text-primary text-xs uppercase tracking-wider">{label}</span>
      {value && <span className="text-[10px] font-bold text-brand-text-secondary uppercase tracking-widest mr-2">{value}</span>}
      {control ? control : <ChevronRight className="w-3.5 h-3.5 text-brand-text-secondary/40" />}
    </Tag>
  );
}
