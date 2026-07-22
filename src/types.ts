export type ProductType = 'URBAN' | 'RURAL' | 'INCORP' | 'LOTE';

export type UserRole =
  | 'MEGA_ADMIN'
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'GERENTE'
  | 'CORRETOR'
  | 'CAPTADOR'
  | 'FINANCEIRO'
  | 'JURIDICO'
  | 'SECRETARIA'
  | 'MARKETING'
  | 'CLIENTE'
  | 'PARCEIRO';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  tenantId: string;
  avatarUrl?: string;
  phone?: string;
  creci?: string;
}

export interface Tenant {
  id: string;
  name: string;
  cnpj: string;
  logoUrl?: string;
  primaryColor: string;
  productType: ProductType;
  plan: 'Básico' | 'Profissional' | 'Enterprise';
  activeUsersCount: number;
  domain: string;
  whatsappStatus: 'CONNECTED' | 'DISCONNECTED' | 'PAIRING';
}

export interface Property {
  id: string;
  code: string;
  title: string;
  description: string;
  transactionType: 'VENDA' | 'LOCACAO' | 'TEMPORADA' | 'LANÇAMENTO_SPE';
  price: number;
  rentalPrice?: number;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  images: string[];
  status: 'DISPONIVEL' | 'RESERVADO' | 'VENDIDO' | 'ALUGADO';
  productType: ProductType;
  areaM2?: number;
  createdAt: string;

  // Urban Specs
  bedrooms?: number;
  suites?: number;
  bathrooms?: number;
  parkingSpots?: number;
  condoFee?: number;
  iptuAnnual?: number;
  features?: string[];

  // Rural Specs
  areaHa?: number;
  carCode?: string;
  carStatus?: 'REGULAR' | 'PENDENTE' | 'ANALISE';
  reservaLegalHa?: number;
  appHa?: number;
  soilType?: string;
  currentCulture?: string;
  waterSourcesCount?: number;

  // Incorp Specs
  speName?: string;
  vgvTotal?: number;
  totalUnits?: number;
  soldUnits?: number;
  constructionProgressPercent?: number;
  roiExpectedPercent?: number;

  // Lote Specs
  subdivisionName?: string;
  totalLots?: number;
  availableLots?: number;
  reservedLots?: number;
  soldLots?: number;
  avgPricePerM2?: number;
  abcCategory?: 'A' | 'B' | 'C';
}

export type PipelineStage =
  | 'LEAD_NOVO'
  | 'CONTATO_REALIZADO'
  | 'VISITA_AGENDADA'
  | 'PROPOSTA'
  | 'EM_CONTRATO'
  | 'GANHO'
  | 'PERDIDO';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: 'Site' | 'Meta Ads' | 'WhatsApp' | 'Portal Zap' | 'Viva Real' | 'Indicação';
  stage: PipelineStage;
  value: number;
  score: number; // 0 - 100
  assignedBrokerId: string;
  assignedBrokerName: string;
  productType: ProductType;
  interestedPropertyId?: string;
  interestedPropertyTitle?: string;
  lastInteraction: string;
  notes?: string;
  tags?: string[];
}

export interface FinancialTransaction {
  id: string;
  description: string;
  type: 'RECEITA' | 'DESPESA' | 'COMISSAO' | 'REPASSE';
  amount: number;
  dueDate: string;
  paymentDate?: string;
  category: string;
  costCenter: string;
  status: 'PAGO' | 'PENDENTE' | 'ATRASADO';
  paymentMethod: 'PIX' | 'BOLETO' | 'CARTAO' | 'TRANSFERENCIA';
  propertyCode?: string;
  clientName?: string;
}

export interface GISLayer {
  id: string;
  name: string;
  type: 'SATELLITE' | 'STREETS' | 'CAR_RESERVE' | 'CAR_APP' | 'LOT_GRID' | 'SOIL_CLASSIFICATION' | 'FIRE_RISK';
  visible: boolean;
  color: string;
}

export interface MarketplaceModule {
  id: string;
  name: string;
  description: string;
  category: 'Comunicação' | 'Documentos' | 'IA' | 'Financeiro' | 'Geointeligência' | 'Portais';
  priceMonthly: number;
  installed: boolean;
  iconName: string;
  popularBadge?: string;
}

export interface AIAnalysisResult {
  title: string;
  summary: string;
  keyInsights: string[];
  suggestedAction: string;
  confidenceScore: number;
}
