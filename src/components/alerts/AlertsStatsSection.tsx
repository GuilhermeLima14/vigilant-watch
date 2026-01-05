import { AlertTriangle, Clock, CheckCircle } from 'lucide-react';

interface AlertsStatsSectionProps {
  newCount: number;
  underReviewCount: number;
  resolvedCount: number;
  criticalCount: number;
}

export function AlertsStatsSection({
  newCount,
  underReviewCount,
  resolvedCount,
  criticalCount,
}: AlertsStatsSectionProps) {
  return (
    <section className="alerts-stats-section grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="new-alerts-stat glass rounded-lg p-4 border border-border">
        <div className="stat-content flex items-center gap-3">
          <AlertTriangle className="stat-icon h-5 w-5 text-info" />
          <div>
            <p className="stat-value text-2xl font-bold">{newCount}</p>
            <p className="stat-label text-xs text-muted-foreground">Novos</p>
          </div>
        </div>
      </div>

      <div className="under-review-alerts-stat glass rounded-lg p-4 border border-border">
        <div className="stat-content flex items-center gap-3">
          <Clock className="stat-icon h-5 w-5 text-warning" />
          <div>
            <p className="stat-value text-2xl font-bold">{underReviewCount}</p>
            <p className="stat-label text-xs text-muted-foreground">Em Análise</p>
          </div>
        </div>
      </div>

      <div className="resolved-alerts-stat glass rounded-lg p-4 border border-border">
        <div className="stat-content flex items-center gap-3">
          <CheckCircle className="stat-icon h-5 w-5 text-success" />
          <div>
            <p className="stat-value text-2xl font-bold">{resolvedCount}</p>
            <p className="stat-label text-xs text-muted-foreground">Resolvidos</p>
          </div>
        </div>
      </div>

      <div className="critical-alerts-stat glass rounded-lg p-4 border border-destructive/30 bg-destructive/5">
        <div className="stat-content flex items-center gap-3">
          <AlertTriangle className="stat-icon h-5 w-5 text-destructive" />
          <div>
            <p className="stat-value text-2xl font-bold text-destructive">{criticalCount}</p>
            <p className="stat-label text-xs text-muted-foreground">Críticos</p>
          </div>
        </div>
      </div>
    </section>
  );
}
