// ============================================
// src/store/dataStore.ts
// Store unificado com dados mockados e funções Zustand
// ============================================

import { create } from 'zustand';
import { 
  ClientResponseDto, 
  TransactionResponseDto, 
  AlertResponseDto,
  RiskLevel,
  KYCStatus,
  TransactionType,
  AlertSeverity,
  AlertStatus,
  RuleCode
} from '@/types/api';

// ============================================
// Interfaces Locais (usadas apenas no frontend)
// ============================================

interface DashboardStats {
  totalClients: number;
  highRiskClients: number;
  totalTransactionsToday: number;
  transactionVolumeToday: number;
  activeAlerts: number;
  criticalAlerts: number;
  resolvedAlertsToday: number;
  pendingKYC: number;
}

interface ClientReport {
  clientId: string;
  clientName: string;
  totalTransactions: number;
  totalVolume: number;
  alertCount: number;
  riskLevel: RiskLevel;
}

// ============================================
// Extensões dos tipos da API (para uso no frontend)
// ============================================

interface Client extends ClientResponseDto {
  createdAt: Date;
  updatedAt: Date;
}

interface Transaction extends Omit<TransactionResponseDto, 'occurredAt' | 'createdAt'> {
  clientName?: string;
  counterparty: string;
  counterpartyCountry: string;
  occurredAt: Date;
  createdAt: Date;
}

interface Alert extends Omit<AlertResponseDto, 'createdAt' | 'resolvedAt'> {
  clientName?: string;
  ruleDescription: string;
  resolutionNotes?: string;
  resolvedBy?: string;
  createdAt: Date;
  resolvedAt?: Date;
}

// ============================================
// Mock Data - Clients
// ============================================

const mockClients: Client[] = [
  {
    externalId: '550e8400-e29b-41d4-a716-446655440001',
    name: 'Empresa Alpha Ltda',
    countryCode: 'BR',
    riskLevel: RiskLevel.Low,
    kycStatus: KYCStatus.Verified,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-06-10'),
  },
  {
    externalId: '550e8400-e29b-41d4-a716-446655440002',
    name: 'Global Trading Inc',
    countryCode: 'US',
    riskLevel: RiskLevel.Medium,
    kycStatus: KYCStatus.Verified,
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-07-05'),
  },
  {
    externalId: '550e8400-e29b-41d4-a716-446655440003',
    name: 'Offshore Holdings SA',
    countryCode: 'PA',
    riskLevel: RiskLevel.High,
    kycStatus: KYCStatus.Pending,
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-08-01'),
  },
  {
    externalId: '550e8400-e29b-41d4-a716-446655440004',
    name: 'Tech Solutions GmbH',
    countryCode: 'DE',
    riskLevel: RiskLevel.Low,
    kycStatus: KYCStatus.Verified,
    createdAt: new Date('2024-04-05'),
    updatedAt: new Date('2024-09-15'),
  },
  {
    externalId: '550e8400-e29b-41d4-a716-446655440005',
    name: 'Eastern Imports Ltd',
    countryCode: 'RU',
    riskLevel: RiskLevel.High,
    kycStatus: KYCStatus.Rejected,
    createdAt: new Date('2024-05-12'),
    updatedAt: new Date('2024-10-20'),
  },
  {
    externalId: '550e8400-e29b-41d4-a716-446655440006',
    name: 'Mediterranean Trade Co',
    countryCode: 'IT',
    riskLevel: RiskLevel.Medium,
    kycStatus: KYCStatus.Verified,
    createdAt: new Date('2024-06-01'),
    updatedAt: new Date('2024-11-01'),
  },
  {
    externalId: '550e8400-e29b-41d4-a716-446655440007',
    name: 'Asian Ventures Pte',
    countryCode: 'SG',
    riskLevel: RiskLevel.Low,
    kycStatus: KYCStatus.Verified,
    createdAt: new Date('2024-07-08'),
    updatedAt: new Date('2024-11-15'),
  },
  {
    externalId: '550e8400-e29b-41d4-a716-446655440008',
    name: 'Nordic Finance AB',
    countryCode: 'SE',
    riskLevel: RiskLevel.Low,
    kycStatus: KYCStatus.Pending,
    createdAt: new Date('2024-08-22'),
    updatedAt: new Date('2024-12-01'),
  },
];

// ============================================
// Mock Data - Transactions
// ============================================

