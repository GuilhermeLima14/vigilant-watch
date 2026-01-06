import { useState } from 'react';
import { useDataStore } from '@/store/dataStore';
import { useAuthStore } from '@/store/authStore';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/ui/page-header';
import { AlertsQuickStats } from '@/components/alerts/AlertsQuickStats';
import { AlertsFilters } from '@/components/alerts/AlertsFilters';
import { AlertsList } from '@/components/alerts/AlertsList';
import { AlertDetailDialog } from '@/components/alerts/AlertDetailDialog';
import { useToast } from '@/hooks/use-toast';
import type { Alert, AlertStatus } from '@/types';

export default function Alerts() {
  const { alerts, updateAlertStatus } = useDataStore();
  const { user } = useAuthStore();
  const { toast } = useToast();
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch = 
      alert.clientName?.toLowerCase().includes(search.toLowerCase()) ||
      alert.ruleDescription.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    return matchesSearch && matchesStatus && matchesSeverity;
  });

  const handleViewAlert = (alert: Alert) => {
    setSelectedAlert(alert);
    setIsDetailOpen(true);
  };

  const handleUpdateStatus = (alertId: string, newStatus: AlertStatus, notes: string) => {
    updateAlertStatus(alertId, newStatus, notes);
    
    const statusLabels: Record<AlertStatus, string> = {
      NEW: 'Novo',
      UNDER_REVIEW: 'Em Análise',
      RESOLVED: 'Resolvido',
      DISMISSED: 'Descartado',
    };
    
    toast({
      title: 'Status atualizado',
      description: `O alerta foi marcado como "${statusLabels[newStatus]}".`,
    });
    
    setIsDetailOpen(false);
    setSelectedAlert(null);
  };

  return (
    <AppLayout>
      <PageHeader title="Alertas" description="Monitoramento de alertas de compliance" />

      <AlertsQuickStats alerts={alerts} />

      <AlertsFilters
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        severityFilter={severityFilter}
        onSeverityFilterChange={setSeverityFilter}
      />

      <AlertsList alerts={filteredAlerts} onViewAlert={handleViewAlert} />

      <AlertDetailDialog
        alert={selectedAlert}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedAlert(null);
        }}
        onUpdateStatus={handleUpdateStatus}
      />
    </AppLayout>
  );
}