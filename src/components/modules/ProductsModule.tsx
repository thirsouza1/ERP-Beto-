import React, { useState } from 'react';
import { Search, Plus, Package, Ruler, Hash, BarChart, Tag, Trash2, Edit, X, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from '../ui/Logo';

export default function ProductsModule({ onTabChange }: { onTabChange?: (tab: string) => void }) {
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    ref: '',
    category: 'Couros',
    unit: 'm² (Metro Quadrado)',
    price: '',
    stock: '',
    observations: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setShowAdd(false);
    setFormData({
      name: '',
      ref: '',
      category: 'Couros',
      unit: 'm² (Metro Quadrado)',
      price: '',
      stock: '',
      observations: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-leather-dark/5 p-4 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-leather-dark/10">
        <div className="flex items-center gap-2 flex-1 max-w-2xl">
           <div className="relative flex-1">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
             <input 
               type="text" 
               placeholder="Pesquisar produtos, referências ou categorias..."
               className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-slate-200 focus:border-leather-tan outline-none transition-all shadow-sm font-medium text-leather-dark"
             />
           </div>
        </div>
        
        <button 
          onClick={() => setShowAdd(true)}
          className="btn-leather !px-8 !py-3 shadow-lg !bg-leather-dark hover:!bg-leather-tan group"
        >
          <Plus size={18} className="group-hover:scale-110 transition-transform" /> 
          <span className="font-bold">Novo Produto</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="leather-light-textured backdrop-blur-md rounded-[32px] p-6 border-2 border-slate-200/50 shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden">
             <div className="relative z-10">
               <div className="absolute top-0 right-0 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500"><Edit size={16} /></button>
               </div>
               
               <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-navy-dark rounded-2xl flex items-center justify-center text-white leather-texture shadow-lg">
                     <Package size={32} />
                  </div>
                  <div>
                     <span className="text-[10px] font-black uppercase tracking-[0.2em] text-leather-tan">Couro Legítimo</span>
                     <h3 className="text-xl font-black text-navy-dark">Pele Vaqueta Nappa</h3>
                     <p className="text-sm text-slate-500 font-bold italic">Ref: VK-2024-XP</p>
                  </div>
               </div>
  
               <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="leather-light-textured p-3 rounded-2xl border border-slate-100 shadow-inner">
                     <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <Ruler size={14} className="text-leather-tan" /> <span className="text-[10px] font-black uppercase tracking-widest">Medida</span>
                     </div>
                     <p className="text-sm font-black text-navy-dark">2.20 m²</p>
                  </div>
                  <div className="leather-light-textured p-3 rounded-2xl border border-slate-100 shadow-inner">
                     <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <Tag size={14} className="text-leather-tan" /> <span className="text-[10px] font-black uppercase tracking-widest">Preço Base</span>
                     </div>
                     <p className="text-sm font-black text-navy-dark leading-tight">R$ 145,90</p>
                  </div>
               </div>
  
               <div className="flex items-center justify-between pt-4 border-t border-slate-100/50">
                  <div className="flex items-center gap-2">
                     <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)] animate-pulse"></div>
                     <span className="text-xs font-bold text-slate-600">Disponível em Estoque</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-black tracking-widest">ID: 98432</p>
               </div>
             </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showAdd && (
          <div className="fixed inset-0 bg-navy-dark/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="leather-light-textured w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden border-2 border-white/50 relative"
            >
               <div className="bg-leather-dark p-3 md:p-4 border-b border-leather-tan/20 flex justify-between items-center text-white relative overflow-hidden shadow-xl">
               <div className="absolute inset-0 bg-leather-texture opacity-10 pointer-events-none"></div>
               <div className="flex items-center gap-3 relative z-10">
                  <div className="">
                    <h3 className="text-base md:text-lg font-black tracking-tight flex items-center gap-2">
                      <Package size={18} className="text-leather-tan" />
                      Cadastro de Produto
                    </h3>
                    <p className="text-[8px] font-bold uppercase text-white/40 tracking-widest mt-0.5">Gestão de Materiais</p>
                  </div>
               </div>
               
               <div className="flex items-center gap-2 relative z-10">
                  <div className="flex items-center gap-2 mr-1">
                     <button 
                       type="button"
                       onClick={() => onTabChange?.('dashboard')}
                       className="p-2 mr-2 bg-white/5 hover:bg-white/10 text-leather-tan/60 hover:text-leather-tan rounded-xl transition-all border border-white/5 group"
                       title="Voltar ao Início"
                     >
                       <LayoutGrid size={16} />
                     </button>
                     <button 
                       type="button" 
                       onClick={handleClose}
                       className="px-3 md:px-4 py-1.5 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-full font-bold text-[8px] md:text-[9px] uppercase tracking-wider transition-all border border-white/5"
                     >
                       Descartar
                     </button>
                     <button 
                       form="product-form"
                       type="submit" 
                       className="px-4 md:px-5 py-1.5 bg-leather-tan hover:bg-white text-white hover:text-leather-dark rounded-full font-black text-[8px] md:text-[9px] uppercase tracking-widest shadow-lg transition-all"
                     >
                       Finalizar
                     </button>
                  </div>
                  <div className="w-px h-4 bg-white/10 mx-1"></div>
                  <button onClick={handleClose} className="hover:bg-red-500/20 p-2 rounded-xl transition-all">
                    <X size={18} className="text-white" />
                  </button>
               </div>
            </div>
            
            <form id="product-form" onSubmit={(e) => { e.preventDefault(); handleClose(); }} className="p-2 space-y-2 relative max-h-[88vh] overflow-y-auto custom-scrollbar bg-slate-50/50">
               {/* System Metadata Tag - Read Only */}
               <div className="flex justify-between items-center px-1">
                  <div className="flex items-center gap-2 px-1.5 py-0.5 bg-white border border-slate-200 rounded-lg shadow-sm">
                     <span className="text-[6px] font-black text-slate-400 uppercase tracking-widest">Sys-Ref</span>
                     <code className="text-[8px] font-mono font-bold text-leather-tan">PRD-{(Math.floor(Math.random() * 900) + 100)}</code>
                  </div>
                  <div className="text-[6px] font-bold text-slate-400 uppercase tracking-widest italic opacity-60">Processamento Seguro</div>
               </div>

               {/* 1. Primary Fields */}
               <div className="bg-white p-2 md:p-3 rounded-[16px] border border-slate-200/60 shadow-sm space-y-2">
                  <div className="flex flex-col md:flex-row gap-2 items-start">
                     <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-12 gap-2">
                        {/* Primary Field: Name */}
                        <div className="md:col-span-8 relative">
                           <input 
                              id="name"
                              name="name"
                              type="text"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              placeholder=" "
                              className="peer w-full p-2 pt-4 bg-white border border-slate-200 focus:border-leather-tan outline-none font-bold text-sm text-leather-dark transition-all placeholder-transparent rounded-lg shadow-sm"
                           />
                           <label 
                              htmlFor="name"
                              className="absolute left-2.5 top-1 text-[8px] font-bold text-slate-400 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-2.5 peer-placeholder-shown:font-medium peer-focus:top-1 peer-focus:text-[8px] peer-focus:font-bold peer-focus:text-leather-tan"
                           >
                              Nome do Produto / Material
                           </label>
                        </div>
                        
                        {/* Reference Field */}
                        <div className="md:col-span-4 relative">
                           <input 
                              id="ref"
                              name="ref"
                              type="text"
                              value={formData.ref}
                              onChange={handleChange}
                              placeholder=" "
                              className="peer w-full p-2 pt-4 bg-slate-50/50 border border-slate-200 focus:border-leather-tan outline-none font-bold text-xs text-leather-dark transition-all placeholder-transparent rounded-lg shadow-sm"
                           />
                           <label 
                              htmlFor="ref"
                              className="absolute left-2.5 top-1 text-[7px] font-bold text-slate-400 transition-all peer-placeholder-shown:text-[10px] peer-placeholder-shown:top-2.5 peer-placeholder-shown:font-medium peer-focus:top-1 peer-focus:text-[7px] peer-focus:font-bold peer-focus:text-leather-tan"
                           >
                              Referência / Código
                           </label>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                     <div className="relative">
                        <select 
                           id="category"
                           name="category"
                           value={formData.category}
                           onChange={handleChange}
                           className="peer w-full p-1.5 pt-3.5 bg-white border border-slate-200 focus:border-leather-tan outline-none font-black text-[10px] text-leather-dark transition-all appearance-none rounded-lg cursor-pointer shadow-sm"
                        >
                           <option>Couros</option>
                           <option>Solados</option>
                           <option>Ferragens</option>
                           <option>Acessórios</option>
                        </select>
                        <label htmlFor="category" className="absolute left-2 top-0.5 text-[7px] font-bold text-slate-400 transition-all peer-focus:text-leather-tan">Categoria</label>
                     </div>

                     <div className="relative">
                        <select 
                           id="unit"
                           name="unit"
                           value={formData.unit}
                           onChange={handleChange}
                           className="peer w-full p-1.5 pt-3.5 bg-white border border-slate-200 focus:border-leather-tan outline-none font-black text-[10px] text-leather-dark transition-all appearance-none rounded-lg cursor-pointer shadow-sm"
                        >
                           <option>m² (Metro Quadrado)</option>
                           <option>un (Unidade)</option>
                           <option>kg (Quilo)</option>
                           <option>par (Par)</option>
                        </select>
                        <label htmlFor="unit" className="absolute left-2 top-0.5 text-[7px] font-bold text-slate-400 transition-all peer-focus:text-leather-tan">Unidade de Medida</label>
                     </div>
                  </div>
               </div>

               {/* 2. Secondary Sections */}
               <div className="space-y-2 px-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                     <div className="relative">
                        <input 
                           id="price"
                           name="price"
                           type="number"
                           step="0.01"
                           value={formData.price}
                           onChange={handleChange}
                           placeholder=" "
                           className="peer w-full p-1.5 pt-3.5 bg-white border border-slate-200 focus:border-leather-tan outline-none font-bold text-[10px] text-leather-dark rounded-lg shadow-sm transition-all"
                        />
                        <label htmlFor="price" className="absolute left-2 top-0.5 text-[7px] font-bold text-slate-400 transition-all peer-placeholder-shown:text-[9px] peer-placeholder-shown:top-2 peer-focus:top-0.5 peer-focus:text-[7px]">Preço por Unidade (R$)</label>
                     </div>

                     <div className="relative">
                        <input 
                           id="stock"
                           name="stock"
                           type="number"
                           value={formData.stock}
                           onChange={handleChange}
                           placeholder=" "
                           className="peer w-full p-1.5 pt-3.5 bg-white border border-slate-200 focus:border-leather-tan outline-none font-bold text-[10px] text-leather-dark rounded-lg shadow-sm transition-all"
                        />
                        <label htmlFor="stock" className="absolute left-2 top-0.5 text-[7px] font-bold text-slate-400 transition-all peer-placeholder-shown:text-[9px] peer-placeholder-shown:top-2 peer-focus:top-0.5 peer-focus:text-[7px]">Estoque Inicial</label>
                     </div>
                  </div>

                  <div className="relative">
                     <textarea 
                        id="observations"
                        name="observations"
                        value={formData.observations}
                        onChange={handleChange}
                        placeholder=" "
                        rows={2}
                        className="peer w-full p-1.5 pt-3.5 bg-slate-50/80 border border-slate-200 focus:border-leather-tan outline-none font-medium text-[9px] text-slate-500 rounded-lg shadow-sm transition-all resize-none italic"
                     ></textarea>
                     <label htmlFor="observations" className="absolute left-2 top-0.5 text-[7px] font-bold text-slate-400 transition-all peer-placeholder-shown:text-[8px] peer-placeholder-shown:top-2 peer-focus:top-0.5 peer-focus:text-[7px]">Observações (Opcional)</label>
                  </div>
               </div>
            </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
