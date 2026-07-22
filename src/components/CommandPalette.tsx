import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Building2,
  Users2,
  Wand2,
  Sparkles,
  X,
  ArrowRight,
  Compass,
  DollarSign,
  MapPin,
  Globe,
  ShieldAlert,
  Tractor,
  Layers,
  PlusCircle,
  FileText,
  MessageSquare,
  Command
} from 'lucide-react';
import { Property, Lead, ProductType } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  leads: Lead[];
  onSelectProperty: (p: Property) => void;
  onSelectProduct?: (p: ProductType) => void;
  onSelectTab?: (tab: string) => void;
  onSelectLead?: (l: Lead) => void;
  onOpenOnboarding?: () => void;
  onOpenAiDrawer?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  properties,
  leads,
  onSelectProperty,
  onSelectProduct,
  onSelectTab,
  onSelectLead,
  onOpenOnboarding,
  onOpenAiDrawer,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'NAV' | 'ACTIONS' | 'PROPERTIES' | 'LEADS'>('ALL');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          setQuery('');
          setSelectedIndex(0);
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus input when open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Static items for navigation and actions
  const navItems = [
    { id: 'dash_urban', type: 'NAV', title: 'Dashboard Imobiliária Urbana', desc: 'Casas, Aptos & Locação', icon: Building2, action: () => { onSelectProduct?.('URBAN'); onSelectTab?.('DASHBOARD'); } },
    { id: 'dash_rural', type: 'NAV', title: 'Dashboard Agronegócio & Rural', desc: 'Fazendas, Glebas, CAR & CAR/SIGEF', icon: Tractor, action: () => { onSelectProduct?.('RURAL'); onSelectTab?.('DASHBOARD'); } },
    { id: 'dash_incorp', type: 'NAV', title: 'Dashboard Incorporações', desc: 'Lançamentos, VGV, SPE & Obras', icon: Layers, action: () => { onSelectProduct?.('INCORP'); onSelectTab?.('DASHBOARD'); } },
    { id: 'dash_lote', type: 'NAV', title: 'Dashboard Loteamentos', desc: 'Quadras, Lotes & Taxa VSO', icon: MapPin, action: () => { onSelectProduct?.('LOTE'); onSelectTab?.('DASHBOARD'); } },
    { id: 'tab_crm', type: 'NAV', title: 'CRM & Funil de Vendas', desc: 'Leads, Atendimentos & Pipelines', icon: Users2, action: () => onSelectTab?.('CRM') },
    { id: 'tab_financial', type: 'NAV', title: 'ERP Financeiro & DRE', desc: 'Fluxo de Caixa, Boletos & Comissões', icon: DollarSign, action: () => onSelectTab?.('FINANCIAL') },
    { id: 'tab_gis', type: 'NAV', title: 'Geointeligência GIS & Mapas', desc: 'Análise de Solo, Perímetros & Polígonos', icon: Compass, action: () => onSelectTab?.('GIS') },
    { id: 'tab_portals', type: 'NAV', title: 'Feeds de Portais XML', desc: 'Zap, VivaReal, OLX & Imovelweb', icon: Globe, action: () => onSelectTab?.('PORTALS') },
    { id: 'tab_mega', type: 'NAV', title: 'Painel Mega Admin Multi-Tenant', desc: 'Gestão de Franqueados & Resellers', icon: ShieldAlert, action: () => onSelectTab?.('MEGA_ADMIN') },
  ];

  const quickActions = [
    { id: 'act_ai', type: 'ACTIONS', title: 'Executar IA Especialista WooTech', desc: 'Análise preditiva de VGV e contrato', icon: Sparkles, action: () => onOpenAiDrawer?.() },
    { id: 'act_onboarding', type: 'ACTIONS', title: 'Abrir Wizard de Onboarding', desc: 'Configurar Marca, Equipe e WhatsApp', icon: Wand2, action: () => onOpenOnboarding?.() },
    { id: 'act_new_prop', type: 'ACTIONS', title: 'Cadastrar Novo Imóvel', desc: 'Adicionar ficha completa', icon: PlusCircle, action: () => { onSelectTab?.('DASHBOARD'); } },
    { id: 'act_new_lead', type: 'ACTIONS', title: 'Novo Lead no CRM', desc: 'Adicionar oportunidade', icon: Users2, action: () => { onSelectTab?.('CRM'); } },
    { id: 'act_whatsapp', type: 'ACTIONS', title: 'Disparar Mensagem WhatsApp', desc: 'Conectar ao WhatsMeow', icon: MessageSquare, action: () => { onOpenOnboarding?.(); } },
  ];

  // Filtering
  const filteredNav = navItems.filter(
    (n) => n.title.toLowerCase().includes(query.toLowerCase()) || n.desc.toLowerCase().includes(query.toLowerCase())
  );

  const filteredActions = quickActions.filter(
    (a) => a.title.toLowerCase().includes(query.toLowerCase()) || a.desc.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProperties = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.code.toLowerCase().includes(query.toLowerCase()) ||
      p.city.toLowerCase().includes(query.toLowerCase()) ||
      p.neighborhood.toLowerCase().includes(query.toLowerCase())
  );

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(query.toLowerCase()) ||
      l.phone.includes(query) ||
      l.email.toLowerCase().includes(query.toLowerCase())
  );

  // Combine items into flat array for index management
  let combinedItems: Array<{
    id: string;
    category: string;
    title: string;
    sub: string;
    icon: any;
    badge?: string;
    onExecute: () => void;
  }> = [];

  if (activeCategory === 'ALL' || activeCategory === 'NAV') {
    filteredNav.forEach((n) =>
      combinedItems.push({
        id: n.id,
        category: 'Módulos & Navegação',
        title: n.title,
        sub: n.desc,
        icon: n.icon,
        badge: 'Navegação',
        onExecute: n.action,
      })
    );
  }

  if (activeCategory === 'ALL' || activeCategory === 'ACTIONS') {
    filteredActions.forEach((a) =>
      combinedItems.push({
        id: a.id,
        category: 'Ações Rápidas',
        title: a.title,
        sub: a.desc,
        icon: a.icon,
        badge: 'Atalho',
        onExecute: a.action,
      })
    );
  }

  if (activeCategory === 'ALL' || activeCategory === 'PROPERTIES') {
    filteredProperties.forEach((p) =>
      combinedItems.push({
        id: p.id,
        category: 'Imóveis na Carteira',
        title: p.title,
        sub: `${p.code} • ${p.neighborhood}, ${p.city} • R$ ${p.price.toLocaleString('pt-BR')}`,
        icon: Building2,
        badge: p.productType,
        onExecute: () => onSelectProperty(p),
      })
    );
  }

  if (activeCategory === 'ALL' || activeCategory === 'LEADS') {
    filteredLeads.forEach((l) =>
      combinedItems.push({
        id: l.id,
        category: 'Leads & Clientes CRM',
        title: l.name,
        sub: `${l.phone} • ${l.email} • Estágio: ${l.stage}`,
        icon: Users2,
        badge: `Score ${l.score}`,
        onExecute: () => {
          onSelectTab?.('CRM');
          onSelectLead?.(l);
        },
      })
    );
  }

  // Keyboard Navigation Handler
  const handleKeyDownList = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < combinedItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : combinedItems.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (combinedItems[selectedIndex]) {
        combinedItems[selectedIndex].onExecute();
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-start justify-center pt-16 px-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[80vh]">
        
        {/* Search Header Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDownList}
            placeholder="Digite para buscar imóveis, clientes, ações ou módulos... (Esc para sair)"
            className="w-full text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
          />
          <div className="flex items-center gap-1 shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded bg-slate-200/80 text-slate-600 border border-slate-300">
              <Command className="w-3 h-3" /> K
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="px-4 py-2 bg-white border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px] font-bold">
          {[
            { id: 'ALL', label: 'Todos' },
            { id: 'NAV', label: 'Módulos' },
            { id: 'ACTIONS', label: 'Ações Rápidas' },
            { id: 'PROPERTIES', label: `Imóveis (${filteredProperties.length})` },
            { id: 'LEADS', label: `Leads (${filteredLeads.length})` },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id as any);
                setSelectedIndex(0);
              }}
              className={`px-3 py-1 rounded-full transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 space-y-1 text-xs flex-1">
          {combinedItems.length === 0 ? (
            <div className="text-center py-12 text-slate-500 space-y-2">
              <Compass className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="font-semibold">Nenhum resultado encontrado para "{query}"</p>
              <p className="text-[11px] text-slate-400">Tente buscar por código de imóvel, nome de lead ou nome de módulo.</p>
            </div>
          ) : (
            combinedItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const IconComp = item.icon;
              return (
                <button
                  key={`${item.id}-${idx}`}
                  type="button"
                  onClick={() => {
                    item.onExecute();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all ${
                    isSelected
                      ? 'bg-blue-50 text-blue-950 font-semibold border border-blue-200/80 shadow-2xs'
                      : 'hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold truncate text-xs text-slate-900">{item.title}</span>
                      {item.badge && (
                        <span
                          className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase border ${
                            isSelected
                              ? 'bg-blue-200 text-blue-900 border-blue-300'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate mt-0.5">{item.sub}</div>
                  </div>

                  <ArrowRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-blue-600' : 'text-slate-300'}`} />
                </button>
              );
            })
          )}
        </div>

        {/* Footer Bar */}
        <div className="bg-slate-50 px-4 py-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-300 text-[10px] shadow-2xs">↑</kbd>{' '}
              <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-300 text-[10px] shadow-2xs">↓</kbd> navegar
            </span>
            <span>
              <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-300 text-[10px] shadow-2xs">Enter ↵</kbd> selecionar
            </span>
          </div>
          <span className="font-bold text-slate-700">WooTech Imob OS Command</span>
        </div>
      </div>
    </div>
  );
};
