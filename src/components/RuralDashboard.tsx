import React from 'react';
import { Tractor, Trees, CloudSun, ShieldCheck, Sparkles, MapPin, ArrowUpRight, DollarSign, Sprout } from 'lucide-react';
import { Property, Lead } from '../types';

interface RuralDashboardProps {
  properties: Property[];
  leads: Lead[];
  onOpenAiDrawer: () => void;
  onSelectProperty: (p: Property) => void;
  onOpenGisTab: () => void;
}

export const RuralDashboard: React.FC<RuralDashboardProps> = ({
  properties,
  leads,
  onOpenAiDrawer,
  onSelectProperty,
  onOpenGisTab,
}) => {
  const ruralProperties = properties.filter((p) => p.productType === 'RURAL');
  const totalHectares = ruralProperties.reduce((acc, p) => acc + (p.areaHa || 0), 0);
  const totalValuation = ruralProperties.reduce((acc, p) => acc + p.price, 0);

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-800 rounded-2xl text-white shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold tracking-wider uppercase border border-emerald-400/30">
              WOOTECH RURAL
            </span>
            <span className="text-xs text-slate-300">• Gestão de Fazendas, CAR & Agronegócio</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-1">Painel de Geointeligência Agrícola</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Monitoramento espacial de CAR (Reserva Legal & APP), análise de latossolo e negociações rurais.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenGisTab}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
          >
            <MapPin className="w-4 h-4" />
            <span>Ver GIS Mapa Agrícola</span>
          </button>
          <button
            onClick={onOpenAiDrawer}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />
            <span>Análise de Solo IA</span>
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Área sob Gestão (Hectares)</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Trees className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-slate-900">{totalHectares.toLocaleString('pt-BR')} ha</div>
          <div className="text-[11px] text-slate-500 mt-1">Regiões: Ribeirão Preto, Sorocaba e Vale do Paraíba</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Conformidade CAR / SICAR</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-emerald-600">100% REGULAR</div>
          <div className="text-[11px] text-slate-500 mt-1">Reserva Legal (20%) e APPs demarcadas em GeoJSON</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Valor Total das Propriedades</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-slate-900">
            R$ {(totalValuation / 1000000).toFixed(1)}M
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Valoração Média: R$ 70.000 / ha</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Produtividade Média Esperada</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Sprout className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-slate-900">78 sacas/ha</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">Soja & Milho Safrinha Irrigado</div>
        </div>
      </div>

      {/* Weather Forecast & Soil Intelligence Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* INMET Weather Forecast Widget */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CloudSun className="w-5 h-5 text-amber-500" />
              <div>
                <h3 className="font-bold text-sm text-slate-900">Estação Meteorológica INMET</h3>
                <p className="text-[11px] text-slate-500">Ribeirão Preto - SP (Região Agro)</p>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200">
              Tempo Real
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-2xl font-extrabold text-slate-900">28°C</span>
              <span className="text-xs text-slate-500 block">Umidade relativa: 68%</span>
            </div>
            <div className="text-right text-xs text-slate-600 space-y-0.5">
              <div>Precipitação: <strong>0mm</strong></div>
              <div>Vento: <strong>12 km/h SE</strong></div>
              <div>Radiação Solar: <strong>Ideal</strong></div>
            </div>
          </div>

          <div className="text-[11px] text-slate-600 bg-emerald-50/60 p-3 rounded-xl border border-emerald-200/60">
            <strong>Condição Agronômica:</strong> Janela favorável para aplicação foliar e plantio da safrinha nas próximas 48 horas.
          </div>
        </div>

        {/* CAR Status Overview */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Cadastro Ambiental Rural (CAR - SICAR)</h3>
              <p className="text-xs text-slate-500">Resumo de APPs e Reserva Legal Georreferenciadas no SIGEF/INCRA</p>
            </div>
            <button
              onClick={onOpenGisTab}
              className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
            >
              <span>Visualizar Camadas no Mapa</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ruralProperties.map((p) => (
              <div
                key={p.id}
                onClick={() => onSelectProperty(p)}
                className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 bg-slate-50/50 hover:bg-emerald-50/30 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-slate-900 truncate">{p.title}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {p.carStatus}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-500 mb-2 truncate">CAR: {p.carCode}</div>
                <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-600 border-t border-slate-200 pt-2">
                  <div>
                    <span className="block text-slate-400">Total</span>
                    <strong>{p.areaHa} ha</strong>
                  </div>
                  <div>
                    <span className="block text-slate-400">Res. Legal</span>
                    <strong>{p.reservaLegalHa} ha</strong>
                  </div>
                  <div>
                    <span className="block text-slate-400">Cultura</span>
                    <strong>{p.currentCulture}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
