import { Users, ArrowLeftRight, AlertTriangle, UserX } from 'lucide-react';
import { StatCard } from '@/components/ui/stat-card';

interface StatsSectionProps {
  totalClients: number;
  highRiskClients: number;
  transactionsToday: number;
  transactionVolume: string;
  activeAlerts: number;
  criticalAlerts: number;
  pendingKYC: number;
}

export function StatsSection({
  totalClients,
  highRiskClients,
  transactionsToday,
  transactionVolume,
  activeAlerts,
  criticalAlerts,
  pendingKYC,
}: StatsSectionProps) {
  return (
    <section className="stats-section mb-8">
      <div className="stats-grid grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="stat-card-wrapper">
          <StatCard
            title="Total de Clientes"
            value={totalClients}
            subtitle={`${highRiskClients} de alto risco`}
            icon={Users}
            variant="primary"
          />
        </div>

        <div className="stat-card-wrapper">
          <StatCard
            title="Transações Hoje"
            value={transactionsToday}
            subtitle={transactionVolume}
            icon={ArrowLeftRight}
            variant="default"
          />
        </div>

        <div className="stat-card-wrapper">
          <StatCard
            title="Alertas Ativos"
            value={activeAlerts}
            subtitle={`${criticalAlerts} crítico(s)`}
            icon={AlertTriangle}
            variant={criticalAlerts > 0 ? 'destructive' : 'warning'}
          />
        </div>

        <div className="stat-card-wrapper">
          <StatCard
            title="KYC Pendente"
            value={pendingKYC}
            subtitle="Requer atenção"
            icon={UserX}
            variant={pendingKYC > 0 ? 'warning' : 'success'}
          />
        </div>
      </div>
    </section>
  );
}
