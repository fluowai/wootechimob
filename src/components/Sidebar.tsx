import React from 'react';
import {
  LayoutDashboard,
  Building2,
  Users2,
  Receipt,
  MapPin,
  Share2,
  Sparkles,
  Tractor,
  Layers,
  Grid3X3,
  Server,
  ShieldCheck,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  FileCheck2,
  Trees,
  HardHat,
  Compass,
} from 'lucide-react';
import { ProductType, UserRole } from '../types';

interface SidebarProps {
  currentProduct: ProductType;
  currentRole: UserRole;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentProduct,
  currentRole,
  activeTab,
  onSelectTab,
  isOpen,
  onToggleOpen,
}) => {

  const getSegmentMenus = () => {
    switch (currentProduct) {
      case 'URBAN':
        return {
          title: 'WOOTECH URBAN',
          color: 'text-blue-600',
          items: [
            { id: 'dash', label: 'Visão Geral', icon: LayoutDashboard },
            { id: 'properties', label: 'Imóveis & Carteira', icon: Building2 },
            { id: 'crm', label: 'CRM & Funil Comercial', icon: Users2 },
            { id: 'erp', label: 'ERP Financeiro & Repasses', icon: Receipt },
            { id: 'gis', label: 'Geointeligência Urbana', icon: MapPin },
            { id: 'portals', label: 'Publicador de Portais', icon: Share2 },
            { id: 'ai', label: 'IA Avaliador & Copywriter', icon: Sparkles },
          ],
        };
      case 'RURAL':
        return {
          title: 'WOOTECH RURAL',
          color: 'text-emerald-600',
          items: [
            { id: 'dash', label: 'Painel Agronegócio', icon: LayoutDashboard },
            { id: 'properties', label: 'Fazendas & Módulos CAR', icon: Tractor },
            { id: 'crm', label: 'CRM Rural & Investidores', icon: Users2 },
            { id: 'erp', label: 'ERP & Centro de Custos', icon: Receipt },
            { id: 'gis', label: 'GIS Agrícola, Solo & Clima', icon: Trees },
            { id: 'portals', label: 'Vitrine Agro & Portais', icon: Share2 },
            { id: 'ai', label: 'IA Solo, CAR & Produtividade', icon: Sparkles },
          ],
        };
      case 'INCORP':
        return {
          title: 'WOOTECH INCORP',
          color: 'text-indigo-600',
          items: [
            { id: 'dash', label: 'Painel Incorporação', icon: LayoutDashboard },
            { id: 'properties', label: 'Empreendimentos & SPEs', icon: HardHat },
            { id: 'crm', label: 'CRM Lançamentos & VGV', icon: Users2 },
            { id: 'erp', label: 'ERP Cashflow SPE & Aportes', icon: Receipt },
            { id: 'gis', label: 'GIS Construtivo & Terrenos', icon: Compass },
            { id: 'portals', label: 'Espelho de Vendas SPE', icon: Layers },
            { id: 'ai', label: 'IA Viabilidade & Margem ROI', icon: Sparkles },
          ],
        };
      case 'LOTE':
        return {
          title: 'WOOTECH LOTE',
          color: 'text-amber-600',
          items: [
            { id: 'dash', label: 'Painel Loteamentos', icon: LayoutDashboard },
            { id: 'properties', label: 'Grade Interativa de Lotes', icon: Grid3X3 },
            { id: 'crm', label: 'CRM Loteamentos & Reservas', icon: Users2 },
            { id: 'erp', label: 'ERP Parcelamento & Boletos', icon: Receipt },
            { id: 'gis', label: 'GIS Topografia & Perímetro', icon: MapPin },
            { id: 'portals', label: 'Mapa de Vendas Online', icon: Share2 },
            { id: 'ai', label: 'IA Curva ABC & Velocidade', icon: Sparkles },
          ],
        };
    }
  };

  const menuGroup = getSegmentMenus();

  const isMega = currentRole === 'MEGA_ADMIN' || currentRole === 'SUPER_ADMIN';

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-20 bg-white border-r border-slate-200 flex flex-col justify-between transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="p-3 overflow-y-auto space-y-6">
        
        {/* Segment Header Label */}
        <div className="px-2 pt-2">
          {isOpen ? (
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-bold tracking-wider uppercase ${menuGroup.color}`}>
                {menuGroup.title}
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-500 font-mono px-1.5 py-0.5 rounded border border-slate-200">
                Isolado
              </span>
            </div>
          ) : (
            <div className="w-8 h-8 mx-auto rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-xs">
              {currentProduct.slice(0, 1)}
            </div>
          )}
        </div>

        {/* Primary Isolated Navigation Items */}
        <nav className="space-y-1">
          {menuGroup.items.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'dash') onSelectTab('DASHBOARD');
                  else if (item.id === 'crm') onSelectTab('CRM');
                  else if (item.id === 'erp') onSelectTab('FINANCIAL');
                  else if (item.id === 'gis') onSelectTab('GIS');
                  else if (item.id === 'portals') onSelectTab('PORTALS');
                  else if (item.id === 'ai') {
                    onSelectTab('DASHBOARD');
                    // handled by AI action
                  } else onSelectTab(item.id.toUpperCase());
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  (activeTab === item.id || activeTab === item.id.toUpperCase() || (item.id === 'dash' && activeTab === 'DASHBOARD') || (item.id === 'crm' && activeTab === 'CRM') || (item.id === 'erp' && activeTab === 'FINANCIAL') || (item.id === 'gis' && activeTab === 'GIS') || (item.id === 'portals' && activeTab === 'PORTALS'))
                    ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/60 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
                title={!isOpen ? item.label : undefined}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                {isOpen && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Mega Super Admin Core Platform Menu */}
        {isMega && (
          <div className="pt-4 border-t border-slate-200 space-y-1">
            <div className="px-2 mb-2">
              {isOpen ? (
                <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                  CORE MEGA ADMIN
                </span>
              ) : (
                <div className="w-6 h-0.5 bg-slate-200 mx-auto" />
              )}
            </div>

            <button
              onClick={() => onSelectTab('MEGA_ADMIN')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'MEGA_ADMIN'
                  ? 'bg-purple-50 text-purple-700 font-bold border border-purple-200 shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
              {isOpen && <span className="truncate">Revendedores White-Label</span>}
            </button>

            <button
              onClick={() => onSelectTab('MEGA_ADMIN')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'MEGA_ADMIN'
                  ? 'bg-purple-50 text-purple-700 font-bold border border-purple-200 shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Server className="w-4 h-4 text-purple-600 shrink-0" />
              {isOpen && <span className="truncate">Empresas & Multi-Tenant</span>}
            </button>

            <button
              onClick={() => onSelectTab('MEGA_ADMIN')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'MEGA_ADMIN'
                  ? 'bg-purple-50 text-purple-700 font-bold border border-purple-200 shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <CreditCard className="w-4 h-4 text-purple-600 shrink-0" />
              {isOpen && <span className="truncate">Billing Core & Servidores</span>}
            </button>
          </div>
        )}
      </div>

      {/* Footer / Toggle Sidebar */}
      <div className="p-3 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between">
        {isOpen ? (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[11px] font-medium text-slate-500">Core Status: Online</span>
          </div>
        ) : null}

        <button
          onClick={onToggleOpen}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/80 transition-colors mx-auto"
          title={isOpen ? "Recolher menu" : "Expandir menu"}
        >
          {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
};
