import { StatCard } from '@/components/ui/stat-card';
import { Users, ArrowLeftRight, AlertTriangle, UserX } from 'lucide-react';

interface StatsGridProps {
  stats: {
    totalClients: number;
    highRiskClients: number;
    activeAlerts: number;
    criticalAlerts: number;
    pendingKYC: number;
    transactionVolumeToday: number;
  };
  transactionsCount: number;
}

export function StatsGrid({ stats, transactionsCount }: StatsGridProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <StatCard
        title="Total de Clientes"
        value={stats.totalClients}
        subtitle={`${stats.highRiskClients} de alto risco`}
        icon={Users}
        variant="primary"
      />
      <StatCard
        title="Transações Hoje"
        value={transactionsCount}
        subtitle={formatCurrency(stats.transactionVolumeToday)}
        icon={ArrowLeftRight}
        variant="default"
      />
      <StatCard
        title="Alertas Ativos"
        value={stats.activeAlerts}
        subtitle={`${stats.criticalAlerts} crítico(s)`}
        icon={AlertTriangle}
        variant={stats.criticalAlerts > 0 ? 'destructive' : 'warning'}
      />
      <StatCard
        title="KYC Pendente"
        value={stats.pendingKYC}
        subtitle="Requer atenção"
        icon={UserX}
        variant={stats.pendingKYC > 0 ? 'warning' : 'success'}
      />
    </div>
  );
}