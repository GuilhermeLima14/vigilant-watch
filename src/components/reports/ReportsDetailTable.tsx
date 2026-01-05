import { StatusBadge } from '@/components/ui/status-badge';
import type { ClientReport } from '@/types';

interface ReportsDetailTableProps {
  reports: ClientReport[];
  formatCurrency: (value: number) => string;
}

export function ReportsDetailTable({
  reports,
  formatCurrency,
}: ReportsDetailTableProps) {
  return (
    <div className="reports-detail-section glass rounded-xl border border-border overflow-hidden">
      <div className="table-header p-4 border-b border-border">
        <h3 className="table-title text-lg font-semibold">Detalhamento por Cliente</h3>
      </div>
      <div className="reports-table-wrapper overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr className="bg-muted/30">
              <th>Cliente</th>
              <th className="text-right">Transações</th>
              <th className="text-right">Volume Total</th>
              <th className="text-right">Alertas</th>
              <th>Nível de Risco</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-muted-foreground">
                  Nenhum dado encontrado
                </td>
              </tr>
            ) : (
              reports
                .sort((a, b) => b.totalVolume - a.totalVolume)
                .map((report) => (
                  <tr key={report.clientId} className="reports-table-row transition-colors">
                    <td>
                      <span className="client-name font-medium text-foreground">
                        {report.clientName}
                      </span>
                    </td>
                    <td className="transactions-cell text-right font-mono">
                      {report.totalTransactions}
                    </td>
                    <td className="volume-cell text-right font-mono text-primary">
                      {formatCurrency(report.totalVolume)}
                    </td>
                    <td className="alerts-cell text-right">
                      <span
                        className={`alerts-count font-mono ${
                          report.alertCount > 0 ? 'text-warning' : 'text-muted-foreground'
                        }`}
                      >
                        {report.alertCount}
                      </span>
                    </td>
                    <td className="risk-level-cell">
                      <StatusBadge type={report.riskLevel} />
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