const mockTransactions: Transaction[] = [
  {
    id: 1,
    externalId: '650e8400-e29b-41d4-a716-446655440001',
    clientId: 1,
    clientName: 'Empresa Alpha Ltda',
    type: TransactionType.Deposit,
    amount: { value: 150000, currencyCode: 'USD' },
    counterPartyId: 10,
    counterparty: 'Bank of America',
    counterpartyCountry: 'US',
    occurredAt: new Date('2024-12-18T10:30:00'),
    createdAt: new Date('2024-12-18T10:35:00'),
  },
  {
    id: 2,
    externalId: '650e8400-e29b-41d4-a716-446655440002',
    clientId: 3,
    clientName: 'Offshore Holdings SA',
    type: TransactionType.Transfer,
    amount: { value: 500000, currencyCode: 'USD' },
    counterPartyId: 11,
    counterparty: 'Cayman Trust',
    counterpartyCountry: 'KY',
    occurredAt: new Date('2024-12-18T14:20:00'),
    createdAt: new Date('2024-12-18T14:25:00'),
  },
  {
    id: 3,
    externalId: '650e8400-e29b-41d4-a716-446655440003',
    clientId: 5,
    clientName: 'Eastern Imports Ltd',
    type: TransactionType.Withdraw,
    amount: { value: 75000, currencyCode: 'EUR' },
    counterPartyId: 12,
    counterparty: 'Sberbank',
    counterpartyCountry: 'RU',
    occurredAt: new Date('2024-12-17T16:45:00'),
    createdAt: new Date('2024-12-17T16:50:00'),
  },
  {
    id: 4,
    externalId: '650e8400-e29b-41d4-a716-446655440004',
    clientId: 2,
    clientName: 'Global Trading Inc',
    type: TransactionType.Deposit,
    amount: { value: 200000, currencyCode: 'USD' },
    counterPartyId: 13,
    counterparty: 'JP Morgan',
    counterpartyCountry: 'US',
    occurredAt: new Date('2024-12-17T09:15:00'),
    createdAt: new Date('2024-12-17T09:20:00'),
  },
  {
    id: 5,
    externalId: '650e8400-e29b-41d4-a716-446655440005',
    clientId: 1,
    clientName: 'Empresa Alpha Ltda',
    type: TransactionType.Transfer,
    amount: { value: 45000, currencyCode: 'BRL' },
    counterPartyId: 14,
    counterparty: 'Itaú Unibanco',
    counterpartyCountry: 'BR',
    occurredAt: new Date('2024-12-16T11:30:00'),
    createdAt: new Date('2024-12-16T11:35:00'),
  },
  {
    id: 6,
    externalId: '650e8400-e29b-41d4-a716-446655440006',
    clientId: 3,
    clientName: 'Offshore Holdings SA',
    type: TransactionType.Deposit,
    amount: { value: 9500, currencyCode: 'USD' },
    counterPartyId: 15,
    counterparty: 'Private Bank',
    counterpartyCountry: 'CH',
    occurredAt: new Date('2024-12-18T08:00:00'),
    createdAt: new Date('2024-12-18T08:05:00'),
  },
  {
    id: 7,
    externalId: '650e8400-e29b-41d4-a716-446655440007',
    clientId: 3,
    clientName: 'Offshore Holdings SA',
    type: TransactionType.Deposit,
    amount: { value: 9200, currencyCode: 'USD' },
    counterPartyId: 15,
    counterparty: 'Private Bank',
    counterpartyCountry: 'CH',
    occurredAt: new Date('2024-12-18T09:00:00'),
    createdAt: new Date('2024-12-18T09:05:00'),
  },
  {
    id: 8,
    externalId: '650e8400-e29b-41d4-a716-446655440008',
    clientId: 3,
    clientName: 'Offshore Holdings SA',
    type: TransactionType.Deposit,
    amount: { value: 9800, currencyCode: 'USD' },
    counterPartyId: 15,
    counterparty: 'Private Bank',
    counterpartyCountry: 'CH',
    occurredAt: new Date('2024-12-18T10:00:00'),
    createdAt: new Date('2024-12-18T10:05:00'),
  },
  {
    id: 9,
    externalId: '650e8400-e29b-41d4-a716-446655440009',
    clientId: 4,
    clientName: 'Tech Solutions GmbH',
    type: TransactionType.Transfer,
    amount: { value: 125000, currencyCode: 'EUR' },
    counterPartyId: 16,
    counterparty: 'Deutsche Bank',
    counterpartyCountry: 'DE',
    occurredAt: new Date('2024-12-15T13:20:00'),
    createdAt: new Date('2024-12-15T13:25:00'),
  },
  {
    id: 10,
    externalId: '650e8400-e29b-41d4-a716-446655440010',
    clientId: 6,
    clientName: 'Mediterranean Trade Co',
    type: TransactionType.Deposit,
    amount: { value: 85000, currencyCode: 'EUR' },
    counterPartyId: 17,
    counterparty: 'UniCredit',
    counterpartyCountry: 'IT',
    occurredAt: new Date('2024-12-14T15:45:00'),
    createdAt: new Date('2024-12-14T15:50:00'),
  },
];

