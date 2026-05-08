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
import { motion, AnimatePresence } from 'motion/react';
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

  const [isError, setIsError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsError(false);

    if (lockout) {
      setError(`Muitas tentativas. Aguarde ${lockout}s`);
      if (navigator.vibrate) navigator.vibrate(100);
      return;
    }

    if (loginForm.id === MASTER_UID && loginForm.password === MASTER_PWD) {
      if (navigator.vibrate) navigator.vibrate(40);
      setUser({ id: MASTER_UID, name: 'Thiago Beto', role: 'master' });
      setAttempts(0);
    } else {
      setIsError(true);
      if (navigator.vibrate) navigator.vibrate([100, 30, 100]);
      
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 3) {
        setLockout(newAttempts === 3 ? 60 : 120);
        setError(`Acesso Negado. Penalidade aplicada.`);
      } else {
        setError('Usuário ou senha incorretos.');
      }
      
      // Reset error state after animation
      setTimeout(() => setIsError(false), 400);
    }
  };

  if (!user) {
    return (
      <div className="h-screen bg-leather-dark flex items-center justify-center p-4 sm:p-6 leather-texture-dark relative overflow-hidden">
        {/* Cinematic Backdrop Lighting */}
        <div className="absolute inset-0 bg-radial-at-tl from-white/10 via-transparent to-black/60 pointer-events-none z-20 hidden sm:block" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className={`w-full max-w-[400px] relative z-30 ${isError ? 'animate-shake' : ''}`}
        >
          {/* Skeuomorphic Off-White Card */}
          <div className="skeuo-card rounded-[32px] sm:rounded-[48px] p-8 sm:p-10 relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center">
              {/* Branding */}
              <div className="mb-10 sm:mb-12 hover:scale-105 transition-transform duration-500 scale-90 sm:scale-100">
                <Logo />
              </div>

              <form onSubmit={handleLogin} className="w-full space-y-4 sm:space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-[0.4em] block px-1 leather-debossed">
                    LOGIN
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-leather-dark/40">
                      <Mail size={16} />
                    </div>
                    <input 
                      type="text"
                      required
                      placeholder="Username"
                      className="w-full pl-12 pr-5 py-4 rounded-xl sm:rounded-2xl skeuo-input outline-none font-semibold text-leather-dark placeholder:text-leather-dark/30"
                      value={loginForm.id}
                      onChange={(e) => setLoginForm({ ...loginForm, id: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-[0.4em] block px-1 leather-debossed">
                    SENHA
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-leather-dark/40">
                      <Lock size={16} />
                    </div>
                    <input 
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Password"
                      className="w-full pl-12 pr-12 py-4 rounded-xl sm:rounded-2xl skeuo-input outline-none font-semibold text-leather-dark placeholder:text-leather-dark/30"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-leather-dark/30 hover:text-leather-dark transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-3 bg-red-600/5 border border-red-600/20 rounded-xl flex items-center gap-3 text-red-700 text-[11px] font-black uppercase tracking-wider"
                    >
                      <AlertCircle size={14} />
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button 
                  type="submit"
                  disabled={!!lockout}
                  className="w-full bg-leather-dark text-white py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-xs tracking-[0.5em] uppercase btn-skeuo disabled:opacity-30 mt-2"
                >
                  {lockout ? `LOCKOUT (${lockout}S)` : 'ENTRAR'}
                </button>

                <div className="pt-4 text-center">
                  <button type="button" className="leather-debossed text-[9px] uppercase tracking-[0.4em] hover:opacity-80 transition-all">
                    Esqueceu sua senha?
                  </button>
                </div>
              </form>
            </div>
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
