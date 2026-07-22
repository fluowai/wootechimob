import React, { useState } from 'react';
import {
  Users2,
  Plus,
  Search,
  MessageSquare,
  Phone,
  Mail,
  Sparkles,
  FileText,
  Calendar,
  Clock,
  ChevronRight,
  UserCheck,
  Tag,
  Send,
  X,
  CheckCircle2,
} from 'lucide-react';
import { Lead, PipelineStage, ProductType } from '../types';

interface CRMModuleProps {
  leads: Lead[];
  currentProduct: ProductType;
  onAddLead: (lead: Lead) => void;
  onUpdateLeadStage: (leadId: string, newStage: PipelineStage) => void;
  onOpenAiDrawer: () => void;
}

export const CRMModule: React.FC<CRMModuleProps> = ({
  leads,
  currentProduct,
  onAddLead,
  onUpdateLeadStage,
  onOpenAiDrawer,
}) => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Lead Form State
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    email: '',
    phone: '',
    source: 'Site' as const,
    value: 500000,
    notes: '',
  });

  const stages: { id: PipelineStage; label: string; color: string }[] = [
    { id: 'LEAD_NOVO', label: 'Lead Novo', color: 'bg-slate-100 text-slate-700' },
    { id: 'CONTATO_REALIZADO', label: 'Contato Realizado', color: 'bg-blue-50 text-blue-700' },
    { id: 'VISITA_AGENDADA', label: 'Visita Agendada', color: 'bg-amber-50 text-amber-700' },
    { id: 'PROPOSTA', label: 'Proposta Apresentada', color: 'bg-indigo-50 text-indigo-700' },
    { id: 'EM_CONTRATO', label: 'Em Contrato', color: 'bg-purple-50 text-purple-700' },
    { id: 'GANHO', label: 'Ganho / Fechado', color: 'bg-emerald-50 text-emerald-700' },
  ];

  const filteredLeads = leads.filter(
    (l) =>
      l.productType === currentProduct &&
      (l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.phone.includes(searchQuery))
  );

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.name) return;

    const created: Lead = {
      id: `lead-${Date.now()}`,
      name: newLeadForm.name,
      email: newLeadForm.email,
      phone: newLeadForm.phone,
      source: newLeadForm.source,
      stage: 'LEAD_NOVO',
      value: newLeadForm.value,
      score: 80,
      assignedBrokerId: 'usr-1',
      assignedBrokerName: 'Carlos Eduardo (Corretor)',
      productType: currentProduct,
      lastInteraction: new Date().toISOString(),
      notes: newLeadForm.notes,
      tags: ['Novo Lead', currentProduct],
    };

    onAddLead(created);
    setIsAddModalOpen(false);
    setNewLeadForm({ name: '', email: '', phone: '', source: 'Site', value: 500000, notes: '' });
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[10px] uppercase tracking-wider">
              CRM Comercial — {currentProduct}
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1">Funil de Vendas & Oportunidades</h2>
          <p className="text-xs text-slate-500">Distribuição automática de leads e esteira Kanban de negócios.</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar lead por nome ou fone..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
            />
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Lead</span>
          </button>
        </div>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 overflow-x-auto pb-4 no-scrollbar">
        {stages.map((stg) => {
          const stageLeads = filteredLeads.filter((l) => l.stage === stg.id);
          const stageTotalValue = stageLeads.reduce((acc, l) => acc + l.value, 0);

          return (
            <div key={stg.id} className="bg-slate-100/70 border border-slate-200/80 rounded-2xl p-3 flex flex-col min-w-[200px]">
              
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200/80">
                <span className="font-bold text-xs text-slate-800">{stg.label}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                  {stageLeads.length}
                </span>
              </div>

              {/* Total Column Value */}
              <div className="text-[10px] text-slate-500 font-semibold mb-3">
                Total: <span className="text-slate-800 font-bold">R$ {(stageTotalValue / 1000).toFixed(0)}k</span>
              </div>

              {/* Cards List */}
              <div className="space-y-2 flex-1 overflow-y-auto max-h-[500px]">
                {stageLeads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className="p-3 bg-white border border-slate-200 hover:border-blue-400 rounded-xl shadow-2xs hover:shadow-xs transition-all cursor-pointer space-y-2 group"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {lead.name}
                      </h4>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
                        {lead.score} pts
                      </span>
                    </div>

                    <div className="text-xs font-extrabold text-slate-900">
                      R$ {lead.value.toLocaleString('pt-BR')}
                    </div>

                    <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
                      <span>{lead.source}</span>
                      <span className="font-semibold text-slate-700">{lead.assignedBrokerName.split(' ')[0]}</span>
                    </div>
                  </div>
                ))}

                {stageLeads.length === 0 && (
                  <div className="text-center py-8 text-[11px] text-slate-400 border border-dashed border-slate-200 rounded-xl">
                    Sem leads nesta etapa
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Lead Drawer */}
      {selectedLead && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] bg-white border-l border-slate-200 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
          
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <div>
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Ficha do Cliente / Lead</span>
              <h3 className="font-bold text-base text-white">{selectedLead.name}</h3>
            </div>
            <button
              onClick={() => setSelectedLead(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 overflow-y-auto flex-1 space-y-5 text-xs text-slate-700">
            
            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => alert(`Enviando mensagem via WhatsApp WhatsMeow para ${selectedLead.phone}...`)}
                className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 hover:bg-emerald-100 flex flex-col items-center gap-1 text-[11px] transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={() => alert(`Gerando Proposta Comercial PDF para ${selectedLead.name}...`)}
                className="p-2.5 rounded-xl bg-blue-50 text-blue-800 font-bold border border-blue-200 hover:bg-blue-100 flex flex-col items-center gap-1 text-[11px] transition-colors"
              >
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Proposta PDF</span>
              </button>

              <button
                onClick={onOpenAiDrawer}
                className="p-2.5 rounded-xl bg-indigo-50 text-indigo-800 font-bold border border-indigo-200 hover:bg-indigo-100 flex flex-col items-center gap-1 text-[11px] transition-colors"
              >
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Análise IA</span>
              </button>
            </div>

            {/* Stage Selector */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
              <span className="font-bold text-slate-800 block">Etapa no Funil:</span>
              <select
                value={selectedLead.stage}
                onChange={(e) => {
                  const newStg = e.target.value as PipelineStage;
                  onUpdateLeadStage(selectedLead.id, newStg);
                  setSelectedLead({ ...selectedLead, stage: newStg });
                }}
                className="w-full p-2 rounded-lg border border-slate-300 bg-white font-semibold text-slate-800 focus:outline-none"
              >
                {stages.map((stg) => (
                  <option key={stg.id} value={stg.id}>
                    {stg.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Info Table */}
            <div className="space-y-2 border-t border-slate-200 pt-3">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">E-mail:</span>
                <span className="font-semibold text-slate-800">{selectedLead.email}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Telefone:</span>
                <span className="font-semibold text-slate-800">{selectedLead.phone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Origem:</span>
                <span className="font-semibold text-slate-800">{selectedLead.source}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Valor da Negociação:</span>
                <span className="font-bold text-blue-600">R$ {selectedLead.value.toLocaleString('pt-BR')}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">Corretor Responsável:</span>
                <span className="font-semibold text-slate-800">{selectedLead.assignedBrokerName}</span>
              </div>
            </div>

            {/* Notes & Timeline */}
            <div className="space-y-2 pt-2">
              <span className="font-bold text-slate-800 block">Observações & Histórico:</span>
              <p className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 leading-relaxed">
                {selectedLead.notes || 'Nenhuma observação registrada.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal Add Lead */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-base text-slate-900">Cadastrar Novo Lead Comercial</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nome do Cliente</label>
                <input
                  type="text"
                  required
                  value={newLeadForm.name}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600"
                  placeholder="Ex: Gabriel Alcantara"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">E-mail</label>
                  <input
                    type="email"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600"
                    placeholder="gabriel@email.com"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Telefone / WhatsApp</label>
                  <input
                    type="text"
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600"
                    placeholder="(11) 99999-8888"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Origem do Lead</label>
                  <select
                    value={newLeadForm.source}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, source: e.target.value as any })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600"
                  >
                    <option value="Site">Site Institucional</option>
                    <option value="Meta Ads">Meta Ads (Instagram/FB)</option>
                    <option value="Portal Zap">Portal Zap Imóveis</option>
                    <option value="WhatsApp">WhatsApp Direto</option>
                    <option value="Indicação">Indicação</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Valor Estimado (R$)</label>
                  <input
                    type="number"
                    value={newLeadForm.value}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, value: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Notas / Interesse</label>
                <textarea
                  rows={3}
                  value={newLeadForm.notes}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600"
                  placeholder="Detalhes do imóvel procurado..."
                />
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
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
                >
                  Cadastrar Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
