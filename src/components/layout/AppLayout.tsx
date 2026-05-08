import { useState, useEffect } from 'react';
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
  Menu, 
  X,
  CreditCard,
  Settings,
  Star,
  ChevronLeft,
  ChevronRight,
  LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { useFavorites } from '../../context/FavoritesContext';

import Logo from '../ui/Logo';
import RealisticStitching from '../ui/RealisticStitching';

export const ERP_NAME = "Beto Marinzeck ERP";
export const PHONE = "(35) 99843-0843";

interface NavItem {
  id: string;
  label: string;
  icon: any;
  masterOnly?: boolean;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Início', icon: BarChart3 },
  { id: 'clients', label: 'Clientes', icon: Users },
  { id: 'products', label: 'Produtos', icon: Package },
  { id: 'orders', label: 'Pedidos', icon: ShoppingCart },
  { id: 'finance', label: 'Financeiro', icon: Wallet },
  { id: 'expenses', label: 'Despesas Viagem', icon: MapPin },
  { id: 'reports', label: 'Relatórios', icon: TrendingUp },
  { id: 'users', label: 'Usuários', icon: Settings, masterOnly: true },
  { id: 'help', label: 'Helpdesk', icon: HelpCircle },
];

export default function AppLayout({ children, activeTab, onTabChange, user }: any) {
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const isMaster = user?.role === 'master';
  const { toggleFavorite, isFavorite } = useFavorites();

  const currentItem = navItems.find(item => item.id === activeTab);

  return (
    <div className="h-screen bg-leather-dark flex overflow-hidden leather-texture-dark relative">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative flex flex-col z-10 shadow-[inset_0_0_40px_rgba(0,0,0,0.3)]">
        <header className="h-24 px-10 flex items-center justify-between border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-20 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
          <div className="w-1/3 flex items-center gap-4 relative">
            <button 
              onClick={() => onTabChange('dashboard')}
              className="hover:scale-105 transition-transform"
            >
              <Logo variant="compact" />
            </button>
          </div>
          
          <div className="w-1/3 text-center">
            {currentItem && (
              <h2 className="font-serif text-lg tracking-[0.3em] text-leather-tan uppercase">
                {currentItem.label}
              </h2>
            )}
          </div>

          <div className="w-1/3 flex justify-end items-center gap-6">
            {activeTab !== 'dashboard' && (
              <button 
                onClick={() => onTabChange('dashboard')}
                className="p-2 sm:p-3 rounded-full hover:bg-white/5 transition-all text-leather-tan/40 hover:text-leather-tan group relative"
                title="Voltar ao Início"
              >
                <LayoutGrid size={20} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border border-leather-tan/0 group-hover:border-leather-tan/20 group-hover:scale-110 transition-all" />
              </button>
            )}

            <div className="text-[10px] font-sans font-bold text-leather-tan/40 uppercase tracking-[0.3em] hidden lg:block">
              {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })}
            </div>

            {/* User Profile on Right */}
            <div 
              className="relative"
              onMouseEnter={() => setUserMenuOpen(true)}
              onMouseLeave={() => setUserMenuOpen(false)}
            >
              <button 
                className="flex items-center gap-3 p-2 rounded-full hover:bg-white/5 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full leather-light-textured flex items-center justify-center text-leather-dark font-serif text-lg shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-leather-tan/50 group-hover:scale-105 transition-transform">
                  {user?.name?.[0] || 'T'}
                </div>
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-56 bg-leather-dark border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] py-2 z-50 backdrop-blur-xl"
                  >
                    <div className="px-4 py-2 border-b border-white/5 mb-2">
                      <p className="text-xs font-serif text-[#F5F0E1]">{user?.name || 'Thiago'}</p>
                      <p className="text-[8px] font-sans font-bold text-leather-tan uppercase tracking-widest">{user?.role || 'Master'}</p>
                    </div>
                    <button 
                      onClick={() => {
                        setUserMenuOpen(false);
                        onTabChange('logout');
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-leather-tan hover:bg-white/5 transition-colors text-[10px] font-serif uppercase tracking-widest"
                    >
                      <LogOut size={14} />
                      Sair / Trocar usuário
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>
        
        <div className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full relative content-overlay">
          {children}
        </div>

        {/* Global Stitching Detail */}
        <RealisticStitching className="bottom-10 right-10" />
      </main>
    </div>
  );
}
