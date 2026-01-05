import { ShieldAlert } from 'lucide-react';
import { StatusBadge } from '@/components/ui/status-badge';

interface Alert {
  id: string;
  clientName: string;
  ruleDescription: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'NEW' | 'UNDER_REVIEW' | 'RESOLVED' | 'DISMISSED';
}

interface RecentAlertsSectionProps {
  alerts: Alert[];
}

export function RecentAlertsSection({ alerts }: RecentAlertsSectionProps) {
  return (
    <div className="recent-alerts-section glass rounded-xl p-6 border border-border">
      <div className="recent-alerts-header flex items-center justify-between mb-4">
        <h3 className="recent-alerts-title text-lg font-semibold">Alertas Recentes</h3>
        <ShieldAlert className="recent-alerts-icon h-5 w-5 text-warning" />
      </div>
      <div className="recent-alerts-list space-y-3">
        {alerts.length === 0 ? (
          <p className="recent-alerts-empty text-muted-foreground text-sm py-4 text-center">
            Nenhum alerta pendente
          </p>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className="alert-item flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="alert-content flex-1">
                <p className="alert-client-name text-sm font-medium text-foreground">
                  {alert.clientName}
                </p>
                <p className="alert-description text-xs text-muted-foreground truncate max-w-[200px]">
                  {alert.ruleDescription}
                </p>
              </div>
              <div className="alert-badges flex items-center gap-2">
                <StatusBadge type={alert.severity} />
                <StatusBadge type={alert.status} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
