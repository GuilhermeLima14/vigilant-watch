import { useState } from 'react';
import { Download, FileText, BarChart3 } from 'lucide-react';
import { useDataStore } from '@/store/dataStore';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ReportsSummary } from '@/components/reports/ReportsSummary';
import { VolumeByClientChart } from '@/components/reports/VolumeByClientChart';
import { AlertsByRiskChart } from '@/components/reports/AlertsByRiskChart';
import { ClientReportsTable } from '@/components/reports/ClientReportsTable';
import { useToast } from '@/hooks/use-toast';

// Helper para converter RiskLevel para string legível
function getRiskLevelLabel(riskLevel: number): string {
  const labels: Record<number, string> = {
    0: 'Baixo',   // RiskLevel.Low
    1: 'Médio',   // RiskLevel.Medium
    2: 'Alto',    // RiskLevel.High
  };
  return labels[riskLevel] || 'Desconhecido';
}

export default function Reports() {
  const { getClientReports, clients } = useDataStore();
  const { toast } = useToast();
  
  const [clientFilter, setClientFilter] = useState<string>('all');
  
  const reports = getClientReports();
  const filteredReports = clientFilter === 'all' 
    ? reports 
    : reports.filter(r => r.clientId === clientFilter);

  const handleExportCSV = () => {
    const headers = ['Cliente', 'Transações', 'Volume Total', 'Alertas', 'Nível de Risco'];
    const rows = filteredReports.map(r => [
      r.clientName,
      r.totalTransactions,
      r.totalVolume,
      r.alertCount,
      getRiskLevelLabel(r.riskLevel),
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

  return (
    <AppLayout>
      <PageHeader 
        title="Relatórios" 
        description={`Análise consolidada por cliente • ${filteredReports.length} relatório(s)`}
      >
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
                <SelectItem key={client.externalId} value={client.externalId}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <ReportsSummary reports={filteredReports} />

      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        <VolumeByClientChart reports={filteredReports} />
        <AlertsByRiskChart reports={filteredReports} />
      </div>

      <ClientReportsTable reports={filteredReports} />
    </AppLayout>
  );
}