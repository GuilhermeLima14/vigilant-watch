import { create } from 'zustand';
import type { Client, Transaction, Alert, DashboardStats, ClientReport } from '@/types';

// Mock data
const mockClients: Client[] = [
  { id: '1', name: 'Empresa Alpha Ltda', country: 'BR', riskLevel: 'LOW', kycStatus: 'APPROVED', createdAt: new Date('2024-01-15'), updatedAt: new Date('2024-06-10') },
  { id: '2', name: 'Global Trading Inc', country: 'US', riskLevel: 'MEDIUM', kycStatus: 'APPROVED', createdAt: new Date('2024-02-20'), updatedAt: new Date('2024-07-05') },
  { id: '3', name: 'Offshore Holdings SA', country: 'PA', riskLevel: 'HIGH', kycStatus: 'PENDING', createdAt: new Date('2024-03-10'), updatedAt: new Date('2024-08-01') },
  { id: '4', name: 'Tech Solutions GmbH', country: 'DE', riskLevel: 'LOW', kycStatus: 'APPROVED', createdAt: new Date('2024-04-05'), updatedAt: new Date('2024-09-15') },
  { id: '5', name: 'Eastern Imports Ltd', country: 'RU', riskLevel: 'CRITICAL', kycStatus: 'REJECTED', createdAt: new Date('2024-05-12'), updatedAt: new Date('2024-10-20') },
  { id: '6', name: 'Mediterranean Trade Co', country: 'IT', riskLevel: 'MEDIUM', kycStatus: 'APPROVED', createdAt: new Date('2024-06-01'), updatedAt: new Date('2024-11-01') },
  { id: '7', name: 'Asian Ventures Pte', country: 'SG', riskLevel: 'LOW', kycStatus: 'APPROVED', createdAt: new Date('2024-07-08'), updatedAt: new Date('2024-11-15') },
  { id: '8', name: 'Nordic Finance AB', country: 'SE', riskLevel: 'LOW', kycStatus: 'EXPIRED', createdAt: new Date('2024-08-22'), updatedAt: new Date('2024-12-01') },
];

const mockTransactions: Transaction[] = [
  { id: 't1', clientId: '1', clientName: 'Empresa Alpha Ltda', type: 'DEPOSIT', amount: 150000, currency: 'USD', counterparty: 'Bank of America', counterpartyCountry: 'US', transactionDate: new Date('2024-12-18'), createdAt: new Date() },
  { id: 't2', clientId: '3', clientName: 'Offshore Holdings SA', type: 'TRANSFER', amount: 500000, currency: 'USD', counterparty: 'Cayman Trust', counterpartyCountry: 'KY', transactionDate: new Date('2024-12-18'), createdAt: new Date() },
  { id: 't3', clientId: '5', clientName: 'Eastern Imports Ltd', type: 'WITHDRAWAL', amount: 75000, currency: 'EUR', counterparty: 'Sberbank', counterpartyCountry: 'RU', transactionDate: new Date('2024-12-17'), createdAt: new Date() },
  { id: 't4', clientId: '2', clientName: 'Global Trading Inc', type: 'DEPOSIT', amount: 200000, currency: 'USD', counterparty: 'JP Morgan', counterpartyCountry: 'US', transactionDate: new Date('2024-12-17'), createdAt: new Date() },
  { id: 't5', clientId: '1', clientName: 'Empresa Alpha Ltda', type: 'TRANSFER', amount: 45000, currency: 'BRL', counterparty: 'Itaú Unibanco', counterpartyCountry: 'BR', transactionDate: new Date('2024-12-16'), createdAt: new Date() },
  { id: 't6', clientId: '3', clientName: 'Offshore Holdings SA', type: 'DEPOSIT', amount: 9500, currency: 'USD', counterparty: 'Private Bank', counterpartyCountry: 'CH', transactionDate: new Date('2024-12-18'), createdAt: new Date() },
  { id: 't7', clientId: '3', clientName: 'Offshore Holdings SA', type: 'DEPOSIT', amount: 9200, currency: 'USD', counterparty: 'Private Bank', counterpartyCountry: 'CH', transactionDate: new Date('2024-12-18'), createdAt: new Date() },
  { id: 't8', clientId: '3', clientName: 'Offshore Holdings SA', type: 'DEPOSIT', amount: 9800, currency: 'USD', counterparty: 'Private Bank', counterpartyCountry: 'CH', transactionDate: new Date('2024-12-18'), createdAt: new Date() },
];

