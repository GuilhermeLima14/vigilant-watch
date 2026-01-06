import { Eye, AlertTriangle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import type { Alert, AlertStatus } from '@/types';

interface AlertsListProps {
  alerts: Alert[];
  onViewAlert: (alert: Alert) => void;
}

function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'CRITICAL':
      return 'border-l-destructive';
    case 'HIGH':
      return 'border-l-destructive/70';
    case 'MEDIUM':
      return 'border-l-warning';
    default:
      return 'border-l-success';
  }
}

function getStatusIcon(status: AlertStatus) {
  switch (status) {
    case 'NEW':
      return <AlertTriangle className="h-4 w-4 text-info" />;
    case 'UNDER_REVIEW':
      return <Clock className="h-4 w-4 text-warning" />;
    case 'RESOLVED':
      return <CheckCircle className="h-4 w-4 text-success" />;
    case 'DISMISSED':
      return <XCircle className="h-4 w-4 text-muted-foreground" />;
  }
}

export function AlertsList({ alerts, onViewAlert }: AlertsListProps) {
  return (
    <div className="space-y-3">
      {alerts.length === 0 ? (
        <div className="glass rounded-xl p-8 border border-border text-center">
          <p className="text-muted-foreground">Nenhum alerta encontrado</p>
        </div>
      ) : (
        alerts.map((alert) => (
          <div
            key={alert.id}
            className={`glass rounded-xl p-4 border border-border border-l-4 ${getSeverityColor(alert.severity)} hover:bg-muted/30 transition-colors cursor-pointer`}
            onClick={() => onViewAlert(alert)}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {getStatusIcon(alert.status)}
                  <span className="font-medium text-foreground">{alert.clientName}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{alert.ruleCode}</span>
                </div>
                <p className="text-sm text-muted-foreground">{alert.ruleDescription}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {format(alert.createdAt, 'dd/MM/yyyy HH:mm')}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge type={alert.severity} />
                <StatusBadge type={alert.status} />
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}