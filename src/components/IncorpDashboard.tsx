import React from 'react';
import { Layers, HardHat, DollarSign, TrendingUp, Sparkles, Building, PieChart, ArrowUpRight } from 'lucide-react';
import { Property, Lead } from '../types';

interface IncorpDashboardProps {
  properties: Property[];
  leads: Lead[];
  onOpenAiDrawer: () => void;
  onSelectProperty: (p: Property) => void;
}

export const IncorpDashboard: React.FC<IncorpDashboardProps> = ({
  properties,
  leads,
  onOpenAiDrawer,
  onSelectProperty,
}) => {
  const incorpProps = properties.filter((p) => p.productType === 'INCORP');
  const spe = incorpProps[0]; // Sample SPE

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-indigo-900 via-slate-900 to-slate-800 rounded-2xl text-white shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold tracking-wider uppercase border border-indigo-400/30">
              WOOTECH INCORP
            </span>
            <span className="text-xs text-slate-300">• Gestão de SPEs, Incorporação & Obras</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-1">Painel de Lançamentos & VGV</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Acompanhamento de VGV total, unidades vendidas, avanço físico da obra e estudo de viabilidade financeira.
          </p>
        </div>

        <button
          onClick={onOpenAiDrawer}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors"
        >
          <Sparkles className="w-4 h-4 text-white animate-pulse" />
          <span>Simular ROI & Viabilidade IA</span>
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">VGV Total Lançado</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-slate-900">R$ 98.000.000</div>
          <div className="text-[11px] text-slate-500 mt-1">SPE Cambuí Horizon - Campinas/SP</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Unidades Vendidas / Estoque</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Building className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-slate-900">38 de 84 un.</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">45.2% Comercializado em pré-lançamento</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Progresso Físico da Obra</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <HardHat className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-slate-900">28.0% Concluído</div>
          <div className="text-[11px] text-slate-500 mt-1">Etapa: Concretagem da Estrutura (4º Pavimento)</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Margem ROI Estimada</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-indigo-600">32.5% a.a.</div>
          <div className="text-[11px] text-slate-500 mt-1">Estudo de Viabilidade Aprovado pelo Conselho</div>
        </div>
      </div>

      {/* Construction Progress Bar & SPE Summary */}
      {spe && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900">{spe.title}</h3>
              <p className="text-xs text-slate-500">{spe.speName}</p>
            </div>
            <button
              onClick={() => onSelectProperty(spe)}
              className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
            >
              <span>Detalhes da SPE</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Avanço do Cronograma Físico-Financeiro</span>
              <span className="text-indigo-600">{spe.constructionProgressPercent}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${spe.constructionProgressPercent}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block text-[10px]">VGV Contratado</span>
              <strong className="text-slate-800">R$ 44.3M</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block text-[10px]">VGV Remanescente</span>
              <strong className="text-slate-800">R$ 53.7M</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block text-[10px]">Custo da Obra / M2</span>
              <strong className="text-slate-800">R$ 3.850 / m²</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block text-[10px]">Entrega Prevista</span>
              <strong className="text-slate-800">Dezembro / 2027</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
