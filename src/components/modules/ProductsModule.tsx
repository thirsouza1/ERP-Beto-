import { useState } from 'react';
import { Search, Plus, Package, Ruler, Hash, BarChart, Tag, Trash2, Edit, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../ui/Logo';

export default function ProductsModule() {
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
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Pesquisar produtos, referências ou categorias..."
            className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-slate-200 outline-none"
          />
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          className="btn-leather !px-8"
        >
          <Plus size={18} /> Novo Produto
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white/80 backdrop-blur-md rounded-[32px] p-6 border-2 border-slate-200/50 shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden leather-texture">
             <div className="absolute inset-0 bg-white/60 pointer-events-none" />
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
                  <div className="bg-white/50 p-3 rounded-2xl border border-slate-100">
                     <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <Ruler size={14} className="text-leather-tan" /> <span className="text-[10px] font-black uppercase tracking-widest">Medida</span>
                     </div>
                     <p className="text-sm font-black text-navy-dark">2.20 m²</p>
                  </div>
                  <div className="bg-white/50 p-3 rounded-2xl border border-slate-100">
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
              className="bg-[#fdfaf6] w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden border-2 border-white/50 leather-texture relative"
            >
              <div className="absolute inset-0 bg-[#fdfaf6]/40 pointer-events-none" />
              <div className="bg-navy-dark p-6 flex justify-between items-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-navy-dark/20 mix-blend-overlay"></div>
                <div className="flex items-center gap-4 relative z-10">
                   <Logo variant="compact" className="scale-125 origin-left" />
                   <div className="h-8 w-px bg-white/20"></div>
                   <h3 className="text-xl font-bold flex items-center gap-2">
                     <Package /> Novo Produto
                   </h3>
                </div>
                <button onClick={handleClose} className="hover:bg-white/10 p-2 rounded-lg transition-colors relative z-10">
                   <X size={20} />
                </button>
              </div>
              
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                 <div className="space-y-4 md:col-span-2 border-b border-slate-100 pb-2">
                    <h4 className="text-xs font-bold text-leather-tan uppercase tracking-widest">Informações do Material</h4>
                 </div>
                 
                 <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Nome do Produto</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ex: Pele Vaqueta Nappa" 
                      className="w-full p-3 rounded-xl border border-slate-200 focus:border-leather-tan outline-none" 
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Referência / Código</label>
                    <input 
                      type="text" 
                      name="ref"
                      value={formData.ref}
                      onChange={handleChange}
                      placeholder="Ex: VK-2024" 
                      className="w-full p-3 rounded-xl border border-slate-200 focus:border-leather-tan outline-none" 
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Categoria</label>
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full p-3 rounded-xl border border-slate-200 focus:border-leather-tan outline-none bg-white"
                    >
                       <option>Couros</option>
                       <option>Solados</option>
                       <option>Ferragens</option>
                       <option>Acessórios</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Unidade de Medida</label>
                    <select 
                      name="unit"
                      value={formData.unit}
                      onChange={handleChange}
                      className="w-full p-3 rounded-xl border border-slate-200 focus:border-leather-tan outline-none bg-white"
                    >
                       <option>m² (Metro Quadrado)</option>
                       <option>un (Unidade)</option>
                       <option>kg (Quilo)</option>
                       <option>par (Par)</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Preço por Unidade (R$)</label>
                    <input 
                      type="number" 
                      step="0.01" 
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full p-3 rounded-xl border border-slate-200 focus:border-leather-tan outline-none" 
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Estoque Inicial</label>
                    <input 
                      type="number" 
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      className="w-full p-3 rounded-xl border border-slate-200 focus:border-leather-tan outline-none" 
                    />
                 </div>

                 <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-slate-700">Observações</label>
                    <textarea 
                       name="observations"
                       value={formData.observations}
                       onChange={handleChange}
                       placeholder="Informações adicionais sobre o material, cor, textura, etc..." 
                       rows={3}
                       className="w-full p-3 rounded-xl border border-slate-200 focus:border-leather-tan outline-none resize-none"
                    ></textarea>
                 </div>

                 <div className="space-y-4 md:col-span-2 pt-4 relative z-10">
                    <button type="submit" className="w-full bg-navy-dark text-white py-5 rounded-2xl font-black text-xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)] hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all border-2 border-white/10 relative overflow-hidden group">
                       <span className="relative z-10">Salvar Novo Produto</span>
                       <div className="absolute inset-0 bg-gradient-to-tr from-leather-tan/0 via-leather-tan/20 to-leather-tan/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
