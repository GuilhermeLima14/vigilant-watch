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
      <div className="glass rounded-lg p-3 border border-border mb-3">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
          <Select value={clientFilter} onValueChange={setClientFilter}>
            <SelectTrigger className="w-full sm:w-[280px] bg-muted/50 h-9 text-sm">
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        <div className="glass rounded-lg p-3 border border-border">
          <p className="text-xs text-muted-foreground">Clientes</p>
          <p className="text-xl font-bold">{totals.clients}</p>
        </div>
        <div className="glass rounded-lg p-3 border border-border">
          <p className="text-xs text-muted-foreground">Transações</p>
          <p className="text-xl font-bold">{totals.transactions}</p>
        </div>
        <div className="glass rounded-lg p-3 border border-border">
          <p className="text-xs text-muted-foreground">Volume Total</p>
          <p className="text-xl font-bold">{formatCurrency(totals.volume)}</p>
        </div>
        <div className="glass rounded-lg p-3 border border-border">
          <p className="text-xs text-muted-foreground">Alertas</p>
          <p className="text-xl font-bold">{totals.alerts}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-3 lg:grid-cols-3 mb-4">
        {/* Volume por Cliente */}
        <div className="glass rounded-lg p-4 border border-border lg:col-span-2">
          <h3 className="text-sm font-semibold mb-2">Volume por Cliente</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={volumeByClient} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 20%, 88%)" />
              <XAxis type="number" stroke="hsl(215, 20%, 55%)" fontSize={11} tickFormatter={(v) => formatCurrency(v)} />
              <YAxis type="category" dataKey="name" stroke="hsl(215, 20%, 55%)" fontSize={10} width={100} />
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
              <Bar dataKey="volume" fill={COLORS.primary} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Alertas por Risco */}
        <div className="glass rounded-lg p-4 border border-border">
          <h3 className="text-sm font-semibold mb-2">Alertas por Nível de Risco</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={alertsByRisk}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={65}
                paddingAngle={4}
                dataKey="value"
              >
                {alertsByRisk.map((entry, index) => (
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
                height={28}
                formatter={(value) => <span className="text-foreground text-xs">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detail Table */}
      <div className="glass rounded-lg border border-border overflow-hidden">
        <div className="p-3 border-b border-border">
          <h3 className="text-sm font-semibold">Detalhamento por Cliente</h3>
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
