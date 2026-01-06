import type { ClientReport } from '@/types';

interface ReportsSummaryProps {
  reports: ClientReport[];
}

export function ReportsSummary({ reports }: ReportsSummaryProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  const totals = {
    transactions: reports.reduce((acc, r) => acc + r.totalTransactions, 0),
    volume: reports.reduce((acc, r) => acc + r.totalVolume, 0),
    alerts: reports.reduce((acc, r) => acc + r.alertCount, 0),
    clients: reports.length,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="glass rounded-xl p-4 border border-border">
        <p className="text-sm text-muted-foreground">Clientes</p>
        <p className="text-2xl font-bold">{totals.clients}</p>
      </div>
      <div className="glass rounded-xl p-4 border border-border">
        <p className="text-sm text-muted-foreground">Transações</p>
        <p className="text-2xl font-bold">{totals.transactions}</p>
      </div>
      <div className="glass rounded-xl p-4 border border-border">
        <p className="text-sm text-muted-foreground">Volume Total</p>
        <p className="text-2xl font-bold">{formatCurrency(totals.volume)}</p>
      </div>
      <div className="glass rounded-xl p-4 border border-border">
        <p className="text-sm text-muted-foreground">Alertas</p>
        <p className="text-2xl font-bold">{totals.alerts}</p>
      </div>
    </div>
  );
}