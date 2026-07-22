import React, { useState } from 'react';
import {
  CheckCircle2,
  Building,
  Palette,
  Users,
  Upload,
  UserPlus,
  MessageSquare,
  Mail,
  Calendar,
  Globe,
  Sparkles,
  X,
  ChevronRight,
  ChevronLeft,
  QrCode,
  Check,
  Tractor,
  Building2,
  MapPin,
  FileSpreadsheet,
  Zap,
  Smartphone,
  ShieldCheck,
  Send,
  Layers,
  Settings2,
  Compass,
  ArrowRight,
  Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ProductType } from '../types';

interface OnboardingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  currentProduct?: ProductType;
  onFinishOnboarding?: (data: any) => void;
}

export const OnboardingWizardModal: React.FC<OnboardingWizardProps> = ({
  isOpen,
  onClose,
  currentProduct = 'URBAN',
  onFinishOnboarding,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedModule, setSelectedModule] = useState<ProductType>(currentProduct);

  const [formData, setFormData] = useState({
    companyName: 'WooTech Imob Imobiliária & Incorporações',
    cnpj: '45.892.102/0001-88',
    creci: 'CRECI-J 38.920',
    phone: '(11) 98765-4321',
    address: 'Av. Brigadeiro Faria Lima, 3477 - Itaim Bibi, SP',
    cityState: 'São Paulo - SP',
    
    // Branding
    logoUploaded: true,
    primaryColor: '#2563EB',
    colorTheme: 'blue',
    portalSubdomain: 'wootech-demois',

    // Team
    teamMembers: [
      { id: 1, name: 'Carlos Eduardo', email: 'carlos@wootech.com.br', role: 'Diretor / Admin' },
      { id: 2, name: 'Mariana Silva', email: 'mariana@wootech.com.br', role: 'Gerente de Vendas' },
      { id: 3, name: 'Lucas Mendes', email: 'lucas@wootech.com.br', role: 'Corretor Especialista' },
    ],
    newMemberName: '',
    newMemberEmail: '',
    newMemberRole: 'Corretor Especialista',

    // Data Import
    propertyImportSource: 'xml', // 'xml', 'excel', 'api'
    propertyImportSuccess: true,
    propertyImportCount: 42,
    leadImportCount: 128,

    // Communication & Integrations
    whatsAppConnected: false,
    whatsAppPhone: '(11) 98765-4321',
    testMessageSent: false,
    emailServerConnected: true,
    emailProvider: 'Google Workspace (OAuth)',
    calendarSynced: true,

    // Product Module Specific Settings
    // Rural
    sicarDefault: 'SP-3550308-8921829102',
    incraCode: '950.128.002.918-2',
    sigefSynced: true,
    agronomicDefaultCrops: ['Soja', 'Milho', 'Gado Nelore'],

    // Incorp
    speDefaultName: 'SPE Residencial Horizon Ltda',
    inccIndexed: true,
    constructionStagesDefaults: ['Fundação (100%)', 'Estrutura (80%)', 'Alvenaria (45%)', 'Acabamento (15%)'],

    // Lote
    quadraNamingConvention: 'Q[0-9]{2}-L[0-9]{2}', // Q01-L05
    vsoTargetPercent: 35,
    loteInfrastructureDefaults: ['Asfalto CBUQ', 'Rede de Esgoto', 'Energia Elétrica LED', 'Portaria Guarita 24h'],

    // Portals
    portalsEnabled: {
      zap: true,
      vivareal: true,
      olx: true,
      imovelweb: true,
      chavesnamao: false,
      metaCatalog: true,
    },
  });

  if (!isOpen) return null;

  const steps = [
    { num: 1, title: 'Módulo & Empresa', icon: Building, desc: 'Dados e Segmento' },
    { num: 2, title: 'Marca & Cores', icon: Palette, desc: 'Logo, Cores e Subdomínio' },
    { num: 3, title: 'Equipe & Perfis', icon: Users, desc: 'Importação de Colaboradores' },
    { num: 4, title: 'Carga de Imóveis', icon: Upload, desc: 'XML, Excel, CSV ou API' },
    { num: 5, title: 'Base de Leads', icon: UserPlus, desc: 'Importação do CRM' },
    { num: 6, title: 'WhatsApp', icon: MessageSquare, desc: 'Conexão WhatsMeow QR Code' },
    { num: 7, title: 'E-mail & Agenda', icon: Mail, desc: 'Google Workspace & Outlook' },
    { num: 8, title: `Ajustes ${selectedModule}`, icon: Settings2, desc: `Parâmetros do Módulo ${selectedModule}` },
    { num: 9, title: 'Portais XML', icon: Globe, desc: 'Zap, VivaReal, OLX' },
    { num: 10, title: 'Lançamento', icon: Sparkles, desc: 'Ecossistema Pronto' },
  ];

  const colorPresets = [
    { id: 'blue', name: 'Blue Sapphire', primary: '#2563EB', accent: '#60A5FA' },
    { id: 'emerald', name: 'Emerald Eco', primary: '#059669', accent: '#34D399' },
    { id: 'indigo', name: 'Royal Indigo', primary: '#4F46E5', accent: '#818CF8' },
    { id: 'amber', name: 'Obsidian Gold', primary: '#D97706', accent: '#FBBF24' },
    { id: 'slate', name: 'Slate Corporate', primary: '#334155', accent: '#94A3B8' },
  ];

  const handleNext = () => {
    if (currentStep < 10) {
      setCurrentStep((prev) => prev + 1);
    } else {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
      });
      if (onFinishOnboarding) {
        onFinishOnboarding({
          ...formData,
          selectedModule,
        });
      }
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleAddMember = () => {
    if (!formData.newMemberName || !formData.newMemberEmail) return;
    setFormData({
      ...formData,
      teamMembers: [
        ...formData.teamMembers,
        {
          id: Date.now(),
          name: formData.newMemberName,
          email: formData.newMemberEmail,
          role: formData.newMemberRole,
        },
      ],
      newMemberName: '',
      newMemberEmail: '',
    });
  };

  const handleRemoveMember = (id: number) => {
    setFormData({
      ...formData,
      teamMembers: formData.teamMembers.filter((m) => m.id !== id),
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-5xl overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-black text-white text-base shadow-md">
              W
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-base text-white tracking-tight">Assistente Dinâmico de Onboarding WooTech Imob</h2>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  Tenant Setup
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Passo {currentStep} de 10 — Configuração guiada e personalizada para seu ecossistema imobiliário
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Tracker */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 overflow-x-auto no-scrollbar flex items-center gap-2">
          {steps.map((s) => {
            const isDone = s.num < currentStep;
            const isCurrent = s.num === currentStep;
            return (
              <button
                key={s.num}
                onClick={() => setCurrentStep(s.num)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isCurrent
                    ? 'bg-blue-600 text-white shadow-xs font-bold scale-[1.02]'
                    : isDone
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 hover:bg-emerald-100/60'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : (
                  <span
                    className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center shrink-0 font-bold ${
                      isCurrent ? 'bg-white text-blue-600' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {s.num}
                  </span>
                )}
                <span>{s.title}</span>
              </button>
            );
          })}
        </div>

        {/* Step Body */}
        <div className="p-8 overflow-y-auto flex-1 min-h-[420px] bg-slate-50/40">
          
          {/* STEP 1: MÓDULO & DADOS DA EMPRESA */}
          {currentStep === 1 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Etapa 1: Seleção de Módulo & Cadastro Inicial</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Escolha o segmento primário do tenant para adaptarmos o fluxo de onboarding e as regras de negócio.
                </p>
              </div>

              {/* Module Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Segmento Imobiliário Principal
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'URBAN' as ProductType, name: 'Imobi Urbana', icon: Building2, desc: 'Casas, Aptos & Locação', color: 'blue' },
                    { id: 'RURAL' as ProductType, name: 'Agronegócio', icon: Tractor, desc: 'Fazendas, Glebas & CAR', color: 'emerald' },
                    { id: 'INCORP' as ProductType, name: 'Incorporadora', icon: Layers, desc: 'Lançamentos & VGV', color: 'purple' },
                    { id: 'LOTE' as ProductType, name: 'Loteamentos', icon: MapPin, desc: 'Quadras, Lotes & VSO', color: 'amber' },
                  ].map((m) => {
                    const isSel = selectedModule === m.id;
                    const IconComp = m.icon;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setSelectedModule(m.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                          isSel
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-600/30 scale-[1.02]'
                            : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <IconComp className={`w-5 h-5 ${isSel ? 'text-white' : 'text-slate-600'}`} />
                          {isSel && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                        <div>
                          <div className="font-bold text-sm">{m.name}</div>
                          <div className={`text-[11px] mt-0.5 ${isSel ? 'text-blue-100' : 'text-slate-500'}`}>
                            {m.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Company Details */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Razão Social / Nome Fantasia</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">CNPJ</label>
                    <input
                      type="text"
                      value={formData.cnpj}
                      onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">CRECI Jurídico (CRECI-J)</label>
                    <input
                      type="text"
                      value={formData.creci}
                      onChange={(e) => setFormData({ ...formData, creci: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Telefone Principal</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Cidade / Estado HQ</label>
                    <input
                      type="text"
                      value={formData.cityState}
                      onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: MARCA & CORES */}
          {currentStep === 2 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Etapa 2: Personalização da Marca (White-Label)</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Defina o logotipo, a paleta de cores institucional e o subdomínio exclusivo do portal do seu tenant.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {/* Logo Upload Simulation */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Logotipo Institucional</label>
                    <div className="border-2 border-dashed border-blue-200 bg-blue-50/50 hover:bg-blue-50 rounded-2xl p-6 text-center transition-colors cursor-pointer flex flex-col items-center justify-center">
                      <Upload className="w-8 h-8 text-blue-600 mb-2" />
                      <span className="text-xs font-bold text-slate-800">Arraste a logo PNG / SVG</span>
                      <span className="text-[11px] text-slate-500 mt-0.5">Suporta fundo transparente (200x60px)</span>
                      <span className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[11px]">
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Logo Padrão Carregada
                      </span>
                    </div>
                  </div>

                  {/* Color Palette Presets */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Paleta de Cores do Sistema</label>
                    <div className="grid grid-cols-1 gap-2">
                      {colorPresets.map((cp) => (
                        <button
                          key={cp.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, primaryColor: cp.primary, colorTheme: cp.id })}
                          className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium transition-all ${
                            formData.primaryColor === cp.primary
                              ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold ring-1 ring-blue-600/30'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full border border-slate-300" style={{ backgroundColor: cp.primary }} />
                            <span>{cp.name}</span>
                          </div>
                          <span className="font-mono text-[10px] text-slate-500">{cp.primary}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Portal Subdomain */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Subdomínio do Portal Imobiliário</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={formData.portalSubdomain}
                        onChange={(e) => setFormData({ ...formData, portalSubdomain: e.target.value })}
                        className="flex-1 px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 font-mono text-slate-800"
                      />
                      <span className="text-xs font-bold text-slate-500">.wootechimob.com.br</span>
                    </div>
                    <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Subdomínio https://{formData.portalSubdomain}.wootechimob.com.br disponível!
                    </p>
                  </div>
                </div>

                {/* Live Branding Preview */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> Pré-Visualização em Tempo Real
                    </div>

                    <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs bg-slate-900 text-white">
                      {/* Simulated Navbar */}
                      <div className="px-4 py-3 flex items-center justify-between border-b border-slate-800" style={{ backgroundColor: '#0f172a' }}>
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs text-white" style={{ backgroundColor: formData.primaryColor }}>
                            {formData.companyName.charAt(0)}
                          </div>
                          <span className="font-bold text-xs truncate max-w-[140px] text-white">
                            {formData.companyName}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold text-white" style={{ backgroundColor: formData.primaryColor }}>
                          {selectedModule}
                        </span>
                      </div>

                      {/* Simulated Card */}
                      <div className="p-4 bg-white text-slate-900 space-y-3">
                        <div className="h-28 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center relative overflow-hidden">
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-extrabold text-white shadow-xs" style={{ backgroundColor: formData.primaryColor }}>
                            Lançamento Premium
                          </div>
                          <span className="text-xs text-slate-400 font-semibold">Exemplo de Imóvel</span>
                        </div>

                        <div className="space-y-1">
                          <div className="font-bold text-xs text-slate-900">Residencial Villa WooTech</div>
                          <div className="text-[11px] text-slate-500">Itaim Bibi • São Paulo / SP</div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                          <div className="font-black text-sm" style={{ color: formData.primaryColor }}>
                            R$ 1.850.000
                          </div>
                          <button
                            type="button"
                            className="px-3 py-1 rounded-lg text-white font-bold text-[10px] shadow-2xs"
                            style={{ backgroundColor: formData.primaryColor }}
                          >
                            Ver Detalhes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600">
                    💡 O tema de cor selecionado será aplicado automaticamente aos relatórios em PDF, propostas comerciais e landing pages do portal.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: EQUIPE */}
          {currentStep === 3 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Etapa 3: Gestão de Equipe & Perfis de Acesso</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Convide corretores, gerentes e diretores para colaborar em seu ambiente WooTech Imob.
                </p>
              </div>

              {/* Add Member Form */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">Adicionar Novo Colaborador</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Nome Completo"
                    value={formData.newMemberName}
                    onChange={(e) => setFormData({ ...formData, newMemberName: e.target.value })}
                    className="px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                  />
                  <input
                    type="email"
                    placeholder="E-mail Corporativo"
                    value={formData.newMemberEmail}
                    onChange={(e) => setFormData({ ...formData, newMemberEmail: e.target.value })}
                    className="px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                  />
                  <div className="flex gap-2">
                    <select
                      value={formData.newMemberRole}
                      onChange={(e) => setFormData({ ...formData, newMemberRole: e.target.value })}
                      className="px-2 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 flex-1"
                    >
                      <option value="Corretor Especialista">Corretor</option>
                      <option value="Gerente de Vendas">Gerente de Vendas</option>
                      <option value="Financeiro / ERP">Financeiro</option>
                      <option value="Diretor / Admin">Diretor / Admin</option>
                    </select>
                    <button
                      type="button"
                      onClick={handleAddMember}
                      className="px-3 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shrink-0"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Current Team Members List */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                <div className="px-4 py-3 bg-slate-100/70 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Membros da Equipe ({formData.teamMembers.length})</span>
                  <span className="text-slate-500 font-normal text-[11px]">Enviaremos convite de acesso por e-mail</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {formData.teamMembers.map((m) => (
                    <div key={m.id} className="p-3.5 flex items-center justify-between hover:bg-slate-50/80 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center">
                          {m.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-xs text-slate-900">{m.name}</div>
                          <div className="text-[11px] text-slate-500">{m.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold border border-slate-200">
                          {m.role}
                        </span>
                        {formData.teamMembers.length > 1 && (
                          <button
                            onClick={() => handleRemoveMember(m.id)}
                            className="p-1 text-slate-400 hover:text-red-600 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: CARGA DE IMÓVEIS */}
          {currentStep === 4 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Etapa 4: Carga de Imóveis & Carteira</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Carregue seu estoque existente via arquivos XML de portais (Zap/VivaReal/OLX), planilha Excel ou API de terceiros.
                </p>
              </div>

              {/* Source Selector Tabs */}
              <div className="flex rounded-xl bg-slate-200/70 p-1 text-xs font-semibold text-slate-700">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, propertyImportSource: 'xml' })}
                  className={`flex-1 py-2 rounded-lg text-center transition-all ${
                    formData.propertyImportSource === 'xml'
                      ? 'bg-white text-blue-700 font-bold shadow-2xs'
                      : 'hover:text-slate-900'
                  }`}
                >
                  Feed XML (Zap / VivaReal)
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, propertyImportSource: 'excel' })}
                  className={`flex-1 py-2 rounded-lg text-center transition-all ${
                    formData.propertyImportSource === 'excel'
                      ? 'bg-white text-blue-700 font-bold shadow-2xs'
                      : 'hover:text-slate-900'
                  }`}
                >
                  Planilha Excel / CSV
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, propertyImportSource: 'api' })}
                  className={`flex-1 py-2 rounded-lg text-center transition-all ${
                    formData.propertyImportSource === 'api'
                      ? 'bg-white text-blue-700 font-bold shadow-2xs'
                      : 'hover:text-slate-900'
                  }`}
                >
                  Integração API (CV / CRM)
                </button>
              </div>

              {/* Dropzone */}
              <div className="border-2 border-dashed border-blue-300 bg-white hover:bg-blue-50/40 rounded-2xl p-8 text-center transition-colors cursor-pointer shadow-2xs">
                <FileSpreadsheet className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <h4 className="font-bold text-slate-800 text-sm">
                  {formData.propertyImportSource === 'xml' && 'Arraste seu arquivo CargaImoveis.xml ou insira o link de feed'}
                  {formData.propertyImportSource === 'excel' && 'Arraste sua planilha .XLSX ou .CSV com a lista de imóveis'}
                  {formData.propertyImportSource === 'api' && 'Conecte sua conta Construtor de Vendas (CV), Salesforce ou HubSpot'}
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  O algoritmo WooTech reconhece automaticamente os campos de Tipo, Bairro, Área, Preço, Quartos e Vagas.
                </p>

                <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl inline-flex items-center gap-3 text-left">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <div className="font-bold text-xs text-emerald-900">
                      Simulação Concluída: {formData.propertyImportCount} Imóveis Mapeados!
                    </div>
                    <div className="text-[11px] text-emerald-700">
                      32 Urbanos, 6 Rurais e 4 Lançamentos prontos para publicação nos portais.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: BASE DE CLIENTES */}
          {currentStep === 5 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Etapa 5: Importação da Base de Leads & Clientes</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Traga seu histórico de compradores, proprietários e investidores para o CRM WooTech.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Mapeador Inteligente de Leads</h4>
                    <p className="text-xs text-slate-500">Mapeamos as colunas Nome, E-mail, Telefone, Origem, Estágio e VGV estimado.</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2 font-mono text-slate-700">
                  <div className="font-bold text-slate-800 font-sans">Prévia dos Dados Mapeados (Simulação):</div>
                  <div className="grid grid-cols-4 gap-2 pt-1 border-t border-slate-200 font-semibold text-slate-500 text-[11px]">
                    <span>Nome</span>
                    <span>Telefone</span>
                    <span>Origem</span>
                    <span>Estágio</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-[11px]">
                    <span className="truncate">Roberto Alencar</span>
                    <span>(11) 99882-1100</span>
                    <span>Zap Imóveis</span>
                    <span className="text-blue-600 font-bold">Proposta</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-[11px]">
                    <span className="truncate">Patrícia Lima</span>
                    <span>(19) 98711-2244</span>
                    <span>Instagram Ad</span>
                    <span className="text-purple-600 font-bold">Visita Agendada</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-bold flex items-center justify-between">
                  <span>{formData.leadImportCount} Leads Importados e Atribuidos aos Corretores</span>
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: WHATSAPP */}
          {currentStep === 6 && (
            <div className="space-y-6 max-w-2xl mx-auto text-center">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Etapa 6: Conexão WhatsApp via WhatsMeow API</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Conecte o número do WhatsApp Business da empresa para habilitar automações de atendimento e régua CRM.
                </p>
              </div>

              <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-md mx-auto space-y-4">
                {formData.whatsAppConnected ? (
                  <div className="text-emerald-700 py-4 flex flex-col items-center">
                    <CheckCircle2 className="w-16 h-16 text-emerald-600 mb-2" />
                    <span className="font-extrabold text-base">WhatsApp WhatsMeow Conectado!</span>
                    <span className="text-xs text-slate-500 mt-1">Número: {formData.whatsAppPhone}</span>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, testMessageSent: true })}
                      disabled={formData.testMessageSent}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      {formData.testMessageSent ? 'Mensagem de Teste Enviada!' : 'Enviar Mensagem de Teste'}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="p-3 bg-slate-100 rounded-2xl border border-slate-200 mb-3">
                      <QrCode className="w-40 h-40 text-slate-900" />
                    </div>
                    <p className="text-xs text-slate-600 font-semibold mb-4">
                      Abra o WhatsApp &gt; Aparelhos Conectados &gt; Conectar um Aparelho
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, whatsAppConnected: true })}
                      className="px-5 py-2.5 bg-emerald-600 text-white font-extrabold text-xs rounded-xl hover:bg-emerald-700 transition-colors shadow-md flex items-center gap-2"
                    >
                      <Smartphone className="w-4 h-4" />
                      Simular Leitura de QR Code
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 7: E-MAIL & CALENDÁRIO */}
          {currentStep === 7 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Etapa 7: Servidor de E-mail & Calendário</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Sincronize sua caixa de saída SMTP e a agenda para visitas imobiliárias agendadas.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <span>Servidor de E-mail</span>
                  </div>
                  <p className="text-xs text-slate-500">Envio de propostas, boletos e contratos diretamente do seu domínio.</p>
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center justify-between">
                    <span>Google Workspace (OAuth)</span>
                    <Check className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    <span>Agenda de Visitas</span>
                  </div>
                  <p className="text-xs text-slate-500">Sincronização bidirecional com o Google Calendar e Outlook 365.</p>
                  <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs font-semibold text-indigo-800 flex items-center justify-between">
                    <span>Google Calendar Conectado</span>
                    <Check className="w-4 h-4 text-indigo-600" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 8: REGRA ESPECÍFICA DO MÓDULO SELECIONADO */}
          {currentStep === 8 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 text-[10px] font-black uppercase">
                    Módulo Ativo: {selectedModule}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mt-2">
                  Etapa 8: Parâmetros do Módulo {selectedModule}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Ajustes operacionais customizados especificamente para a vertical {selectedModule}.
                </p>
              </div>

              {/* RURAL PARAMETERS */}
              {selectedModule === 'RURAL' && (
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm border-b border-slate-100 pb-2">
                    <Tractor className="w-5 h-5 text-emerald-600" />
                    <span>Parâmetros de Geointeligência & Agronegócio</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Máscara de Registro CAR / SICAR</label>
                      <input
                        type="text"
                        value={formData.sicarDefault}
                        onChange={(e) => setFormData({ ...formData, sicarDefault: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Código INCRA / CCIR Padrão</label>
                      <input
                        type="text"
                        value={formData.incraCode}
                        onChange={(e) => setFormData({ ...formData, incraCode: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-mono"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs font-semibold text-emerald-900">
                    <span>Sincronização com SIGEF / Georreferenciamento Ativada</span>
                    <Check className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>
              )}

              {/* INCORP PARAMETERS */}
              {selectedModule === 'INCORP' && (
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center gap-2 text-purple-800 font-extrabold text-sm border-b border-slate-100 pb-2">
                    <Layers className="w-5 h-5 text-purple-600" />
                    <span>Parâmetros de Incorporação & Obras</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Estrutura de SPE Padrão</label>
                    <input
                      type="text"
                      value={formData.speDefaultName}
                      onChange={(e) => setFormData({ ...formData, speDefaultName: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                    />
                  </div>

                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-xs text-purple-900 font-semibold flex items-center justify-between">
                    <span>Reajuste Financeiro de Parcelas por INCC + IGPM Automático</span>
                    <Check className="w-4 h-4 text-purple-600" />
                  </div>
                </div>
              )}

              {/* LOTE PARAMETERS */}
              {selectedModule === 'LOTE' && (
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center gap-2 text-amber-800 font-extrabold text-sm border-b border-slate-100 pb-2">
                    <MapPin className="w-5 h-5 text-amber-600" />
                    <span>Parâmetros de Loteamento & VSO</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Padrão de Nomenclatura Quadra/Lote</label>
                      <input
                        type="text"
                        value={formData.quadraNamingConvention}
                        onChange={(e) => setFormData({ ...formData, quadraNamingConvention: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Meta de VSO (Venda Sobre Oferta)</label>
                      <input
                        type="number"
                        value={formData.vsoTargetPercent}
                        onChange={(e) => setFormData({ ...formData, vsoTargetPercent: Number(e.target.value) })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* URBAN PARAMETERS */}
              {selectedModule === 'URBAN' && (
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center gap-2 text-blue-800 font-extrabold text-sm border-b border-slate-100 pb-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <span>Parâmetros de Imobiliária Urbana & Locação</span>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs font-semibold text-blue-900 flex items-center justify-between">
                    <span>Taxa de Comissão Padrão Vendas: 6% | Locação: 1º Aluguel</span>
                    <Check className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 9: PORTAIS XML */}
          {currentStep === 9 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Etapa 9: Publicação em Portais Imobiliários</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Ative o envio automático da sua carteira para os maiores portais do Brasil via Feed XML.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'zap', name: 'Zap Imóveis', desc: 'Grupo OLX' },
                  { id: 'vivareal', name: 'VivaReal', desc: 'Grupo OLX' },
                  { id: 'olx', name: 'OLX Brasil', desc: 'Anúncios Diretos' },
                  { id: 'imovelweb', name: 'Imovelweb', desc: 'Navent' },
                  { id: 'metaCatalog', name: 'Meta Catalog', desc: 'Facebook & IG' },
                  { id: 'chavesnamao', name: 'Chaves na Mão', desc: 'Portal Regional' },
                ].map((portal) => (
                  <div
                    key={portal.id}
                    className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-xs text-slate-900">{portal.name}</div>
                      <div className="text-[10px] text-slate-500">{portal.desc}</div>
                    </div>
                    <span className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                  </div>
                ))}
              </div>

              <div className="p-4 bg-slate-900 text-white rounded-2xl text-xs space-y-2">
                <div className="font-bold text-blue-400">Link do Seu Feed XML de Integração:</div>
                <div className="p-2 bg-slate-800 rounded-lg font-mono text-[11px] text-slate-300 truncate">
                  https://api.wootechimob.com.br/v1/feed/{formData.portalSubdomain}.xml
                </div>
              </div>
            </div>
          )}

          {/* STEP 10: CONCLUÍDO & LANÇAMENTO */}
          {currentStep === 10 && (
            <div className="space-y-6 max-w-xl mx-auto text-center py-4">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center mx-auto shadow-lg scale-110">
                <Sparkles className="w-10 h-10" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs uppercase tracking-wider">
                  Pronto para Operar • 100% Configurado
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2">
                  WooTech Imob Ativado com Sucesso!
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  O ecossistema imobiliário para <strong>{formData.companyName}</strong> no módulo <strong>{selectedModule}</strong> foi provisionado. Sua equipe de {formData.teamMembers.length} colaboradores já possui acesso às ferramentas de CRM, ERP, IA e Geointeligência.
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2 shadow-2xs">
                <div className="font-bold text-slate-900 border-b border-slate-100 pb-2">Resumo da Configuração:</div>
                <div className="flex justify-between text-slate-600">
                  <span>Módulo Principal:</span>
                  <span className="font-bold text-blue-700">{selectedModule}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Imóveis Mapeados:</span>
                  <span className="font-bold text-emerald-700">{formData.propertyImportCount} imóveis</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>WhatsApp Business:</span>
                  <span className="font-bold text-emerald-700">Conectado ({formData.whatsAppPhone})</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Portal do Cliente:</span>
                  <span className="font-mono text-slate-800">{formData.portalSubdomain}.wootechimob.com.br</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-100/80 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              currentStep === 1
                ? 'opacity-40 cursor-not-allowed text-slate-400 bg-transparent'
                : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500">
              Passo {currentStep} de 10
            </span>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <span>{currentStep === 10 ? 'Concluir & Iniciar Sistema' : 'Avançar Etapa'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
