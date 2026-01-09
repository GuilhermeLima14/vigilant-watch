import { useDataStore } from '@/store/dataStore';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/ui/page-header';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { TransactionChart } from '@/components/dashboard/TransactionChart';
import { RiskDistributionChart } from '@/components/dashboard/RiskDistributionChart';
import { RecentAlertsList } from '@/components/dashboard/RecentAlertsList';
import { AlertStatusChart } from '@/components/dashboard/AlertStatusChart';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Dashboard() {
  const { stats, alerts, transactions, clients } = useDataStore();
  
  // Filtrar transações de hoje
  const transactionsToday = transactions.filter(t => 
    t.occurredAt.toDateString() === new Date().toDateString()
  );

  return (
    <AppLayout>
      <PageHeader 
        title="Dashboard" 
        description={`Visão geral do sistema • ${format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })}`}
      />

      <StatsGrid stats={stats} transactionsCount={transactionsToday.length} />

      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        <TransactionChart transactions={transactions} />
        <RiskDistributionChart clients={clients} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentAlertsList alerts={alerts} />
        <AlertStatusChart alerts={alerts} />
      </div>
    </AppLayout>
  );
}