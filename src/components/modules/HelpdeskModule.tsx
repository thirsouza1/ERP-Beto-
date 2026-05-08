import { 
  HelpCircle, 
  MessageCircle, 
  BookOpen, 
  PlayCircle, 
  ShieldCheck, 
  AlertCircle,
  ChevronRight,
  ExternalLink,
  Phone,
  LayoutGrid
} from 'lucide-react';

export default function HelpdeskModule({ onTabChange }: { onTabChange?: (tab: string) => void }) {
  const guides = [
    { title: 'Como cadastrar clientes de couro?', icon: BookOpen, desc: 'Aprenda os campos obrigatórios para o setor de curtumes.' },
    { title: 'Scan de Cheques: Dicas de Imagem', icon: CameraIcon, desc: 'Como garantir uma leitura perfeita da frente e verso.' },
    { title: 'Gerando PDF de Pedidos', icon: PlayCircle, desc: 'Passo-a-passo para imprimir e enviar por WhatsApp.' },
    { title: 'Regras de Bloqueio por Erro de Senha', icon: ShieldCheck, desc: 'Entenda os tempos de penalidade e desbloqueio.' },
  ];

  return (
    <div className="space-y-8">
      <div className="leather-light-textured p-10 rounded-[40px] shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-10">
         <button 
           onClick={() => onTabChange?.('dashboard')}
           className="w-24 h-24 bg-leather-tan/10 text-leather-dark hover:bg-leather-tan/20 rounded-[32px] flex items-center justify-center flex-shrink-0 animate-bounce transition-all group/home"
           title="Voltar ao Início"
         >
            <LayoutGrid size={48} className="group-hover/home:scale-110 transition-transform" />
         </button>
         <div className="space-y-2">
            <h2 className="text-3xl font-bold text-navy-dark">Central de Ajuda</h2>
            <p className="text-slate-500 text-lg">Precisa de suporte ou quer aprender a usar as ferramentas?</p>
            <div className="flex flex-wrap gap-4 pt-4">
               <button className="flex items-center gap-2 px-6 py-3 bg-leather-dark text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all">
                  <MessageCircle size={18} /> Chat com Suporte
               </button>
               <button className="flex items-center gap-2 px-6 py-3 bg-slate-50 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all border border-slate-100">
                  <Phone size={18} /> (35) 99843-0843
               </button>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {guides.map((guide, idx) => (
           <div key={idx} className="leather-light-textured p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-start justify-between group hover:border-leather-tan/40 transition-all cursor-pointer">
              <div className="flex items-start gap-4">
                 <div className="w-12 h-12 bg-slate-50 text-leather-tan rounded-2xl flex items-center justify-center group-hover:bg-leather-tan group-hover:text-white transition-all">
                    <guide.icon size={24} />
                 </div>
                 <div className="space-y-1 pr-6">
                    <h4 className="font-bold text-navy-dark leading-snug">{guide.title}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{guide.desc}</p>
                 </div>
              </div>
              <ChevronRight className="text-slate-300 group-hover:text-leather-tan transition-all transform group-hover:translateX-1" size={24} />
           </div>
         ))}
      </div>

      <div className="bg-navy-dark rounded-[40px] p-10 text-white leather-texture flex flex-col items-center text-center gap-6 shadow-2xl">
         <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
            <AlertCircle size={40} className="text-leather-tan" />
         </div>
         <div className="max-w-xl">
            <h3 className="text-2xl font-bold mb-3">Erros Comuns & Soluções</h3>
            <p className="text-white/60 leading-relaxed font-medium">
               Se você encontrar o erro <span className="text-leather-tan bg-white/10 px-2 py-0.5 rounded font-mono">INS_AUTH_ERR</span>, 
               significa que sua conexão com o Firebase caiu. Tente recarregar a página e verificar se o Master User te bloqueou temporariamente.
            </p>
         </div>
         <button className="px-8 py-3 bg-white/10 border border-white/20 rounded-2xl font-bold text-sm hover:bg-white/20 transition-all flex items-center gap-2">
            Ver Log de Erros <ExternalLink size={14} />
         </button>
      </div>
    </div>
  );
}

function CameraIcon({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
  );
}
