import React, { useState } from 'react';
import {
  X,
  Building2,
  MapPin,
  Share2,
  Printer,
  FileText,
  DollarSign,
  Sparkles,
  CheckCircle2,
  Trees,
  ShieldCheck,
  Grid,
} from 'lucide-react';
import { Property, ProductType } from '../types';

interface PropertyDetailDrawerProps {
  property: Property | null;
  onClose: () => void;
  onOpenAiDrawer: () => void;
}

export const PropertyDetailDrawer: React.FC<PropertyDetailDrawerProps> = ({
  property,
  onClose,
  onOpenAiDrawer,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!property) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[540px] bg-white border-l border-slate-200 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
      
      {/* Header */}
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-600 text-white">
            {property.code}
          </span>
          <span className="text-xs text-slate-300">• WooTech {property.productType}</span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-slate-700">
        
        {/* Main Image Gallery */}
        <div className="space-y-2">
          <div className="h-64 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xs">
            <img
              src={property.images[activeImageIndex] || property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>

          {property.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-12 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    activeImageIndex === idx ? 'border-blue-600 scale-105' : 'border-slate-200 opacity-70'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Title & Pricing */}
        <div className="space-y-1">
          <h2 className="font-extrabold text-lg text-slate-900">{property.title}</h2>
          <div className="flex items-center gap-1.5 text-slate-500 font-medium">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>{property.neighborhood ? `${property.neighborhood}, ` : ''}{property.city} - {property.state}</span>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Valor de Venda</span>
              <div className="text-2xl font-black text-blue-600">
                R$ {property.price.toLocaleString('pt-BR')}
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
              {property.status}
            </span>
          </div>
        </div>

        {/* Action Buttons Bar */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => alert(`Gerando Ficha da Imóvel PDF (${property.code})...`)}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold border border-slate-200 flex flex-col items-center gap-1 transition-colors"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>Gerar Ficha PDF</span>
          </button>

          <button
            onClick={() => alert(`Iniciando Minuta do Contrato no Módulo de Assinatura Digital...`)}
            className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold border border-blue-200 flex flex-col items-center gap-1 transition-colors"
          >
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Gerar Contrato</span>
          </button>

          <button
            onClick={onOpenAiDrawer}
            className="p-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold border border-purple-200 flex flex-col items-center gap-1 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Análise IA</span>
          </button>
        </div>

        {/* Product Specific Specs */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
          <span className="font-bold text-slate-800 text-xs block border-b border-slate-200 pb-2">
            Especificações Técnica do Imóvel ({property.productType})
          </span>

          <div className="grid grid-cols-2 gap-3">
            {property.areaM2 && (
              <div>
                <span className="text-slate-400 block text-[10px]">Área Útil</span>
                <strong className="text-slate-800">{property.areaM2} m²</strong>
              </div>
            )}
            {property.areaHa && (
              <div>
                <span className="text-slate-400 block text-[10px]">Área em Hectares</span>
                <strong className="text-slate-800">{property.areaHa} ha</strong>
              </div>
            )}
            {property.bedrooms && (
              <div>
                <span className="text-slate-400 block text-[10px]">Quartos / Suítes</span>
                <strong className="text-slate-800">{property.bedrooms} quartos</strong>
              </div>
            )}
            {property.carCode && (
              <div className="col-span-2">
                <span className="text-slate-400 block text-[10px]">Código CAR / SICAR</span>
                <strong className="text-emerald-700 font-mono text-[11px]">{property.carCode}</strong>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <span className="font-bold text-slate-800 block">Descrição Comercial:</span>
          <p className="text-slate-600 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
            {property.description}
          </p>
        </div>
      </div>
    </div>
  );
};
