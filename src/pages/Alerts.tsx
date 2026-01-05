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
  const { alerts, updateAlertStatus, transactions } = useDataStore();
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
    
    toast({
      title: 'Status atualizado',
      description: `O alerta foi marcado como "${getStatusLabel(newStatus)}".`,
    });
    
    setIsDetailOpen(false);
    setSelectedAlert(null);
    setResolutionNotes('');
  };

  const getStatusLabel = (status: AlertStatus): string => {
    const labels: Record<AlertStatus, string> = {
      NEW: 'Novo',
      UNDER_REVIEW: 'Em Análise',
      RESOLVED: 'Resolvido',
      DISMISSED: 'Descartado',
    };
    return labels[status];
  };

  const getStatusIcon = (status: AlertStatus) => {
    switch (status) {
      case 'NEW':
        return <AlertTriangle className="h-4 w-4 text-info" />;
      case 'UNDER_REVIEW':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'RESOLVED':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'DISMISSED':
        return <XCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'CRITICAL':
        return 'border-l-destructive';
      case 'HIGH':
        return 'border-l-destructive/70';
      case 'MEDIUM':
        return 'border-l-warning';
      default:
        return 'border-l-success';
    }
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

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="glass rounded-lg p-4 border border-border">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-info" />
            <div>
              <p className="text-2xl font-bold">{stats.new}</p>
              <p className="text-xs text-muted-foreground">Novos</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-lg p-4 border border-border">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-warning" />
            <div>
              <p className="text-2xl font-bold">{stats.underReview}</p>
              <p className="text-xs text-muted-foreground">Em Análise</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-lg p-4 border border-border">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-success" />
            <div>
              <p className="text-2xl font-bold">{stats.resolved}</p>
              <p className="text-xs text-muted-foreground">Resolvidos</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-lg p-4 border border-destructive/30 bg-destructive/5">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <div>
              <p className="text-2xl font-bold text-destructive">{stats.critical}</p>
              <p className="text-xs text-muted-foreground">Críticos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass rounded-xl p-4 border border-border mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por cliente ou descrição..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-muted/50"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[160px] bg-muted/50">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="NEW">Novo</SelectItem>
              <SelectItem value="UNDER_REVIEW">Em Análise</SelectItem>
              <SelectItem value="RESOLVED">Resolvido</SelectItem>
              <SelectItem value="DISMISSED">Descartado</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-full sm:w-[160px] bg-muted/50">
              <SelectValue placeholder="Severidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="LOW">Baixa</SelectItem>
              <SelectItem value="MEDIUM">Média</SelectItem>
              <SelectItem value="HIGH">Alta</SelectItem>
              <SelectItem value="CRITICAL">Crítica</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="glass rounded-xl p-8 border border-border text-center">
            <p className="text-muted-foreground">Nenhum alerta encontrado</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`glass rounded-xl p-4 border border-border border-l-4 ${getSeverityColor(alert.severity)} hover:bg-muted/30 transition-colors cursor-pointer`}
              onClick={() => handleViewAlert(alert)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(alert.status)}
                    <span className="font-medium text-foreground">{alert.clientName}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{alert.ruleCode}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.ruleDescription}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {format(alert.createdAt, 'dd/MM/yyyy HH:mm')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge type={alert.severity} />
                  <StatusBadge type={alert.status} />
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Alert Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="glass border-border max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Alerta</DialogTitle>
            <DialogDescription>
              Revise as informações e atualize o status do alerta.
            </DialogDescription>
          </DialogHeader>
          
          {selectedAlert && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground text-xs">Cliente</Label>
                  <p className="font-medium">{selectedAlert.clientName}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">Regra</Label>
                  <p className="font-medium">{selectedAlert.ruleCode}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-muted-foreground text-xs">Descrição</Label>
                <p className="text-foreground">{selectedAlert.ruleDescription}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground text-xs">Severidade</Label>
                  <div className="mt-1">
                    <StatusBadge type={selectedAlert.severity} />
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">Status Atual</Label>
                  <div className="mt-1">
                    <StatusBadge type={selectedAlert.status} />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground text-xs">Data do Alerta</Label>
                <p>{format(selectedAlert.createdAt, "dd/MM/yyyy 'às' HH:mm")}</p>
              </div>

              {selectedAlert.resolvedAt && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground text-xs">Resolvido por</Label>
                    <p>{selectedAlert.resolvedBy}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Data da Resolução</Label>
                    <p>{format(selectedAlert.resolvedAt, "dd/MM/yyyy 'às' HH:mm")}</p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="notes">Notas de Resolução</Label>
                <Textarea
                  id="notes"
                  placeholder="Adicione observações sobre a análise..."
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                  className="bg-muted/50"
                  rows={3}
                />
              </div>
            </div>
          )}
          
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDetailOpen(false)}
            >
              Fechar
            </Button>
            
            {selectedAlert?.status === 'NEW' && (
              <Button
                variant="secondary"
                onClick={() => handleUpdateStatus('UNDER_REVIEW')}
              >
                <Clock className="h-4 w-4 mr-2" />
                Iniciar Análise
              </Button>
            )}
            
            {(selectedAlert?.status === 'NEW' || selectedAlert?.status === 'UNDER_REVIEW') && (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleUpdateStatus('DISMISSED')}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Descartar
                </Button>
                <Button
                  onClick={() => handleUpdateStatus('RESOLVED')}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Resolver
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
