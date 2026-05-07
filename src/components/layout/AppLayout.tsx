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
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useFavorites } from '../../context/FavoritesContext';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import Logo from '../ui/Logo';

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
  const [isSidebarOpen, setSidebarOpen] = useState(true);
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
        className="bg-black/20 h-screen relative z-30 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col backdrop-blur-md border-r border-white/5"
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

        <button 
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-10 bg-leather-tan text-leather-dark w-6 h-6 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all z-50 border border-[#F5F0E1]"
        >
          {isSidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative flex flex-col z-10">
        <header className="h-24 px-10 flex items-center justify-between border-b border-white/5 bg-black/10 backdrop-blur-md sticky top-0 z-20">
          <div className="w-1/3">
            {/* Left side empty for balance */}
          </div>
          
          <div className="w-1/3 text-center">
            <h1 className="font-serif text-2xl tracking-[0.2em] text-[#F5F0E1] uppercase drop-shadow-lg">
              Beto Marinzeck
            </h1>
            <p className="text-[10px] font-sans font-medium tracking-[0.4em] text-leather-tan uppercase">
              CK COUROS
            </p>
          </div>

          <div className="w-1/3 flex justify-end items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-serif text-[#F5F0E1] leading-none">Thiago</p>
              <p className="text-[9px] font-sans font-bold text-leather-tan uppercase tracking-widest">Master</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-leather-dark font-serif text-lg shadow-md border-2 border-leather-tan">
              T
            </div>
          </div>
        </header>
        
        <div className="flex-1 p-10 max-w-7xl mx-auto w-full relative">
          {children}
        </div>

        {/* Global Stitching Detail */}
        <div className="leather-stitching" />
      </main>
    </div>
  );
}
