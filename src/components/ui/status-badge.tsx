import { cn } from '@/lib/utils';
import { RiskLevel, KYCStatus, AlertSeverity, AlertStatus, TransactionType } from '@/types/api';

// Union type que aceita tanto enums quanto strings (retrocompatibilidade)
type BadgeType = 
  | RiskLevel 
  | KYCStatus 
  | AlertSeverity 
  | AlertStatus 
  | TransactionType
  | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  | 'PENDING' | 'APPROVED' | 'VERIFIED' | 'REJECTED' | 'EXPIRED'
  | 'NEW' | 'UNDER_REVIEW' | 'RESOLVED' | 'DISMISSED'
  | 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER';

interface StatusBadgeProps {
  type: BadgeType;
  className?: string;
}

// ============================================
// Helper: Normaliza para string key
// ============================================
function normalizeType(type: BadgeType): string {
  // Se já é string, retorna uppercase
  if (typeof type === 'string') {
    return type.toUpperCase();
  }
  
  // Mapeia enums numéricos para strings
  
  // RiskLevel
  if (type === RiskLevel.Low) return 'LOW';
  if (type === RiskLevel.Medium) return 'MEDIUM';
  if (type === RiskLevel.High) return 'HIGH';
  
  // KYCStatus
  if (type === KYCStatus.Pending) return 'PENDING';
  if (type === KYCStatus.Verified) return 'VERIFIED';
  if (type === KYCStatus.Rejected) return 'REJECTED';
  
  // TransactionType
  if (type === TransactionType.Deposit) return 'DEPOSIT';
  if (type === TransactionType.Withdraw) return 'WITHDRAWAL';
  if (type === TransactionType.Transfer) return 'TRANSFER';
  
  // AlertSeverity
  if (type === AlertSeverity.Low) return 'LOW';
  if (type === AlertSeverity.Medium) return 'MEDIUM';
  if (type === AlertSeverity.High) return 'HIGH';
  if (type === AlertSeverity.Critical) return 'CRITICAL';
  
  // AlertStatus
  if (type === AlertStatus.New) return 'NEW';
  if (type === AlertStatus.Review) return 'UNDER_REVIEW';
  if (type === AlertStatus.Resolved) return 'RESOLVED';
  
  return 'UNKNOWN';
}

// ============================================
// Configuração de Badges
// ============================================
const badgeConfig: Record<string, { label: string; className: string }> = {
  // Risk Levels
  'LOW': { label: 'Baixo', className: 'bg-success/20 text-success border-success/30' },
  'MEDIUM': { label: 'Médio', className: 'bg-warning/20 text-warning border-warning/30' },
  'HIGH': { label: 'Alto', className: 'bg-destructive/20 text-destructive border-destructive/30' },
  'CRITICAL': { label: 'Crítico', className: 'bg-destructive text-destructive-foreground border-destructive' },
  
  // KYC Status
  'PENDING': { label: 'Pendente', className: 'bg-warning/20 text-warning border-warning/30' },
  'APPROVED': { label: 'Aprovado', className: 'bg-success/20 text-success border-success/30' },
  'VERIFIED': { label: 'Verificado', className: 'bg-success/20 text-success border-success/30' },
  'REJECTED': { label: 'Rejeitado', className: 'bg-destructive/20 text-destructive border-destructive/30' },
  'EXPIRED': { label: 'Expirado', className: 'bg-muted text-muted-foreground border-border' },
  
  // Alert Status
  'NEW': { label: 'Novo', className: 'bg-info/20 text-info border-info/30' },
  'UNDER_REVIEW': { label: 'Em Análise', className: 'bg-warning/20 text-warning border-warning/30' },
  'RESOLVED': { label: 'Resolvido', className: 'bg-success/20 text-success border-success/30' },
  'DISMISSED': { label: 'Descartado', className: 'bg-muted text-muted-foreground border-border' },
  
  // Transaction Types
  'DEPOSIT': { label: 'Depósito', className: 'bg-success/20 text-success border-success/30' },
  'WITHDRAWAL': { label: 'Saque', className: 'bg-destructive/20 text-destructive border-destructive/30' },
  'TRANSFER': { label: 'Transferência', className: 'bg-primary/20 text-primary border-primary/30' },
};

export function StatusBadge({ type, className }: StatusBadgeProps) {
  const normalizedType = normalizeType(type);
  const config = badgeConfig[normalizedType] || { 
    label: normalizedType, 
    className: 'bg-muted text-muted-foreground border-border' 
  };
  
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}