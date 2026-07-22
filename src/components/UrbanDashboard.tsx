import React from 'react';
import { Building2, DollarSign, Users, TrendingUp, Sparkles, Plus, ArrowUpRight } from 'lucide-react';
import { Property, Lead } from '../types';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface UrbanDashboardProps {
  properties: Property[];
  leads: Lead[];
  onOpenNewLeadModal: () => void;
  onOpenAiDrawer: () => void;
  onSelectProperty: (p: Property) => void;
}

export const UrbanDashboard: React.FC<UrbanDashboardProps> = ({
  properties,
  leads,
  onOpenNewLeadModal,
  onOpenAiDrawer,
  onSelectProperty,
}) => {
  const urbanProperties = properties.filter((p) => p.productType === 'URBAN');
  const totalVgv = urbanProperties.reduce((acc, p) => acc + p.price, 0);
  const activePropertiesCount = urbanProperties.filter((p) => p.status === 'DISPONIVEL').length;
  const avgTicket = urbanProperties.length ? Math.round(totalVgv / urbanProperties.length) : 0;

  const chartData = [
    { month: 'Jan', vgv: 4.2, leads: 42 },
    { month: 'Fev', vgv: 5.8, leads: 58 },
    { month: 'Mar', vgv: 7.1, leads: 64 },
    { month: 'Abr', vgv: 6.4, leads: 70 },
    { month: 'Mai', vgv: 8.9, leads: 85 },
    { month: 'Jun', vgv: 9.7, leads: 96 },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-blue-900 via-slate-900 to-slate-800 rounded-2xl text-white shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold tracking-wider uppercase border border-blue-400/30">
              WOOTECH URBAN
            </span>
            <span className="text-xs text-slate-300">• Gestão Imobiliária Urbana</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-1">Painel Operacional Urbano</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Acompanhe o VGV da sua carteira, pipeline de leads residenciais/comerciais e portais sincronizados.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenNewLeadModal}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Lead</span>
          </button>
          <button
            onClick={onOpenAiDrawer}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-blue-300 animate-pulse" />
            <span>Avaliar com IA</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">VGV em Carteira Urbana</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-slate-900">
            R$ {(totalVgv / 1000000).toFixed(2)}M
          </div>
          <div className="text-[11px] font-medium text-emerald-600 flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>+12.4% comparado ao mês anterior</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Imóveis Ativos Disponíveis</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-slate-900">{activePropertiesCount} imóveis</div>
          <div className="text-[11px] text-slate-500 mt-1">100% com dados e fotos no padrão Zap/VivaReal</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Ticket Médio de Venda</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-slate-900">
            R$ {(avgTicket / 1000).toFixed(0)} mil
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Região Jardins, Itaim Bibi e Moema</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Leads Ativos no Funil</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-slate-900">{leads.length} Oportunidades</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">Taxa de conversão: 18.5%</div>
        </div>
      </div>

      {/* Chart & AI Insights Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* VGV Trend Chart */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Evolução do VGV Vendido (R$ Milhões)</h3>
              <p className="text-xs text-slate-500">Histórico dos últimos 6 meses de operações urbanas</p>
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
              Metas Q3 2026
            </span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorVgv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} />
                <Tooltip />
                <Area type="monotone" dataKey="vgv" stroke="#2563EB" strokeWidth={2.5} fillOpacity={1} fill="url(#colorVgv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insight Box */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-blue-50/80 to-white border border-blue-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-blue-600 text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">Insight WooTech AI Urban</h4>
                <span className="text-[10px] text-blue-700 font-semibold">Atualizado agora</span>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed space-y-2">
              Detectamos alta procura por <strong>apartamentos de 3 suítes nos Jardins</strong>. O estoque atual possui giro estimado em apenas 22 dias.
            </p>

            <div className="mt-4 p-3 rounded-xl bg-white border border-blue-100 space-y-1 text-xs">
              <span className="font-bold text-slate-800 block">Recomendação Estratégica:</span>
              <p className="text-slate-600">Aumentar verba no Meta Ads para o perfil 'Investidores Alto Padrão SP'.</p>
            </div>
          </div>

          <button
            onClick={onOpenAiDrawer}
            className="w-full mt-4 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Executar Análise Completa</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Featured Properties Section */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900">Destaques da Carteira Urbana</h3>
          <span className="text-xs text-slate-500">{urbanProperties.length} imóveis cadastrados</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {urbanProperties.map((p) => (
            <div
              key={p.id}
              onClick={() => onSelectProperty(p)}
              className="group border border-slate-200 hover:border-blue-300 rounded-2xl overflow-hidden cursor-pointer transition-all hover:shadow-md bg-white"
            >
              <div className="h-40 overflow-hidden relative bg-slate-100">
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {p.code}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <h4 className="font-bold text-xs text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {p.title}
                </h4>
                <p className="text-[11px] text-slate-500">{p.neighborhood}, {p.city} • {p.areaM2} m²</p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-extrabold text-blue-600">
                    R$ {p.price.toLocaleString('pt-BR')}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {p.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