// ============================================
// Mock Data - Alerts
// ============================================

const mockAlerts: Alert[] = [
  {
    id: 1,
    clientId: 3,
    clientName: 'Offshore Holdings SA',
    transactionId: 2,
    ruleCode: RuleCode.SuspiciousCountry,
    ruleDescription: 'Transferência para país de alto risco (Ilhas Cayman)',
    severity: AlertSeverity.High,
    status: AlertStatus.New,
    createdAt: new Date('2024-12-18T14:30:00'),
  },
  {
    id: 2,
    clientId: 5,
    clientName: 'Eastern Imports Ltd',
    transactionId: 3,
    ruleCode: RuleCode.SuspiciousCountry,
    ruleDescription: 'Transação com país bloqueado (Rússia)',
    severity: AlertSeverity.Critical,
    status: AlertStatus.Review,
    createdAt: new Date('2024-12-17T17:00:00'),
  },
  {
    id: 3,
    clientId: 3,
    clientName: 'Offshore Holdings SA',
    transactionId: 6,
    ruleCode: RuleCode.HighFrequency,
    ruleDescription: 'Possível fracionamento detectado - múltiplas transações próximas a $10.000',
    severity: AlertSeverity.High,
    status: AlertStatus.New,
    createdAt: new Date('2024-12-18T10:15:00'),
  },
  {
    id: 4,
    clientId: 1,
    clientName: 'Empresa Alpha Ltda',
    transactionId: 1,
    ruleCode: RuleCode.DailyLimit,
    ruleDescription: 'Limite diário ultrapassado ($150.000 > $100.000)',
    severity: AlertSeverity.Medium,
    status: AlertStatus.Resolved,
    resolvedBy: 'João Silva',
    resolvedAt: new Date('2024-12-18T16:20:00'),
    resolutionNotes: 'Cliente apresentou documentação comprobatória',
    createdAt: new Date('2024-12-18T10:40:00'),
  },
  {
    id: 5,
    clientId: 2,
    clientName: 'Global Trading Inc',
    transactionId: 4,
    ruleCode: RuleCode.DailyLimit,
    ruleDescription: 'Limite diário ultrapassado ($200.000 > $100.000)',
    severity: AlertSeverity.Medium,
    status: AlertStatus.New,
    createdAt: new Date('2024-12-17T09:30:00'),
  },
  {
    id: 6,
    clientId: 4,
    clientName: 'Tech Solutions GmbH',
    transactionId: 9,
    ruleCode: RuleCode.LargeAmount,
    ruleDescription: 'Transação de valor elevado detectada (€125.000)',
    severity: AlertSeverity.Medium,
    status: AlertStatus.Resolved,
    resolvedBy: 'Maria Santos',
    resolvedAt: new Date('2024-12-15T17:10:00'),
    resolutionNotes: 'Transação regular, contrato de prestação de serviços verificado',
    createdAt: new Date('2024-12-15T13:30:00'),
  },
  {
    id: 7,
    clientId: 6,
    clientName: 'Mediterranean Trade Co',
    transactionId: 10,
    ruleCode: RuleCode.LargeAmount,
    ruleDescription: 'Transação de valor elevado detectada (€85.000)',
    severity: AlertSeverity.Low,
    status: AlertStatus.Review,
    createdAt: new Date('2024-12-14T16:00:00'),
  },
];

// ============================================
// Store State Interface
// ============================================

interface DataState {
  // Data
  clients: Client[];
  transactions: Transaction[];
  alerts: Alert[];
  stats: DashboardStats;
  
  // Client actions
  addClient: (client: Omit<Client, 'externalId' | 'createdAt' | 'updatedAt'>) => void;
  updateClient: (externalId: string, updates: Partial<Client>) => void;
  getClientByExternalId: (externalId: string) => Client | undefined;
  getClientByInternalId: (id: number) => Client | undefined;
  
