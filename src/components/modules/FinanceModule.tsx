import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Upload, CheckCircle2, AlertCircle, RotateCcw, Save, Trash2, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../ui/Logo';

export default function FinanceModule() {
  const [activeTab, setActiveTab] = useState<'payable' | 'receivable'>('receivable');
  const [showCheckScanner, setShowCheckScanner] = useState(false);
  const [scanStep, setScanStep] = useState<'front' | 'back' | 'preview'>('front');
  const [showPayableAdd, setShowPayableAdd] = useState(false);
  const [payableFormData, setPayableFormData] = useState({
    description: '',
    value: '',
    dueDate: '',
    category: 'Fornecedores'
  });

  const handlePayableChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPayableFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex p-1 bg-navy-dark/5 rounded-2xl w-fit">
        <button 
          onClick={() => setActiveTab('receivable')}
          className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'receivable' ? 'bg-white text-navy-dark shadow-md' : 'text-slate-500 hover:text-navy-dark'}`}
        >
          Contas a Receber (Cheques)
        </button>
        <button 
          onClick={() => setActiveTab('payable')}
          className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'payable' ? 'bg-white text-navy-dark shadow-md' : 'text-slate-500 hover:text-navy-dark'}`}
        >
          Contas a Pagar
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* List Section */}
        <div className="flex-1 space-y-4">
          <div className="bg-white/80 backdrop-blur-md rounded-[40px] border-2 border-slate-200/50 shadow-xl p-8 overflow-hidden leather-texture relative">
             <div className="absolute inset-0 bg-white/60 pointer-events-none" />
             <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="font-black text-navy-dark text-lg uppercase tracking-tight">Últimos Lançamentos</h3>
                   <button 
                     onClick={() => activeTab === 'receivable' ? setShowCheckScanner(true) : setShowPayableAdd(true)}
                     className="px-6 py-2 bg-navy-dark text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg border border-white/10"
                   >
                     <Plus size={14} className="inline mr-1" /> Novo Registro
                   </button>
                </div>
                
                <div className="space-y-4">
                   {[1, 2, 3].map((i) => (
                     <div key={i} className="p-5 bg-[#fdfaf6]/50 rounded-[28px] flex items-center justify-between border-2 border-transparent hover:border-leather-tan/40 hover:bg-white transition-all cursor-pointer group shadow-sm">
                        <div className="flex items-center gap-5">
                           <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${activeTab === 'receivable' ? 'bg-green-100/50 text-green-700' : 'bg-red-100/50 text-red-700'}`}>
                              <AlertCircle size={22} />
                           </div>
                           <div>
                              <p className="font-black text-navy-dark text-base leading-tight">Parcela #00{i} - Cliente XYZ</p>
                              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Vencimento: 24/05/2026</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className={`text-xl font-black italic ${activeTab === 'receivable' ? 'text-green-700' : 'text-red-700'}`}>R$ 1.250,00</p>
                           <span className="px-3 py-1 bg-white/40 rounded-full border border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-tighter">Aguardando</span>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>

        {/* Action / Detail Section */}
        {activeTab === 'receivable' && (
          <div className="w-full lg:w-96 space-y-6">
            <div className="bg-navy-dark rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden border-2 border-white/10">
               <div className="absolute inset-0 bg-leather-tan/5 pointer-events-none" />
               <div className="relative z-10">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-leather-tan mb-8 text-center opacity-80">Fluxo de Caixa Consolidado</h4>
                 <div className="space-y-10">
                    <div className="text-center">
                       <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">Previsão em Aberto</p>
                       <h2 className="text-5xl font-black italic tracking-tighter">R$ 145.200</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="bg-white/5 p-5 rounded-[32px] border border-white/10 text-center backdrop-blur-md">
                          <p className="text-[10px] uppercase font-black tracking-widest text-red-400 mb-1">Vencidos</p>
                          <p className="text-xl font-black">R$ 4.3K</p>
                       </div>
                       <div className="bg-white/5 p-5 rounded-[32px] border border-white/10 text-center backdrop-blur-md">
                          <p className="text-[10px] uppercase font-black tracking-widest text-green-400 mb-1">A Receber</p>
                          <p className="text-xl font-black">R$ 130K</p>
                       </div>
                    </div>
                 </div>
               </div>
               <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-leather-tan/10 rounded-full blur-3xl"></div>
            </div>

            <button 
              onClick={() => setShowCheckScanner(true)}
              className="w-full bg-white p-8 rounded-3xl border-2 border-dashed border-slate-200 text-slate-400 flex flex-col items-center gap-4 hover:border-leather-tan hover:text-leather-dark transition-all group shadow-sm"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Camera size={32} />
              </div>
              <div className="text-center">
                <p className="font-bold">Escanear Cheque</p>
                <p className="text-xs opacity-60 italic">Capture frente e verso do documento</p>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Check Scanner Modal */}
      <AnimatePresence>
        {showCheckScanner && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-navy-dark/95 z-[100] flex items-center justify-center p-6 backdrop-blur-xl"
          >
            <div className="w-full max-w-2xl bg-[#fdfaf6] rounded-[40px] overflow-hidden shadow-2xl border-2 border-white/50 leather-texture relative">
              <div className="absolute inset-0 bg-[#fdfaf6]/40 pointer-events-none" />
              <div className="p-8 bg-navy-dark border-b border-white/10 flex items-center justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
                <div className="flex items-center gap-4 relative z-10">
                  <Logo variant="compact" className="scale-125 origin-left" />
                  <div className="h-10 w-px bg-white/20"></div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Captura Social</h3>
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">Escaneamento Digital</p>
                  </div>
                </div>
                <button onClick={() => setShowCheckScanner(false)} className="bg-white/10 p-2 rounded-xl text-white hover:bg-white/20 relative z-10 transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="p-8">
                <div className="flex gap-4 mb-8">
                   <div className={`flex-1 h-3 rounded-full transition-colors ${scanStep === 'front' ? 'bg-leather-tan' : 'bg-slate-200'}`}></div>
                   <div className={`flex-1 h-3 rounded-full transition-colors ${scanStep === 'back' ? 'bg-leather-tan' : 'bg-slate-200'}`}></div>
                   <div className={`flex-1 h-3 rounded-full transition-colors ${scanStep === 'preview' ? 'bg-leather-tan' : 'bg-slate-200'}`}></div>
                </div>

                <div className="aspect-[1.8/1] bg-slate-900 rounded-3xl flex items-center justify-center relative overflow-hidden group border-4 border-slate-800">
                   <div className="text-center text-white/40 space-y-4">
                      <Camera size={64} strokeWidth={1} />
                      <p className="font-bold uppercase tracking-widest text-xs">
                        {scanStep === 'front' ? 'Posicione a FRENTE do cheque' : scanStep === 'back' ? 'Posicione o VERSO do cheque' : 'Analisando imagem...'}
                      </p>
                   </div>
                   
                   {/* Scanner Line Animation */}
                   <motion.div 
                     animate={{ top: ['0%', '100%', '0%'] }}
                     transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                     className="absolute left-0 right-0 h-1 bg-leather-tan/50 shadow-[0_0_20px_rgba(193,154,107,0.8)] z-10"
                   />
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4 relative z-10">
                   <button className="flex items-center justify-center gap-2 py-5 border-2 border-slate-200 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-500 hover:bg-white hover:shadow-md transition-all">
                      <ImageIcon size={20} className="text-leather-tan" /> Carregar Imagem
                   </button>
                   <button 
                     onClick={() => setScanStep(scanStep === 'front' ? 'back' : 'preview')}
                     className="flex items-center justify-center gap-2 py-5 bg-navy-dark text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black hover:scale-[1.02] shadow-xl border-2 border-white/10 transition-all"
                   >
                      <Camera size={20} className="text-leather-tan" /> Captura Ativa
                   </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        {showPayableAdd && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-navy-dark/95 z-[100] flex items-center justify-center p-6 backdrop-blur-xl"
          >
            <div className="w-full max-w-2xl bg-[#fdfaf6] rounded-[40px] overflow-hidden shadow-2xl border-2 border-white/50 leather-texture relative">
              <div className="absolute inset-0 bg-[#fdfaf6]/40 pointer-events-none" />
              <div className="p-8 bg-navy-dark border-b border-white/10 flex items-center justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
                <div className="flex items-center gap-4 relative z-10">
                  <Logo variant="compact" className="scale-125 origin-left" />
                  <div className="h-10 w-px bg-white/20"></div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Contas a Pagar</h3>
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">Novo Lançamento Financeiro</p>
                  </div>
                </div>
                <button onClick={() => setShowPayableAdd(false)} className="bg-white/10 p-2 rounded-xl text-white hover:bg-white/20 relative z-10 transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form className="p-8 space-y-6 relative z-10">
                 <div className="space-y-2">
                    <label className="text-sm font-black text-navy-dark uppercase tracking-widest">Descrição do Lançamento</label>
                    <input 
                      type="text" 
                      name="description"
                      value={payableFormData.description}
                      onChange={handlePayableChange}
                      placeholder="Ex: Pagamento Fornecedor Couros"
                      className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200 bg-white focus:border-leather-tan outline-none transition-all font-bold text-navy-dark"
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-sm font-black text-navy-dark uppercase tracking-widest">Valor (R$)</label>
                       <input 
                         type="number" 
                         name="value"
                         value={payableFormData.value}
                         onChange={handlePayableChange}
                         placeholder="0,00"
                         className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200 bg-white focus:border-leather-tan outline-none transition-all font-bold text-navy-dark"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-black text-navy-dark uppercase tracking-widest">Data de Vencimento</label>
                       <input 
                         type="date" 
                         name="dueDate"
                         value={payableFormData.dueDate}
                         onChange={handlePayableChange}
                         className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200 bg-white focus:border-leather-tan outline-none transition-all font-bold text-navy-dark"
                       />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-black text-navy-dark uppercase tracking-widest">Categoria</label>
                    <select 
                      name="category"
                      value={payableFormData.category}
                      onChange={handlePayableChange}
                      className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200 bg-white focus:border-leather-tan outline-none transition-all font-bold text-navy-dark appearance-none"
                    >
                       <option>Fornecedores</option>
                       <option>Impostos</option>
                       <option>Logística</option>
                       <option>Administrativo</option>
                       <option>Outros</option>
                    </select>
                 </div>

                 <button type="submit" className="w-full bg-navy-dark text-white py-5 rounded-2xl font-black text-xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)] hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all border-2 border-white/10 relative overflow-hidden group">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                       <Save size={20} /> Salvar Lançamento
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-tr from-leather-tan/0 via-leather-tan/20 to-leather-tan/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                 </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
