import React, { useState } from 'react';
import { 
  Plus, 
  MapPin, 
  Car, 
  Coffee, 
  Utensils, 
  Hotel, 
  Fuel, 
  Camera, 
  FileText, 
  ChevronRight, 
  Trash2, 
  DollarSign,
  Save,
  X,
  LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES = [
  { id: 'fuel', label: 'Combustível', icon: Fuel, color: 'text-orange-600', bg: 'bg-orange-50' },
  { id: 'meal', label: 'Alimentação', icon: Utensils, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'hotel', label: 'Hospedagem', icon: Hotel, color: 'text-purple-600', bg: 'bg-purple-50' },
  { id: 'misc', label: 'Diversos', icon: Coffee, color: 'text-slate-600', bg: 'bg-slate-50' },
];

export default function ExpensesModule({ onTabChange }: { onTabChange?: (tab: string) => void }) {
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    value: '',
    date: '',
    category: 'fuel',
    location: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setShowAdd(false);
    setFormData({
      description: '',
      value: '',
      date: '',
      category: 'fuel',
      location: ''
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
           <h2 className="text-2xl font-bold text-navy-dark">Despesas de Viagem</h2>
           <p className="text-slate-500">Controle seus reembolsos e custos operacionais</p>
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          className="btn-leather !px-8 shadow-xl"
        >
          <Plus size={18} /> Lançar Despesa
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* History */}
         <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Recentes</h3>
            <div className="space-y-3">
               {[1, 2, 3, 4].map(i => (
                 <div key={i} className="leather-light-textured p-5 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-leather-tan/20 transition-all">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
                          <Fuel size={24} />
                       </div>
                       <div>
                          <p className="font-bold text-navy-dark">Combustível - Posto Trevo</p>
                          <p className="text-xs text-slate-400 font-medium flex items-center gap-2">
                             <MapPin size={10} /> Poços de Caldas • 12/05
                          </p>
                       </div>
                    </div>
                    <div className="flex items-center gap-6">
                       <div className="text-right">
                          <p className="font-bold text-navy-dark">R$ 342,00</p>
                          <span className="text-[10px] font-bold text-leather-tan uppercase">Empresa: Beto Marinzeck</span>
                       </div>
                       <button className="p-2 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-all">
                          <Trash2 size={18} />
                       </button>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Summary & Photo */}
         <div className="space-y-6">
            <div className="bg-navy-dark rounded-[40px] p-8 text-white leather-texture shadow-xl relative overflow-hidden">
               <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-leather-tan mb-8">Total no Mês</h4>
               <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-end border-b border-white/10 pb-4">
                     <div>
                        <p className="text-white/40 text-xs">Total Lançado</p>
                        <p className="text-3xl font-bold">R$ 2.450,80</p>
                     </div>
                     <ArrowUpRightIcon size={24} className="text-green-400 mb-1" />
                  </div>
                  <div className="space-y-4">
                     <p className="text-xs font-bold uppercase tracking-widest text-white/40">Por Categoria</p>
                     <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                           <span className="text-white/60">Combustível</span>
                           <span className="font-bold">R$ 1.200</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                           <div className="h-full bg-leather-tan w-[60%] rounded-full shadow-[0_0_8px_rgba(193,154,107,0.5)]"></div>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                           <span className="text-white/60">Alimentação</span>
                           <span className="font-bold">R$ 850</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                           <div className="h-full bg-blue-400 w-[35%] rounded-full"></div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="absolute top-0 right-0 p-8">
                  <DollarSign className="text-white/5 w-24 h-24 rotate-12" />
               </div>
            </div>

            <button 
              onClick={() => setShowAdd(true)}
              className="w-full p-8 leather-light-textured border-2 border-dashed border-slate-200 rounded-[40px] flex flex-col items-center gap-4 text-slate-400 hover:border-leather-tan hover:text-leather-dark transition-all group shadow-sm bg-gradient-to-br from-[#fdfcf9] to-slate-50"
            >
               <div className="w-16 h-16 bg-navy-dark/5 rounded-full flex items-center justify-center group-hover:bg-leather-tan group-hover:text-white transition-all transform group-hover:rotate-6">
                  <Camera size={28} />
               </div>
               <p className="font-bold italic">Anexar Comprovante (Scan)</p>
            </button>
         </div>
      </div>

      <AnimatePresence>
        {showAdd && (
          <div className="fixed inset-0 bg-navy-dark/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="leather-light-textured w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden border-2 border-white/50 relative"
            >
               <div className="bg-leather-dark p-3 md:p-4 border-b border-leather-tan/20 flex justify-between items-center text-white relative overflow-hidden shadow-xl">
                 <div className="absolute inset-0 bg-leather-texture opacity-10 pointer-events-none"></div>
                 <div className="flex items-center gap-3 relative z-10">
                    <div className="">
                      <h3 className="text-base md:text-lg font-black tracking-tight flex items-center gap-2">
                        <DollarSign size={18} className="text-leather-tan" />
                        Lançar Nova Despesa
                      </h3>
                      <p className="text-[8px] font-bold uppercase text-white/40 tracking-widest mt-0.5">Gestão de Reembolsos • Viagens</p>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-2 relative z-10">
                    <button 
                       type="button"
                       onClick={() => onTabChange?.('dashboard')}
                       className="p-2 mr-2 bg-white/5 hover:bg-white/10 text-leather-tan/60 hover:text-leather-tan rounded-xl transition-all border border-white/5 group"
                       title="Voltar ao Início"
                     >
                       <LayoutGrid size={16} />
                     </button>
                    <button onClick={handleClose} className="hover:bg-red-500/20 p-2 rounded-xl transition-all">
                      <X size={18} className="text-white" />
                    </button>
                 </div>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleClose(); }} className="p-3 space-y-3 relative z-10 bg-slate-50/50">
                 {/* System Metadata Tag - Read Only */}
                 <div className="flex justify-between items-center px-1">
                    <div className="flex items-center gap-2 px-1.5 py-0.5 bg-white border border-slate-200 rounded-lg shadow-sm">
                       <span className="text-[6px] font-black text-slate-400 uppercase tracking-widest">Sys-Ref</span>
                       <code className="text-[8px] font-mono font-bold text-leather-tan">EXP-{(Math.floor(Math.random() * 900) + 100)}</code>
                    </div>
                    <div className="text-[6px] font-bold text-slate-400 uppercase tracking-widest italic opacity-60">Processamento Seguro</div>
                 </div>

                 <div className="bg-white p-3 rounded-[16px] border border-slate-200/60 shadow-sm space-y-3">
                    <div className="relative">
                       <input 
                         id="description"
                         type="text" 
                         name="description"
                         required
                         value={formData.description}
                         onChange={handleChange}
                         placeholder=" "
                         className="peer w-full p-2 pt-4 bg-white border border-slate-200 focus:border-leather-tan outline-none font-bold text-sm text-leather-dark transition-all placeholder-transparent rounded-lg shadow-sm"
                       />
                       <label 
                         htmlFor="description"
                         className="absolute left-2.5 top-1 text-[8px] font-bold text-slate-400 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-2.5 peer-placeholder-shown:font-medium peer-focus:top-1 peer-focus:text-[8px] peer-focus:font-bold peer-focus:text-leather-tan"
                       >
                          Descrição da Despesa
                       </label>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                       <div className="relative">
                          <input 
                            id="value"
                            type="number" 
                            step="0.01"
                            name="value"
                            required
                            value={formData.value}
                            onChange={handleChange}
                            placeholder=" "
                            className="peer w-full p-2 pt-4 bg-white border border-slate-200 focus:border-leather-tan outline-none font-bold text-sm text-leather-dark transition-all placeholder-transparent rounded-lg shadow-sm"
                          />
                          <label 
                            htmlFor="value"
                            className="absolute left-2.5 top-1 text-[8px] font-bold text-slate-400 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-2.5 peer-placeholder-shown:font-medium peer-focus:top-1 peer-focus:text-[8px] peer-focus:font-bold peer-focus:text-leather-tan"
                          >
                             Valor (R$)
                          </label>
                       </div>
                       <div className="relative">
                          <input 
                            id="date"
                            type="date"
                            name="date"
                            required
                            value={formData.date}
                            onChange={handleChange}
                            className="peer w-full p-2 pt-4 bg-white border border-slate-200 focus:border-leather-tan outline-none font-bold text-sm text-leather-dark transition-all rounded-lg shadow-sm"
                          />
                          <label 
                            htmlFor="date"
                            className="absolute left-2.5 top-1 text-[8px] font-bold text-leather-tan transition-all"
                          >
                             Data do Comprovante
                          </label>
                       </div>
                    </div>

                    <div className="relative">
                       <select 
                         id="category"
                         name="category"
                         value={formData.category}
                         onChange={handleChange}
                         className="peer w-full p-2 pt-4 bg-white border border-slate-200 focus:border-leather-tan outline-none font-black text-[11px] text-leather-dark transition-all appearance-none rounded-lg cursor-pointer shadow-sm"
                       >
                          {CATEGORIES.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.label}</option>
                          ))}
                       </select>
                       <label htmlFor="category" className="absolute left-2.5 top-1 text-[8px] font-bold text-slate-400 transition-all peer-focus:text-leather-tan">Categoria da Despesa</label>
                    </div>

                    <div className="relative">
                       <input 
                         id="location"
                         type="text" 
                         name="location"
                         required
                         value={formData.location}
                         onChange={handleChange}
                         placeholder=" "
                         className="peer w-full p-2 pt-4 bg-white border border-slate-200 focus:border-leather-tan outline-none font-bold text-sm text-leather-dark transition-all placeholder-transparent rounded-lg shadow-sm"
                       />
                       <label 
                         htmlFor="location"
                         className="absolute left-2.5 top-1 text-[8px] font-bold text-slate-400 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-2.5 peer-placeholder-shown:font-medium peer-focus:top-1 peer-focus:text-[8px] peer-focus:font-bold peer-focus:text-leather-tan"
                       >
                          Cidade / Local do Gasto
                       </label>
                    </div>
                 </div>

                 <button type="submit" className="w-full py-4 bg-leather-dark text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)] hover:bg-black hover:scale-[1.01] active:scale-[0.98] transition-all border-2 border-white/10 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-leather-tan/0 via-leather-tan/20 to-leather-tan/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                       <Save size={16} /> Salvar Lançamento
                    </span>
                 </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ArrowUpRightIcon({ size, className }: { size: number, className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7 7h10v10"/><path d="M7 17L17 7"/></svg>
  );
}

function GasStation(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="3" y1="22" x2="15" y2="22"/><line x1="4" y1="9" x2="14" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/></svg>
  )
}
