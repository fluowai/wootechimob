import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { UrbanDashboard } from './components/UrbanDashboard';
import { RuralDashboard } from './components/RuralDashboard';
import { IncorpDashboard } from './components/IncorpDashboard';
import { LoteDashboard } from './components/LoteDashboard';
import { CRMModule } from './components/CRMModule';
import { FinancialModule } from './components/FinancialModule';
import { GISModule } from './components/GISModule';
import { PortalFeedModule } from './components/PortalFeedModule';
import { MegaAdminModule } from './components/MegaAdminModule';
import { CommandPalette } from './components/CommandPalette';
import { OnboardingWizardModal } from './components/OnboardingWizardModal';
import { MarketplaceModal } from './components/MarketplaceModal';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';
import { PropertyDetailDrawer } from './components/PropertyDetailDrawer';

import {
  mockTenants,
  mockProperties,
  mockLeads,
  mockTransactions,
  mockMarketplaceModules,
} from './data/mockData';

import {
  ProductType,
  Tenant,
  UserRole,
  PipelineStage,
  Property,
  Lead,
  FinancialTransaction,
  MarketplaceModule,
} from './types';

export default function App() {
  // Global Workspace Context
  const [tenants, setTenants] = useState<Tenant[]>(mockTenants);
  const [currentTenant, setCurrentTenant] = useState<Tenant>(mockTenants[0]);
  const [currentProduct, setCurrentProduct] = useState<ProductType>('URBAN');
  const [currentRole, setCurrentRole] = useState<UserRole>('ADMIN');

  // Navigation Active Tab
  const [activeTab, setActiveTab] = useState<string>('DASHBOARD');

  // Data Collections
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [transactions, setTransactions] = useState<FinancialTransaction[]>(mockTransactions);
  const [marketplaceModules, setMarketplaceModules] = useState<MarketplaceModule[]>(mockMarketplaceModules);

  // Modals & Drawers States
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isMarketplaceOpen, setIsMarketplaceOpen] = useState(false);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Handle Product Segment Switching
  const handleProductChange = (prod: ProductType) => {
    setCurrentProduct(prod);
    const matchingTenant = tenants.find((t) => t.productType === prod);
    if (matchingTenant) {
      setCurrentTenant(matchingTenant);
    }
  };

  // Handlers for Data Updates
  const handleAddLead = (newLead: Lead) => {
    setLeads([newLead, ...leads]);
  };

  const handleUpdateLeadStage = (leadId: string, newStage: PipelineStage) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, stage: newStage } : l))
    );
  };

  const handleAddTransaction = (newTx: FinancialTransaction) => {
    setTransactions([newTx, ...transactions]);
  };

  const handleAddTenant = (newTenant: Tenant) => {
    setTenants([newTenant, ...tenants]);
  };

  const handleToggleMarketplaceModule = (id: string) => {
    setMarketplaceModules((prev) =>
      prev.map((m) => (m.id === id ? { ...m, installed: !m.installed } : m))
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Global Top Navigation Bar */}
      <Navbar
        currentProduct={currentProduct}
        currentTenant={currentTenant}
        currentRole={currentRole}
        tenants={tenants}
        onSelectProduct={handleProductChange}
        onSelectTenant={setCurrentTenant}
        onSelectRole={setCurrentRole}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        onOpenMarketplace={() => setIsMarketplaceOpen(true)}
        onOpenAiDrawer={() => setIsAiDrawerOpen(true)}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Segment Aware Sidebar */}
        <Sidebar
          currentProduct={currentProduct}
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          currentRole={currentRole}
          isOpen={isSidebarOpen}
          onToggleOpen={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Main Content View Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          
          {/* 1. DASHBOARD TAB */}
          {activeTab === 'DASHBOARD' && (
            <>
              {currentProduct === 'URBAN' && (
                <UrbanDashboard
                  properties={properties}
                  leads={leads}
                  onOpenNewLeadModal={() => setActiveTab('CRM')}
                  onOpenAiDrawer={() => setIsAiDrawerOpen(true)}
                  onSelectProperty={setSelectedProperty}
                />
              )}

              {currentProduct === 'RURAL' && (
                <RuralDashboard
                  properties={properties}
                  leads={leads}
                  onOpenAiDrawer={() => setIsAiDrawerOpen(true)}
                  onSelectProperty={setSelectedProperty}
                  onOpenGisTab={() => setActiveTab('GIS')}
                />
              )}

              {currentProduct === 'INCORP' && (
                <IncorpDashboard
                  properties={properties}
                  leads={leads}
                  onOpenAiDrawer={() => setIsAiDrawerOpen(true)}
                  onSelectProperty={setSelectedProperty}
                />
              )}

              {currentProduct === 'LOTE' && (
                <LoteDashboard
                  properties={properties}
                  leads={leads}
                  onOpenAiDrawer={() => setIsAiDrawerOpen(true)}
                  onSelectProperty={setSelectedProperty}
                />
              )}
            </>
          )}

          {/* 2. CRM MODULE */}
          {activeTab === 'CRM' && (
            <CRMModule
              leads={leads}
              currentProduct={currentProduct}
              onAddLead={handleAddLead}
              onUpdateLeadStage={handleUpdateLeadStage}
              onOpenAiDrawer={() => setIsAiDrawerOpen(true)}
            />
          )}

          {/* 3. FINANCIAL MODULE */}
          {activeTab === 'FINANCIAL' && (
            <FinancialModule
              transactions={transactions}
              onAddTransaction={handleAddTransaction}
            />
          )}

          {/* 4. GIS GEOINTEL MODULE */}
          {activeTab === 'GIS' && (
            <GISModule
              properties={properties}
              currentProduct={currentProduct}
              onSelectProperty={setSelectedProperty}
            />
          )}

          {/* 5. PORTAL FEED XML MODULE */}
          {activeTab === 'PORTALS' && (
            <PortalFeedModule properties={properties} />
          )}

          {/* 6. MEGA ADMIN MODULE */}
          {activeTab === 'MEGA_ADMIN' && (
            <MegaAdminModule tenants={tenants} onAddTenant={handleAddTenant} />
          )}

          {/* Fallback view if unknown tab */}
          {['DASHBOARD', 'CRM', 'FINANCIAL', 'GIS', 'PORTALS', 'MEGA_ADMIN'].indexOf(activeTab) === -1 && (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
              <h2 className="font-bold text-lg text-slate-800">Módulo {activeTab} em Execução</h2>
              <p className="text-xs text-slate-500 mt-1">Este módulo está sincronizado com a instância WooTech {currentProduct}.</p>
            </div>
          )}
        </main>
      </div>

      {/* Global Modals & Drawers */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        properties={properties}
        leads={leads}
        onSelectProperty={setSelectedProperty}
        onSelectProduct={handleProductChange}
        onSelectTab={setActiveTab}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        onOpenAiDrawer={() => setIsAiDrawerOpen(true)}
      />

      <OnboardingWizardModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        currentProduct={currentProduct}
        onFinishOnboarding={(data) => {
          if (data?.selectedModule) {
            handleProductChange(data.selectedModule);
          }
        }}
      />

      <MarketplaceModal
        isOpen={isMarketplaceOpen}
        onClose={() => setIsMarketplaceOpen(false)}
        modules={marketplaceModules}
        onToggleModule={handleToggleMarketplaceModule}
      />

      <AIAssistantDrawer
        isOpen={isAiDrawerOpen}
        onClose={() => setIsAiDrawerOpen(false)}
        currentProduct={currentProduct}
      />

      <PropertyDetailDrawer
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onOpenAiDrawer={() => setIsAiDrawerOpen(true)}
      />
    </div>
  );
}
