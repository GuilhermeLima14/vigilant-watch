import { useState } from 'react';
import { Download, FileText, BarChart3 } from 'lucide-react';
import { useDataStore } from '@/store/dataStore';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/ui/page-header';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  Legend
} from 'recharts';
import { useToast } from '@/hooks/use-toast';
import type { ClientReport } from '@/types';

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
        <div className="flex gap-2">
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

      {/* Filter */}
      <div className="glass rounded-xl p-4 border border-border mb-6">
        <div className="flex items-center gap-4">
          <BarChart3 className="h-5 w-5 text-muted-foreground" />
          <Select value={clientFilter} onValueChange={setClientFilter}>
            <SelectTrigger className="w-full sm:w-[300px] bg-muted/50">
              <SelectValue placeholder="Selecione um cliente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Clientes</SelectItem>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
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

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        {/* Volume por Cliente */}
        <div className="glass rounded-xl p-6 border border-border lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Volume por Cliente</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={volumeByClient} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 17%)" />
              <XAxis type="number" stroke="hsl(215, 20%, 55%)" fontSize={12} tickFormatter={(v) => formatCurrency(v)} />
              <YAxis type="category" dataKey="name" stroke="hsl(215, 20%, 55%)" fontSize={11} width={120} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(222, 47%, 8%)', 
                  border: '1px solid hsl(217, 33%, 17%)',
                  borderRadius: '8px'
                }}
                formatter={(value: number) => formatCurrency(value)}
              />
              <Bar dataKey="volume" fill={COLORS.primary} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Alertas por Risco */}
        <div className="glass rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Alertas por Nível de Risco</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={alertsByRisk}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {alertsByRisk.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(222, 47%, 8%)', 
                  border: '1px solid hsl(217, 33%, 17%)',
                  borderRadius: '8px'
                }}
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

      {/* Detail Table */}
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
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-muted-foreground">
                    Nenhum dado encontrado
                  </td>
                </tr>
              ) : (
                filteredReports
                  .sort((a, b) => b.totalVolume - a.totalVolume)
                  .map((report) => (
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
    </AppLayout>
  );
}
