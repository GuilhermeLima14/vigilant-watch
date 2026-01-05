import { 
  Users, 
  ArrowLeftRight, 
  AlertTriangle, 
  TrendingUp,
  ShieldAlert,
  Clock,
  DollarSign,
  UserX
} from 'lucide-react';
import { useDataStore } from '@/store/dataStore';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { StatusBadge } from '@/components/ui/status-badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
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

      {/* Stats Grid */}
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
          value={transactions.length}
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

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        {/* Volume por Tipo */}
        <div className="glass rounded-xl p-6 border border-border lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Volume por Tipo de Transação</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={transactionsByType}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 20%, 88%)" />
              <XAxis dataKey="name" stroke="hsl(215, 20%, 55%)" fontSize={12} />
              <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} tickFormatter={(v) => formatCurrency(v)} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(0, 0%, 100%)', 
                  border: '1px solid hsl(217, 20%, 88%)',
                  borderRadius: '8px',
                  color: 'hsl(222, 47%, 11%)'
                }}
                labelStyle={{ color: 'hsl(222, 47%, 11%)' }}
                formatter={(value: number) => formatCurrency(value)}
              />
              <Bar dataKey="value" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Distribuição de Risco */}
        <div className="glass rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Distribuição de Risco</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={riskDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(0, 0%, 100%)', 
                  border: '1px solid hsl(217, 20%, 88%)',
                  borderRadius: '8px',
                  color: 'hsl(222, 47%, 11%)'
                }}
                labelStyle={{ color: 'hsl(222, 47%, 11%)' }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => <span className="text-foreground text-sm">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alerts and Status */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Alerts */}
        <div className="glass rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Alertas Recentes</h3>
            <ShieldAlert className="h-5 w-5 text-warning" />
          </div>
          <div className="space-y-3">
            {recentAlerts.length === 0 ? (
              <p className="text-muted-foreground text-sm py-4 text-center">
                Nenhum alerta pendente
              </p>
            ) : (
              recentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{alert.clientName}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                      {alert.ruleDescription}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge type={alert.severity} />
                    <StatusBadge type={alert.status} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Alert Status Distribution */}
        <div className="glass rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Status dos Alertas</h3>
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={alertsByStatus}
                cx="50%"
                cy="50%"
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {alertsByStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(0, 0%, 100%)', 
                  border: '1px solid hsl(217, 20%, 88%)',
                  borderRadius: '8px',
                  color: 'hsl(222, 47%, 11%)'
                }}
                labelStyle={{ color: 'hsl(222, 47%, 11%)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AppLayout>
  );
}
