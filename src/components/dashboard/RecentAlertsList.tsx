import { ShieldAlert } from 'lucide-react';
import { StatusBadge } from '@/components/ui/status-badge';
import type { Alert } from '@/types';

interface RecentAlertsListProps {
  alerts: Alert[];
}

export function RecentAlertsList({ alerts }: RecentAlertsListProps) {
  const recentAlerts = alerts
    .filter(a => a.status === 'NEW' || a.status === 'UNDER_REVIEW')
    .slice(0, 5);

  return (
    <div className="glass rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Alertas Recentes</h3>
        <ShieldAlert className="h-5 w-5 text-warning" />
      </div>
      <div className="space-y-3">
        {recentAlerts.length === 0 ? (
          <p className="text-muted-foreground text-sm py-4 text-center">
            Nenhum alerta pendente
          </p>
        ) : (
          recentAlerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{alert.clientName}</p>
                <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                  {alert.ruleDescription}
                </p>
              </div>
              <div className="flex items-center gap-2">
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