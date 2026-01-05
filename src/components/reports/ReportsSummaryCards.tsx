interface ReportsSummaryCardsProps {
  totalClients: number;
  totalTransactions: number;
  totalVolume: string;
  totalAlerts: number;
}

export function ReportsSummaryCards({
  totalClients,
  totalTransactions,
  totalVolume,
  totalAlerts,
}: ReportsSummaryCardsProps) {
  return (
    <section className="reports-summary-cards grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="clients-card glass rounded-xl p-4 border border-border">
        <p className="card-label text-sm text-muted-foreground">Clientes</p>
        <p className="card-value text-2xl font-bold">{totalClients}</p>
      </div>

      <div className="transactions-card glass rounded-xl p-4 border border-border">
        <p className="card-label text-sm text-muted-foreground">Transações</p>
        <p className="card-value text-2xl font-bold">{totalTransactions}</p>
      </div>

      <div className="volume-card glass rounded-xl p-4 border border-border">
        <p className="card-label text-sm text-muted-foreground">Volume Total</p>
        <p className="card-value text-2xl font-bold">{totalVolume}</p>
      </div>

      <div className="alerts-card glass rounded-xl p-4 border border-border">
        <p className="card-label text-sm text-muted-foreground">Alertas</p>
        <p className="card-value text-2xl font-bold">{totalAlerts}</p>
      </div>
    </section>
  );
}
