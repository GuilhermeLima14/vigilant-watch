import { useState } from 'react';
import { Download, FileText } from 'lucide-react';
import { useDataStore } from '@/store/dataStore';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { ReportsFilterSection } from '@/components/reports/ReportsFilterSection';
import { ReportsSummaryCards } from '@/components/reports/ReportsSummaryCards';
import { VolumeByClientChart } from '@/components/reports/VolumeByClientChart';
import { AlertsByRiskChart } from '@/components/reports/AlertsByRiskChart';
import { ReportsDetailTable } from '@/components/reports/ReportsDetailTable';
import { useToast } from '@/hooks/use-toast';

const COLORS = {
  primary: 'hsl(217, 91%, 60%)',
  accent: 'hsl(187, 92%, 45%)',
  success: 'hsl(142, 71%, 45%)',
  warning: 'hsl(38, 92%, 50%)',
  destructive: 'hsl(0, 84%, 60%)',
};

export default function Reports() {
  const { getClientReports, clients } = useDataStore();
  const { toast } = useToast();

  const [clientFilter, setClientFilter] = useState<string>('all');

  const reports = getClientReports();

  const filteredReports = clientFilter === 'all'
    ? reports
    : reports.filter(r => r.clientId === clientFilter);

  // Chart data
  const volumeByClient = filteredReports
    .sort((a, b) => b.totalVolume - a.totalVolume)
    .slice(0, 8)
    .map(r => ({
      name: r.clientName.length > 15 ? r.clientName.slice(0, 15) + '...' : r.clientName,
      volume: r.totalVolume,
      transacoes: r.totalTransactions,
    }));

  const alertsByRisk = [
    { name: 'Baixo', value: filteredReports.filter(r => r.riskLevel === 'LOW').reduce((acc, r) => acc + r.alertCount, 0), color: COLORS.success },
    { name: 'Médio', value: filteredReports.filter(r => r.riskLevel === 'MEDIUM').reduce((acc, r) => acc + r.alertCount, 0), color: COLORS.warning },
    { name: 'Alto', value: filteredReports.filter(r => r.riskLevel === 'HIGH').reduce((acc, r) => acc + r.alertCount, 0), color: COLORS.destructive },
    { name: 'Crítico', value: filteredReports.filter(r => r.riskLevel === 'CRITICAL').reduce((acc, r) => acc + r.alertCount, 0), color: '#991b1b' },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  const handleExportCSV = () => {
    const headers = ['Cliente', 'Transações', 'Volume Total', 'Alertas', 'Nível de Risco'];
    const rows = filteredReports.map(r => [
      r.clientName,
      r.totalTransactions,
      r.totalVolume,
      r.alertCount,
      r.riskLevel,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `relatorio_clientes_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    toast({
      title: 'Exportação concluída',
      description: 'O arquivo CSV foi baixado.',
    });
  };

  const handleExportJSON = () => {
    const jsonContent = JSON.stringify(filteredReports, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `relatorio_clientes_${new Date().toISOString().split('T')[0]}.json`;
    link.click();

    toast({
      title: 'Exportação concluída',
      description: 'O arquivo JSON foi baixado.',
    });
  };

  // Summary stats
  const totals = {
    transactions: filteredReports.reduce((acc, r) => acc + r.totalTransactions, 0),
    volume: filteredReports.reduce((acc, r) => acc + r.totalVolume, 0),
    alerts: filteredReports.reduce((acc, r) => acc + r.alertCount, 0),
    clients: filteredReports.length,
  };

  return (
    <AppLayout>
      <PageHeader title="Relatórios" description="Análise consolidada por cliente">
        <div className="export-buttons flex gap-2">
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="h-4 w-4 mr-2" />
            CSV
          </Button>
          <Button variant="outline" onClick={handleExportJSON}>
            <FileText className="h-4 w-4 mr-2" />
            JSON
          </Button>
        </div>
      </PageHeader>

      <ReportsFilterSection
        clientFilter={clientFilter}
        onClientFilterChange={setClientFilter}
        clients={clients}
      />

      <ReportsSummaryCards
        totalClients={totals.clients}
        totalTransactions={totals.transactions}
        totalVolume={formatCurrency(totals.volume)}
        totalAlerts={totals.alerts}
      />

      <div className="reports-charts-row grid gap-6 lg:grid-cols-3 mb-8">
        <VolumeByClientChart
          data={volumeByClient}
          formatCurrency={formatCurrency}
        />
        <AlertsByRiskChart data={alertsByRisk} />
      </div>

      <ReportsDetailTable
        reports={filteredReports}
        formatCurrency={formatCurrency}
      />
    </AppLayout>
  );
}
