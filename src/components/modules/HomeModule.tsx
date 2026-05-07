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
  const { favorites } = useFavorites();

  return (
    <div className="relative min-h-[70vh] flex flex-col justify-center items-center">
      {/* Watermark Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden h-full">
        <Logo className="scale-[5] rotate-[-12deg]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-4 bg-leather-tan/10 rounded-3xl border border-leather-tan/20 mb-4"
          >
            <Logo variant="icon" className="scale-75" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-navy-dark tracking-tighter"
          >
            Bem-vindo, {user?.name?.split(' ')[0]}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 font-medium text-lg"
          >
            Selecione um atalho rápido para iniciar sua atividade.
          </motion.p>
        </div>

        {/* Shortcuts Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {favorites.map((fav, index) => {
            const Icon = iconMap[fav.icon] || ShoppingCart;
            return (
              <motion.button
                key={fav.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => onTabChange(fav.id)}
                className="group p-8 bg-white/80 backdrop-blur-md rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl hover:bg-white hover:-translate-y-2 transition-all flex flex-col items-center text-center gap-6 leather-texture"
              >
                <div className="w-16 h-16 bg-leather-tan rounded-[24px] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                  <Icon size={32} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-navy-dark text-lg uppercase tracking-tight">{fav.label}</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1">
                    Abrir Módulo <ChevronRight size={10} className="group-hover:translate-x-1 transition-transform" />
                  </p>
                </div>
              </motion.button>
            );
          })}
          
          {favorites.length < 5 && (
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 }}
               className="p-8 border-2 border-dashed border-slate-200 rounded-[40px] flex flex-col items-center justify-center text-slate-300 gap-4"
            >
               <div className="w-12 h-12 rounded-2xl border-2 border-slate-100 flex items-center justify-center">
                  <Plus size={24} />
               </div>
               <p className="text-[10px] font-black uppercase tracking-widest text-center">Espaço Livre para Atalho</p>
            </motion.div>
          )}
        </div>

        {/* Action Panel for Home */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-navy-dark p-10 rounded-[48px] text-white leather-texture overflow-hidden relative shadow-2xl flex flex-col md:flex-row items-center gap-10"
        >
          <div className="absolute inset-0 bg-leather-tan/[0.03] pointer-events-none"></div>
          <div className="flex-1 space-y-4 relative z-10">
            <span className="text-xs font-bold text-leather-tan uppercase tracking-widest">Acesso Rápido</span>
            <h2 className="text-3xl font-bold italic tracking-tight">Precisa de um novo relatório de vendas?</h2>
            <p className="text-white/40 font-medium">Consulte sua performance e auditorias de hoje.</p>
            <button onClick={() => onTabChange('reports')} className="btn-leather !px-8 !py-4 hover:scale-105 transition-transform">Ir para Relatórios</button>
          </div>
          <div className="w-48 h-48 bg-white/5 rounded-full flex items-center justify-center border border-white/10 backdrop-blur-md relative z-10">
            <TrendingUp size={80} className="text-leather-tan/20" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
