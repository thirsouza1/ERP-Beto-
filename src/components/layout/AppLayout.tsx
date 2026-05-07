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
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const isMaster = user?.role === 'master';
  const { toggleFavorite, isFavorite } = useFavorites();

  const currentItem = navItems.find(item => item.id === activeTab);
  const showFavorite = activeTab !== 'dashboard' && activeTab !== 'logout' && currentItem;

  return (
    <div className="h-screen bg-leather-dark flex overflow-hidden leather-texture-dark relative">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        onMouseEnter={() => setSidebarOpen(true)}
        onMouseLeave={() => setSidebarOpen(false)}
        className="bg-black/20 h-screen relative z-30 shadow-[10px_0_30px_rgba(0,0,0,0.5)] flex flex-col backdrop-blur-md border-r border-white/10"
      >
        <div className="p-6 h-28 flex items-center justify-center border-b border-white/5">
           <Logo variant={isSidebarOpen ? "full" : "icon"} />
        </div>

        <nav className="flex-1 overflow-y-auto py-8 flex flex-col space-y-4 custom-scrollbar sidebar-scrollbar px-3">
          {navItems.map((item) => {
            if (item.masterOnly && !isMaster) return null;

            const isActive = activeTab === item.id;
            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden",
                    isActive 
                      ? "bg-white/10 text-leather-tan shadow-lg scale-[1.02]" 
                      : "text-leather-tan/40 hover:text-leather-tan hover:bg-white/5"
                  )}
                >
                  <div className="shrink-0">
                    <item.icon size={22} />
                  </div>
                  
                  <AnimatePresence initial={false}>
                    {isSidebarOpen && (
                      <motion.span 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="font-serif text-sm tracking-widest uppercase whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {isActive && (
                    <motion.div 
                      layoutId="sidebarActive"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-leather-tan shadow-[0_0_10px_#c19a6b]"
                    />
                  )}
                </button>
                
                {/* Tooltip for collapsed state */}
                {!isSidebarOpen && (
                  <div className="absolute left-full ml-4 px-3 py-1.5 bg-leather-dark text-leather-tan text-[10px] font-bold rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all shadow-2xl z-50 border border-white/5 whitespace-nowrap tracking-widest uppercase">
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button 
            onClick={() => onTabChange('logout')}
            className={cn(
              "w-full flex items-center gap-4 px-4 py-3 text-leather-tan/40 hover:text-red-400 transition-all rounded-xl",
              !isSidebarOpen && "justify-center"
            )}
          >
            <LogOut size={22} className="shrink-0" />
            {isSidebarOpen && <span className="font-serif text-sm tracking-widest uppercase">Sair</span>}
          </button>
        </div>


      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative flex flex-col z-10 shadow-[inset_10px_0_40px_rgba(0,0,0,0.3)]">
        <header className="h-24 px-10 flex items-center justify-between border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-20 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
          <div className="w-1/3 flex items-center gap-4 relative">
            {/* User Profile on Left */}
            <div 
              className="relative"
              onMouseEnter={() => setUserMenuOpen(true)}
              onMouseLeave={() => setUserMenuOpen(false)}
            >
              <button 
                className="flex items-center gap-3 p-2 rounded-full hover:bg-white/5 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full leather-light-textured flex items-center justify-center text-leather-dark font-serif text-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] border-2 border-leather-tan group-hover:scale-105 transition-transform">
                  {user?.name?.[0] || 'T'}
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-serif text-[#F5F0E1] leading-none mb-1 group-hover:text-leather-tan transition-colors">
                    {user?.name || 'Thiago'}
                  </p>
                  <p className="text-[9px] font-sans font-bold text-leather-tan uppercase tracking-widest">
                    {user?.role || 'Master'}
                  </p>
                </div>
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute left-0 mt-2 w-56 bg-leather-dark border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] py-2 z-50 backdrop-blur-xl"
                  >
                    <button 
                      onClick={() => {
                        setUserMenuOpen(false);
                        onTabChange('logout');
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-leather-tan hover:bg-white/5 transition-colors text-xs font-serif uppercase tracking-widest"
                    >
                      <Users size={16} />
                      Trocar usuário
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <div className="w-1/3 text-center">
            {/* Branding Removed from Center */}
            {currentItem && (
              <h2 className="font-serif text-lg tracking-[0.3em] text-leather-tan uppercase">
                {currentItem.label}
              </h2>
            )}
          </div>

          <div className="w-1/3 flex justify-end items-center gap-4">
             <div className="text-[10px] font-sans font-bold text-leather-tan/40 uppercase tracking-[0.3em]">
               {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })}
             </div>
          </div>
        </header>
        
        <div className="flex-1 p-10 max-w-7xl mx-auto w-full relative content-overlay">
          {children}
        </div>

        {/* Global Stitching Detail */}
        <RealisticStitching className="bottom-10 right-10" />
      </main>
    </div>
  );
}
