import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Users, 
  Package, 
  Wallet, 
  TrendingUp, 
  ChevronRight,
  Plus
} from 'lucide-react';
import { useFavorites, ModuleInfo } from '../../context/FavoritesContext';
import Logo from '../ui/Logo';

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
  return (
    <div className="relative min-h-[60vh] flex flex-col justify-center max-w-4xl mx-auto">
      <div className="space-y-16">
        <div className="space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-serif text-leather-dark tracking-tight"
          >
            Bem-vindo, {user?.name?.split(' ')[0]}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4 py-4"
          >
            <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 border border-green-500/20 shadow-sm">
              <Plus size={16} className="rotate-45" />
            </div>
            <div>
              <p className="text-leather-dark font-serif text-lg">Tudo está funcionando perfeitamente.</p>
              <p className="text-leather-dark/40 text-xs font-bold uppercase tracking-widest">Aqui está o que está acontecendo com seu negócio hoje.</p>
            </div>
          </motion.div>
        </div>

        {/* Primary Shortcuts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.button
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => onTabChange('orders')}
            className="group relative h-[320px] bg-white rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.05)] border border-leather-dark/5 overflow-hidden flex flex-col items-center justify-center gap-8 transition-all"
          >
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none leather-texture" />
             <div className="w-24 h-24 bg-[#F5F0E1] rounded-full flex items-center justify-center shadow-inner-lg border border-white relative">
               <ShoppingCart size={40} className="text-leather-dark/60 group-hover:scale-110 transition-transform" />
               <div className="absolute inset-0 rounded-full shadow-inner pointer-events-none" />
             </div>
             <div className="text-center space-y-2">
               <h3 className="font-serif text-3xl text-leather-dark">Pedidos</h3>
               <p className="text-leather-dark/40 text-sm font-medium">Visualize e gerencie as encomendas.</p>
             </div>
             <div className="absolute bottom-10 right-10 text-leather-dark/20 group-hover:text-leather-dark transition-colors">
               <Plus size={24} />
             </div>
          </motion.button>

          <motion.button
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => onTabChange('clients')}
            className="group relative h-[320px] bg-white rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.05)] border border-leather-dark/5 overflow-hidden flex flex-col items-center justify-center gap-8 transition-all"
          >
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none leather-texture" />
             <div className="w-24 h-24 bg-[#F5F0E1] rounded-full flex items-center justify-center shadow-inner-lg border border-white relative">
               <Users size={40} className="text-leather-dark/60 group-hover:scale-110 transition-transform" />
               <div className="absolute inset-0 rounded-full shadow-inner pointer-events-none" />
             </div>
             <div className="text-center space-y-2">
               <h3 className="font-serif text-3xl text-leather-dark">Clientes</h3>
               <p className="text-leather-dark/40 text-sm font-medium">Gerencie informações e histórico.</p>
             </div>
             <div className="absolute bottom-10 right-10 text-leather-dark/20 group-hover:text-leather-dark transition-colors">
               <Plus size={24} />
             </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
