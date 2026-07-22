import React from 'react';
import {
  Building2,
  Tractor,
  Layers,
  Grid3X3,
  Search,
  Sparkles,
  ShoppingBag,
  Wand2,
  Bell,
  UserCheck,
  Building,
  Menu,
} from 'lucide-react';
import { ProductType, UserRole, Tenant } from '../types';

interface NavbarProps {
  currentProduct: ProductType;
  onSelectProduct: (p: ProductType) => void;
  currentRole: UserRole;
  onSelectRole: (r: UserRole) => void;
  currentTenant: Tenant;
  onSelectTenant: (t: Tenant) => void;
  tenants: Tenant[];
  onOpenCommandPalette: () => void;
  onOpenOnboarding: () => void;
  onOpenMarketplace: () => void;
  onOpenAiDrawer: () => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentProduct,
  onSelectProduct,
  currentRole,
  onSelectRole,
  currentTenant,
  onSelectTenant,
  tenants,
  onOpenCommandPalette,
  onOpenOnboarding,
  onOpenMarketplace,
  onOpenAiDrawer,
  isSidebarOpen,
  onToggleSidebar,
}) => {
  const products: { type: ProductType; label: string; icon: React.ReactNode; color: string }[] = [
    { type: 'URBAN', label: 'WooTech Urban', icon: <Building2 className="w-4 h-4" />, color: 'bg-blue-600' },
    { type: 'RURAL', label: 'WooTech Rural', icon: <Tractor className="w-4 h-4" />, color: 'bg-emerald-600' },
    { type: 'INCORP', label: 'WooTech Incorp', icon: <Layers className="w-4 h-4" />, color: 'bg-indigo-600' },
    { type: 'LOTE', label: 'WooTech Lote', icon: <Grid3X3 className="w-4 h-4" />, color: 'bg-amber-600' },
  ];

  const rolesList: { role: UserRole; label: string }[] = [
    { role: 'MEGA_ADMIN', label: 'Mega Super Admin (WooTech)' },
    { role: 'SUPER_ADMIN', label: 'Super Admin (Revendedor)' },
    { role: 'ADMIN', label: 'Administrador Empresa' },
    { role: 'GERENTE', label: 'Gerente Comercial' },
    { role: 'CORRETOR', label: 'Corretor de Imóveis' },
    { role: 'CAPTADOR', label: 'Captador' },
    { role: 'FINANCEIRO', label: 'Financeiro' },
    { role: 'JURIDICO', label: 'Jurídico' },
    { role: 'MARKETING', label: 'Marketing' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Banner & Main Bar */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Left: Brand logo & Sidebar toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title={isSidebarOpen ? "Recolher Menu" : "Expandir Menu"}
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-xs">
                W
              </div>
              <div className="hidden sm:block">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">WooTech</span>
                <span className="font-medium text-lg text-blue-600 ml-1">Imob</span>
                <span className="block text-[10px] text-slate-400 font-semibold tracking-wider uppercase -mt-1">Real Estate OS</span>
              </div>
            </div>
          </div>

          {/* Center: Independent Product Switcher */}
          <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            {products.map((prod) => {
              const isActive = currentProduct === prod.type;
              return (
                <button
                  key={prod.type}
                  onClick={() => onSelectProduct(prod.type)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <span className={isActive ? 'text-blue-600' : 'text-slate-500'}>{prod.icon}</span>
                  {prod.label}
                </button>
              );
            })}
          </div>

          {/* Right Controls: Command Palette, AI, Wizard, Marketplace, Tenant & Role */}
          <div className="flex items-center gap-2">
            
            {/* Command Palette Button */}
            <button
              onClick={onOpenCommandPalette}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-600 text-xs border border-slate-200 transition-colors"
              title="Busca Global (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span>Buscar...</span>
              <kbd className="px-1.5 py-0.5 bg-white text-[10px] text-slate-500 rounded border border-slate-300 shadow-2xs font-mono">
                ⌘K
              </kbd>
            </button>

            {/* AI Assistant Button */}
            <button
              onClick={onOpenAiDrawer}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 text-blue-700 hover:from-blue-100 hover:to-indigo-100 text-xs font-semibold transition-all shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              <span className="hidden sm:inline">IA Especialista</span>
            </button>

            {/* Onboarding Wizard */}
            <button
              onClick={onOpenOnboarding}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-200 transition-colors"
              title="Assistente de Configuração"
            >
              <Wand2 className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden md:inline">Wizard</span>
            </button>

            {/* Marketplace Store */}
            <button
              onClick={onOpenMarketplace}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-200 transition-colors"
              title="Marketplace de Módulos"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden md:inline">Módulos</span>
            </button>

            {/* Tenant Selector */}
            <div className="hidden xl:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-50 border border-slate-200">
              <Building className="w-3.5 h-3.5 text-slate-500 ml-1" />
              <select
                value={currentTenant.id}
                onChange={(e) => {
                  const found = tenants.find((t) => t.id === e.target.value);
                  if (found) onSelectTenant(found);
                }}
                className="bg-transparent text-xs font-medium text-slate-700 focus:outline-none cursor-pointer max-w-[140px] truncate"
              >
                {tenants.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            {/* User Role Switcher */}
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-50 border border-slate-200">
              <UserCheck className="w-3.5 h-3.5 text-slate-500 ml-1" />
              <select
                value={currentRole}
                onChange={(e) => onSelectRole(e.target.value as UserRole)}
                className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer max-w-[150px] truncate"
              >
                {rolesList.map((r) => (
                  <option key={r.role} value={r.role}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Mobile Product Selector Tabs */}
        <div className="lg:hidden flex overflow-x-auto py-2 gap-1 border-t border-slate-100 no-scrollbar">
          {products.map((prod) => {
            const isActive = currentProduct === prod.type;
            return (
              <button
                key={prod.type}
                onClick={() => onSelectProduct(prod.type)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs whitespace-nowrap font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
                    : 'text-slate-600 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                {prod.icon}
                {prod.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
