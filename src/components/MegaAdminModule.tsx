import React, { useState } from 'react';
import {
  ShieldCheck,
  Server,
  CreditCard,
  Building,
  Users,
  Activity,
  Cpu,
  HardDrive,
  Plus,
  Search,
  CheckCircle2,
  X,
} from 'lucide-react';
import { Tenant } from '../types';

interface MegaAdminModuleProps {
  tenants: Tenant[];
  onAddTenant: (t: Tenant) => void;
}

export const MegaAdminModule: React.FC<MegaAdminModuleProps> = ({ tenants, onAddTenant }) => {
  const [activeSubTab, setActiveSubTab] = useState<'tenants' | 'resellers' | 'billing' | 'servers'>('tenants');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form
  const [newTenantForm, setNewTenantForm] = useState({
    name: '',
    cnpj: '',
    productType: 'URBAN' as const,
    plan: 'Enterprise' as const,
    domain: '',
  });

  const handleCreateTenant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTenantForm.name) return;

    const newTenant: Tenant = {
      id: `tenant-${Date.now()}`,
      name: newTenantForm.name,
      cnpj: newTenantForm.cnpj || '00.000.000/0001-00',
      primaryColor: '#2563EB',
      productType: newTenantForm.productType,
      plan: newTenantForm.plan,
      activeUsersCount: 5,
      domain: newTenantForm.domain || `${newTenantForm.name.toLowerCase().replace(/\s+/g, '')}.wootechimob.com.br`,
      whatsappStatus: 'CONNECTED',
    };

    onAddTenant(newTenant);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-purple-950 via-slate-900 to-slate-900 rounded-2xl text-white shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold tracking-wider uppercase border border-purple-400/30">
              WOOTECH CORE PLATFORM
            </span>
            <span className="text-xs text-slate-300">• Painel Mega Super Admin</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-1">Gestão Global Multi-Tenant SaaS</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Controle de revendedores white-label, provisionamento de instâncias, planos, billing e infraestrutura Cloud.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Provisionar Empresa Tenant</span>
        </button>
      </div>

      {/* Subtabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('tenants')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'tenants'
              ? 'bg-purple-600 text-white shadow-2xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Empresas Tenant ({tenants.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('resellers')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'resellers'
              ? 'bg-purple-600 text-white shadow-2xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Revendedores White-Label</span>
        </button>

        <button
          onClick={() => setActiveSubTab('servers')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'servers'
              ? 'bg-purple-600 text-white shadow-2xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>Monitoramento & Servidores</span>
        </button>
      </div>

      {/* Tenants View */}
      {activeSubTab === 'tenants' && (
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900">Empresas Cadastradas no Ecossistema</h3>
            <div className="relative w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar empresa..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-purple-600"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Empresa / CNPJ</th>
                  <th className="py-2.5 px-3">Produto WooTech</th>
                  <th className="py-2.5 px-3">Plano</th>
                  <th className="py-2.5 px-3">Usuários Ativos</th>
                  <th className="py-2.5 px-3">Domínio Dedicado</th>
                  <th className="py-2.5 px-3">WhatsApp</th>
                  <th className="py-2.5 px-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {tenants.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3">
                      <span className="font-bold text-slate-900 block">{t.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{t.cnpj}</span>
                    </td>

                    <td className="py-3 px-3">
                      <span className="font-bold text-xs text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                        WooTech {t.productType}
                      </span>
                    </td>

                    <td className="py-3 px-3 font-semibold text-slate-800">{t.plan}</td>

                    <td className="py-3 px-3">{t.activeUsersCount} usuários</td>

                    <td className="py-3 px-3 font-mono text-[11px] text-blue-600">{t.domain}</td>

                    <td className="py-3 px-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {t.whatsappStatus}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => alert(`Acessando painel da empresa ${t.name}...`)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200"
                      >
                        Gerenciar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Server Health View */}
      {activeSubTab === 'servers' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-2xs">
            <div className="flex items-center gap-2 text-purple-600 font-bold text-xs">
              <Cpu className="w-4 h-4" />
              <span>Processamento CPU Cluster</span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900">14.2% USO</div>
            <p className="text-[11px] text-slate-500">Cloud Run Containers Autoscale ativados</p>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-2xs">
            <div className="flex items-center gap-2 text-purple-600 font-bold text-xs">
              <HardDrive className="w-4 h-4" />
              <span>Banco Lógico PostgreSQL Multi-Tenant</span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900">HEALTHY (99.99%)</div>
            <p className="text-[11px] text-slate-500">I/O em 240 req/s • Latência média 12ms</p>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-2xs">
            <div className="flex items-center gap-2 text-purple-600 font-bold text-xs">
              <Activity className="w-4 h-4" />
              <span>Módulo WhatsMeow WhatsApp Engine</span>
            </div>
            <div className="text-2xl font-extrabold text-emerald-600">4 Instâncias Online</div>
            <p className="text-[11px] text-slate-500">Zero quedas nas últimas 72 horas</p>
          </div>
        </div>
      )}

      {/* Add Tenant Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-base text-slate-900">Provisionar Nova Empresa Tenant</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTenant} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nome da Empresa</label>
                <input
                  type="text"
                  required
                  value={newTenantForm.name}
                  onChange={(e) => setNewTenantForm({ ...newTenantForm, name: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-purple-600"
                  placeholder="Ex: Prime Imóveis"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Produto WooTech Contratado</label>
                <select
                  value={newTenantForm.productType}
                  onChange={(e) => setNewTenantForm({ ...newTenantForm, productType: e.target.value as any })}
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-purple-600 font-bold"
                >
                  <option value="URBAN">WooTech Urban (Urbano & Locação)</option>
                  <option value="RURAL">WooTech Rural (Fazendas & CAR)</option>
                  <option value="INCORP">WooTech Incorp (SPE & Obras)</option>
                  <option value="LOTE">WooTech Lote (Loteamentos & VSO)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">CNPJ</label>
                  <input
                    type="text"
                    value={newTenantForm.cnpj}
                    onChange={(e) => setNewTenantForm({ ...newTenantForm, cnpj: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-purple-600"
                    placeholder="00.000.000/0001-00"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Plano SaaS</label>
                  <select
                    value={newTenantForm.plan}
                    onChange={(e) => setNewTenantForm({ ...newTenantForm, plan: e.target.value as any })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-purple-600"
                  >
                    <option value="Básico">Básico</option>
                    <option value="Profissional">Profissional</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition-colors"
                >
                  Criar Instância Tenant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
