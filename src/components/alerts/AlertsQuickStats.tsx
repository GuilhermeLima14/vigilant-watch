import { AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { AlertStatus, AlertSeverity } from '@/types/api';

interface Alert {
  id: number;
  clientId: number;
  clientName?: string;
  transactionId: number;
  ruleCode: number;
  ruleDescription: string;
  severity: AlertSeverity;
  status: AlertStatus;
  resolutionNotes?: string;
  resolvedBy?: string;
  createdAt: Date;
  resolvedAt?: Date;
}

interface AlertsQuickStatsProps {
  alerts: Alert[];
}

export function AlertsQuickStats({ alerts }: AlertsQuickStatsProps) {
  const stats = {
    new: alerts.filter(a => a.status === AlertStatus.New).length,
    underReview: alerts.filter(a => a.status === AlertStatus.Review).length,
    resolved: alerts.filter(a => a.status === AlertStatus.Resolved).length,
    critical: alerts.filter(a => 
      a.severity === AlertSeverity.Critical && a.status !== AlertStatus.Resolved
    ).length,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="glass rounded-lg p-4 border border-border">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-info" />
          <div>
            <p className="text-2xl font-bold">{stats.new}</p>
            <p className="text-xs text-muted-foreground">Novos</p>
          </div>
        </div>
      </div>
      <div className="glass rounded-lg p-4 border border-border">
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-warning" />
          <div>
            <p className="text-2xl font-bold">{stats.underReview}</p>
            <p className="text-xs text-muted-foreground">Em Análise</p>
          </div>
        </div>
      </div>
      <div className="glass rounded-lg p-4 border border-border">
        <div className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-success" />
          <div>
            <p className="text-2xl font-bold">{stats.resolved}</p>
            <p className="text-xs text-muted-foreground">Resolvidos</p>
          </div>
        </div>
      </div>
      <div className="glass rounded-lg p-4 border border-destructive/30 bg-destructive/5">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <div>
            <p className="text-2xl font-bold text-destructive">{stats.critical}</p>
            <p className="text-xs text-muted-foreground">Críticos</p>
          </div>
        </div>
      </div>
    </div>
  );
}