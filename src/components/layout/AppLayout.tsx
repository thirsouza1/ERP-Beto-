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

  const handleToggleFavorite = () => {
    if (currentItem) {
      toggleFavorite({
        id: currentItem.id,
        label: currentItem.label,
        icon: currentItem.icon.name || currentItem.id // fallback to id for icon name if not easily accessible
      });
    }
  };

  return (
    <div className="h-screen bg-[#fdfaf6] leather-texture flex overflow-hidden">
      <div className="absolute inset-0 bg-[#fdfaf6]/60 pointer-events-none z-0" />
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 88 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-navy-dark text-white h-screen relative z-30 shadow-2xl flex flex-col border-r border-white/5"
      >
        <div className="p-6 border-b border-white/5 flex items-center h-28 overflow-hidden">
           <Logo variant={isSidebarOpen ? "full" : "icon"} className={cn("transition-all duration-300", !isSidebarOpen && "mx-auto scale-125")} />
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2 custom-scrollbar sidebar-scrollbar pr-4">
          {navItems.map((item) => {
            if (item.masterOnly && !isMaster) return null;

            const isActive = activeTab === item.id;
            return (
              <div key={item.id} className="relative group px-1">
                <button
                  onClick={() => {
                    onTabChange(item.id);
                    setSidebarOpen(false); // Recoil sidebar after selection
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden",
                    isActive 
                      ? "bg-leather-dark text-white shadow-lg border-l-4 border-leather-tan scale-[1.02]" 
                      : "text-slate-400 hover:text-white hover:bg-white/5 hover:scale-[1.02]"
                  )}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="activeGlow"
                      className="absolute inset-0 bg-leather-tan/10 blur-xl pointer-events-none"
                    />
                  )}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: isActive ? 0 : 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {item.icon && <item.icon size={22} className={cn("transition-colors duration-300", isActive ? "text-leather-tan" : "group-hover:text-leather-tan")} />}
                  </motion.div>
                  
                  <AnimatePresence initial={false}>
                    {isSidebarOpen && (
                      <motion.span 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="font-medium whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
                
                {/* Tooltip for collapsed sidebar */}
                {!isSidebarOpen && (
                  <div className="absolute left-full ml-4 px-3 py-2 bg-navy-dark text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-[-10px] group-hover:translate-x-0 shadow-2xl z-50 border border-white/10 whitespace-nowrap">
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-4">
          <button 
            onClick={() => onTabChange('logout')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 text-red-500/80 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all group relative",
              !isSidebarOpen && "justify-center"
            )}
          >
            <LogOut size={20} className="group-hover:scale-110 transition-transform" />
            {isSidebarOpen && <span className="font-medium">Sair</span>}
            {!isSidebarOpen && (
              <div className="absolute left-full ml-4 px-3 py-2 bg-red-500 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-[-10px] group-hover:translate-x-0 shadow-2xl z-50 whitespace-nowrap">
                Sair
              </div>
            )}
          </button>
          
          <div className={cn(
            "bg-white/5 p-4 rounded-2xl flex items-center gap-3 transition-all duration-300 border border-white/5",
            !isSidebarOpen && "px-2 justify-center"
          )}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-leather-tan to-leather-dark flex items-center justify-center text-white font-black shadow-lg shrink-0">
              {user?.name?.[0] || 'T'}
            </div>
            {isSidebarOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-bold truncate text-white">{user?.name?.split(' ')[0] || 'Gestor'}</p>
                <p className="text-[10px] text-leather-tan/80 font-black uppercase tracking-widest truncate">{user?.role || 'Master'}</p>
              </motion.div>
            )}
          </div>
        </div>

        <button 
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="absolute -right-4 top-14 bg-[#5c3d2e] text-white w-8 h-10 rounded-xl flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:scale-110 transition-all z-50 group border border-white/10 leather-texture"
        >
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          {isSidebarOpen ? <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform relative z-10" /> : <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform relative z-10" />}
        </button>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <header className="p-8 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-navy-dark capitalize">{currentItem?.label || activeTab}</h1>
              <p className="text-slate-500">
                {activeTab === 'dashboard' ? 'Bem-vindo de volta ao seu painel.' : `Gerenciamento de ${currentItem?.label || activeTab}`}
              </p>
            </div>
            {showFavorite && (
              <button 
                onClick={() => {
                  const iconName = currentItem.icon.name || (
                    currentItem.id === 'clients' ? 'Users' :
                    currentItem.id === 'products' ? 'Package' :
                    currentItem.id === 'orders' ? 'ShoppingCart' :
                    currentItem.id === 'finance' ? 'Wallet' :
                    currentItem.id === 'reports' ? 'TrendingUp' :
                    'Package'
                  );
                  toggleFavorite({
                    id: currentItem.id,
                    label: currentItem.label,
                    icon: iconName
                  })
                }}
                className={cn(
                  "p-3 rounded-2xl border transition-all hover:scale-110",
                  isFavorite(activeTab) 
                    ? "bg-leather-tan text-white border-leather-tan shadow-lg" 
                    : "bg-white text-slate-300 border-slate-100 hover:text-leather-tan"
                )}
              >
                <Star size={20} fill={isFavorite(activeTab) ? "currentColor" : "none"} />
              </button>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-600 font-medium bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
             <CreditCard size={16} className="text-leather-tan" /> Beto Marinzeck • {PHONE}
          </div>
        </header>
        
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
