// ============================================
// src/types/api/enums.ts
// Enums baseados no backend (Watchdog.Domain.Enums)
// ============================================

export enum RiskLevel {
  Low = 0,
  Medium = 1,
  High = 2,
}

export enum KYCStatus {
  Pending = 0,
  Verified = 1,
  Rejected = 2,
}

export enum TransactionType {
  Deposit = 1,
  Withdraw = 2,
  Transfer = 3,
}

export enum AlertSeverity {
  Low = 1,
  Medium = 2,
  High = 3,
  Critical = 4,
}

export enum AlertStatus {
  New = 1,
  Review = 2,
  Resolved = 3,
}

export enum RuleCode {
  DailyLimit = 1,
  HighFrequency = 2,
  SuspiciousCountry = 3,
  LargeAmount = 4,
}

// ============================================
// Funções Helper para conversão de dados mockados
// ============================================

/**
 * Converte um RiskLevel do formato antigo (string) para o novo (enum)
 */
export function convertRiskLevel(oldRiskLevel: string): RiskLevel {
  const mapping: Record<string, RiskLevel> = {
    'LOW': RiskLevel.Low,
    'MEDIUM': RiskLevel.Medium,
    'HIGH': RiskLevel.High,
    'CRITICAL': RiskLevel.High, // Backend não tem CRITICAL, mapear para High
  };
  return mapping[oldRiskLevel] || RiskLevel.Low;
}

/**
 * Converte um KYCStatus do formato antigo (string) para o novo (enum)
 */
export function convertKYCStatus(oldKYCStatus: string): KYCStatus {
  const mapping: Record<string, KYCStatus> = {
    'PENDING': KYCStatus.Pending,
    'APPROVED': KYCStatus.Verified,
    'REJECTED': KYCStatus.Rejected,
    'EXPIRED': KYCStatus.Rejected, // Backend não tem EXPIRED, mapear para Rejected
  };
  return mapping[oldKYCStatus] || KYCStatus.Pending;
}

/**
 * Converte um TransactionType do formato antigo (string) para o novo (enum)
 */
export function convertTransactionType(oldType: string): TransactionType {
  const mapping: Record<string, TransactionType> = {
    'DEPOSIT': TransactionType.Deposit,
    'WITHDRAWAL': TransactionType.Withdraw,
    'TRANSFER': TransactionType.Transfer,
  };
  return mapping[oldType] || TransactionType.Deposit;
}

/**
 * Converte um AlertSeverity do formato antigo (string) para o novo (enum)
 */
export function convertAlertSeverity(oldSeverity: string): AlertSeverity {
  const mapping: Record<string, AlertSeverity> = {
    'LOW': AlertSeverity.Low,
    'MEDIUM': AlertSeverity.Medium,
    'HIGH': AlertSeverity.High,
    'CRITICAL': AlertSeverity.Critical,
  };
  return mapping[oldSeverity] || AlertSeverity.Low;
}

/**
 * Converte um AlertStatus do formato antigo (string) para o novo (enum)
 */
export function convertAlertStatus(oldStatus: string): AlertStatus {
  const mapping: Record<string, AlertStatus> = {
    'NEW': AlertStatus.New,
    'UNDER_REVIEW': AlertStatus.Review,
    'RESOLVED': AlertStatus.Resolved,
    'DISMISSED': AlertStatus.Resolved, // Backend não tem DISMISSED, mapear para Resolved
  };
  return mapping[oldStatus] || AlertStatus.New;
}