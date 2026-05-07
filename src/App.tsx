import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Wallet, 
  TrendingUp, 
  MapPin, 
  HelpCircle, 
  LogOut, 
  Settings,
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AppLayout from './components/layout/AppLayout';
import ClientsModule from './components/modules/ClientsModule';
import ProductsModule from './components/modules/ProductsModule';
import OrdersModule from './components/modules/OrdersModule';
import FinanceModule from './components/modules/FinanceModule';
import ReportsModule from './components/modules/ReportsModule';
import ExpensesModule from './components/modules/ExpensesModule';
import UserManagementModule from './components/modules/UserManagementModule';
import HelpdeskModule from './components/modules/HelpdeskModule';
import HomeModule from './components/modules/HomeModule';
import Logo from './components/ui/Logo';
import { FavoritesProvider } from './context/FavoritesContext';

// Mock Auth logic for initial development
const MASTER_UID = "Thiago";
const MASTER_PWD = "Thiago@1920";

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loginForm, setLoginForm] = useState({ id: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [lockout, setLockout] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);

  // Lockout effect
  useEffect(() => {
    if (lockout && lockout > 0) {
      const timer = setInterval(() => {
        setLockout(prev => (prev && prev > 0 ? prev - 1 : null));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [lockout]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (lockout) {
      setError(`Muitas tentativas. Aguarde ${lockout}s`);
      return;
    }

    if (loginForm.id === MASTER_UID && loginForm.password === MASTER_PWD) {
      setUser({ id: MASTER_UID, name: 'Thiago Beto', role: 'master' });
      setAttempts(0);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 3) {
        setLockout(newAttempts === 3 ? 60 : 120);
        setError(`Senha incorreta. Penalidade de ${newAttempts === 3 ? '1' : '2'} minuto(s) aplicada.`);
      } else {
        setError('Usuário ou senha inválidos.');
      }
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#2a2d34] flex items-center justify-center p-6 leather-texture relative overflow-hidden">
        {/* Background Grey Leather Depth */}
        <div className="absolute inset-0 bg-[#23262d] opacity-50 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl relative"
        >
          {/* Large Brown Leather Wrapper */}
          <div className="bg-[#5c3d2e] rounded-[60px] p-2 shadow-[0_50px_100px_rgba(0,0,0,0.8)] leather-texture border border-[#8b5a2b]/30 relative overflow-hidden">
            {/* Double Stitching */}
            <div className="absolute inset-6 border-[1.5px] border-dashed border-black/10 rounded-[40px] pointer-events-none opacity-40" />
            <div className="absolute inset-8 border-[1.5px] border-dashed border-black/10 rounded-[35px] pointer-events-none opacity-20" />
            
            <div className="relative z-10 px-8 pt-16 pb-12 flex flex-col items-center">
              {/* Prominent Logo */}
              <div className="mb-12">
                <Logo className="scale-125 drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]" />
              </div>

              {/* Login Content Area */}
              <div className="w-full max-w-md bg-[#fdfaf6] backdrop-blur-xl p-10 rounded-[40px] shadow-2xl border border-white/40 relative leather-texture overflow-hidden">
                <div className="absolute inset-0 bg-[#fdfaf6]/60 pointer-events-none" />
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-slate-300 rounded-full z-20" />
                
                <div className="mb-10 text-center relative z-10">
                  <motion.h3 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-3xl font-black text-navy-dark tracking-tighter mb-2"
                  >
                    Portal de Acesso
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-600 font-bold text-sm"
                  >
                    Insira suas credenciais corporativas
                  </motion.p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6 relative z-10">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2"
                  >
                    <label className="text-xs font-black text-navy-dark uppercase tracking-widest flex items-center gap-2 mb-1 px-1">
                      <Mail size={14} className="text-[#8b5a2b]" /> Identificação
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="Nome de usuário"
                      className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200 bg-white focus:border-leather-tan focus:ring-4 focus:ring-leather-tan/10 outline-none transition-all font-bold text-navy-dark placeholder:text-slate-400 shadow-sm"
                      value={loginForm.id}
                      onChange={(e) => setLoginForm({ ...loginForm, id: e.target.value })}
                    />
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-2"
                  >
                    <label className="text-xs font-black text-navy-dark uppercase tracking-widest flex items-center gap-2 mb-1 px-1">
                      <Lock size={14} className="text-[#8b5a2b]" /> Senha de Segurança
                    </label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="••••••••"
                        className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200 bg-white focus:border-leather-tan focus:ring-4 focus:ring-leather-tan/10 outline-none transition-all font-bold text-navy-dark placeholder:text-slate-400 shadow-sm"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-leather-tan transition-colors"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </motion.div>

                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-600 text-[13px] font-bold"
                    >
                      <AlertCircle size={18} className="flex-shrink-0" />
                      {error}
                    </motion.div>
                  )}

                  <motion.button 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    type="submit"
                    disabled={!!lockout}
                    className="w-full bg-navy-dark text-white py-5 rounded-2xl font-black text-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.5)] hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white/10 relative overflow-hidden group mb-4"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {lockout ? `Aguarde (${lockout}s)` : 'Login'}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-tr from-leather-tan/0 via-leather-tan/20 to-leather-tan/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>

                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center pt-2"
                  >
                    <button type="button" className="text-navy-dark font-black text-xs uppercase tracking-widest transition-all hover:text-leather-tan underline underline-offset-4 decoration-leather-tan/40">
                      Esqueceu sua senha?
                    </button>
                  </motion.div>
                </form>
              </div>
              
              <div className="mt-12 text-center">
                <p className="text-[12px] font-black text-white/60 uppercase tracking-[0.2em]">
                  Beto Marinzeck &copy; 2026 • Excelência em Couros
                </p>
              </div>
            </div>

            {/* Shine/Grain Overlay */}
            <div className="absolute inset-0 bg-white/5 opacity-10 mix-blend-overlay pointer-events-none" />
          </div>
        </motion.div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <HomeModule onTabChange={setActiveTab} user={user} />;
      case 'clients': return <ClientsModule />;
      case 'products': return <ProductsModule />;
      case 'orders': return <OrdersModule user={user} />;
      case 'finance': return <FinanceModule />;
      case 'reports': return <ReportsModule />;
      case 'expenses': return <ExpensesModule />;
      case 'users': return <UserManagementModule />;
      case 'help': return <HelpdeskModule />;
      case 'logout':
        setUser(null);
        setActiveTab('dashboard');
        return null;
      default: return null;
    }
  };

  return (
    <FavoritesProvider>
      <AppLayout 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        user={user}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </AppLayout>
    </FavoritesProvider>
  );
}
