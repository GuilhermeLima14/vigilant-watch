// ============================================
// src/lib/mappers/typeMappers.ts
// Funções helper para conversão entre tipos antigos e novos
// ============================================

import { 
  RiskLevel, 
  KYCStatus, 
  TransactionType, 
  AlertSeverity, 
  AlertStatus 
} from '@/types/api';

// ============================================
// Conversão de Enums: String -> Número
// ============================================

export function mapRiskLevel(value: string | RiskLevel): RiskLevel {
  if (typeof value === 'number') return value;
  
  const mapping: Record<string, RiskLevel> = {
    'LOW': RiskLevel.Low,
    'MEDIUM': RiskLevel.Medium,
    'HIGH': RiskLevel.High,
    'CRITICAL': RiskLevel.High, // Backend não tem CRITICAL
  };
  
  return mapping[value.toUpperCase()] ?? RiskLevel.Low;
}

export function mapKYCStatus(value: string | KYCStatus): KYCStatus {
  if (typeof value === 'number') return value;
  
  const mapping: Record<string, KYCStatus> = {
    'PENDING': KYCStatus.Pending,
    'APPROVED': KYCStatus.Verified,
    'VERIFIED': KYCStatus.Verified,
    'REJECTED': KYCStatus.Rejected,
    'EXPIRED': KYCStatus.Rejected, // Backend não tem EXPIRED
  };
  
  return mapping[value.toUpperCase()] ?? KYCStatus.Pending;
}

export function mapTransactionType(value: string | TransactionType): TransactionType {
  if (typeof value === 'number') return value;
  
  const mapping: Record<string, TransactionType> = {
    'DEPOSIT': TransactionType.Deposit,
    'WITHDRAWAL': TransactionType.Withdraw,
    'WITHDRAW': TransactionType.Withdraw,
    'TRANSFER': TransactionType.Transfer,
  };
  
  return mapping[value.toUpperCase()] ?? TransactionType.Deposit;
}

export function mapAlertSeverity(value: string | AlertSeverity): AlertSeverity {
  if (typeof value === 'number') return value;
  
  const mapping: Record<string, AlertSeverity> = {
    'LOW': AlertSeverity.Low,
    'MEDIUM': AlertSeverity.Medium,
    'HIGH': AlertSeverity.High,
    'CRITICAL': AlertSeverity.Critical,
  };
  
  return mapping[value.toUpperCase()] ?? AlertSeverity.Low;
}

export function mapAlertStatus(value: string | AlertStatus): AlertStatus {
  if (typeof value === 'number') return value;
  
  const mapping: Record<string, AlertStatus> = {
    'NEW': AlertStatus.New,
    'UNDER_REVIEW': AlertStatus.Review,
    'REVIEW': AlertStatus.Review,
    'RESOLVED': AlertStatus.Resolved,
    'DISMISSED': AlertStatus.Resolved, // Backend não tem DISMISSED
  };
  
  return mapping[value.toUpperCase()] ?? AlertStatus.New;
}

// ============================================
// Conversão de Enums: Número -> String (para display)
// ============================================

export function getRiskLevelLabel(riskLevel: RiskLevel): string {
  const labels: Record<RiskLevel, string> = {
    [RiskLevel.Low]: 'Baixo',
    [RiskLevel.Medium]: 'Médio',
    [RiskLevel.High]: 'Alto',
  };
  
  return labels[riskLevel] ?? 'Desconhecido';
}

export function getKYCStatusLabel(status: KYCStatus): string {
  const labels: Record<KYCStatus, string> = {
    [KYCStatus.Pending]: 'Pendente',
    [KYCStatus.Verified]: 'Verificado',
    [KYCStatus.Rejected]: 'Rejeitado',
  };
  
  return labels[status] ?? 'Desconhecido';
}

export function getTransactionTypeLabel(type: TransactionType): string {
  const labels: Record<TransactionType, string> = {
    [TransactionType.Deposit]: 'Depósito',
    [TransactionType.Withdraw]: 'Saque',
    [TransactionType.Transfer]: 'Transferência',
  };
  
  return labels[type] ?? 'Desconhecido';
}

export function getAlertSeverityLabel(severity: AlertSeverity): string {
  const labels: Record<AlertSeverity, string> = {
    [AlertSeverity.Low]: 'Baixa',
    [AlertSeverity.Medium]: 'Média',
    [AlertSeverity.High]: 'Alta',
    [AlertSeverity.Critical]: 'Crítica',
  };
  
  return labels[severity] ?? 'Desconhecida';
}

export function getAlertStatusLabel(status: AlertStatus): string {
  const labels: Record<AlertStatus, string> = {
    [AlertStatus.New]: 'Novo',
    [AlertStatus.Review]: 'Em Análise',
    [AlertStatus.Resolved]: 'Resolvido',
  };
  
  return labels[status] ?? 'Desconhecido';
}

// ============================================
// Conversão de Classes CSS (para StatusBadge)
// ============================================

export function getRiskLevelBadgeClass(riskLevel: RiskLevel): string {
  const classes: Record<RiskLevel, string> = {
    [RiskLevel.Low]: 'bg-success/20 text-success border-success/30',
    [RiskLevel.Medium]: 'bg-warning/20 text-warning border-warning/30',
    [RiskLevel.High]: 'bg-destructive/20 text-destructive border-destructive/30',
  };
  
  return classes[riskLevel] ?? 'bg-muted text-muted-foreground';
}

export function getKYCStatusBadgeClass(status: KYCStatus): string {
  const classes: Record<KYCStatus, string> = {
    [KYCStatus.Pending]: 'bg-warning/20 text-warning border-warning/30',
    [KYCStatus.Verified]: 'bg-success/20 text-success border-success/30',
    [KYCStatus.Rejected]: 'bg-destructive/20 text-destructive border-destructive/30',
  };
  
  return classes[status] ?? 'bg-muted text-muted-foreground';
}

export function getTransactionTypeBadgeClass(type: TransactionType): string {
  const classes: Record<TransactionType, string> = {
    [TransactionType.Deposit]: 'bg-success/20 text-success border-success/30',
    [TransactionType.Withdraw]: 'bg-destructive/20 text-destructive border-destructive/30',
    [TransactionType.Transfer]: 'bg-primary/20 text-primary border-primary/30',
  };
  
  return classes[type] ?? 'bg-muted text-muted-foreground';
}

export function getAlertSeverityBadgeClass(severity: AlertSeverity): string {
  const classes: Record<AlertSeverity, string> = {
    [AlertSeverity.Low]: 'bg-success/20 text-success border-success/30',
    [AlertSeverity.Medium]: 'bg-warning/20 text-warning border-warning/30',
    [AlertSeverity.High]: 'bg-destructive/20 text-destructive border-destructive/30',
    [AlertSeverity.Critical]: 'bg-destructive text-destructive-foreground border-destructive',
  };
  
  return classes[severity] ?? 'bg-muted text-muted-foreground';
}

export function getAlertStatusBadgeClass(status: AlertStatus): string {
  const classes: Record<AlertStatus, string> = {
    [AlertStatus.New]: 'bg-info/20 text-info border-info/30',
    [AlertStatus.Review]: 'bg-warning/20 text-warning border-warning/30',
    [AlertStatus.Resolved]: 'bg-success/20 text-success border-success/30',
  };
  
  return classes[status] ?? 'bg-muted text-muted-foreground';
}