import React, { useState } from 'react';
import { Shield, UserPlus, Key, Lock, Unlock, RefreshCcw, MoreHorizontal, UserCheck, UserX, AlertTriangle, Plus, CheckCircle2, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function UserManagementModule() {
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [roles, setRoles] = useState(['Proprietário', 'Representante Externo', 'Apoio Administrativo', 'Auditor Comercial']);
  const [selectedRole, setSelectedRole] = useState('');
  const [newRoleName, setNewRoleName] = useState('');
  const [isCreatingRole, setIsCreatingRole] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setSelectedRole(user.role);
    setFormData({
      name: user.name,
      email: user.email,
      password: '••••••••'
    });
    setShowAddUser(true);
  };

  const handleClose = () => {
    setShowAddUser(false);
    setEditingUser(null);
    setIsCreatingRole(false);
    setNewRoleName('');
    setFormData({ name: '', email: '', password: '' });
    setShowSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Auto close after success
      setTimeout(() => {
        handleClose();
      }, 2000);
    }, 1500);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === 'CREATE_NEW') {
      setIsCreatingRole(true);
      setSelectedRole('');
    } else {
      setIsCreatingRole(false);
      setSelectedRole(val);
    }
  };

  const addNewRole = () => {
    if (newRoleName.trim() && !roles.includes(newRoleName.trim())) {
      setRoles(prev => [...prev, newRoleName.trim()]);
      setSelectedRole(newRoleName.trim());
      setIsCreatingRole(false);
      setNewRoleName('');
    }
  };

  const mockUsers = [
    { id: 1, name: 'Representante Jr 1', email: 'rep1@betomarinzeck.com.br', role: 'Representante Externo', status: 'Ativo', accessDate: '10/01/2026' },
    { id: 2, name: 'Representante Jr 2', email: 'rep2@betomarinzeck.com.br', role: 'Representante Externo', status: 'Ativo', accessDate: '10/01/2026' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-orange-50 border border-orange-100 p-6 rounded-[32px] flex items-center gap-6">
         <div className="w-16 h-16 leather-light-textured rounded-2xl flex items-center justify-center text-orange-600 shadow-sm border border-orange-200">
            <Shield size={32} />
         </div>
         <div className="flex-1">
            <h3 className="text-xl font-bold text-navy-dark">Configurações de Acesso</h3>
            <p className="text-slate-600 font-medium">Controle de usuários secundários e auditoria de segurança.</p>
         </div>
         <button 
           onClick={() => setShowAddUser(true)}
           className="btn-leather !bg-navy-dark !px-6"
         >
            <UserPlus size={18} /> Cadastrar Novo Usuário
         </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockUsers.map(u => (
          <div key={u.id} className="leather-light-textured p-6 rounded-[32px] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow">
             <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-slate-50 flex items-center justify-center rounded-2xl text-slate-400">
                   <UserCheck size={28} />
                </div>
                <div>
                   <div className="flex items-center gap-2">
                      <p className="font-bold text-navy-dark text-lg text-slate-900 leading-tight">{u.name}</p>
                      <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[9px] font-black uppercase rounded border border-green-100">{u.status}</span>
                   </div>
                   <p className="text-xs text-slate-400 font-medium whitespace-nowrap">Acesso desde: {u.accessDate} • Último Login: Hoje as 09:42</p>
                </div>
             </div>

             <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleEdit(u)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100"
                >
                   <RefreshCcw size={14} /> Editar Dados
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100">
                   <Key size={14} /> Resetar Senha
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100">
                   <UserX size={14} /> Bloquear Acesso
                </button>
                <button className="p-2 text-slate-400 hover:text-navy-dark">
                   <MoreHorizontal size={20} />
                </button>
             </div>
          </div>
        ))}
      </div>

      {showAddUser && (
        <div className="fixed inset-0 bg-navy-dark/80 backdrop-blur-md z-[100] flex items-center justify-center p-6">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="leather-light-textured w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden"
           >
              <div className="bg-navy-dark p-8 text-white leather-texture flex justify-between items-center">
                 <div className="flex items-center gap-3">
                    <UserPlus size={24} className="text-leather-tan" />
                    <h3 className="text-base md:text-lg font-black tracking-tight flex items-center gap-2">
                       <UserPlus size={18} className="text-leather-tan" />
                       {editingUser ? 'Editar Registro de Usuário' : 'Novo Cadastro de Usuário'}
                    </h3>
                 </div>
                 <button onClick={handleClose} className="text-white/40 hover:text-white transition-colors">
                    <X size={24} />
                 </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6 relative">
                 <AnimatePresence>
                   {showSuccess && (
                     <motion.div 
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       className="absolute inset-0 leather-light-textured backdrop-blur-sm z-50 flex flex-col items-center justify-center text-center p-8"
                     >
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-4 border border-green-100 shadow-inner">
                           <CheckCircle2 size={40} />
                        </div>
                        <h4 className="text-xl font-bold text-navy-dark mb-2">Cadastro Finalizado!</h4>
                        <p className="text-slate-500 text-sm font-medium">O acesso foi liberado com sucesso para<br/><span className="text-navy-dark font-bold">{formData.name}</span></p>
                     </motion.div>
                   )}
                 </AnimatePresence>

                 {!editingUser && (
                    <div className="bg-orange-50 p-4 rounded-2xl flex items-start gap-3 border border-orange-100">
                      <Lock size={20} className="text-orange-600 flex-shrink-0" />
                      <p className="text-xs text-orange-800 font-medium leading-relaxed">
                          Como Usuário Master, você está definindo a senha de acesso inicial. O usuário poderá validá-la ao receber o link do sistema.
                      </p>
                    </div>
                 )}

                 <div className="bg-white p-3 rounded-[16px] border border-slate-200/60 shadow-sm space-y-3">
                    <div className="relative">
                       <input 
                        id="name"
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder=" " 
                        className="peer w-full p-2 pt-4 bg-white border border-slate-200 focus:border-leather-tan outline-none font-bold text-sm text-leather-dark transition-all placeholder-transparent rounded-lg shadow-sm" 
                      />
                      <label 
                        htmlFor="name"
                        className="absolute left-2.5 top-1 text-[8px] font-bold text-slate-400 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-2.5 peer-placeholder-shown:font-medium peer-focus:top-1 peer-focus:text-[8px] peer-focus:font-bold peer-focus:text-leather-tan"
                      >
                         Nome Completo do Usuário
                      </label>
                    </div>

                    <div className="relative">
                       <input 
                        id="email"
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder=" " 
                        className="peer w-full p-2 pt-4 bg-white border border-slate-200 focus:border-leather-tan outline-none font-bold text-sm text-leather-dark transition-all placeholder-transparent rounded-lg shadow-sm" 
                      />
                      <label 
                        htmlFor="email"
                        className="absolute left-2.5 top-1 text-[8px] font-bold text-slate-400 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-2.5 peer-placeholder-shown:font-medium peer-focus:top-1 peer-focus:text-[8px] peer-focus:font-bold peer-focus:text-leather-tan"
                      >
                         E-mail de Acesso Corporativo
                      </label>
                    </div>
                    
                    {!editingUser && (
                       <div className="relative">
                          <input 
                            id="password"
                            type="text" 
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            placeholder=" " 
                            className="peer w-full p-2 pt-4 bg-slate-50 border border-slate-200 focus:border-leather-tan outline-none font-mono text-sm text-leather-dark transition-all placeholder-transparent rounded-lg shadow-sm" 
                          />
                          <label 
                            htmlFor="password"
                            className="absolute left-2.5 top-1 text-[8px] font-bold text-slate-400 transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-2.5 peer-placeholder-shown:font-medium peer-focus:top-1 peer-focus:text-[8px] peer-focus:font-bold peer-focus:text-leather-tan"
                          >
                             Senha de Acesso Inicial
                          </label>
                          <Lock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300" />
                       </div>
                    )}

                    <div className="relative">
                       <select 
                         id="role"
                         value={isCreatingRole ? 'CREATE_NEW' : selectedRole || editingUser?.role} 
                         onChange={handleRoleChange}
                         className="peer w-full p-2 pt-4 bg-white border border-slate-200 focus:border-leather-tan outline-none font-black text-[11px] text-leather-dark transition-all appearance-none rounded-lg cursor-pointer shadow-sm"
                       >
                          <option value="" disabled>Selecione um cargo...</option>
                          {roles.map(r => <option key={r} value={r}>{r}</option>)}
                          <option value="CREATE_NEW" className="text-leather-tan font-black">+ Criar Novo Cargo...</option>
                       </select>
                       <label htmlFor="role" className="absolute left-2.5 top-1 text-[8px] font-bold text-slate-400 transition-all peer-focus:text-leather-tan">Cargo / Função</label>
                    </div>
                 </div>

                  <AnimatePresence>
                     {isCreatingRole && (
                     <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mt-4"
                     >
                        <div className="p-4 bg-orange-50/50 border border-orange-100 rounded-2xl space-y-3 text-left">
                           <div className="flex justify-between items-center">
                              <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Nome do Novo Cargo</p>
                              <button 
                                 type="button"
                                 onClick={() => setIsCreatingRole(false)}
                                 className="text-[9px] font-bold text-slate-400 hover:text-red-500 uppercase"
                              >
                                 Cancelar
                              </button>
                           </div>
                           <div className="flex gap-2">
                              <input 
                                 type="text" 
                                 autoFocus
                                 value={newRoleName}
                                 onChange={(e) => setNewRoleName(e.target.value)}
                                 placeholder="ex: Gerente Regional" 
                                 className="flex-1 p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-orange-300 text-sm font-bold" 
                              />
                              <button 
                                 type="button"
                                 onClick={addNewRole}
                                 className="px-4 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors shadow-sm flex items-center gap-2 text-xs font-bold"
                              >
                                 <Plus size={16} /> Adicionar
                              </button>
                           </div>
                        </div>
                     </motion.div>
                     )}
                  </AnimatePresence>


                 <button 
                   type="submit"
                   disabled={isSubmitting || showSuccess}
                   className="w-full py-4 bg-leather-dark text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)] hover:bg-black hover:scale-[1.01] active:scale-[0.98] transition-all border-2 border-white/10 relative overflow-hidden group disabled:opacity-70"
                 >
                    <div className="absolute inset-0 bg-gradient-to-tr from-leather-tan/0 via-leather-tan/20 to-leather-tan/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" /> Processando...
                      </>
                    ) : (
                      editingUser ? 'Atualizar Dados do Usuário' : 'Finalizar Cadastro e Liberar Acesso'
                    )}
                 </button>
              </form>
           </motion.div>
        </div>
      )}
    </div>
  );
}
