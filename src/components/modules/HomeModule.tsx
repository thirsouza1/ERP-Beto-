import React from 'react';
import { motion } from 'motion/react';
import { 
  ShoppingCart, 
  Users, 
  Package, 
  Wallet, 
  TrendingUp, 
  ArrowUpRight,
  Plus,
  MapPin,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';

const iconMap: Record<string, any> = {
  ShoppingCart,
  Users,
  Package,
  Wallet,
  TrendingUp
};

interface HomeModuleProps {
  onTabChange: (tab: string) => void;
  user: any;
}

export default function HomeModule({ onTabChange, user }: HomeModuleProps) {
  const isMaster = user?.role === 'master';

  const menuItems = [
    { id: 'orders', label: 'Pedidos', icon: ShoppingCart },
    { id: 'clients', label: 'Clientes', icon: Users },
    { id: 'products', label: 'Produtos', icon: Package },
    { id: 'finance', label: 'Financeiro', icon: Wallet },
    { id: 'expenses', label: 'Despesas Viagem', icon: MapPin },
    { id: 'reports', label: 'Relatórios', icon: TrendingUp },
    { id: 'users', label: 'Usuários', icon: Settings, masterOnly: true },
    { id: 'help', label: 'Helpdesk', icon: HelpCircle },
  ];

  return (
    <div className="max-w-5xl mx-auto py-2 md:py-4">
      <div className="space-y-6 md:space-y-8">
        {/* Even More Simplified Functional Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-2 px-4"
        >
          <div className="space-y-0 text-left">
             <h1 className="text-xl md:text-2xl font-black text-[#F5F0E1] tracking-tight leading-none mb-0.5">
               Olá, {user?.name?.split(' ')[0]}
             </h1>
             <p className="text-leather-tan/20 text-[7px] font-bold uppercase tracking-[0.3em]">
               Painel de Controle
             </p>
          </div>

          {/* Ultra Minimalist System Status */}
          <div className="flex items-center gap-1.5 bg-white/5 backdrop-blur-sm px-2 py-1 rounded-full border border-white/5 w-fit">
             <div className="w-1 h-1 rounded-full bg-green-500/60 shadow-[0_0_4px_rgba(34,197,94,0.3)]" />
             <span className="text-[7px] font-black uppercase text-[#F5F0E1]/30 tracking-wider">Online</span>
          </div>
        </motion.div>

        {/* Scaled Down Menu Hub */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 px-3">
          {menuItems.map((item) => {
            if (item.masterOnly && !isMaster) return null;
            
            return (
              <motion.button
                key={item.id}
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onTabChange(item.id)}
                className="group relative h-[70px] md:h-[90px] leather-light-textured rounded-[20px] shadow-md border border-leather-dark/5 overflow-hidden flex items-center gap-4 px-6 transition-all hover:shadow-lg"
              >
                 <div className="w-9 h-9 md:w-11 md:h-11 bg-white rounded-[14px] flex items-center justify-center shadow-inner border border-slate-100 shrink-0">
                   <item.icon size={18} className="text-leather-dark/40 group-hover:text-leather-dark/70 group-hover:scale-110 transition-all" />
                 </div>
                 <div className="text-left flex-1">
                   <h3 className="font-black text-base md:text-lg text-navy-dark tracking-tighter leading-none mb-0.5">
                     {item.label}
                   </h3>
                   <div className="w-4 h-0.5 bg-leather-tan/20 group-hover:w-8 transition-all duration-500" />
                 </div>
                 <div className="absolute top-2 right-4 opacity-5 group-hover:opacity-20 transition-opacity">
                   <Plus size={14} className="text-navy-dark" />
                 </div>
                 <div className="absolute bottom-3 right-5 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                   <ArrowUpRight size={14} className="text-leather-tan" />
                 </div>
              </motion.button>
            );
          })}

          {/* Logout Action */}
          <motion.button
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onTabChange('logout')}
            className="group relative h-[70px] md:h-[90px] bg-red-500/5 hover:bg-red-500/10 rounded-[20px] shadow-md border border-red-500/10 overflow-hidden flex items-center gap-4 px-6 transition-all hover:shadow-lg lg:col-start-1"
          >
             <div className="w-9 h-9 md:w-11 md:h-11 bg-white rounded-[14px] flex items-center justify-center shadow-inner border border-red-100 shrink-0">
               <LogOut size={18} className="text-red-500/40 group-hover:text-red-500 group-hover:scale-110 transition-all" />
             </div>
             <div className="text-left flex-1">
               <h3 className="font-black text-base md:text-lg text-red-900 tracking-tighter leading-none mb-0.5">
                 Sair
               </h3>
               <div className="w-4 h-0.5 bg-red-500/20 group-hover:w-8 transition-all duration-500" />
             </div>
          </motion.button>
        </div>

        {/* Secondary Indicators - Extremely subtle and compact */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-6 py-4 border-t border-white/5 opacity-30 hover:opacity-100 transition-all"
        >
          <div className="flex items-center gap-1.5">
            <TrendingUp size={10} className="text-leather-tan" />
            <span className="text-[7px] font-bold text-leather-tan uppercase tracking-[0.2em]">Faturamento estável</span>
          </div>
          <div className="w-px h-2 bg-white/5" />
          <div className="flex items-center gap-1.5">
            <Wallet size={10} className="text-leather-tan" />
            <span className="text-[7px] font-bold text-leather-tan uppercase tracking-[0.2em]">Fluxo Verificado</span>
          </div>
          <div className="w-px h-2 bg-white/5" />
          <div className="flex items-center gap-1.5">
            <Package size={10} className="text-leather-tan" />
            <span className="text-[7px] font-bold text-leather-tan uppercase tracking-[0.2em]">Estoque Monitorado</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
