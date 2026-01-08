import { DataTable, Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/ui/status-badge';
import { RiskLevel } from '@/types/api';

interface ClientReport {
  clientId: string;
  clientName: string;
  totalTransactions: number;
  totalVolume: number;
  alertCount: number;
  riskLevel: RiskLevel;
}

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

  const columns: Column<ClientReport>[] = [
    {
      header: 'Cliente',
      accessor: (report) => (
        <span className="font-medium text-foreground">{report.clientName}</span>
      ),
    },
    {
      header: 'Transações',
      align: 'right',
      accessor: (report) => (
        <span className="font-mono">{report.totalTransactions}</span>
      ),
    },
    {
      header: 'Volume Total',
      align: 'right',
      accessor: (report) => (
        <span className="font-mono text-primary">
          {formatCurrency(report.totalVolume)}
        </span>
      ),
    },
    {
      header: 'Alertas',
      align: 'right',
      accessor: (report) => (
        <span className={`font-mono ${report.alertCount > 0 ? 'text-warning' : 'text-muted-foreground'}`}>
          {report.alertCount}
        </span>
      ),
    },
    {
      header: 'Nível de Risco',
      accessor: (report) => <StatusBadge type={report.riskLevel} />,
    },
  ];

  return (
    <div className="glass rounded-xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold">Detalhamento por Cliente</h3>
      </div>
      <DataTable 
        data={sortedReports} 
        columns={columns} 
        emptyMessage="Nenhum dado encontrado"
        getRowKey={(report) => report.clientId}
      />
    </div>
  );
}