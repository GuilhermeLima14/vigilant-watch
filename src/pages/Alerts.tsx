import { useState } from 'react';
import { useDataStore } from '@/store/dataStore';
import { useAuthStore } from '@/store/authStore';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/ui/page-header';
import { AlertsStatsSection } from '@/components/alerts/AlertsStatsSection';
import { AlertsFilterSection } from '@/components/alerts/AlertsFilterSection';
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
  const [resolutionNotes, setResolutionNotes] = useState('');

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
    setResolutionNotes(alert.resolutionNotes || '');
    setIsDetailOpen(true);
  };

  const handleUpdateStatus = (newStatus: AlertStatus) => {
    if (!selectedAlert) return;

    updateAlertStatus(selectedAlert.id, newStatus, resolutionNotes);

    const getStatusLabel = (status: AlertStatus): string => {
      const labels: Record<AlertStatus, string> = {
        NEW: 'Novo',
        UNDER_REVIEW: 'Em Análise',
        RESOLVED: 'Resolvido',
        DISMISSED: 'Descartado',
      };
      return labels[status];
    };

    toast({
      title: 'Status atualizado',
      description: `O alerta foi marcado como "${getStatusLabel(newStatus)}".`,
    });

    setIsDetailOpen(false);
    setSelectedAlert(null);
    setResolutionNotes('');
  };

  // Stats
  const stats = {
    new: alerts.filter(a => a.status === 'NEW').length,
    underReview: alerts.filter(a => a.status === 'UNDER_REVIEW').length,
    resolved: alerts.filter(a => a.status === 'RESOLVED').length,
    critical: alerts.filter(a => a.severity === 'CRITICAL' && a.status !== 'RESOLVED').length,
  };

  return (
    <AppLayout>
      <PageHeader title="Alertas" description="Monitoramento de alertas de compliance" />

      <AlertsStatsSection
        newCount={stats.new}
        underReviewCount={stats.underReview}
        resolvedCount={stats.resolved}
        criticalCount={stats.critical}
      />

      <AlertsFilterSection
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        severityFilter={severityFilter}
        onSeverityFilterChange={setSeverityFilter}
      />

      <AlertsList
        alerts={filteredAlerts}
        onViewAlert={handleViewAlert}
      />

      <AlertDetailDialog
        isOpen={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        alert={selectedAlert}
        resolutionNotes={resolutionNotes}
        onResolutionNotesChange={setResolutionNotes}
        onStatusUpdate={handleUpdateStatus}
      />
    </AppLayout>
  );
}
