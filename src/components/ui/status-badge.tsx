import { cn } from '@/lib/utils';
import type { RiskLevel, KYCStatus, AlertSeverity, AlertStatus, TransactionType } from '@/types';

type BadgeType = RiskLevel | KYCStatus | AlertSeverity | AlertStatus | TransactionType;

interface StatusBadgeProps {
  type: BadgeType;
  className?: string;
}

const badgeConfig: Record<BadgeType, { label: string; className: string }> = {
  // Risk Levels
  LOW: { label: 'Baixo', className: 'bg-success/20 text-success border-success/30' },
  MEDIUM: { label: 'Médio', className: 'bg-warning/20 text-warning border-warning/30' },
  HIGH: { label: 'Alto', className: 'bg-destructive/20 text-destructive border-destructive/30' },
  CRITICAL: { label: 'Crítico', className: 'bg-destructive text-destructive-foreground border-destructive' },
  
  // KYC Status
  PENDING: { label: 'Pendente', className: 'bg-warning/20 text-warning border-warning/30' },
  APPROVED: { label: 'Aprovado', className: 'bg-success/20 text-success border-success/30' },
  REJECTED: { label: 'Rejeitado', className: 'bg-destructive/20 text-destructive border-destructive/30' },
  EXPIRED: { label: 'Expirado', className: 'bg-muted text-muted-foreground border-border' },
  
  // Alert Status
  NEW: { label: 'Novo', className: 'bg-info/20 text-info border-info/30' },
  UNDER_REVIEW: { label: 'Em Análise', className: 'bg-warning/20 text-warning border-warning/30' },
  RESOLVED: { label: 'Resolvido', className: 'bg-success/20 text-success border-success/30' },
  DISMISSED: { label: 'Descartado', className: 'bg-muted text-muted-foreground border-border' },
  
  // Transaction Types
  DEPOSIT: { label: 'Depósito', className: 'bg-success/20 text-success border-success/30' },
  WITHDRAWAL: { label: 'Saque', className: 'bg-destructive/20 text-destructive border-destructive/30' },
  TRANSFER: { label: 'Transferência', className: 'bg-primary/20 text-primary border-primary/30' },
};

export function StatusBadge({ type, className }: StatusBadgeProps) {
  const config = badgeConfig[type] || { label: type, className: 'bg-muted text-muted-foreground' };
  
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
