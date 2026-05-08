import React, { useState } from 'react';
import { Search, Plus, UserPlus, Phone, Mail, Building2, MapPin, MoreVertical, Edit2, Trash2, Filter, X, Camera } from 'lucide-react';
import { motion } from 'motion/react';
import Logo from '../ui/Logo';

export default function ClientsModule() {
  const [showAdd, setShowAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingClient, setEditingClient] = useState<any>(null);
  const [showError, setShowError] = useState(false);
  
  const [clients, setClients] = useState([
    { id: 1, code: '001', name: 'Calçados Estrela Sul Ltda', cnpj: '01.234.567/0001-89', phone: '(35) 99999-9999', contact: 'João da Silva', city: 'Franca', state: 'SP', interest: 'Sola de Couro', rating: 8, image: null },
    { id: 2, code: '002', name: 'Curtume Cacique EIRELI', cnpj: '98.765.432/0001-21', phone: '(16) 3333-4444', contact: 'Maria Souza', city: 'Itajubá', state: 'MG', interest: 'Vaqueta Nappa', rating: 5, image: null },
  ]);

  const [formData, setFormData] = useState({
    code: '003',
    personType: 'CNPJ',
    name: '',
    cnpj: '',
    phone: '',
    email: '',
    contact: '',
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    cep: '',
    rating: 1,
    image: null as string | null
  });

  const getNextCode = () => {
    const maxCode = Math.max(...clients.map(c => parseInt(c.code) || 0), 0);
    return (maxCode + 1).toString().padStart(3, '0');
  };

  const handleEdit = (client: any) => {
    setEditingClient(client);
    setFormData({
      code: client.code || getNextCode(),
      personType: client.cnpj?.length > 14 ? 'CNPJ' : 'CPF',
      name: client.name || '',
      cnpj: client.cnpj || '',
      phone: client.phone || '',
      email: client.email || '',
      contact: client.contact || '',
      street: client.street || '',
      number: client.number || '',
      neighborhood: client.neighborhood || '',
      city: client.city || '',
      state: client.state || '',
      cep: client.cep || '',
      rating: client.rating || 1,
      image: client.image || null
    });
    setShowAdd(true);
  };

  const handleClose = () => {
    setShowAdd(false);
    setEditingClient(null);
    setShowError(false);
    setFormData({
      code: getNextCode(),
      personType: 'CNPJ',
      name: '',
      cnpj: '',
      phone: '',
      email: '',
      contact: '',
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      cep: '',
      rating: 1,
      image: null
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'cnpj') {
      newValue = formData.personType === 'CPF' ? maskCPF(value) : maskCNPJ(value);
    }

    if (name === 'phone') {
      newValue = maskPhone(value);
    }

    setFormData(prev => ({ ...prev, [name]: newValue }));
  };

  const maskCPF = (v: string) => {
    const n = v.replace(/\D/g, "").substring(0, 11);
    if (n.length <= 3) return n;
    if (n.length <= 6) return n.replace(/(\d{3})(\d+)/, "$1.$2");
    if (n.length <= 9) return n.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
    return n.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, "$1.$2.$3-$4");
  };

  const maskCNPJ = (v: string) => {
    const n = v.replace(/\D/g, "").substring(0, 14);
    if (n.length <= 2) return n;
    if (n.length <= 5) return n.replace(/(\d{2})(\d+)/, "$1.$2");
    if (n.length <= 8) return n.replace(/(\d{2})(\d{3})(\d+)/, "$1.$2.$3");
    if (n.length <= 12) return n.replace(/(\d{2})(\d{3})(\d{3})(\d+)/, "$1.$2.$3/$4");
    return n.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d+)/, "$1.$2.$3/$4-$5");
  };

  const maskPhone = (v: string) => {
    const n = v.replace(/\D/g, "").substring(0, 11);
    if (n.length <= 2) return n.length > 0 ? `(${n}` : n;
    if (n.length <= 6) return n.replace(/(\d{2})(\d+)/, "($1) $2");
    if (n.length <= 10) return n.replace(/(\d{2})(\d{4})(\d+)/, "($1) $2-$3");
    return n.replace(/(\d{2})(\d{5})(\d+)/, "($1) $2-$3");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numbers = formData.cnpj.replace(/\D/g, "");
    const expected = formData.personType === 'CPF' ? 11 : 14;
    
    if (numbers.length < expected) {
      setShowError(true);
      if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
      setTimeout(() => setShowError(false), 2000);
      return;
    }

    if (editingClient) {
      setClients(clients.map(c => c.id === editingClient.id ? { ...formData, id: c.id } as any : c));
    } else {
      setClients([...clients, { ...formData, id: Date.now() } as any]);
    }
    
    handleClose();
  };

  const mockClients = [
    { id: 1, name: 'Calçados Estrela Sul Ltda', cnpj: '01.234.567/0001-89', phone: '(35) 99999-9999', contact: 'João da Silva', city: 'Franca', state: 'SP', interest: 'Sola de Couro' },
    { id: 2, name: 'Curtume Cacique EIRELI', cnpj: '98.765.432/0001-21', phone: '(16) 3333-4444', contact: 'Maria Souza', city: 'Itajubá', state: 'MG', interest: 'Vaqueta Nappa' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-leather-dark/5 p-4 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-leather-dark/10">
        <div className="flex items-center gap-2 flex-1 max-w-2xl">
           <div className="relative flex-1">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
             <input 
               type="text" 
               placeholder="Buscar parceiro..."
               className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-slate-200 focus:border-leather-tan outline-none transition-all shadow-sm font-medium text-leather-dark"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
           </div>
           <button className="p-3 bg-white rounded-xl text-slate-400 hover:text-leather-tan transition-all shadow-sm border border-slate-100 group">
             <Filter size={18} />
           </button>
        </div>
        
        <button 
          onClick={() => {
            setFormData({ ...formData, code: getNextCode() });
            setShowAdd(true);
          }}
          className="btn-leather !px-8 !py-3 shadow-lg !bg-leather-dark hover:!bg-leather-tan group"
        >
          <UserPlus size={18} className="group-hover:scale-110 transition-transform" /> 
          <span className="font-bold">Novo Cliente</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {clients.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())).map((client) => (
          <div key={client.id} className="p-8 leather-light-textured rounded-[40px] flex flex-col md:flex-row items-center justify-between border-2 border-transparent hover:border-leather-tan/20 transition-all cursor-pointer group shadow-lg hover:shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Building2 size={120} className="-mr-10 -mt-10" />
             </div>

             <div className="flex items-center gap-8 relative z-10">
                <div className="w-20 h-20 bg-white rounded-[30px] flex items-center justify-center text-leather-dark shadow-inner border border-slate-100 overflow-hidden">
                   {client.image ? (
                     <img src={client.image} alt="" className="w-full h-full object-cover" />
                   ) : (
                     <Building2 size={32} strokeWidth={1.5} />
                   )}
                </div>
                <div>
                   <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-black bg-navy-dark text-white px-2 py-0.5 rounded-lg uppercase tracking-tighter">#{client.code}</span>
                      <h4 className="font-black text-navy-dark text-xl leading-tight tracking-tight">{client.name}</h4>
                   </div>
                   <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 font-bold uppercase tracking-widest">
                      <span className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full"><Mail size={12} className="text-leather-tan" /> {client.cnpj}</span>
                      <span className="flex items-center gap-2"><MapPin size={12} className="text-leather-tan" /> {client.city} • {client.state}</span>
                      <div className="flex items-center gap-1.5 bg-orange-50 px-3 py-1 rounded-full text-orange-600">
                        <span className="text-[10px]">RATING</span>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className={`w-2 h-2 rounded-full ${i < Math.round((client.rating || 0) / 2) ? 'bg-orange-500 shadow-[0_0_5px_rgba(249,115,22,0.5)]' : 'bg-orange-200'}`} />
                          ))}
                        </div>
                      </div>
                   </div>
                </div>
             </div>
             
             <div className="flex items-center gap-4 mt-8 md:mt-0 relative z-10">
                <div className="flex gap-2">
                   <button 
                     onClick={(e) => { e.stopPropagation(); handleEdit(client); }}
                     className="w-12 h-12 rounded-2xl bg-white text-slate-400 hover:text-navy-dark hover:shadow-lg flex items-center justify-center transition-all border border-slate-100"
                   >
                      <Edit2 size={20} />
                   </button>
                   <button className="w-12 h-12 rounded-2xl bg-white text-slate-400 hover:text-red-500 hover:shadow-lg flex items-center justify-center transition-all border border-slate-100">
                      <Trash2 size={20} />
                   </button>
                </div>
             </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-navy-dark/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="leather-light-textured w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden border-2 border-white/50 relative"
          >
            <div className="bg-leather-dark p-3 md:p-4 border-b border-leather-tan/20 flex justify-between items-center text-white relative overflow-hidden shadow-xl">
               <div className="absolute inset-0 bg-leather-texture opacity-10 pointer-events-none"></div>
               <div className="flex items-center gap-3 relative z-10">
                  <div className="">
                    <h3 className="text-base md:text-lg font-black tracking-tight flex items-center gap-2">
                      {editingClient ? <Edit2 size={18} className="text-leather-tan" /> : <UserPlus size={18} className="text-leather-tan" />}
                      {editingClient ? 'Atualizar Perfil' : 'Cadastro de Cliente'}
                    </h3>
                    <p className="text-[8px] font-bold uppercase text-white/40 tracking-widest mt-0.5">Gestão de Parceiros</p>
                  </div>
               </div>
               
               <div className="flex items-center gap-2 relative z-10">
                  <div className="flex items-center gap-2 mr-1">
                     <button 
                       type="button" 
                       onClick={handleClose}
                       className="px-3 md:px-4 py-1.5 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-full font-bold text-[8px] md:text-[9px] uppercase tracking-wider transition-all border border-white/5"
                     >
                       Descartar
                     </button>
                     <button 
                       form="client-form"
                       type="submit" 
                       className="px-4 md:px-5 py-1.5 bg-leather-tan hover:bg-white text-white hover:text-leather-dark rounded-full font-black text-[8px] md:text-[9px] uppercase tracking-widest shadow-lg transition-all"
                     >
                       {editingClient ? 'Salvar' : 'Finalizar'}
                     </button>
                  </div>
                  <div className="w-px h-4 bg-white/10 mx-1"></div>
                  <button onClick={handleClose} className="hover:bg-red-500/20 p-2 rounded-xl transition-all">
                    <X size={18} className="text-white" />
                  </button>
               </div>
            </div>
                <form id="client-form" onSubmit={handleSubmit} className="p-2 space-y-2 relative max-h-[88vh] overflow-y-auto custom-scrollbar bg-slate-50/50">
                 {/* System Metadata Tag - Read Only */}
                 <div className="flex justify-between items-center px-1">
                    <div className="flex items-center gap-2 px-1.5 py-0.5 bg-white border border-slate-200 rounded-lg shadow-sm">
                       <span className="text-[6px] font-black text-slate-400 uppercase tracking-widest">Sys-Ref</span>
                       <code className="text-[8px] font-mono font-bold text-leather-tan">{formData.code}</code>
                    </div>
                    <div className="text-[6px] font-bold text-slate-400 uppercase tracking-widest italic opacity-60">Processamento Seguro</div>
                 </div>

                 {/* 1. Primary Fields */}
                 <div className="bg-white p-2 md:p-3 rounded-[16px] border border-slate-200/60 shadow-sm space-y-2">
                    {/* Row 1: Logo | Razão Social | WhatsApp */}
                    <div className="flex flex-col md:flex-row gap-2 items-start">
                       {/* Logo Upload */}
                       <div className="w-12 md:w-14 shrink-0">
                          <div className="relative group aspect-square">
                             <div className="w-full h-full rounded-[10px] bg-slate-50/50 border border-slate-100 flex flex-col items-center justify-center text-slate-300 group-hover:border-leather-tan/30 transition-all cursor-pointer overflow-hidden relative">
                                {formData.image ? (
                                  <img src={formData.image} alt="Client" className="w-full h-full object-cover" />
                                ) : (
                                  <div className="flex flex-col items-center">
                                    <Camera className="w-4 h-4 mb-0.5 group-hover:scale-110 transition-transform text-slate-200" />
                                    <span className="text-[5px] font-bold text-slate-400 uppercase text-center px-1">Logo</span>
                                  </div>
                                )}
                             </div>
                             <input 
                               type="file" 
                               className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                               onChange={(e) => {
                                 const file = e.target.files?.[0];
                                 if (file) {
                                   const reader = new FileReader();
                                   reader.onloadend = () => setFormData({ ...formData, image: reader.result as string });
                                   reader.readAsDataURL(file);
                                 }
                               }}
                             />
                          </div>
                       </div>

                       <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-12 gap-2">
                           {/* Primary Field: Name */}
                           <div className="md:col-span-12 relative">
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
                                 Razão Social ou Nome Completo
                              </label>
                           </div>
                       </div>
                    </div>

                    {/* Row 2: Documento | WhatsApp/Telefone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {/* Integrated Document Field */}
                        <div className="relative flex items-center bg-white border border-slate-200 focus-within:border-leather-tan transition-all rounded-lg overflow-hidden group shadow-sm">
                           <div className="absolute left-2.5 top-0.5 text-[8px] font-bold text-slate-400 group-focus-within:text-leather-tan transition-colors">Nº do Documento Nacional</div>
                           <div className="flex w-full items-end">
                              <select 
                                 value={formData.personType}
                                 onChange={(e) => setFormData({ ...formData, personType: e.target.value as any, cnpj: '' })}
                                 className="bg-transparent pl-2 pr-1 py-1.5 mt-1 text-[8px] font-black text-leather-tan outline-none border-r border-slate-100/50 cursor-pointer w-12 shrink-0"
                              >
                                 <option>CNPJ</option>
                                 <option>CPF</option>
                              </select>
                              <input 
                                 id="cnpj"
                                 name="cnpj"
                                 type="text"
                                 required
                                 value={formData.cnpj}
                                 onChange={handleChange}
                                 className={`flex-1 p-2 pt-4 bg-transparent outline-none font-bold text-sm text-leather-dark min-w-0 ${showError ? 'text-red-500' : ''}`}
                                 placeholder={formData.personType === 'CPF' ? '000.000.000-00' : '00.000.000/0000-00'}
                              />
                           </div>
                        </div>

                        <div className="relative">
                           <input 
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder=" "
                              className="peer w-full p-2 pt-4 bg-white border border-slate-200 focus:border-leather-tan outline-none font-bold text-sm text-leather-dark shadow-sm transition-all placeholder-transparent rounded-lg"
                           />
                           <label htmlFor="phone" className="absolute left-2.5 top-1 text-[8px] font-bold text-slate-400 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-2.5 peer-focus:top-1 peer-focus:text-[8px]">WhatsApp / Telefone</label>
                        </div>
                    </div>
                 </div>

                 {/* 2. Secondary Sections */}
                 <div className="space-y-2 px-1">
                    {/* Row 3: Rua | Número | Bairro | CEP */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                       <div className="md:col-span-12 grid grid-cols-12 gap-2">
                          <div className="col-span-8 relative">
                             <input 
                                id="street"
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                                placeholder=" "
                                className="peer w-full p-1.5 pt-3.5 bg-white/60 border border-slate-200 focus:border-leather-tan outline-none font-bold text-[10px] text-leather-dark rounded-lg transition-all shadow-sm"
                             />
                             <label htmlFor="street" className="absolute left-2 top-0.5 text-[7px] font-bold text-slate-400 transition-all peer-placeholder-shown:text-[9px] peer-placeholder-shown:top-2 peer-focus:top-0.5 peer-focus:text-[7px]">Rua / Avenida</label>
                          </div>
                          <div className="col-span-4 relative">
                             <input 
                                id="number"
                                name="number"
                                value={formData.number}
                                onChange={handleChange}
                                placeholder=" "
                                className="peer w-full p-1.5 pt-3.5 bg-white/60 border border-slate-200 focus:border-leather-tan outline-none font-bold text-[10px] text-leather-dark rounded-lg transition-all shadow-sm"
                             />
                             <label htmlFor="number" className="absolute left-2 top-0.5 text-[7px] font-bold text-slate-400 transition-all peer-placeholder-shown:text-[9px] peer-placeholder-shown:top-2 peer-focus:top-0.5 peer-focus:text-[7px]">Nº / Comp.</label>
                          </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                       <div className="md:col-span-7 relative">
                          <input 
                             id="neighborhood"
                             name="neighborhood"
                             value={formData.neighborhood}
                             onChange={handleChange}
                             placeholder=" "
                             className="peer w-full p-1.5 pt-3.5 bg-white/60 border border-slate-200 focus:border-leather-tan outline-none font-bold text-[10px] text-leather-dark rounded-lg transition-all shadow-sm"
                          />
                          <label htmlFor="neighborhood" className="absolute left-2 top-0.5 text-[7px] font-bold text-slate-400 transition-all peer-placeholder-shown:text-[9px] peer-placeholder-shown:top-2 peer-focus:top-0.5 peer-focus:text-[7px]">Bairro</label>
                       </div>
                       <div className="md:col-span-5 relative">
                           <input 
                              id="cep"
                              name="cep"
                              value={formData.cep || ''}
                              onChange={handleChange}
                              placeholder=" "
                              className="peer w-full p-1.5 pt-3.5 bg-white/60 border border-slate-200 focus:border-leather-tan outline-none font-bold text-[10px] text-leather-dark rounded-lg transition-all shadow-sm"
                           />
                           <label htmlFor="cep" className="absolute left-2 top-0.5 text-[7px] font-bold text-slate-400 transition-all peer-placeholder-shown:text-[9px] peer-placeholder-shown:top-2 peer-focus:top-0.5 peer-focus:text-[7px]">CEP</label>
                       </div>
                    </div>

                    {/* Row 4: Cidade | UF | E-mail */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                       <div className="md:col-span-5 relative">
                          <input 
                             id="city"
                             name="city"
                             value={formData.city}
                             onChange={handleChange}
                             placeholder=" "
                             className="peer w-full p-1.5 pt-3.5 bg-white/60 border border-slate-200 focus:border-leather-tan outline-none font-bold text-[10px] text-leather-dark rounded-lg transition-all shadow-sm"
                          />
                          <label htmlFor="city" className="absolute left-2 top-0.5 text-[7px] font-bold text-slate-400 transition-all peer-placeholder-shown:text-[9px] peer-placeholder-shown:top-2 peer-focus:top-0.5 peer-focus:text-[7px]">Cidade</label>
                       </div>
                       <div className="md:col-span-2 relative">
                          <select 
                             id="state"
                             name="state"
                             value={formData.state}
                             onChange={handleChange}
                             className="peer w-full p-1.5 pt-3.5 bg-white/60 border border-slate-200 focus:border-leather-tan outline-none font-black text-[10px] text-leather-dark transition-all appearance-none rounded-lg cursor-pointer shadow-sm"
                          >
                             <option value="">UF</option>
                             {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(uf => (
                                <option key={uf} value={uf}>{uf.toUpperCase()}</option>
                             ))}
                          </select>
                          <label className="absolute left-2 top-0.5 text-[7px] font-bold text-slate-400 transition-all peer-focus:text-leather-tan">UF</label>
                       </div>
                       <div className="md:col-span-5 relative">
                          <input 
                             id="email"
                             name="email"
                             type="email"
                             value={formData.email}
                             onChange={handleChange}
                             placeholder=" "
                             className="peer w-full p-1.5 pt-3.5 bg-white border border-slate-200 focus:border-leather-tan outline-none font-bold text-[10px] text-leather-dark rounded-lg transition-all shadow-sm"
                          />
                          <label htmlFor="email" className="absolute left-2 top-0.5 text-[7px] font-bold text-slate-400 transition-all peer-placeholder-shown:text-[9px] peer-placeholder-shown:top-2 peer-focus:top-0.5 peer-focus:text-[7px]">E-mail</label>
                       </div>
                    </div>

                    {/* Row 5: Nome do Responsável */}
                    <div className="relative">
                       <input 
                          id="contact"
                          name="contact"
                          value={formData.contact}
                          onChange={handleChange}
                          placeholder=" "
                          className="peer w-full p-1.5 pt-3.5 bg-white border border-slate-200 focus:border-leather-tan outline-none font-bold text-[10px] text-leather-dark rounded-lg shadow-sm transition-all"
                       />
                       <label htmlFor="contact" className="absolute left-2 top-0.5 text-[7px] font-bold text-slate-400 transition-all peer-placeholder-shown:text-[9px] peer-placeholder-shown:top-2 peer-focus:top-0.5 peer-focus:text-[7px]">Responsável</label>
                    </div>
                 </div>

                 {/* Qualificação Técnica - Leather Sample Scale */}
                 <div className="pt-0.5 px-1">
                    <div className="p-2 bg-slate-50/50 rounded-2xl border border-slate-200/40 space-y-2 flex flex-col items-center">
                       <label className="text-[7px] font-black text-slate-400 uppercase tracking-[0.2em]">Qualificação Técnica</label>
                       
                       {/* Principal Rating Display - Debossed Style */}
                       <div className="flex items-center gap-4">
                          <div className="relative px-3 py-1 bg-leather-dark/5 rounded-xl shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] border border-white/60">
                             <div className="text-2xl font-black text-leather-dark tracking-tighter select-none flex items-baseline gap-0.5" style={{ 
                                textShadow: '0.5px 0.5px 0.5px rgba(255,255,255,0.8), -0.2px -0.2px 0.5px rgba(0,0,0,0.2)' 
                             }}>
                                {formData.rating === 10 ? '10' : formData.rating}
                                <span className="text-[10px] opacity-30 font-bold">,0</span>
                             </div>
                          </div>
                          
                          {/* Interpretive Text */}
                          <p className="text-[9px] font-bold text-leather-tan uppercase tracking-tight">
                             {formData.rating >= 9 ? 'Excelência Artesanal' : 
                              formData.rating >= 7 ? 'Técnico Avançado' :
                              formData.rating >= 5 ? 'Padrão Qualidade' :
                              formData.rating >= 3 ? 'Operacional' : 'Potencial'}
                          </p>
                       </div>

                       {/* Leather Samples Scale */}
                       <div className="flex items-end justify-center gap-2 w-full py-1">
                          {[
                            { color: '#F5E6D3', threshold: 2 }, // Lightest
                            { color: '#DCC4AA', threshold: 4 },
                            { color: '#A67C52', threshold: 6 },
                            { color: '#6F4E37', threshold: 8 },
                            { color: '#3D2B1F', threshold: 10 } // Darkest
                          ].map((sample, i) => {
                            const isActive = (formData.rating > (i * 2)) && (formData.rating <= (i * 2 + 2));
                            
                             return (
                               <motion.button
                                 key={i}
                                 type="button"
                                 onClick={() => setFormData({ ...formData, rating: (i * 2 + 2) })}
                                 whileHover={{ y: -2 }}
                                 whileTap={{ y: 0.5, scale: 0.98 }}
                                 animate={{ 
                                   y: isActive ? 0.5 : 0,
                                   opacity: isActive ? 1 : 0.4
                                 }}
                                 transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                 className="relative flex flex-col items-center group outline-none"
                               >
                                  {/* Leather Tag SVG */}
                                  <svg 
                                    viewBox="0 0 100 125" 
                                    className={`w-5 h-7 transition-all duration-300 ${
                                      isActive ? 'drop-shadow-none filter brightness-95' : 'drop-shadow-md'
                                    }`}
                                  >
                                     <path 
                                       d="M 50 5 L 85 18 C 92 40 82 55 82 85 C 82 100 92 110 100 120 L 0 120 C 8 110 18 100 18 85 C 18 55 8 40 15 18 L 50 5 Z" 
                                       fill={sample.color}
                                       fillOpacity="1"
                                     />
                                     <circle cx="50" cy="18" r="4" fill="white" fillOpacity="0.2" />
                                     {isActive && (
                                       <path 
                                         d="M 50 5 L 85 18 C 92 40 82 55 82 85 C 82 100 92 110 100 120 L 0 120 C 8 110 18 100 18 85 C 18 55 8 40 15 18 L 50 5 Z" 
                                         fill="rgba(0,0,0,0.05)" 
                                       />
                                     )}
                                     {isActive && (
                                       <path 
                                         d="M 50 5 L 85 18 C 92 40 82 55 82 85 C 82 100 92 110 100 120 L 0 120 C 8 110 18 100 18 85 C 18 55 8 40 15 18 L 50 5 Z" 
                                         fill="none" 
                                         stroke="black" 
                                         strokeWidth="1"
                                         strokeOpacity="0.1"
                                       />
                                     )}
                                  </svg>
                                  <div className={`mt-1 w-0.5 h-0.5 rounded-full bg-leather-tan transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                               </motion.button>
                            );
                          })}
                       </div>
                    </div>
                 </div>
              </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
