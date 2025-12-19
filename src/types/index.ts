// Enums
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type KYCStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED';
export type TransactionType = 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER';
export type AlertSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type AlertStatus = 'NEW' | 'UNDER_REVIEW' | 'RESOLVED' | 'DISMISSED';
export type ComplianceRuleType = 'DAILY_LIMIT' | 'RISK_COUNTRY' | 'STRUCTURING';
export type CountryRiskLevel = 'MEDIUM' | 'HIGH' | 'BLOCKED';

// Entities
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'analyst' | 'viewer';
  createdAt: Date;
}

export interface Client {
  id: string;
  name: string;
  country: string;
  riskLevel: RiskLevel;
  kycStatus: KYCStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  clientId: string;
  clientName?: string;
  type: TransactionType;
  amount: number;
  currency: string;
  counterparty: string;
  counterpartyCountry: string;
  transactionDate: Date;
  createdAt: Date;
}

export interface Alert {
  id: string;
  clientId: string;
  clientName?: string;
  transactionId: string;
  ruleCode: string;
  ruleDescription: string;
  severity: AlertSeverity;
  status: AlertStatus;
  resolutionNotes?: string;
  resolvedBy?: string;
  resolvedAt?: Date;
  createdAt: Date;
}

export interface ComplianceRule {
  id: string;
  code: string;
  name: string;
  description: string;
  ruleType: ComplianceRuleType;
  parameters: Record<string, unknown>;
  isActive: boolean;
  createdAt: Date;
}

export interface RiskCountry {
  id: string;
  countryCode: string;
  countryName: string;
  riskLevel: CountryRiskLevel;
  isActive: boolean;
  createdAt: Date;
}

// Dashboard Stats
export interface DashboardStats {
  totalClients: number;
  highRiskClients: number;
  totalTransactionsToday: number;
  transactionVolumeToday: number;
  activeAlerts: number;
  criticalAlerts: number;
  resolvedAlertsToday: number;
  pendingKYC: number;
}

// Report Data
export interface ClientReport {
  clientId: string;
  clientName: string;
  totalTransactions: number;
  totalVolume: number;
  alertCount: number;
  riskLevel: RiskLevel;
}