  // Transaction actions
  addTransaction: (transaction: Omit<Transaction, 'id' | 'externalId' | 'createdAt'>) => void;
  getTransactionsByClientId: (clientId: number) => Transaction[];
  
  // Alert actions
  updateAlertStatus: (id: number, status: AlertStatus, notes?: string) => void;
  getAlertsByClientId: (clientId: number) => Alert[];
  
  // Reports
  getClientReports: () => ClientReport[];
}

// ============================================
// Store Implementation
// ============================================

export const useDataStore = create<DataState>((set, get) => ({
  clients: mockClients,
  transactions: mockTransactions,
  alerts: mockAlerts,
  
  stats: {
    totalClients: mockClients.length,
    highRiskClients: mockClients.filter(c => c.riskLevel === RiskLevel.High).length,
    totalTransactionsToday: mockTransactions.filter(t => 
      t.occurredAt.toDateString() === new Date().toDateString()
    ).length,
    transactionVolumeToday: mockTransactions
      .filter(t => t.occurredAt.toDateString() === new Date().toDateString())
      .reduce((acc, t) => acc + t.amount.value, 0),
    activeAlerts: mockAlerts.filter(a => 
      a.status === AlertStatus.New || a.status === AlertStatus.Review
    ).length,
    criticalAlerts: mockAlerts.filter(a => 
      a.severity === AlertSeverity.Critical && a.status !== AlertStatus.Resolved
    ).length,
    resolvedAlertsToday: mockAlerts.filter(a => 
      a.status === AlertStatus.Resolved && 
      a.resolvedAt?.toDateString() === new Date().toDateString()
    ).length,
    pendingKYC: mockClients.filter(c => 
      c.kycStatus === KYCStatus.Pending
    ).length,
  },
  
  // ==========================================
  // Client Actions
  // ==========================================
  
  addClient: (clientData) => {
    const newClient: Client = {
      ...clientData,
      externalId: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    set((state) => ({
      clients: [...state.clients, newClient],
      stats: { 
        ...state.stats, 
        totalClients: state.stats.totalClients + 1 
      },
    }));
  },
  
  updateClient: (externalId, updates) => {
    set((state) => ({
      clients: state.clients.map((c) =>
        c.externalId === externalId 
          ? { ...c, ...updates, updatedAt: new Date() } 
          : c
      ),
    }));
  },
  
  getClientByExternalId: (externalId: string) => {
    return get().clients.find(c => c.externalId === externalId);
  },
  
  getClientByInternalId: (id: number) => {
    // Mapeia IDs internos (1, 2, 3...) para clientes via índice
    return get().clients[id - 1];
  },
  
  // ==========================================
  // Transaction Actions
  // ==========================================
  
  addTransaction: (transactionData) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: Date.now(),
      externalId: crypto.randomUUID(),
      createdAt: new Date(),
    };
    
    set((state) => ({
      transactions: [...state.transactions, newTransaction],
    }));
  },
  
  getTransactionsByClientId: (clientId: number) => {
    return get().transactions.filter(t => t.clientId === clientId);
  },
  
  // ==========================================
  // Alert Actions
  // ==========================================
  
  updateAlertStatus: (id, status, notes) => {
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === id
          ? {
              ...a,
              status,
              resolutionNotes: notes || a.resolutionNotes,
              resolvedAt: status === AlertStatus.Resolved ? new Date() : a.resolvedAt,
            }
          : a
      ),
    }));
  },
  
  getAlertsByClientId: (clientId: number) => {
    return get().alerts.filter(a => a.clientId === clientId);
  },
  
  // ==========================================
  // Reports
  // ==========================================
  
  getClientReports: () => {
    const { clients, transactions, alerts } = get();
    
    return clients.map((client, index) => {
      const clientId = index + 1; // Internal ID
      const clientTransactions = transactions.filter(t => t.clientId === clientId);
      const clientAlerts = alerts.filter(a => a.clientId === clientId);
      
      return {
        clientId: client.externalId,
        clientName: client.name,
        totalTransactions: clientTransactions.length,
        totalVolume: clientTransactions.reduce((acc, t) => acc + t.amount.value, 0),
        alertCount: clientAlerts.length,
        riskLevel: client.riskLevel,
      };
    });
  },
}));