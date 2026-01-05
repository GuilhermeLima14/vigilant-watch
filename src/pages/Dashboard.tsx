import { useDataStore } from '@/store/dataStore';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/ui/page-header';
import { StatsSection } from '@/components/dashboard/StatsSection';
import { TransactionVolumeChart } from '@/components/dashboard/TransactionVolumeChart';
import { RiskDistributionChart } from '@/components/dashboard/RiskDistributionChart';
import { RecentAlertsSection } from '@/components/dashboard/RecentAlertsSection';
import { AlertStatusChart } from '@/components/dashboard/AlertStatusChart';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const COLORS = {
  primary: 'hsl(217, 91%, 60%)',
  accent: 'hsl(187, 92%, 45%)',
  success: 'hsl(142, 71%, 45%)',
  warning: 'hsl(38, 92%, 50%)',
  destructive: 'hsl(0, 84%, 60%)',
};

export default function Dashboard() {
  const { stats, alerts, transactions, clients } = useDataStore();

  // Chart data
  const alertsByStatus = [
    { name: 'Novos', value: alerts.filter(a => a.status === 'NEW').length, color: COLORS.primary },
    { name: 'Em Análise', value: alerts.filter(a => a.status === 'UNDER_REVIEW').length, color: COLORS.warning },
    { name: 'Resolvidos', value: alerts.filter(a => a.status === 'RESOLVED').length, color: COLORS.success },
    { name: 'Descartados', value: alerts.filter(a => a.status === 'DISMISSED').length, color: '#6b7280' },
  ];

  const riskDistribution = [
    { name: 'Baixo', value: clients.filter(c => c.riskLevel === 'LOW').length, color: COLORS.success },
    { name: 'Médio', value: clients.filter(c => c.riskLevel === 'MEDIUM').length, color: COLORS.warning },
    { name: 'Alto', value: clients.filter(c => c.riskLevel === 'HIGH').length, color: COLORS.destructive },
    { name: 'Crítico', value: clients.filter(c => c.riskLevel === 'CRITICAL').length, color: '#991b1b' },
  ];

  const transactionsByType = [
    { name: 'Depósitos', value: transactions.filter(t => t.type === 'DEPOSIT').reduce((acc, t) => acc + t.amount, 0) },
    { name: 'Saques', value: transactions.filter(t => t.type === 'WITHDRAWAL').reduce((acc, t) => acc + t.amount, 0) },
    { name: 'Transferências', value: transactions.filter(t => t.type === 'TRANSFER').reduce((acc, t) => acc + t.amount, 0) },
  ];

  const recentAlerts = alerts
    .filter(a => a.status === 'NEW' || a.status === 'UNDER_REVIEW')
    .slice(0, 5);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  return (
    <AppLayout>
      <PageHeader
        title="Dashboard"
        description={`Visão geral do sistema • ${format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })}`}
      />

      <StatsSection
        totalClients={stats.totalClients}
        highRiskClients={stats.highRiskClients}
        transactionsToday={transactions.length}
        transactionVolume={formatCurrency(stats.transactionVolumeToday)}
        activeAlerts={stats.activeAlerts}
        criticalAlerts={stats.criticalAlerts}
        pendingKYC={stats.pendingKYC}
      />

      <div className="dashboard-charts-row grid gap-6 lg:grid-cols-3 mb-8">
        <TransactionVolumeChart
          data={transactionsByType}
          formatCurrency={formatCurrency}
        />
        <RiskDistributionChart data={riskDistribution} />
      </div>

      <div className="dashboard-alerts-row grid gap-6 lg:grid-cols-2">
        <RecentAlertsSection alerts={recentAlerts} />
        <AlertStatusChart data={alertsByStatus} />
      </div>
    </AppLayout>
  );
}
