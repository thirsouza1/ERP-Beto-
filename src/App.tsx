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
      <div className="h-screen bg-leather-dark flex items-center justify-center p-6 leather-texture-dark relative overflow-hidden">
        {/* Background Overlay for depth */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[420px] relative z-10"
        >
          <div className="bg-[#F5F0E1] rounded-[32px] p-10 shadow-[0_40px_80px_rgba(0,0,0,0.5)] border border-white/20 relative overflow-hidden">
            {/* Subtle texture in the card */}
            <div className="absolute inset-0 opacity-5 pointer-events-none leather-texture" />
            
            <div className="relative z-10 flex flex-col items-center">
              {/* Branding */}
              <div className="mb-8">
                <Logo />
              </div>

              {/* Title */}
              <div className="mb-10 text-center">
                <h3 className="text-3xl font-serif text-leather-dark tracking-tight">
                  Portal de Acesso
                </h3>
              </div>

              <form onSubmit={handleLogin} className="w-full space-y-4">
                <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-leather-dark/40">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="text"
                    required
                    placeholder="Username"
                    className="w-full pl-14 pr-6 py-4 rounded-xl border border-leather-dark/10 bg-white/50 focus:bg-white focus:border-leather-dark outline-none transition-all font-medium text-leather-dark placeholder:text-leather-dark/30 shadow-none"
                    value={loginForm.id}
                    onChange={(e) => setLoginForm({ ...loginForm, id: e.target.value })}
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-leather-dark/40">
                    <Lock size={18} />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Password"
                    className="w-full pl-14 pr-14 py-4 rounded-xl border border-leather-dark/10 bg-white/50 focus:bg-white focus:border-leather-dark outline-none transition-all font-medium text-leather-dark placeholder:text-leather-dark/30 shadow-none"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-leather-dark/30 hover:text-leather-dark transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-700 text-xs font-bold"
                  >
                    <AlertCircle size={14} />
                    {error}
                  </motion.div>
                )}

                <button 
                  type="submit"
                  disabled={!!lockout}
                  className="w-full bg-leather-dark text-white py-5 rounded-2xl font-bold text-lg hover:bg-black transition-all disabled:opacity-50 mt-4 shadow-xl shadow-leather-dark/20"
                >
                  {lockout ? `AGUARDE (${lockout}S)` : 'LOGIN'}
                </button>

                <div className="pt-6 text-center">
                  <button type="button" className="text-leather-dark/40 font-bold text-[10px] uppercase tracking-[0.3em] hover:text-leather-dark transition-colors">
                    FORGOT PASSWORD?
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-[10px] font-medium text-white/30 uppercase tracking-[0.4em]">
              Beto Marinzeck &copy; 2026
            </p>
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
