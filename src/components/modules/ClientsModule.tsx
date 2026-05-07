import React, { useState } from 'react';
import { Search, Plus, UserPlus, Phone, Mail, Building2, MapPin, MoreVertical, Edit2, Trash2, Filter, X } from 'lucide-react';
import { motion } from 'framer-motion';
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
    fantasyName: '',
    cnpj: '',
    ie: '',
    phone: '',
    email: '',
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    gender: 'Masculino',
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
      fantasyName: client.fantasyName || '',
      cnpj: client.cnpj || '',
      ie: client.ie || '',
      phone: client.phone || '',
      email: client.email || '',
      street: client.street || '',
      number: client.number || '',
      neighborhood: client.neighborhood || '',
      city: client.city || '',
      state: client.state || '',
      gender: client.gender || 'Masculino',
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
      fantasyName: '',
      cnpj: '',
      ie: '',
      phone: '',
      email: '',
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      gender: 'Masculino',
      rating: 1,
      image: null
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'cnpj') {
      const numbers = value.replace(/\D/g, "");
      if (formData.personType === 'CPF') {
        newValue = maskCPF(value);
      } else {
        newValue = maskCNPJ(value);
      }
    }

    setFormData(prev => ({ ...prev, [name]: newValue }));
  };

  const maskCPF = (v: string) => {
    v = v.replace(/\D/g, "");
    if (v.length > 11) v = v.substring(0, 11);
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return v;
  };

  const maskCNPJ = (v: string) => {
    v = v.replace(/\D/g, "");
    if (v.length > 14) v = v.substring(0, 14);
    v = v.replace(/^(\d{2})(\d)/, "$1.$2");
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
    v = v.replace(/(\d{4})(\d)/, "$1-$2");
    return v;
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
      <div className="bg-navy-dark/5 p-6 rounded-[40px] flex flex-col md:flex-row md:items-center justify-between gap-6 border border-navy-dark/10">
        <div className="flex items-center gap-4 flex-1 max-w-2xl">
           <div className="relative flex-1">
             <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
             <input 
               type="text" 
               placeholder="Buscar parceiro por nome, documento ou cidade..."
               className="w-full pl-14 pr-6 py-4 bg-white rounded-[24px] border-2 border-transparent focus:border-leather-tan outline-none transition-all shadow-xl font-medium text-navy-dark"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
           </div>
           <button className="p-4 bg-white rounded-2xl text-slate-400 hover:text-leather-tan transition-all shadow-lg border border-slate-100 group">
             <Filter size={20} className="group-hover:rotate-180 transition-transform duration-500" />
           </button>
        </div>
        
        <button 
          onClick={() => {
            setFormData({ ...formData, code: getNextCode() });
            setShowAdd(true);
          }}
          className="btn-leather !px-10 !py-4 shadow-2xl !bg-navy-dark hover:!bg-leather-tan group"
        >
          <UserPlus size={20} className="group-hover:scale-110 transition-transform" /> 
          <span className="font-bold">Efetivar Novo Cliente</span>
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
                <div className="text-right mr-8 hidden lg:block border-r border-slate-200 pr-8">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Interesse</p>
                   <p className="text-base font-black text-navy-dark italic">{client.interest}</p>
                </div>
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
            <div className="bg-navy-dark p-8 border-b-2 border-leather-tan/30 flex justify-between items-center text-white relative overflow-hidden shadow-2xl">
               <div className="absolute inset-0 bg-leather-texture opacity-20 pointer-events-none"></div>
               <div className="flex items-center gap-6 relative z-10">
                  <div className="bg-white/5 p-3 rounded-2xl backdrop-blur-xl border border-white/10">
                    <Logo variant="compact" className="scale-125" />
                  </div>
                  <div className="h-12 w-px bg-white/10 hidden sm:block"></div>
                  <div className="hidden sm:block">
                    <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
                      {editingClient ? <Edit2 className="text-leather-tan" /> : <UserPlus className="text-leather-tan" />}
                      {editingClient ? 'Atualizar Perfil' : 'Cadastro de Cliente'}
                    </h3>
                    <p className="text-[10px] font-black uppercase text-white/40 tracking-[0.3em] mt-1">Gestão Comercial Estratégica</p>
                  </div>
               </div>
               <button onClick={handleClose} className="bg-white/5 hover:bg-red-500/20 p-3 rounded-2xl transition-all relative z-10 border border-white/5 group">
                 <X size={24} className="text-white group-hover:scale-110 transition-transform" />
               </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-10 space-y-8 relative max-h-[85vh] overflow-y-auto custom-scrollbar">
                 {/* Premium Header / Image Upload section */}
                 <div className="flex flex-col md:flex-row gap-10 items-start">
                    <div className="relative group mx-auto md:mx-0">
                       <div className="w-48 h-48 rounded-[48px] bg-white border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300 group-hover:border-leather-tan group-hover:text-leather-tan transition-all cursor-pointer overflow-hidden shadow-inner relative">
                          {formData.image ? (
                            <img src={formData.image} alt="Client" className="w-full h-full object-cover" />
                          ) : (
                            <div className="flex flex-col items-center">
                              <Camera className="w-12 h-12 mb-3 group-hover:scale-110 transition-transform duration-500" />
                              <span className="text-[10px] font-black uppercase tracking-[0.2em] px-6 text-center leading-relaxed">Logo ou Foto do Parceiro</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
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
                       <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-navy-dark text-white px-5 py-2 rounded-2xl shadow-xl text-[10px] font-black uppercase tracking-widest border border-white/10 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                          {formData.image ? 'Alterar' : 'Carregar'}
                       </div>
                    </div>

                    <div className="flex-1 w-full space-y-8">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                             <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] pl-1">Identificação Interna</label>
                             <div className="p-5 leather-light-textured rounded-3xl border-2 border-slate-100 flex items-baseline justify-between shadow-inner">
                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Código</span>
                                <span className="font-serif text-3xl italic text-leather-tan tracking-tighter">#{formData.code}</span>
                             </div>
                          </div>
                          <div className="space-y-3">
                             <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] pl-1">Personalidade Jurídica</label>
                             <div className="flex p-1.5 bg-slate-100 rounded-[28px] border border-slate-200">
                                {['CNPJ', 'CPF'].map((t) => (
                                  <button
                                    key={t}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, personType: t as any, cnpj: '' })}
                                    className={`flex-1 py-4 rounded-[22px] text-xs font-black tracking-widest transition-all ${formData.personType === t ? 'bg-white text-navy-dark shadow-xl scale-[1.02]' : 'text-slate-400 hover:text-slate-600'}`}
                                  >
                                    {t}
                                  </button>
                                ))}
                             </div>
                          </div>
                       </div>
                       
                       <div className="space-y-3">
                          <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] pl-1">Nome de Exibição / Empresa</label>
                          <div className="relative group">
                            <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-leather-tan transition-colors" size={22} />
                            <input 
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              placeholder="Digite a razão social ou nome..."
                              className="w-full p-6 pl-16 leather-light-textured border-2 border-slate-200 rounded-[32px] outline-none focus:border-navy-dark font-black text-navy-dark transition-all text-lg placeholder:text-slate-300"
                            />
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-2 space-y-3">
                       <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] pl-1">
                          Documento Oficial ({formData.personType})
                       </label>
                       <input 
                         name="cnpj"
                         value={formData.cnpj}
                         onChange={handleChange}
                         required
                         placeholder={formData.personType === 'CPF' ? '000.000.000-00' : '00.000.000/0000-00'}
                         className={`w-full p-6 leather-light-textured border-2 rounded-[32px] outline-none font-black text-navy-dark transition-all text-xl ${showError ? 'border-red-500 animate-shake bg-red-50/30' : 'border-slate-200 focus:border-navy-dark'}`}
                       />
                       {showError && (
                         <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-[10px] font-black text-red-500 uppercase tracking-[0.2em] px-2 italic">
                            <X size={12} strokeWidth={3} /> {formData.personType} INCORRETO OU INCOMPLETO
                         </motion.div>
                       )}
                    </div>
                    
                    <div className="space-y-3 lg:col-span-2">
                       <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] pl-1">E-mail Corporativo</label>
                       <div className="relative group">
                          <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-leather-tan transition-colors" size={22} />
                          <input 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="faturamento@parceiro.com.br"
                            className="w-full p-6 pl-16 leather-light-textured border-2 border-slate-200 rounded-[32px] outline-none focus:border-navy-dark font-black text-navy-dark transition-all"
                          />
                       </div>
                    </div>

                    <div className="space-y-3">
                       <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] pl-1">Telefone Principal</label>
                       <div className="relative group">
                          <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                          <input 
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(00) 00000-0000"
                            className="w-full p-6 pl-16 leather-light-textured border-2 border-slate-200 rounded-[32px] outline-none focus:border-navy-dark font-black text-navy-dark transition-all"
                          />
                       </div>
                    </div>
                    
                    <div className="space-y-3">
                       <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] pl-1">Pessoa de Contato</label>
                       <input 
                         name="contact"
                         value={formData.contact}
                         onChange={handleChange}
                         placeholder="Nome do Responsável"
                         className="w-full p-6 leather-light-textured border-2 border-slate-200 rounded-[32px] outline-none focus:border-navy-dark font-black text-navy-dark transition-all"
                       />
                    </div>

                    <div className="space-y-3">
                       <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] pl-1">Gênero</label>
                       <select 
                         name="gender"
                         value={formData.gender}
                         onChange={handleChange}
                         className="w-full p-6 leather-light-textured border-2 border-slate-200 rounded-[32px] outline-none focus:border-navy-dark font-black text-navy-dark appearance-none cursor-pointer"
                       >
                         <option>Masculino</option>
                         <option>Feminino</option>
                         <option>Prefiro não dizer</option>
                       </select>
                    </div>

                    <div className="space-y-3 font-bold">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] pl-1">Interesse</label>
                      <select 
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full p-6 leather-light-textured border-2 border-slate-200 rounded-[32px] outline-none focus:border-navy-dark font-black text-navy-dark appearance-none cursor-pointer shadow-sm"
                      >
                        <option>Sola de Couro</option>
                        <option>Vira para Calçado</option>
                        <option>Couro Acabado</option>
                      </select>
                    </div>
                 </div>

                 {/* Address Group */}
                 <div className="p-10 bg-slate-50/50 rounded-[48px] border border-slate-200 shadow-inner space-y-8">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-leather-tan/10 text-leather-tan rounded-2xl flex items-center justify-center">
                          <MapPin size={20} />
                       </div>
                       <div>
                          <h4 className="text-sm font-black text-navy-dark uppercase tracking-widest">Endereço de Logística</h4>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Destino de Entrega e Faturamento</p>
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                       <div className="md:col-span-4 space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Rua / Avenida / Praça</label>
                          <input 
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            className="w-full p-5 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-leather-tan font-bold text-navy-dark"
                          />
                       </div>
                       <div className="md:col-span-2 space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Nº</label>
                          <input 
                            name="number"
                            value={formData.number}
                            onChange={handleChange}
                            className="w-full p-5 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-leather-tan font-bold text-navy-dark"
                          />
                       </div>
                       <div className="md:col-span-2 space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Bairro</label>
                          <input 
                            name="neighborhood"
                            value={formData.neighborhood}
                            onChange={handleChange}
                            className="w-full p-5 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-leather-tan font-bold text-navy-dark"
                          />
                       </div>
                       <div className="md:col-span-3 space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Cidade</label>
                          <input 
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full p-5 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-leather-tan font-bold text-navy-dark"
                          />
                       </div>
                       <div className="md:col-span-1 space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">UF</label>
                          <input 
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            maxLength={2}
                            placeholder="MG"
                            className="w-full p-5 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-leather-tan font-black text-navy-dark text-center uppercase"
                          />
                       </div>
                    </div>
                 </div>

                 {/* Premium Rating & Footer Actions */}
                 <div className="flex flex-col xl:flex-row items-center justify-between gap-12 pt-6">
                    <div className="w-full xl:w-2/3 space-y-4">
                       <div className="flex justify-between items-end px-2">
                          <div>
                             <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Qualificação Estratégica</label>
                             <p className="text-[10px] font-bold text-leather-tan/60 uppercase tracking-widest mt-1">Rating Evolutivo (Baseado em Performance Operacional)</p>
                          </div>
                          <div className="text-4xl font-black text-navy-dark italic leading-none">{formData.rating}<span className="text-leather-tan/30 text-xl font-normal ml-1">/10</span></div>
                       </div>
                       
                       <div className="flex items-center gap-3 bg-navy-dark p-8 rounded-[48px] shadow-2xl border-4 border-white/5 relative overflow-hidden group">
                          <div className="absolute inset-0 bg-leather-texture opacity-20" />
                          <div className="flex gap-2 flex-1 relative z-10">
                             {[...Array(10)].map((_, i) => (
                               <button
                                 key={i}
                                 type="button"
                                 onClick={() => setFormData({ ...formData, rating: i + 1 })}
                                 className={`h-12 flex-1 rounded-[14px] transition-all duration-500 transform ${i < formData.rating ? 'bg-gradient-to-t from-orange-600 via-leather-tan to-orange-200 shadow-[0_0_25px_rgba(193,154,107,0.7)] scale-105' : 'bg-white/10 hover:bg-white/20'}`}
                               />
                             ))}
                          </div>
                       </div>
                    </div>

                    <div className="flex gap-4 w-full xl:w-fit">
                       <button 
                         type="button" 
                         onClick={handleClose}
                         className="flex-1 xl:flex-none px-12 py-6 bg-slate-100 text-slate-500 rounded-[30px] font-black text-xs uppercase tracking-[0.3em] hover:bg-slate-200 transition-all border border-slate-200"
                       >
                         Descartar
                       </button>
                       <button 
                         type="submit" 
                         className="flex-1 xl:flex-none px-16 py-6 bg-navy-dark text-white rounded-[30px] font-black text-xs uppercase tracking-[0.3em] btn-skeuo"
                       >
                         {editingClient ? 'Salvar Edição' : 'Efetivar Parceiro'}
                       </button>
                    </div>
                 </div>
              </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
