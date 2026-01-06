import { StatusBadge } from '@/components/ui/status-badge';
import type { ClientReport } from '@/types';

interface ClientReportsTableProps {
  reports: ClientReport[];
}

export function ClientReportsTable({ reports }: ClientReportsTableProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  const sortedReports = [...reports].sort((a, b) => b.totalVolume - a.totalVolume);

  return (
    <div className="glass rounded-xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold">Detalhamento por Cliente</h3>
      </div>
      <div className="overflow-x-auto">
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
            {sortedReports.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-muted-foreground">
                  Nenhum dado encontrado
                </td>
              </tr>
            ) : (
              sortedReports.map((report) => (
                <tr key={report.clientId} className="transition-colors">
                  <td>
                    <span className="font-medium text-foreground">{report.clientName}</span>
                  </td>
                  <td className="text-right font-mono">{report.totalTransactions}</td>
                  <td className="text-right font-mono text-primary">
                    {formatCurrency(report.totalVolume)}
                  </td>
                  <td className="text-right">
                    <span className={`font-mono ${report.alertCount > 0 ? 'text-warning' : 'text-muted-foreground'}`}>
                      {report.alertCount}
                    </span>
                  </td>
                  <td><StatusBadge type={report.riskLevel} /></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}