const mockAlerts: Alert[] = [
  { id: 'a1', clientId: '3', clientName: 'Offshore Holdings SA', transactionId: 't2', ruleCode: 'RISK_COUNTRY', ruleDescription: 'Transferência para país de alto risco (Ilhas Cayman)', severity: 'HIGH', status: 'NEW', createdAt: new Date('2024-12-18') },
  { id: 'a2', clientId: '5', clientName: 'Eastern Imports Ltd', transactionId: 't3', ruleCode: 'RISK_COUNTRY', ruleDescription: 'Transação com país bloqueado (Rússia)', severity: 'CRITICAL', status: 'UNDER_REVIEW', createdAt: new Date('2024-12-17') },
  { id: 'a3', clientId: '3', clientName: 'Offshore Holdings SA', transactionId: 't6', ruleCode: 'STRUCTURING', ruleDescription: 'Possível fracionamento detectado - múltiplas transações próximas a $10.000', severity: 'HIGH', status: 'NEW', createdAt: new Date('2024-12-18') },
  { id: 'a4', clientId: '1', clientName: 'Empresa Alpha Ltda', transactionId: 't1', ruleCode: 'DAILY_LIMIT', ruleDescription: 'Limite diário ultrapassado ($150.000 > $100.000)', severity: 'MEDIUM', status: 'RESOLVED', resolvedBy: 'João Silva', resolvedAt: new Date('2024-12-18'), resolutionNotes: 'Cliente apresentou documentação comprobatória', createdAt: new Date('2024-12-18') },
  { id: 'a5', clientId: '2', clientName: 'Global Trading Inc', transactionId: 't4', ruleCode: 'DAILY_LIMIT', ruleDescription: 'Limite diário ultrapassado ($200.000 > $100.000)', severity: 'MEDIUM', status: 'NEW', createdAt: new Date('2024-12-17') },
];

interface DataState {
  clients: Client[];
  transactions: Transaction[];
  alerts: Alert[];
  stats: DashboardStats;
  
  // Client actions
  addClient: (client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;
  
  // Transaction actions
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
  
  // Alert actions
  updateAlertStatus: (id: string, status: Alert['status'], notes?: string) => void;
  
  // Reports
  getClientReports: () => ClientReport[];
}

export const useDataStore = create<DataState>((set, get) => ({
  clients: mockClients,
  transactions: mockTransactions,
  alerts: mockAlerts,
  stats: {
    totalClients: mockClients.length,
    highRiskClients: mockClients.filter(c => c.riskLevel === 'HIGH' || c.riskLevel === 'CRITICAL').length,
    totalTransactionsToday: mockTransactions.filter(t => t.transactionDate.toDateString() === new Date().toDateString()).length,
    transactionVolumeToday: mockTransactions.filter(t => t.transactionDate.toDateString() === new Date().toDateString()).reduce((acc, t) => acc + t.amount, 0),
    activeAlerts: mockAlerts.filter(a => a.status === 'NEW' || a.status === 'UNDER_REVIEW').length,
    criticalAlerts: mockAlerts.filter(a => a.severity === 'CRITICAL' && a.status !== 'RESOLVED').length,
    resolvedAlertsToday: mockAlerts.filter(a => a.status === 'RESOLVED' && a.resolvedAt?.toDateString() === new Date().toDateString()).length,
    pendingKYC: mockClients.filter(c => c.kycStatus === 'PENDING' || c.kycStatus === 'EXPIRED').length,
  },
  
  addClient: (clientData) => {
    const newClient: Client = {
      ...clientData,
      id: `c${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({
      clients: [...state.clients, newClient],
      stats: { ...state.stats, totalClients: state.stats.totalClients + 1 },
    }));
  },
  
  updateClient: (id, updates) => {
    set((state) => ({
      clients: state.clients.map((c) =>
        c.id === id ? { ...c, ...updates, updatedAt: new Date() } : c
      ),
    }));
  },
  
  addTransaction: (transactionData) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: `t${Date.now()}`,
      createdAt: new Date(),
    };
    set((state) => ({
      transactions: [...state.transactions, newTransaction],
    }));
  },
  
  updateAlertStatus: (id, status, notes) => {
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === id
          ? {
              ...a,
              status,
              resolutionNotes: notes || a.resolutionNotes,
              resolvedAt: status === 'RESOLVED' ? new Date() : a.resolvedAt,
            }
          : a
      ),
    }));
  },
  
  getClientReports: () => {
    const { clients, transactions, alerts } = get();
    return clients.map((client) => {
      const clientTransactions = transactions.filter((t) => t.clientId === client.id);
      const clientAlerts = alerts.filter((a) => a.clientId === client.id);
      return {
        clientId: client.id,
        clientName: client.name,
        totalTransactions: clientTransactions.length,
        totalVolume: clientTransactions.reduce((acc, t) => acc + t.amount, 0),
        alertCount: clientAlerts.length,
        riskLevel: client.riskLevel,
      };
    });
  },
}));
