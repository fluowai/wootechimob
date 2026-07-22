import React, { useState } from 'react';
import { Grid3X3, DollarSign, Sparkles, CheckCircle2, Clock, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { Property, Lead } from '../types';

interface LoteDashboardProps {
  properties: Property[];
  leads: Lead[];
  onOpenAiDrawer: () => void;
  onSelectProperty: (p: Property) => void;
}

export const LoteDashboard: React.FC<LoteDashboardProps> = ({
  properties,
  leads,
  onOpenAiDrawer,
  onSelectProperty,
}) => {
  const loteProps = properties.filter((p) => p.productType === 'LOTE');
  const lote = loteProps[0]; // Residencial Reserva Real

  // Interactive Lot Matrix Simulation
  const totalGridLots = 60;
  const [selectedLot, setSelectedLot] = useState<number | null>(null);

  const getLotStatus = (num: number) => {
    if (num % 5 === 0) return 'RESERVADO';
    if (num % 2 === 0 || num % 3 === 0) return 'VENDIDO';
    return 'DISPONIVEL';
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-amber-900 via-slate-900 to-slate-800 rounded-2xl text-white shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold tracking-wider uppercase border border-amber-400/30">
              WOOTECH LOTE
            </span>
            <span className="text-xs text-slate-300">• Gestão de Loteamentos & Espelho de Vendas</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-1">Espelho de Vendas & Curva ABC de Lotes</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Mapa interativo de quadras e lotes, velocidade de vendas (VSO), controle de carnês e liquidez de estoque.
          </p>
        </div>

        <button
          onClick={onOpenAiDrawer}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-colors"
        >
          <Sparkles className="w-4 h-4 text-white animate-pulse" />
          <span>Otimizar Preços IA</span>
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Total de Lotes na Quadra</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Grid3X3 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-slate-900">240 Lotes</div>
          <div className="text-[11px] text-slate-500 mt-1">Quadras A, B, C e D - Atibaia/SP</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Lotes Vendidos</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-emerald-600">140 Lotes (58.3%)</div>
          <div className="text-[11px] text-slate-500 mt-1">Velocidade VSO: 14 lotes / mês</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Lotes Reservados</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-amber-600">18 Lotes</div>
          <div className="text-[11px] text-slate-500 mt-1">Aguardando aprovação de crédito bancário</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Preço Médio por m²</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-slate-900">R$ 650 / m²</div>
          <div className="text-[11px] text-amber-700 font-semibold mt-1">Categoria Curva A: Esquina & Vista</div>
        </div>
      </div>

      {/* Interactive Lot Grid (Espelho de Vendas) */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-sm text-slate-900">Espelho de Vendas Interativo — Quadra A & B</h3>
            <p className="text-xs text-slate-500">Clique em qualquer lote para ver status de reserva e proprietário</p>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-emerald-500" />
              <span className="text-slate-600">Disponível</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-amber-500" />
              <span className="text-slate-600">Reservado</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-slate-400" />
              <span className="text-slate-600">Vendido</span>
            </div>
          </div>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-2 pt-2">
          {Array.from({ length: totalGridLots }).map((_, i) => {
            const lotNumber = i + 1;
            const status = getLotStatus(lotNumber);
            const isSelected = selectedLot === lotNumber;

            let bg = 'bg-emerald-500 hover:bg-emerald-600 text-white';
            if (status === 'RESERVADO') bg = 'bg-amber-500 hover:bg-amber-600 text-white';
            if (status === 'VENDIDO') bg = 'bg-slate-300 text-slate-700 cursor-not-allowed';

            return (
              <button
                key={lotNumber}
                onClick={() => setSelectedLot(lotNumber)}
                className={`h-11 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center p-1 ${bg} ${
                  isSelected ? 'ring-4 ring-amber-400 scale-105 shadow-md' : ''
                }`}
              >
                <span>L-{lotNumber.toString().padStart(2, '0')}</span>
                <span className="text-[9px] opacity-80 font-normal">450m²</span>
              </button>
            );
          })}
        </div>

        {/* Lot Details Panel when Selected */}
        {selectedLot && (
          <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs animate-in fade-in duration-150">
            <div>
              <span className="font-bold text-slate-800">Lote L-{selectedLot.toString().padStart(2, '0')} — Quadra A</span>
              <span className="text-slate-500 block text-[11px]">
                Área: 450 m² • Valor estimado: R$ {(450 * 650).toLocaleString('pt-BR')} • Status: {getLotStatus(selectedLot)}
              </span>
            </div>
            <button
              onClick={() => alert(`Iniciando reserva do Lote L-${selectedLot}`)}
              className="px-3 py-1.5 rounded-lg bg-amber-600 text-white font-bold hover:bg-amber-700 transition-colors"
            >
              Reservar Lote
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
