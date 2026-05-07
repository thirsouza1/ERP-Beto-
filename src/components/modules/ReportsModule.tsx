import React, { useState, useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ReTooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  ComposedChart
} from 'recharts';
import { 
  Calendar, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet,
  Users,
  Filter,
  Search,
  ChevronDown,
  LayoutGrid,
  TrendingUp,
  Package,
  Layers,
  MapPin,
  RefreshCw,
  MoreHorizontal,
  FileText,
  Clock,
  ShoppingCart,
  X,
  Check,
  RotateCcw,
  CheckSquare,
  Square
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../ui/Logo';

// --- MOCK DATA ---
const PERFORMANCE_DATA = [
  { name: 'Jan', revenue: 45000, previous: 40000, orders: 120, growth: 12 },
  { name: 'Fev', revenue: 52000, previous: 42000, orders: 145, growth: 15 },
  { name: 'Mar', revenue: 48000, previous: 45000, orders: 130, growth: 10 },
  { name: 'Abr', revenue: 61000, previous: 48000, orders: 180, growth: 22 },
  { name: 'Mai', revenue: 58000, previous: 50000, orders: 165, growth: 18 },
  { name: 'Jun', revenue: 72000, previous: 55000, orders: 210, growth: 25 },
];

const CATEGORY_DATA = [
  { name: 'Couros Bovinos', value: 45, color: '#3d2b1f' },
  { name: 'Peles Exóticas', value: 25, color: '#c19a6b' },
  { name: 'Sintéticos Premium', value: 20, color: '#1a233e' },
  { name: 'Acessórios', value: 10, color: '#94a3b8' },
];

const BRANCH_DATA = [
  { name: 'Matriz Franca', sales: 120000 },
  { name: 'Filial Itajubá', sales: 85000 },
  { name: 'Showroom SP', sales: 45000 },
];

const TRANSACTION_DATA = [
  { id: 'TX-9901', date: '2026-05-24', product: 'Couro Atanado Premium', category: 'Couros', qty: 120, value: 15600.00, margin: 22.5, status: 'Completed' },
  { id: 'TX-9902', date: '2026-05-23', product: 'Vaqueta Nappa Soft', category: 'Couros', qty: 85, value: 8925.00, margin: 18.2, status: 'Processing' },
  { id: 'TX-9903', date: '2026-05-23', product: 'Pele Cobra Natural', category: 'Peles', qty: 12, value: 4800.00, margin: 35.0, status: 'Completed' },
  { id: 'TX-9904', date: '2026-05-22', product: 'Solado de Couro Grupon', category: 'Acessórios', qty: 500, value: 12500.00, margin: 15.5, status: 'Completed' },
  { id: 'TX-9905', date: '2026-05-22', product: 'Camurça Colorida', category: 'Couros', qty: 200, value: 14000.00, margin: 20.0, status: 'Cancelled' },
];

const FINANCE_STATS = [
  { name: 'Jan', receber: 85000, pagar: 62000 },
  { name: 'Fev', receber: 92000, pagar: 65000 },
  { name: 'Mar', receber: 78000, pagar: 71000 },
  { name: 'Abr', receber: 110000, pagar: 68000 },
  { name: 'Mai', receber: 105000, pagar: 72000 },
  { name: 'Jun', receber: 125000, pagar: 75000 },
];

const TRAVEL_EXPENSES = [
  { name: 'Hospedagem', value: 12500, color: '#3d2b1f' },
  { name: 'Transporte Aéreo', value: 18400, color: '#c19a6b' },
  { name: 'Alimentação', value: 6200, color: '#1a233e' },
  { name: 'Combustível', value: 4800, color: '#94a3b8' },
];

// --- COMPONENTS ---

export default function ReportsModule() {
  const [dateRange, setDateRange] = useState('Este Mês');
  const [comparePrevious, setComparePrevious] = useState(true);
  const [activeTab, setActiveTab] = useState('performance'); 
  const [isLoading, setIsLoading] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(true); // Demo: start open as requested
  
  // Advanced Filter State
  const [selectedFilters, setSelectedFilters] = useState({
    category: ['Couros', 'Peles'],
    product: [] as string[],
    client: [] as string[],
    branch: ['Matriz Franca']
  });
  
  const [searchTerms, setSearchTerms] = useState({
    category: '',
    product: '',
    client: '',
    branch: ''
  });

  const filterOptions = {
    category: ['Couros', 'Peles', 'Sintéticos', 'Acessórios', 'Solados', 'Ferragens'],
    product: ['Camurça Nappa', 'Pele Cobra', 'Couro Atanado', 'Verniz Premium', 'Zíper Gold'],
    client: ['Ind. Calçados Alpha', 'Bolsas Premium Ltda', 'Moda Couro Brasil', 'Exportadora Sul'],
    branch: ['Matriz Franca', 'Filial Itajubá', 'Showroom SP', 'Depósito Sul']
  };

  const removeFilter = (key: keyof typeof selectedFilters, val: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [key]: prev[key].filter(v => v !== val)
    }));
  };

  const toggleFilter = (key: keyof typeof selectedFilters, val: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(val) 
        ? prev[key].filter(v => v !== val)
        : [...prev[key], val]
    }));
  };

  const clearAll = () => {
    setSelectedFilters({ category: [], product: [], client: [], branch: [] });
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1200);
  };

  const currentRevenue = 285400.00;
  const prevRevenue = 245000.00;
  const revenueGrowth = ((currentRevenue - prevRevenue) / prevRevenue) * 100;

  const subTabs = [
    { id: 'performance', label: 'Performance', icon: <TrendingUp size={16} /> },
    { id: 'orders', label: 'Pedidos', icon: <ShoppingCart size={16} /> },
    { id: 'finance', label: 'Financeiro', icon: <Wallet size={16} /> },
    { id: 'travel', label: 'Despesas', icon: <MapPin size={16} /> },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* HEADER SECTION - PREMIUM DARK */}
      <section className="bg-leather-dark p-10 rounded-[48px] shadow-2xl leather-texture relative overflow-hidden group border border-white/5">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
          <Logo variant="icon" className="scale-[4]" />
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
          <div className="flex items-center gap-8">
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-[24px] flex items-center justify-center border border-white/20 shadow-2xl shadow-black/20"
            >
              <TrendingUp className="text-leather-tan" size={36} />
            </motion.div>
            <div>
              <h2 className="text-4xl font-black text-white tracking-tight leading-none">Business Intelligence</h2>
              <p className="text-leather-tan/60 text-[11px] font-black uppercase tracking-[0.4em] mt-3">Análise de Performance Corporativa & Auditoria</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
             <button 
                onClick={handleRefresh}
                className="px-8 py-4 bg-white/5 hover:bg-white/15 border border-white/10 rounded-2xl text-white font-bold text-sm transition-all flex items-center gap-2 backdrop-blur-xl shadow-lg ring-1 ring-white/10"
             >
                <RefreshCw size={20} className={isLoading ? "animate-spin" : ""} /> Atualizar Dashboards
             </button>
             <button className="px-8 py-4 bg-leather-tan hover:bg-white text-white hover:text-leather-dark rounded-2xl font-black text-sm transition-all flex items-center gap-2 shadow-2xl shadow-leather-tan/20 ring-1 ring-leather-tan/50">
                <Download size={20} /> Exportação Executiva
             </button>
          </div>
        </div>
      </section>

      {/* SUB-NAVIGATION BAR */}
      <div className="flex flex-wrap items-center gap-2 p-2 bg-slate-200/30 rounded-[32px] w-fit mx-auto border border-slate-200/50 backdrop-blur-sm relative z-20">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-8 py-3 rounded-[24px] text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all",
              activeTab === tab.id 
                ? "bg-navy-dark text-white shadow-xl scale-105" 
                : "text-slate-500 hover:text-navy-dark hover:bg-white/50"
            )}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* ADVANCED FILTER SYSTEM */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
           <h3 className="text-sm font-black text-navy-dark uppercase tracking-[0.3em] flex items-center gap-3">
             <Filter size={16} className="text-leather-tan" /> Configurações de Filtro Avançado
           </h3>
           <div className="flex items-center gap-4">
              <button 
                onClick={clearAll}
                className="text-[10px] font-black text-slate-400 hover:text-red-500 uppercase tracking-widest flex items-center gap-1 transition-colors"
              >
                <RotateCcw size={12} /> Limpar Tudo
              </button>
              <button className="px-6 py-2 bg-navy-dark text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-leather-dark transition-all shadow-lg">
                Aplicar Filtros
              </button>
           </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* DATE PICKER PANEL */}
          <div className="xl:col-span-4 bg-white paper-texture rounded-[32px] border border-slate-200 shadow-xl overflow-hidden relative group">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-200 text-leather-tan shadow-sm">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Período de Análise</p>
                    <p className="text-sm font-bold text-navy-dark">{dateRange}</p>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                 <div className="text-right">
                    <p className="text-[9px] font-black text-slate-300 uppercase">Comparar</p>
                    <p className="text-[10px] font-bold text-leather-tan">VS Período Anterior</p>
                 </div>
                 <button 
                   onClick={() => setComparePrevious(!comparePrevious)}
                   className={`w-10 h-5 rounded-full relative transition-colors duration-200 ${comparePrevious ? 'bg-leather-tan' : 'bg-slate-200'}`}
                 >
                   <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200 ${comparePrevious ? 'left-5.5' : 'left-0.5'}`}></div>
                 </button>
               </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-2">
                 {['Este Mês', 'Últimos 30 dias', 'Este Ano', 'Personalizado'].map(preset => (
                   <button 
                     key={preset}
                     onClick={() => setDateRange(preset)}
                     className={cn(
                       "px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border",
                       dateRange === preset 
                        ? "bg-navy-dark text-white border-navy-dark shadow-lg scale-[1.02]" 
                        : "bg-slate-50 text-slate-500 border-slate-100 hover:border-leather-tan/30"
                     )}
                   >
                     {preset}
                   </button>
                 ))}
              </div>

              {/* MOCK CALENDAR UI */}
              {dateRange === 'Personalizado' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100"
                >
                   <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-black text-navy-dark uppercase">Maio 2026</span>
                      <div className="flex gap-1">
                         <button className="p-1 hover:bg-white rounded-md transition-colors"><ChevronDown size={14} className="rotate-90" /></button>
                         <button className="p-1 hover:bg-white rounded-md transition-colors"><ChevronDown size={14} className="-rotate-90" /></button>
                      </div>
                   </div>
                   <div className="grid grid-cols-7 gap-1 text-center mb-2">
                      {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(d => <span key={d} className="text-[9px] font-bold text-slate-400">{d}</span>)}
                   </div>
                   <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: 31 }).map((_, i) => (
                        <button 
                          key={i} 
                          className={cn(
                            "h-8 rounded-lg text-[10px] font-bold transition-all",
                            i + 1 > 5 && i + 1 < 12 
                              ? "bg-leather-tan text-white shadow-md z-10 scale-110" 
                              : "text-slate-500 hover:bg-white"
                          )}
                        >
                          {i + 1}
                        </button>
                      ))}
                   </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* MULTI-SELECT DROPDOWNS BAR */}
          <div className="xl:col-span-8 space-y-4">
            <div className="bg-white/40 backdrop-blur-md paper-texture p-4 rounded-[32px] border border-slate-200/60 shadow-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-30">
              <AdvancedDropdown 
                label="Categoria" 
                icon={<Layers size={14} />} 
                selected={selectedFilters.category} 
                onToggle={(val) => toggleFilter('category', val)}
                options={filterOptions.category}
                searchTerm={searchTerms.category}
                onSearch={(v) => setSearchTerms(p => ({ ...p, category: v }))}
                isOpen={activeDropdown === 'category'}
                onToggleOpen={() => setActiveDropdown(activeDropdown === 'category' ? null : 'category')}
              />
              <AdvancedDropdown 
                label="Produto" 
                icon={<Package size={14} />} 
                selected={selectedFilters.product} 
                onToggle={(val) => toggleFilter('product', val)}
                options={filterOptions.product}
                searchTerm={searchTerms.product}
                onSearch={(v) => setSearchTerms(p => ({ ...p, product: v }))}
                isOpen={activeDropdown === 'product'}
                onToggleOpen={() => setActiveDropdown(activeDropdown === 'product' ? null : 'product')}
              />
              <AdvancedDropdown 
                label="Cliente" 
                icon={<Users size={14} />} 
                selected={selectedFilters.client} 
                onToggle={(val) => toggleFilter('client', val)}
                options={filterOptions.client}
                searchTerm={searchTerms.client}
                onSearch={(v) => setSearchTerms(p => ({ ...p, client: v }))}
                isOpen={activeDropdown === 'client'}
                onToggleOpen={() => setActiveDropdown(activeDropdown === 'client' ? null : 'client')}
              />
              <AdvancedDropdown 
                label="Filial" 
                icon={<MapPin size={14} />} 
                selected={selectedFilters.branch} 
                onToggle={(val) => toggleFilter('branch', val)}
                options={filterOptions.branch}
                searchTerm={searchTerms.branch}
                onSearch={(v) => setSearchTerms(p => ({ ...p, branch: v }))}
                isOpen={activeDropdown === 'branch'}
                onToggleOpen={() => setActiveDropdown(activeDropdown === 'branch' ? null : 'branch')}
              />
            </div>

            {/* ACTIVE FILTER CHIPS */}
            <div className="flex flex-wrap gap-2 px-2">
               {Object.entries(selectedFilters).map(([key, values]: [string, any]) => 
                 (values as any[]).map(val => (
                   <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key={`${key}-${val}`} 
                    className="flex items-center gap-2 px-4 py-2 bg-white/60 border border-leather-tan/20 rounded-full shadow-sm"
                   >
                     <span className="text-[9px] font-black text-leather-tan uppercase tracking-widest">{key}:</span>
                     <span className="text-xs font-bold text-navy-dark">{val}</span>
                     <button 
                       onClick={() => removeFilter(key as any, val)}
                       className="p-1 hover:bg-red-50 rounded-full text-slate-300 hover:text-red-500 transition-colors"
                     >
                       <X size={10} strokeWidth={3} />
                     </button>
                   </motion.div>
                 ))
               )}
               {(selectedFilters.category.length > 0 || selectedFilters.product.length > 0 || selectedFilters.client.length > 0 || selectedFilters.branch.length > 0) && (
                 <button 
                   onClick={clearAll}
                   className="px-4 py-2 text-[10px] font-black text-slate-400 hover:text-red-500 uppercase tracking-widest"
                 >
                   Remover Todos
                 </button>
               )}
            </div>

            {/* MINI INSIGHT BOX */}
            <div className="bg-gradient-to-br from-navy-dark to-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden group shadow-2xl">
               <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                  <TrendingUp size={120} />
               </div>
               <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black text-leather-tan uppercase tracking-[0.4em]">Resumo dos Filtros Ativos</p>
                     <h4 className="text-2xl font-black text-white">Auditoria em Tempo Real</h4>
                     <p className="text-white/40 text-xs max-w-md">Exibindo faturamento e volume de pedidos cruzando {selectedFilters.category.length} categorias e {selectedFilters.branch.length} unidades operacionais.</p>
                  </div>
                  <div className="flex gap-4">
                     <div className="bg-white/5 border border-white/10 p-5 rounded-3xl text-center min-w-[140px] backdrop-blur-xl">
                        <p className="text-[9px] font-black text-white/40 uppercase mb-1">Impacto Filtros</p>
                        <p className="text-xl font-black text-leather-tan">+12.4%</p>
                     </div>
                     <div className="bg-white/5 border border-white/10 p-5 rounded-3xl text-center min-w-[140px] backdrop-blur-xl">
                        <p className="text-[9px] font-black text-white/40 uppercase mb-1">Volumetria</p>
                        <p className="text-xl font-black text-white">842 un.</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-[60vh] flex flex-col items-center justify-center gap-6 text-slate-400"
          >
            <div className="relative">
              <RefreshCw size={64} className="animate-spin text-leather-tan opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <Logo variant="icon" className="scale-75 animate-pulse" />
              </div>
            </div>
            <p className="font-black text-navy-dark tracking-[0.2em] uppercase text-xs">Compilando Auditoria em Tempo Real</p>
          </motion.div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-10"
          >
            {activeTab === 'performance' && (
              <>
                {/* KPI OVERVIEW CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                  <KPICard title="Faturamento Total" value="R$ 285.400,00" delta="16.5" positive={true} icon={<Wallet />} premium />
                  <KPICard title="Ticket Médio" value="R$ 1.250,00" delta="4.2" positive={true} icon={<TrendingUp />} premium />
                  <KPICard title="Volume de Pedidos" value="228" delta="8.5" positive={true} icon={<ShoppingCart />} premium />
                  <KPICard title="Market Growth" value="18.4%" delta="2.1" positive={true} icon={<TrendingUp />} />
                  <div className="bg-white p-7 rounded-[40px] border border-slate-200/60 shadow-lg flex flex-col justify-between group overflow-hidden relative paper-texture">
                     <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"><TrendingUp size={80} /></div>
                     <div className="space-y-2 relative z-10">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Meta Mensal</p>
                        <div className="flex items-end justify-between">
                           <h3 className="text-3xl font-black text-navy-dark leading-none">78%</h3>
                           <span className="text-[10px] font-bold text-leather-tan italic mb-1">Target: R$ 500k</span>
                        </div>
                     </div>
                     <div className="w-full h-3 bg-slate-100 rounded-full mt-6 relative overflow-hidden ring-4 ring-slate-50">
                        <motion.div initial={{ width: 0 }} animate={{ width: '78%' }} transition={{ duration: 1.5, ease: "easeOut" }} className="absolute left-0 top-0 h-full bg-gradient-to-r from-leather-tan via-leather-dark to-leather-tan bg-[length:200%_100%] animate-shimmer rounded-full" />
                     </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                   <div className="lg:col-span-2 bg-white p-10 rounded-[56px] border border-slate-200/60 shadow-xl paper-texture relative">
                      <h4 className="text-2xl font-black text-navy-dark tracking-tight mb-8">Performance Analítica</h4>
                      <div className="h-[440px] w-full">
                         <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={PERFORMANCE_DATA}>
                               <defs>
                                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                     <stop offset="5%" stopColor="#c19a6b" stopOpacity={0.2}/><stop offset="95%" stopColor="#c19a6b" stopOpacity={0}/>
                                  </linearGradient>
                               </defs>
                               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#c19a6b10" />
                               <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dy={15} />
                               <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} tickFormatter={(val) => `R$ ${val/1000}k`} />
                               <ReTooltip contentStyle={{ borderRadius: '24px', border: 'none', backgroundColor: '#1a233e', color: '#fff' }} />
                               <Area type="monotone" dataKey="revenue" stroke="#c19a6b" strokeWidth={5} fill="url(#colorRevenue)" />
                               <Bar dataKey="growth" fill="#3d2b1f" radius={[6, 6, 0, 0]} opacity={0.08} barSize={24} />
                            </ComposedChart>
                         </ResponsiveContainer>
                      </div>
                   </div>
                   <div className="bg-white p-10 rounded-[56px] border border-slate-200/60 shadow-xl flex flex-col paper-texture">
                      <h4 className="text-2xl font-black text-navy-dark tracking-tight mb-8">Mix de Vendas</h4>
                      <ResponsiveContainer width="100%" height={280}>
                         <PieChart>
                            <Pie data={CATEGORY_DATA} innerRadius={85} outerRadius={120} paddingAngle={12} dataKey="value">
                               {CATEGORY_DATA.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                            </Pie>
                         </PieChart>
                      </ResponsiveContainer>
                      <div className="space-y-4 mt-8">
                         {CATEGORY_DATA.map((item, idx) => (
                           <div key={idx} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                 <div className="w-2.5 h-6 rounded-full" style={{ backgroundColor: item.color }} />
                                 <span className="text-sm font-bold text-navy-dark">{item.name}</span>
                              </div>
                              <span className="text-sm font-black text-leather-tan">{item.value}%</span>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              </>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <KPICard title="Pedidos em Aberto" value="42" delta="2.5" positive={false} icon={<Package />} premium />
                  <KPICard title="Taxa de Conversão" value="8.4%" delta="1.2" positive={true} icon={<TrendingUp />} premium />
                  <KPICard title="Tempo Médio Despacho" value="1.5 dias" delta="4.0" positive={true} icon={<Clock />} premium />
                </div>
                <div className="bg-white p-10 rounded-[56px] border border-slate-200/60 shadow-xl paper-texture overflow-hidden">
                   <h4 className="text-2xl font-black text-navy-dark tracking-tight mb-8">Auditoria de Pedidos Recentes</h4>
                   <div className="overflow-x-auto">
                     <table className="w-full text-left">
                       <thead>
                         <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                           <th className="px-8 py-6">Pedido</th>
                           <th className="px-8 py-6">Cliente</th>
                           <th className="px-8 py-6 text-right">Valor</th>
                           <th className="px-8 py-6 text-center">Status</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-50">
                         {[1,2,3,4,5].map((i) => (
                           <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                             <td className="px-8 py-6 font-black text-navy-dark">#PED-{8800 + i}</td>
                             <td className="px-8 py-6 font-bold text-slate-600">Industria de Calçados {i}</td>
                             <td className="px-8 py-6 text-right font-black text-navy-dark">R$ {(Math.random() * 5000 + 1000).toLocaleString('pt-BR')}</td>
                             <td className="px-8 py-6 text-center"><StatusBadge status={i % 2 === 0 ? 'Completed' : 'Processing'} /></td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'finance' && (
              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <KPICard title="Contas a Receber" value="R$ 145.800" delta="12.4" positive={true} icon={<ArrowUpRight />} premium />
                  <KPICard title="Contas a Pagar" value="R$ 82.300" delta="5.2" positive={false} icon={<ArrowDownRight />} premium />
                  <KPICard title="Saldo Projetado" value="R$ 63.500" delta="8.1" positive={true} icon={<Wallet />} premium />
                  <KPICard title="Inadimplência" value="1.8%" delta="0.4" positive={true} icon={<FileText />} />
                </div>
                <div className="bg-white p-10 rounded-[56px] border border-slate-200/60 shadow-xl paper-texture">
                   <h4 className="text-2xl font-black text-navy-dark tracking-tight mb-8">Saúde Financeira - Fluxo de Caixa</h4>
                   <div className="h-[350px] w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={FINANCE_STATS}>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#c19a6b10" />
                           <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dy={15} />
                           <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                           <ReTooltip />
                           <Bar dataKey="receber" fill="#c19a6b" radius={[10, 10, 0, 0]} barSize={24} />
                           <Bar dataKey="pagar" fill="#1a233e" radius={[10, 10, 0, 0]} barSize={24} />
                        </BarChart>
                     </ResponsiveContainer>
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'travel' && (
              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <KPICard title="Total Reembolsos" value="R$ 42.150" delta="8.4" positive={false} icon={<Wallet />} premium />
                  <KPICard title="Viagens Concluídas" value="15" delta="3" positive={true} icon={<MapPin />} premium />
                  <KPICard title="Média por Consultor" value="R$ 2.810" delta="1.2" positive={false} icon={<Users />} premium />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <div className="bg-white p-10 rounded-[56px] border border-slate-200/60 shadow-xl paper-texture">
                     <h4 className="text-2xl font-black text-navy-dark tracking-tight mb-8">Gastos por Categoria</h4>
                     <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                           <Pie data={TRAVEL_EXPENSES} innerRadius={80} outerRadius={110} paddingAngle={8} dataKey="value">
                              {TRAVEL_EXPENSES.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                           </Pie>
                           <ReTooltip />
                        </PieChart>
                     </ResponsiveContainer>
                  </div>
                  <div className="bg-white p-10 rounded-[56px] border border-slate-200/60 shadow-xl paper-texture overflow-hidden">
                     <h4 className="text-2xl font-black text-navy-dark tracking-tight mb-8">Aprovações Pendentes</h4>
                     <div className="space-y-4">
                       {[1,2,3].map((i) => (
                         <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
                            <div className="flex items-center gap-4">
                               <div className="w-10 h-10 rounded-full bg-leather-tan/10 flex items-center justify-center text-leather-tan font-black">CP</div>
                               <div>
                                  <p className="text-sm font-black text-navy-dark">Viagem Comercial - Unidade {i}</p>
                                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Consultor: Ricardo Silva</p>
                               </div>
                            </div>
                            <div className="text-right">
                               <p className="text-sm font-black text-navy-dark">R$ 1.250,00</p>
                               <span className="text-[9px] font-black uppercase text-orange-500">Aguardando Direção</span>
                            </div>
                         </div>
                       ))}
                     </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AdvancedDropdown({ 
  label, 
  icon, 
  selected, 
  onToggle, 
  options, 
  searchTerm, 
  onSearch,
  isOpen,
  onToggleOpen
}: { 
  label: string, 
  icon: React.ReactNode, 
  selected: string[], 
  onToggle: (val: string) => void,
  options: string[],
  searchTerm: string,
  onSearch: (v: string) => void,
  isOpen: boolean,
  onToggleOpen: () => void
}) {
  const filteredOptions = options.filter(opt => opt.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="relative">
      <div 
        onClick={onToggleOpen}
        className={cn(
          "px-4 py-3 rounded-2xl cursor-pointer transition-all border group",
          isOpen ? "bg-white shadow-xl border-leather-tan/50 ring-1 ring-leather-tan/20" : "hover:bg-white hover:border-leather-tan/20 border-transparent"
        )}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className={cn("transition-colors", isOpen ? "text-leather-tan" : "text-slate-400 group-hover:text-leather-tan")}>{icon}</span>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-navy-dark truncate max-w-[120px]">
            {selected.length === 0 ? `Todos` : selected.length === 1 ? selected[0] : `${selected.length} itens`}
          </p>
          <ChevronDown size={12} className={cn("text-slate-300 transition-transform duration-300", isOpen ? "rotate-180 text-leather-tan" : "group-hover:text-leather-tan")} />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-3 bg-white paper-texture border border-slate-200 shadow-2xl rounded-2xl z-[100] overflow-hidden"
          >
            <div className="p-3 border-b border-slate-100 bg-slate-50/50">
               <div className="relative">
                  <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => onSearch(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-xs outline-none focus:ring-1 focus:ring-leather-tan/30 transition-all font-bold text-navy-dark"
                  />
               </div>
            </div>
            <div className="max-h-[220px] overflow-y-auto p-2 space-y-1 custom-scrollbar">
              {filteredOptions.length > 0 ? (
                filteredOptions.map(opt => (
                  <button 
                    key={opt}
                    onClick={() => onToggle(opt)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all",
                      selected.includes(opt) 
                        ? "bg-leather-tan/10 text-leather-dark" 
                        : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    <span className="flex items-center gap-2">
                       {selected.includes(opt) ? <CheckSquare size={14} className="text-leather-tan" /> : <Square size={14} className="text-slate-300" />}
                       {opt}
                    </span>
                    {selected.includes(opt) && <Check size={12} className="text-leather-tan" />}
                  </button>
                ))
              ) : (
                <div className="py-8 text-center">
                   <Package size={24} className="mx-auto text-slate-200 mb-2" />
                   <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Nenhum resultado</p>
                </div>
              )}
            </div>
            <div className="p-3 bg-slate-50 flex items-center justify-between border-t border-slate-100">
               <button 
                 onClick={() => onToggleOpen()}
                 className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-navy-dark"
               >
                 Fechar
               </button>
               <button 
                 onClick={() => {}}
                 className="px-4 py-1.5 bg-navy-dark text-white rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm"
               >
                 Confirmar
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterGroup({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="flex-1 min-w-[120px] px-4 py-2 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors group">
       <div className="flex items-center gap-2 mb-0.5">
          <span className="text-leather-tan opacity-60 group-hover:opacity-100 transition-opacity">{icon}</span>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
       </div>
       <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-navy-dark">{value}</p>
          <ChevronDown size={14} className="text-slate-300 group-hover:text-leather-tan transition-colors" />
       </div>
    </div>
  );
}

function KPICard({ title, value, delta, positive, icon, premium }: any) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className={cn(
        "bg-white p-8 rounded-[40px] border border-slate-200/60 shadow-lg flex flex-col gap-6 transition-all paper-texture group relative overflow-hidden",
        premium && "shadow-leather-tan/5 border-leather-tan/10"
      )}
    >
      {premium && (
        <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none group-hover:scale-125 transition-transform duration-700">
           {icon}
        </div>
      )}
      <div className="flex items-center justify-between relative z-10">
        <div className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg group-hover:rotate-6",
          positive ? "bg-green-50 text-green-600 shadow-green-200/20" : "bg-red-50 text-red-600 shadow-red-200/20"
        )}>
           {React.cloneElement(icon as React.ReactElement, { size: 28 })}
        </div>
        <div className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ring-1",
          positive ? "text-green-500 bg-green-50/50 ring-green-100" : "text-red-500 bg-red-50/50 ring-red-100"
        )}>
          {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {delta}%
        </div>
      </div>
      <div className="relative z-10">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">{title}</p>
        <h3 className="text-2xl font-black text-navy-dark tracking-tighter mt-1 group-hover:text-leather-tan transition-colors">{value}</h3>
      </div>
      {/* Decorative dots */}
      <div className="absolute bottom-4 right-4 flex gap-1 opacity-10">
         <div className="w-1 h-1 rounded-full bg-leather-tan"></div>
         <div className="w-1 h-1 rounded-full bg-leather-tan"></div>
         <div className="w-1 h-1 rounded-full bg-leather-tan"></div>
      </div>
    </motion.div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Completed: 'bg-green-50 text-green-600 border-green-100',
    Processing: 'bg-blue-50 text-blue-600 border-blue-100',
    Cancelled: 'bg-red-50 text-red-600 border-red-100',
  };

  const labelMap: Record<string, string> = {
    Completed: 'Efetuado',
    Processing: 'Em Processo',
    Cancelled: 'Cancelado',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${styles[status]}`}>
      {labelMap[status]}
    </span>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
