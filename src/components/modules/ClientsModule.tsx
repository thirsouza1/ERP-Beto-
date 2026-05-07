import React, { useState } from 'react';
import { Search, Plus, UserPlus, Phone, Mail, Building2, MapPin, MoreVertical, Edit2, Trash2, Filter, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from '../ui/Logo';

export default function ClientsModule() {
  const [showAdd, setShowAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingClient, setEditingClient] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    fantasyName: '',
    cnpj: '',
    ie: '',
    phone: '',
    email: '',
    address: ''
  });

  const handleEdit = (client: any) => {
    setEditingClient(client);
    setFormData({
      name: client.name || '',
      fantasyName: client.fantasyName || '',
      cnpj: client.cnpj || '',
      ie: client.ie || '',
      phone: client.phone || '',
      email: client.email || '',
      address: `${client.city || ''} - ${client.state || ''}`
    });
    setShowAdd(true);
  };

  const handleClose = () => {
    setShowAdd(false);
    setEditingClient(null);
    setFormData({
      name: '',
      fantasyName: '',
      cnpj: '',
      ie: '',
      phone: '',
      email: '',
      address: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const mockClients = [
    { id: 1, name: 'Calçados Estrela Sul Ltda', cnpj: '01.234.567/0001-89', phone: '(35) 99999-9999', contact: 'João da Silva', city: 'Franca', state: 'SP', interest: 'Sola de Couro' },
    { id: 2, name: 'Curtume Cacique EIRELI', cnpj: '98.765.432/0001-21', phone: '(16) 3333-4444', contact: 'Maria Souza', city: 'Itajubá', state: 'MG', interest: 'Vaqueta Nappa' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Pesquisar por nome, CNPJ ou cidade..."
            className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-leather-tan/20 transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm">
            <Filter size={18} /> Filtros
          </button>
          <button 
            onClick={() => setShowAdd(true)}
            className="btn-leather !px-6"
          >
            <Plus size={18} /> Novo Cliente
          </button>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-md rounded-3xl border-2 border-slate-200/50 shadow-xl overflow-hidden leather-texture relative">
        <div className="absolute inset-0 bg-white/60 pointer-events-none" />
        <table className="w-full text-left border-collapse relative z-10">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Razão Social / CNPJ</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Contato</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Localização</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Interesse</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockClients.map((client) => (
              <tr key={client.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-leather-light rounded-xl flex items-center justify-center text-leather-dark">
                      <Building2 size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-navy-dark">{client.name}</p>
                      <p className="text-xs text-slate-500 font-mono italic">{client.cnpj}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className="space-y-1">
                    <p className="text-sm font-medium flex items-center gap-2 text-slate-600">
                      <Phone size={14} className="text-leather-tan" /> {client.phone}
                    </p>
                    <p className="text-sm font-medium flex items-center gap-2 text-slate-600">
                      <UserPlus size={14} className="text-leather-tan" /> {client.contact}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <p className="text-sm text-slate-600 flex items-center gap-2">
                    <MapPin size={14} className="text-leather-tan" /> {client.city} - {client.state}
                  </p>
                </td>
                <td className="px-6 py-6">
                  <span className="px-3 py-1 bg-leather-tan/10 text-leather-dark text-[10px] font-bold uppercase tracking-wider rounded-full">
                    {client.interest}
                  </span>
                </td>
                <td className="px-6 py-6 text-right">
                   <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleEdit(client)}
                        className="p-2 hover:bg-leather-light rounded-lg transition-colors text-slate-400 hover:text-leather-dark"
                      >
                         <Edit2 size={18} />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-colors text-slate-400 hover:text-red-500">
                         <Trash2 size={18} />
                      </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-navy-dark/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#fdfaf6] w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden border-2 border-white/50 leather-texture relative"
          >
            <div className="absolute inset-0 bg-[#fdfaf6]/40 pointer-events-none" />
            <div className="bg-navy-dark p-6 flex justify-between items-center text-white relative overflow-hidden">
               <div className="absolute inset-0 bg-navy-dark/20 mix-blend-overlay"></div>
               <div className="flex items-center gap-4 relative z-10">
                  <Logo variant="compact" className="scale-125 origin-left" />
                  <div className="h-8 w-px bg-white/20"></div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    {editingClient ? <><Edit2 /> Editar Cliente</> : <><UserPlus /> Cadastro</>}
                  </h3>
               </div>
               <button onClick={handleClose} className="hover:bg-white/10 p-2 rounded-lg transition-colors relative z-10">
                 <X size={20} />
               </button>
            </div>
            
            <form className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto">
               <div className="space-y-4 md:col-span-2 border-b border-slate-100 pb-4">
                  <h4 className="text-xs font-bold text-leather-tan uppercase tracking-widest">Informações Empresariais</h4>
               </div>
               
               <div className="space-y-2">
                 <label className="text-sm font-semibold text-slate-700">Razão Social</label>
                 <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:border-leather-tan outline-none" 
                />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-semibold text-slate-700">Nome Fantasia</label>
                 <input 
                   type="text"
                   name="fantasyName"
                   value={formData.fantasyName}
                   onChange={handleChange} 
                   className="w-full p-3 rounded-xl border border-slate-200 focus:border-leather-tan outline-none" 
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-semibold text-slate-700">CNPJ / CPF</label>
                 <input 
                  type="text" 
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:border-leather-tan outline-none" 
                />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-semibold text-slate-700">Inscrição Estadual</label>
                 <input 
                   type="text" 
                   name="ie"
                   value={formData.ie}
                   onChange={handleChange}
                   className="w-full p-3 rounded-xl border border-slate-200 focus:border-leather-tan outline-none" 
                 />
               </div>

               <div className="space-y-4 md:col-span-2 border-b border-slate-100 pb-4 pt-4">
                  <h4 className="text-xs font-bold text-leather-tan uppercase tracking-widest">Contato e Endereço</h4>
               </div>

               <div className="space-y-2">
                 <label className="text-sm font-semibold text-slate-700">Telefone Principal</label>
                 <input 
                  type="text" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:border-leather-tan outline-none" 
                />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-semibold text-slate-700">E-mail para Faturamento</label>
                 <input 
                   type="email" 
                   name="email"
                   value={formData.email}
                   onChange={handleChange}
                   className="w-full p-3 rounded-xl border border-slate-200 focus:border-leather-tan outline-none" 
                 />
               </div>
               <div className="space-y-2 md:col-span-2">
                 <label className="text-sm font-semibold text-slate-700">Logradouro / Endereço Completo</label>
                 <input 
                  type="text" 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:border-leather-tan outline-none" 
                />
               </div>

               <div className="space-y-4 md:col-span-2 pt-4 relative z-10">
                 <button type="submit" className="w-full bg-navy-dark text-white py-5 rounded-2xl font-black text-xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)] hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all border-2 border-white/10 relative overflow-hidden group">
                   <span className="relative z-10">
                    {editingClient ? 'Atualizar Cliente' : 'Salvar Cadastro do Cliente'}
                   </span>
                   <div className="absolute inset-0 bg-gradient-to-tr from-leather-tan/0 via-leather-tan/20 to-leather-tan/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                 </button>
               </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
