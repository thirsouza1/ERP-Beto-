import React, { useState, useRef } from 'react';
import { 
  Plus, 
  Trash2, 
  FileText, 
  Download, 
  User, 
  Package, 
  CreditCard, 
  Calculator, 
  CheckCircle2, 
  Calendar,
  Search,
  ChevronRight,
  X,
  Printer
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import Logo from '../ui/Logo';

interface OrdersModuleProps {
  user?: {
    name: string;
    id: string;
    role: string;
  };
}

export default function OrdersModule({ user }: OrdersModuleProps) {
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [viewOrder, setViewOrder] = useState<any>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const orderRef = useRef<HTMLDivElement>(null);

  const [newOrderData, setNewOrderData] = useState({
    client: '',
    observations: '',
    paymentTerm: '30 dias',
    items: [
      { id: 1, name: 'Pele Vaqueta Nappa', price: 145.90, qty: 10, unit: 'm²' },
      { id: 2, name: 'Sola de Couro Premium', price: 85.00, qty: 5, unit: 'un' }
    ]
  });

  const handleNewOrderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewOrderData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (id: number, field: string, value: any) => {
    setNewOrderData(prev => ({
      ...prev,
      items: prev.items.map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const addItem = () => {
    setNewOrderData(prev => ({
      ...prev,
      items: [...prev.items, { id: Date.now(), name: '', price: 0, qty: 1, unit: 'un' }]
    }));
  };

  const removeItem = (id: number) => {
    setNewOrderData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const totalAmount = newOrderData.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const discountAmount = totalAmount * 0.05; // Sample calculation
  const finalTotal = totalAmount - discountAmount;

  const handleDownloadPdf = async (orderData: any) => {
    setIsGeneratingPdf(true);
    const element = document.getElementById('order-pdf-template');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Pedido_${orderData.id}_${orderData.client}.pdf`);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const mockOrders = [
    { 
      id: '004521', 
      client: 'Calçados Estrela LTDA', 
      cnpj: '12.345.678/0001-90',
      address: 'Industrial, 1500 - Bloco B',
      cep: '14400-000',
      city: 'Franca',
      state: 'SP',
      date: '12/05/2026', 
      total: 14250.50, 
      discount: 712.52,
      finalTotal: 13537.98,
      status: 'Aprovado' 
    },
    { 
      id: '004522', 
      client: 'Curtume Cacique EIRELI', 
      cnpj: '98.765.432/0001-21',
      address: 'Currais Belos, 45 - Centro',
      cep: '37500-000',
      city: 'Itajubá',
      state: 'MG',
      date: '13/05/2026', 
      total: 8400.00, 
      discount: 0,
      finalTotal: 8400.00,
      status: 'Pendente' 
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 leather-light-textured rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-leather-dark leather-texture">
              <FileText size={24} />
           </div>
           <div>
              <h2 className="text-xl font-bold text-navy-dark">Talão de Pedidos</h2>
              <p className="text-sm text-slate-500">Gerencie suas vendas e comissões</p>
           </div>
        </div>
        <button 
          onClick={() => setShowNewOrder(true)}
          className="btn-leather !px-8 shadow-xl hover:scale-105 transition-transform"
        >
          <Plus size={18} /> Novo Pedido
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockOrders.map((order) => (
          <div key={order.id} className="leather-light-textured backdrop-blur-md rounded-[40px] p-6 shadow-xl border-2 border-slate-200/50 relative overflow-hidden group">
             <div className="relative z-10">
               <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-[10px] font-black text-leather-tan uppercase tracking-[0.2em] mb-1">Pedido #{order.id}</p>
                    <h3 className="font-black text-navy-dark text-lg leading-tight">{order.client}</h3>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === 'Aprovado' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'} shadow-sm`}>
                    {order.status}
                  </span>
               </div>
  
               <div className="space-y-4 mb-6 bg-[#fdfaf6]/50 p-4 rounded-3xl border border-white/50 backdrop-blur-sm">
                  <div className="flex justify-between text-sm">
                     <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Data do Pedido</span>
                     <span className="font-black text-navy-dark">{order.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                     <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Subtotal</span>
                     <span className="font-black text-navy-dark">R$ {order.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                   <div className="flex justify-between text-sm">
                     <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Bonificação</span>
                     <span className="font-black text-red-500">- R$ {(order.discount || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-base border-t border-slate-200 pt-3 mt-1">
                     <span className="text-navy-dark font-black uppercase text-[10px] tracking-widest">Total Líquido</span>
                     <span className="font-black text-navy-dark text-lg italic">R$ {(order.finalTotal || order.total).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
               </div>
  
               <div className="flex gap-2">
                  <button 
                    onClick={() => handleDownloadPdf(order)}
                    disabled={isGeneratingPdf}
                    className="flex-1 py-3 bg-white text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 border border-slate-200 shadow-sm"
                  >
                     <Download size={14} /> PDF Oficial
                  </button>
                  <button 
                    onClick={() => setViewOrder(order)}
                    className="flex-1 py-3 bg-navy-dark text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg border border-white/10"
                  >
                     Visualizar
                  </button>
               </div>
             </div>
          </div>
        ))}
      </div>

      {/* Hidden Order Template for PDF Generation */}
      <div className="fixed -left-[2000px] top-0">
        <div id="order-pdf-template" className="w-[210mm] p-10 leather-light-textured text-navy-dark font-sans relative">
           <div className="flex justify-between items-start border-b-2 border-leather-tan pb-8 mb-8">
              <div className="flex items-center gap-6">
                 <Logo variant="compact" className="origin-left scale-110" />
                 <div>
                    <h1 className="text-2xl font-black uppercase text-navy-dark">{user?.name || 'Beto Marinzeck'}</h1>
                    <p className="text-xs font-bold text-slate-500 tracking-widest uppercase">REPRESENTAÇÕES COMERCIAIS</p>
                    <p className="text-[10px] text-slate-400 mt-1">CNPJ: 00.000.000/0001-00 • (35) 99843-0843</p>
                    <p className="text-[10px] text-slate-400 uppercase">Emitido por: {user?.name || 'Administrador'}</p>
                 </div>
              </div>
              <div className="text-right">
                 <h2 className="text-xl font-bold bg-navy-dark text-white px-4 py-2 rounded-lg inline-block mb-2">PEDIDO DE VENDA</h2>
                 <p className="text-lg font-mono font-bold"># {viewOrder?.id || 'NOVO'}</p>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-10 mb-10">
              <div>
                 <h3 className="text-xs font-black text-leather-tan uppercase tracking-widest mb-3">DADOS DO CLIENTE</h3>
                 <p className="text-lg font-bold">{viewOrder?.client || 'Cliente Exemplo'}</p>
                 <p className="text-sm text-slate-600">CNPJ/CPF: <span className="font-bold">{viewOrder?.cnpj || '00.000.000/0001-00'}</span></p>
                 <p className="text-[10px] text-slate-500 uppercase mt-2">Endereço Completo:</p>
                 <p className="text-sm text-slate-600">
                    {viewOrder?.address || 'Rua Exemplo, 123'}<br/>
                    CEP: {viewOrder?.cep || '00000-000'} • {viewOrder?.city || 'Cidade'}/{viewOrder?.state || 'UF'}
                 </p>
              </div>
              <div className="text-right">
                 <h3 className="text-xs font-black text-leather-tan uppercase tracking-widest mb-3">DADOS DO PEDIDO</h3>
                 <p className="text-sm">Data Emissão: <span className="font-bold">{viewOrder?.date || '12/05/2026'}</span></p>
                 <p className="text-sm">Pagamento: <span className="font-bold">30/60 dias</span></p>
                 <p className="text-sm">Emitente: <span className="font-bold">{user?.name || 'Beto Marinzeck'}</span></p>
              </div>
           </div>

           <table className="w-full mb-10">
              <thead>
                 <tr className="bg-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <th className="px-4 py-3 text-left">DESCRIÇÃO DO PRODUTO</th>
                    <th className="px-4 py-3 text-center">UN</th>
                    <th className="px-4 py-3 text-center">QTD</th>
                    <th className="px-4 py-3 text-right">PREÇO UN.</th>
                    <th className="px-4 py-3 text-right">TOTAL</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                 {newOrderData.items.map((item, idx) => (
                    <tr key={idx} className="text-sm">
                       <td className="px-4 py-4 font-bold">{item.name}</td>
                       <td className="px-4 py-4 text-center">{item.unit}</td>
                       <td className="px-4 py-4 text-center">{item.qty}</td>
                       <td className="px-4 py-4 text-right">R$ {item.price.toFixed(2)}</td>
                       <td className="px-4 py-4 text-right font-bold">R$ {(item.price * item.qty).toFixed(2)}</td>
                    </tr>
                 ))}
              </tbody>
           </table>

           <div className="flex justify-end">
              <div className="w-80 space-y-2 border-t-2 border-navy-dark pt-4">
                 <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-500">Subtotal Bruto:</span>
                    <span className="font-bold">R$ {(viewOrder?.total || totalAmount).toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between text-sm text-red-500">
                    <span className="font-medium">Desconto Aplicado:</span>
                    <span className="font-bold">- R$ {(viewOrder?.discount || 0).toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between text-lg font-black text-navy-dark pt-2 border-t border-slate-100">
                    <span>TOTAL DO PEDIDO:</span>
                    <span className="text-leather-dark">R$ {(viewOrder?.finalTotal || (totalAmount - discountAmount)).toFixed(2)}</span>
                 </div>
              </div>
           </div>

           <div className="mt-20 border-t border-slate-200 pt-8 grid grid-cols-2 gap-20">
              <div className="text-center">
                 <div className="h-px bg-slate-300 w-full mb-2"></div>
                 <p className="text-[10px] font-bold uppercase text-slate-400">Assinatura do Vendedor</p>
              </div>
              <div className="text-center">
                 <div className="h-px bg-slate-300 w-full mb-2"></div>
                 <p className="text-[10px] font-bold uppercase text-slate-400">Assinatura do Cliente</p>
              </div>
           </div>
        </div>
      </div>

      {/* View Order Modal */}
      <AnimatePresence>
        {viewOrder && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-navy-dark/90 z-[200] flex items-center justify-center p-6 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-[#fdfaf6] leather-texture w-full max-w-4xl max-h-[90vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col border-2 border-white/50 relative"
            >
               <div className="absolute inset-0 bg-[#fdfaf6]/40 pointer-events-none" />
               <div className="p-8 bg-navy-dark text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-navy-dark/20 mix-blend-overlay"></div>
                  <div className="flex items-center gap-6 relative z-10">
                     <Logo variant="compact" className="scale-125 origin-left" />
                     <div className="h-10 w-px bg-white/20"></div>
                     <div>
                        <h3 className="text-xl font-bold">Pedido #{viewOrder.id}</h3>
                        <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Emitido por {user?.name || 'Thiago Beto'}</p>
                     </div>
                  </div>
                  <button onClick={() => setViewOrder(null)} className="p-2 hover:bg-white/10 rounded-xl transition-colors relative z-10">
                     <X size={24} />
                  </button>
               </div>

               <div className="flex-1 overflow-y-auto p-10 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-6">
                        <div className="bg-white/40 p-6 rounded-[32px] border border-white/60 leather-light-textured backdrop-blur-sm shadow-inner-lg">
                           <h4 className="text-[10px] font-bold text-leather-tan uppercase tracking-widest mb-2">Dados do Cliente</h4>
                           <p className="text-xl font-bold text-navy-dark leading-tight">{viewOrder.client}</p>
                           <p className="text-xs text-slate-400 font-bold mb-3">CNPJ/CPF: {viewOrder.cnpj}</p>
                           <div className="space-y-1">
                              <p className="text-slate-500 font-medium text-sm leading-relaxed">{viewOrder.address}</p>
                              <p className="text-slate-500 font-medium text-sm uppercase tracking-wider">
                                 CEP {viewOrder.cep} • {viewOrder.city} / {viewOrder.state}
                              </p>
                           </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="bg-white/40 p-4 rounded-3xl border border-white/60 backdrop-blur-sm">
                              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Status do Pedido</p>
                              <span className="text-sm font-bold text-green-600 flex items-center gap-2">
                                 <CheckCircle2 size={14} /> {viewOrder.status}
                              </span>
                           </div>
                           <div className="bg-white/40 p-4 rounded-3xl border border-white/60 backdrop-blur-sm">
                              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Data de Emissão</p>
                              <span className="text-sm font-bold text-navy-dark">{viewOrder.date}</span>
                           </div>
                        </div>
                     </div>
                     <div className="bg-navy-dark p-8 rounded-[40px] text-white leather-texture shadow-xl relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute inset-0 bg-leather-tan/5 pointer-events-none"></div>
                        <div>
                           <h4 className="text-[10px] font-bold text-leather-tan uppercase tracking-widest mb-6 relative z-10">Acompanhamento Financeiro</h4>
                           <div className="space-y-4 relative z-10">
                              <div className="flex justify-between border-b border-white/10 pb-2">
                                 <span className="text-white/40 text-sm">Valor Bruto</span>
                                 <span className="font-bold text-white/90">R$ {viewOrder.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                              </div>
                              <div className="flex justify-between border-b border-white/10 pb-2">
                                 <span className="text-white/40 text-sm">Desconto Promocional</span>
                                 <span className="font-bold text-red-400">- R$ {(viewOrder.discount || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                              </div>
                              <div className="pt-4 flex flex-col gap-1">
                                 <p className="text-[10px] font-bold text-leather-tan uppercase tracking-[0.2em]">Total Final do Pedido</p>
                                 <p className="text-3xl font-black text-white italic">R$ {viewOrder.finalTotal ? viewOrder.finalTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : viewOrder.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                              </div>
                           </div>
                        </div>
                        <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
                           <p className="text-[10px] font-bold text-white/30 uppercase mb-2">Prazo de Pagamento</p>
                           <p className="text-sm font-bold italic text-leather-tan">30/60/90 Dias no Boleto Bancário</p>
                        </div>
                     </div>
                  </div>

                  <div>
                     <h4 className="text-[10px] font-bold text-leather-tan uppercase tracking-widest mb-4">Itens da Venda</h4>
                     <div className="bg-white/60 rounded-[32px] overflow-hidden border border-white/80 leather-light-textured backdrop-blur-sm shadow-inner shadow-black/5">
                        <table className="w-full text-left">
                           <thead>
                              <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100/50">
                                 <th className="px-6 py-4">Produto</th>
                                 <th className="px-6 py-4">Quantidade</th>
                                 <th className="px-6 py-4">Preço Un.</th>
                                 <th className="px-6 py-4 text-right">Subtotal</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-slate-100">
                              {newOrderData.items.map((item, idx) => (
                                 <tr key={idx} className="hover:bg-white/30 transition-colors">
                                    <td className="px-6 py-4 font-bold text-navy-dark">{item.name}</td>
                                    <td className="px-6 py-4 text-slate-600 font-medium">{item.qty} {item.unit}</td>
                                    <td className="px-6 py-4 text-slate-600">R$ {item.price.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-right font-black text-navy-dark">R$ {(item.qty * item.price).toFixed(2)}</td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>

               <div className="p-8 border-t border-white/40 bg-white/20 backdrop-blur-md flex gap-4">
                  <button 
                    onClick={() => handleDownloadPdf(viewOrder)}
                    disabled={isGeneratingPdf}
                    className="flex-1 btn-leather !bg-navy-dark gap-2 shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                     <Download size={18} /> {isGeneratingPdf ? 'Gerando Arquivo...' : 'Download PDF Oficial'}
                  </button>
                  <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white/80 border border-white border-t-white shadow-sm text-slate-600 rounded-2xl font-bold hover:bg-white hover:shadow-md transition-all">
                     <Printer size={18} /> Imprimir Via
                  </button>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New Order Drawer - Unchanged Logic, just ensuring icons and structure */}
      <AnimatePresence>
        {showNewOrder && (
            <motion.div 
               initial={{ x: '100%' }}
               animate={{ x: 0 }}
               exit={{ x: '100%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               className="fixed inset-y-0 right-0 w-full max-w-4xl leather-light-textured shadow-2xl z-[150] flex flex-col border-l-4 border-leather-tan relative"
            >
               <div className="bg-navy-dark p-8 text-white flex justify-between items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
                <div className="flex items-center gap-6 relative z-10">
                   <Logo variant="compact" className="scale-125 origin-left" />
                   <div className="h-10 w-px bg-white/20"></div>
                   <div>
                     <h3 className="text-2xl font-bold">Novo Pedido</h3>
                     <p className="text-white/40 text-sm">Talão Digital • {user?.name || 'Beto Marinzeck'}</p>
                   </div>
                </div>
                <button onClick={() => setShowNewOrder(false)} className="bg-white/10 p-3 rounded-2xl hover:bg-white/20 transition-colors relative z-10">
                   <X size={24} />
                </button>
             </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
               <section className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-leather-tan uppercase tracking-widest">
                     <User size={14} /> Seleção de Cliente
                  </div>
                  <div className="relative group">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-leather-tan transition-colors" size={20} />
                     <input 
                       type="text" 
                       name="client"
                       value={newOrderData.client}
                       onChange={handleNewOrderChange}
                       placeholder="Buscar cliente cadastrado..."
                       className="w-full pl-12 pr-4 py-4 leather-light-textured rounded-2xl border-2 border-transparent focus:border-leather-tan outline-none shadow-sm transition-all"
                     />
                  </div>
               </section>

               <section className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-leather-tan uppercase tracking-widest">
                       <Package size={14} /> Itens do Pedido
                    </div>
                    <button 
                      onClick={addItem}
                      className="text-xs font-bold text-leather-dark hover:text-navy-dark flex items-center gap-1 bg-leather-tan/10 px-3 py-1.5 rounded-full"
                    >
                       <Plus size={14} /> Adicionar Produto
                    </button>
                  </div>

                  <div className="leather-light-textured rounded-3xl overflow-hidden shadow-sm border border-slate-100 relative overflow-hidden">
                     <table className="w-full text-left relative z-10">
                        <thead className="bg-[#fdfcf9]/40 border-b border-slate-100">
                           <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              <th className="px-6 py-4">Produto / Descrição</th>
                              <th className="px-6 py-4 text-center text-center">Qtd.</th>
                              <th className="px-6 py-4 text-right">Preço Un.</th>
                              <th className="px-6 py-4 text-right">Total</th>
                              <th className="px-6 py-4"></th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                           {newOrderData.items.map((item) => (
                              <tr key={item.id} className="text-sm">
                                 <td className="px-6 py-4">
                                    <input 
                                      type="text" 
                                      value={item.name}
                                      onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                                      className="font-bold text-navy-dark bg-transparent border-b border-dashed border-slate-200 outline-none w-full"
                                      placeholder="Nome do Produto"
                                    />
                                    <select 
                                      value={item.unit}
                                      onChange={(e) => handleItemChange(item.id, 'unit', e.target.value)}
                                      className="text-xs text-slate-400 uppercase bg-transparent outline-none mt-1"
                                    >
                                       <option>m²</option>
                                       <option>un</option>
                                       <option>kg</option>
                                       <option>par</option>
                                    </select>
                                 </td>
                                 <td className="px-6 py-4 text-center">
                                    <input 
                                      type="number" 
                                      value={item.qty} 
                                      onChange={(e) => handleItemChange(item.id, 'qty', parseFloat(e.target.value) || 0)}
                                      className="w-16 p-1 border border-slate-200 rounded text-center font-bold" 
                                    />
                                 </td>
                                 <td className="px-6 py-4 text-right">
                                    <input 
                                      type="number" 
                                      value={item.price} 
                                      step="0.01"
                                      onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)}
                                      className="w-24 p-1 border border-slate-200 rounded text-right font-medium text-slate-600" 
                                    />
                                 </td>
                                 <td className="px-6 py-4 text-right font-bold text-navy-dark">R$ {(item.price * item.qty).toFixed(2)}</td>
                                 <td className="px-6 py-4 text-right">
                                    <button onClick={() => removeItem(item.id)} className="text-red-300 hover:text-red-500 transition-colors">
                                       <Trash2 size={18} />
                                    </button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </section>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
                  <section className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-leather-tan uppercase tracking-widest">
                       <CreditCard size={14} /> Condições de Pagamento
                    </div>
                    <select 
                      name="paymentTerm"
                      value={newOrderData.paymentTerm}
                      onChange={handleNewOrderChange}
                      className="w-full p-4 leather-light-textured rounded-2xl border-2 border-transparent focus:border-leather-tan outline-none shadow-sm cursor-pointer"
                    >
                       <option>30 dias</option>
                       <option>30 / 60 dias</option>
                       <option>30 / 60 / 90 dias</option>
                       <option>À vista (5% desconto)</option>
                       <option>Condição Especial (Ajustar Manual)</option>
                    </select>
                  </section>

                  <section className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-leather-tan uppercase tracking-widest">
                       <Calculator size={14} /> Resumo Financeiro
                    </div>
                    <div className="leather-light-textured rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4 leather-texture relative overflow-hidden">
                       <div className="absolute inset-0 bg-white/40 pointer-events-none"></div>
                       <div className="flex justify-between items-center text-sm relative z-10">
                          <span className="text-slate-400 font-medium">Subtotal</span>
                          <span className="text-navy-dark font-bold">R$ {totalAmount.toFixed(2)}</span>
                       </div>
                       <div className="flex justify-between items-center text-sm border-t border-slate-50 pt-2">
                          <span className="text-slate-400 font-medium italic">Desconto Previsto (5%)</span>
                          <span className="text-red-500 font-bold">- R$ {discountAmount.toFixed(2)}</span>
                       </div>
                       <div className="flex justify-between items-center text-xl font-black text-navy-dark border-t border-slate-50 pt-4">
                          <span>TOTAL FINAL</span>
                          <span className="text-leather-dark tracking-tighter">R$ {finalTotal.toFixed(2)}</span>
                       </div>
                    </div>
                  </section>
               </div>

               <section className="space-y-4 pb-10">
                  <div className="flex items-center gap-2 text-xs font-bold text-leather-tan uppercase tracking-widest">
                     <FileText size={14} /> Observações do Pedido
                  </div>
                  <textarea 
                     name="observations"
                     value={newOrderData.observations}
                     onChange={handleNewOrderChange}
                     placeholder="Instruções de entrega, detalhes de acabamento, observações do cliente..." 
                     rows={4}
                     className="w-full p-4 bg-white rounded-2xl border-2 border-transparent focus:border-leather-tan outline-none shadow-sm resize-none transition-all"
                  ></textarea>
               </section>
            </div>

            <div className="p-8 bg-[#fdfcf9]/50 backdrop-blur-md border-t-2 border-slate-200 flex gap-4 relative z-10">
               <button className="flex-1 py-4 leather-light-textured text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors border-2 border-slate-200 shadow-sm transition-all">
                  <Printer size={20} /> Preview do Pedido
               </button>
               <button className="flex-1 py-4 bg-navy-dark text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)] hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all border-2 border-white/10 relative overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-2">
                   <CheckCircle2 size={20} /> Finalizar e Gerar Financeiro
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-tr from-leather-tan/0 via-leather-tan/20 to-leather-tan/0 opacity-0 group-hover:opacity-100 transition-opacity" />
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

