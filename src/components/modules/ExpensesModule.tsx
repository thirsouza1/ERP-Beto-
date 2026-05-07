import { useState } from 'react';
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
  DollarSign 
} from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = [
  { id: 'fuel', label: 'Combustível', icon: Fuel, color: 'text-orange-600', bg: 'bg-orange-50' },
  { id: 'meal', label: 'Alimentação', icon: Utensils, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'hotel', label: 'Hospedagem', icon: Hotel, color: 'text-purple-600', bg: 'bg-purple-50' },
  { id: 'misc', label: 'Diversos', icon: Coffee, color: 'text-slate-600', bg: 'bg-slate-50' },
];

export default function ExpensesModule() {
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
                 <div key={i} className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-leather-tan/20 transition-all">
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
              className="w-full p-8 bg-white border-2 border-dashed border-slate-200 rounded-[40px] flex flex-col items-center gap-4 text-slate-400 hover:border-leather-tan hover:text-leather-dark transition-all group shadow-sm bg-gradient-to-br from-white to-slate-50"
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
              className="bg-[#fdfaf6] w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden border-2 border-white/50 leather-texture relative"
            >
              <div className="absolute inset-0 bg-[#fdfaf6]/40 pointer-events-none" />
              <div className="bg-navy-dark p-8 text-white flex justify-between items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
                <h3 className="text-xl font-bold relative z-10 flex items-center gap-2">
                   <DollarSign /> Lançar Despesa
                </h3>
                <button onClick={handleClose} className="bg-white/10 p-2 rounded-xl hover:bg-white/20 transition-colors relative z-10">
                   <ChevronRight />
                </button>
              </div>

              <form className="p-8 space-y-6 relative z-10">
                 <div className="space-y-2">
                    <label className="text-sm font-black text-navy-dark uppercase tracking-widest">Descrição</label>
                    <input 
                      type="text" 
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Ex: Almoço Cliente"
                      className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200 focus:border-leather-tan outline-none bg-white font-bold text-navy-dark"
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-sm font-black text-navy-dark uppercase tracking-widest">Valor (R$)</label>
                       <input 
                         type="number" 
                         step="0.01"
                         name="value"
                         value={formData.value}
                         onChange={handleChange}
                         placeholder="0,00"
                         className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200 focus:border-leather-tan outline-none bg-white font-bold text-navy-dark"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-black text-navy-dark uppercase tracking-widest">Data</label>
                       <input 
                         type="date"
                         name="date"
                         value={formData.date}
                         onChange={handleChange}
                         className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200 focus:border-leather-tan outline-none bg-white font-bold text-navy-dark"
                       />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-black text-navy-dark uppercase tracking-widest">Categoria</label>
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200 focus:border-leather-tan outline-none bg-white font-bold text-navy-dark appearance-none"
                    >
                       {CATEGORIES.map(cat => (
                         <option key={cat.id} value={cat.id}>{cat.label}</option>
                       ))}
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-black text-navy-dark uppercase tracking-widest">Cidade / Local</label>
                    <input 
                      type="text" 
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Ex: Poços de Caldas - MG"
                      className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200 focus:border-leather-tan outline-none bg-white font-bold text-navy-dark"
                    />
                 </div>

                 <button type="submit" className="w-full bg-navy-dark text-white py-5 rounded-2xl font-black text-xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)] hover:bg-black hover:scale-[1.02] transition-all border-2 border-white/10 relative overflow-hidden group">
                    <span className="relative z-10 flex items-center justify-center gap-2 text-white/90">
                       <Save size={20} /> Salvar Lançamento
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-tr from-leather-tan/0 via-leather-tan/20 to-leather-tan/0 opacity-0 group-hover:opacity-100 transition-opacity" />
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
