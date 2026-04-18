import { motion } from 'motion/react';
import { 
  ArrowRight, 
  PieChart, 
  Wallet, 
  TrendingUp, 
  Shield, 
  Cloud, 
  Globe, 
  Smartphone,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text-primary selection:bg-brand-accent-2/20 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-brand-bg/80 backdrop-blur-md border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-brand-accent-1 to-brand-accent-2 rounded-lg flex items-center justify-center">
              <Wallet className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight uppercase">ExpensePro</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-secondary">
            <a href="#features" className="hover:text-brand-accent-1 transition-colors">Protocol</a>
            <a href="#testimonials" className="hover:text-brand-accent-1 transition-colors">Users</a>
            <a href="#about" className="hover:text-brand-accent-1 transition-colors">Core</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden sm:block text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-secondary hover:text-brand-accent-1 transition-colors">Login</button>
            <button 
              onClick={onGetStarted}
              className="bg-brand-accent-2 text-white px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-accent-1 transition-all active:scale-95 shadow-lg shadow-brand-accent-2/20"
            >
              Initialize
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none -z-10">
          <div className="absolute top-[-10%] right-[10%] w-[400px] h-[400px] bg-brand-accent-2/5 rounded-full blur-[120px] opacity-60 animate-pulse" />
          <div className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] bg-brand-accent-3/5 rounded-full blur-[120px] opacity-60 animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-surface border border-brand-border text-brand-accent-1 text-[9px] font-black mb-6 tracking-[0.2em] uppercase">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent-1 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-accent-1"></span>
                </span>
                Neural Finance Analysis Active
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-brand-text-primary mb-8 leading-[1.1] uppercase">
                Precision <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent-1 via-brand-accent-2 to-brand-accent-3">
                  Capital Tracking
                </span>
              </h1>
              
              <p className="text-sm md:text-base text-brand-text-secondary mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                The high-density interface for modern wealth management. Synchronize your accounts, identify patterns, and optimize liquidity with industrial precision.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <button 
                  onClick={onGetStarted}
                  className="w-full sm:w-auto px-8 py-4 bg-brand-accent-2 text-white rounded-xl font-black text-xs uppercase tracking-[0.3em] hover:bg-brand-accent-1 hover:shadow-2xl hover:shadow-brand-accent-1/20 transition-all flex items-center justify-center gap-2 group active:scale-95"
                >
                  Start Protocol
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full sm:w-auto px-8 py-4 bg-brand-surface text-brand-text-primary border border-brand-border rounded-xl font-black text-xs uppercase tracking-[0.3em] hover:bg-brand-bg transition-all active:scale-95">
                  System Demo
                </button>
              </div>

              <div className="mt-12 flex items-center gap-6 justify-center lg:justify-start">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-lg border-2 border-brand-bg bg-brand-surface overflow-hidden">
                      <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-lg border-2 border-brand-bg bg-brand-accent-2 flex items-center justify-center text-white text-[8px] font-black">
                    10K+
                  </div>
                </div>
                <p className="text-[10px] text-brand-text-secondary font-black uppercase tracking-[0.2em]">Liquid Assets Managed</p>
              </div>
            </motion.div>
          </div>

          <div className="flex-1 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Main App Mockup */}
              <div className="relative z-10 bg-brand-surface rounded-[2rem] p-3 shadow-2xl border border-brand-border">
                <div className="bg-brand-bg rounded-[1.5rem] overflow-hidden aspect-[9/18] sm:h-[550px] w-full border border-brand-border/50">
                  <div className="p-5 bg-gradient-brand text-white border-b border-brand-border">
                    <div className="flex justify-between items-center mb-6 opacity-50">
                      <div className="w-6 h-6 rounded-md bg-white/10" />
                      <div className="w-6 h-6 rounded-full bg-white/10" />
                    </div>
                    <p className="text-brand-text-secondary text-[10px] font-black uppercase tracking-[0.3em]">Total Liquidity</p>
                    <h3 className="text-3xl font-bold mt-1 tracking-tighter">$12,450.80</h3>
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="bg-brand-surface rounded-xl p-4 border border-brand-border">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-secondary">Flux Pattern</span>
                        <TrendingUp className="text-brand-accent-2 w-3.5 h-3.5" />
                      </div>
                      <div className="h-20 bg-brand-bg rounded-lg flex items-end gap-1 p-2 border border-brand-border/50">
                        {[40, 70, 45, 90, 65, 80, 55, 30, 85].map((h, i) => (
                          <div key={i} className="flex-1 bg-brand-accent-2/40 rounded-t-sm" style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-2 bg-brand-surface rounded-lg border border-brand-border">
                        <div className="w-8 h-8 bg-brand-bg rounded-md flex items-center justify-center border border-brand-border">
                          <PieChart className="text-brand-accent-3 w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] font-black text-brand-text-primary uppercase tracking-widest">Outflow</p>
                          <p className="text-[8px] text-brand-text-secondary uppercase tracking-widest">2H Delta</p>
                        </div>
                        <span className="text-xs font-bold text-brand-accent-3">-$42.00</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 bg-brand-surface rounded-lg border border-brand-border opacity-50">
                        <div className="w-8 h-8 bg-brand-bg rounded-md flex items-center justify-center border border-brand-border">
                          <Smartphone className="text-brand-accent-1 w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] font-black text-brand-text-primary uppercase tracking-widest">Sub-Routine</p>
                          <p className="text-[8px] text-brand-text-secondary uppercase tracking-widest">Yesterday</p>
                        </div>
                        <span className="text-xs font-bold text-brand-accent-3">-$14.99</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-accent-3 rounded-full blur-3xl opacity-10" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-accent-1 rounded-full blur-3xl opacity-10" />
              
              {/* Floating Widgets */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-16 -left-12 z-20 bg-brand-surface p-3 rounded-xl shadow-2xl border border-brand-border hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-brand-success/10 rounded-lg flex items-center justify-center border border-brand-success/20">
                    <TrendingUp className="text-brand-success w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[8px] text-brand-text-secondary font-black uppercase tracking-wider">Surplus</p>
                    <p className="text-xs font-bold text-brand-text-primary">+$2,400.00</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-16 -right-12 z-20 bg-brand-surface p-3 rounded-xl shadow-2xl border border-brand-border hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-brand-accent-1/10 rounded-lg flex items-center justify-center border border-brand-accent-1/20">
                    <PieChart className="text-brand-accent-1 w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[8px] text-brand-text-secondary font-black uppercase tracking-wider">Sync Stat</p>
                    <p className="text-xs font-bold text-brand-text-primary">Operational</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section id="features" className="py-20 px-6 bg-brand-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-surface/20 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-text-primary mb-6 uppercase tracking-tight">System Capabilities</h2>
            <p className="text-brand-text-secondary max-w-xl mx-auto text-sm font-medium">
              Advanced modules engineered to secure your financial sovereignty and maximize capital efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <PieChart className="w-5 h-5 text-brand-accent-1" />,
                title: "Pattern Analysis",
                desc: "High-resolution data mapping to visualize liquidity distribution across categories."
              },
              {
                icon: <TrendingUp className="w-5 h-5 text-brand-success" />,
                title: "Limit Management",
                desc: "Real-time surveillance of budget parameters with automated overflow warnings."
              },
              {
                icon: <Shield className="w-5 h-5 text-brand-accent-2" />,
                title: "Access Logic",
                desc: "Multi-factor biometric authentication protocols and PIN-level data encryption."
              },
              {
                icon: <Cloud className="w-5 h-5 text-sky-400" />,
                title: "Data Replication",
                desc: "Secure off-site mirroring for cross-terminal data availability and redundancy."
              },
              {
                icon: <Globe className="w-5 h-5 text-brand-accent-3" />,
                title: "Arbitrage Tools",
                desc: "Native multi-currency accounting with synchronized market exchange deltas."
              },
              {
                icon: <Smartphone className="w-5 h-5 text-brand-accent-1" />,
                title: "High Density UI",
                desc: "Optimized information density engineered for performance-oriented users."
              }
            ].map((feature, idx) => (
              <div key={idx} className="group bg-brand-surface p-6 rounded-2xl border border-brand-border hover:bg-brand-bg transition-all hover:border-brand-accent-2/40 shadow-xl shadow-black/20">
                <div className="w-10 h-10 rounded-xl bg-brand-bg flex items-center justify-center mb-5 border border-brand-border group-hover:border-brand-accent-2 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-sm font-black text-brand-text-primary mb-3 uppercase tracking-wider">{feature.title}</h3>
                <p className="text-brand-text-secondary leading-relaxed text-xs font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-brand-text-primary mb-8 leading-tight uppercase tracking-tight">
                Validated by <br />
                <span className="text-brand-accent-1 font-black">Core Users.</span>
              </h2>
              <div className="space-y-4">
                {[
                  { name: "S. Jenkins", role: "Design Lead", text: "The density and precision of this interface allows me to audit my capital flow in seconds." },
                  { name: "M. Wilson", role: "Engineer", text: "Finally, a finance tool that treats efficiency with the seriousness it deserves. Exceptional UI." }
                ].map((t, i) => (
                  <div key={i} className="p-5 bg-brand-surface rounded-xl border border-brand-border border-l-4 border-l-brand-accent-2">
                    <p className="text-brand-text-secondary italic text-xs mb-3 font-medium">"{t.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-md bg-brand-bg border border-brand-border" />
                      <div>
                        <p className="text-[10px] font-black text-brand-text-primary uppercase tracking-widest">{t.name}</p>
                        <p className="text-[8px] text-brand-text-secondary uppercase tracking-[0.2em]">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-brand-surface rounded-[2rem] overflow-hidden border border-brand-border p-4 shadow-2xl">
                <div className="w-full h-full rounded-2xl overflow-hidden relative border border-brand-border">
                  <img 
                    src="https://picsum.photos/seed/finance/800/800" 
                    alt="System Hub" 
                    className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-bg to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-brand-accent-1" />)}
                    </div>
                    <p className="text-xs font-black text-brand-text-primary uppercase tracking-[0.2em]">Operational Excellence</p>
                    <p className="text-[10px] text-brand-text-secondary uppercase tracking-widest font-medium mt-1">Deployed in 12+ Global Regions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-brand-border bg-brand-surface">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-brand-bg border border-brand-border rounded-lg flex items-center justify-center">
                <Wallet className="text-brand-accent-1 w-4 h-4" />
              </div>
              <span className="font-bold tracking-[0.1em] uppercase text-sm">ExpensePro</span>
            </div>
            <div className="flex items-center gap-8 text-[9px] font-black uppercase tracking-[0.3em] text-brand-text-secondary">
              <a href="#" className="hover:text-brand-accent-1">Terms</a>
              <a href="#" className="hover:text-brand-accent-1">Security</a>
              <a href="#" className="hover:text-brand-accent-1">Protocol</a>
            </div>
            <p className="text-[8px] text-brand-text-secondary font-black uppercase tracking-[0.3em]">© 2026 Core Finance Technologies. All metrics locked.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
