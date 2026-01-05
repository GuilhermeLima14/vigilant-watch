import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { StatusBadge } from '@/components/ui/status-badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import type { Alert, AlertStatus } from '@/types';

interface AlertDetailDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  alert: Alert | null;
  resolutionNotes: string;
  onResolutionNotesChange: (notes: string) => void;
  onStatusUpdate: (status: AlertStatus) => void;
}

export function AlertDetailDialog({
  isOpen,
  onOpenChange,
  alert,
  resolutionNotes,
  onResolutionNotesChange,
  onStatusUpdate,
}: AlertDetailDialogProps) {
  if (!alert) return null;

  const getStatusLabel = (status: AlertStatus): string => {
    const labels: Record<AlertStatus, string> = {
      NEW: 'Novo',
      UNDER_REVIEW: 'Em Análise',
      RESOLVED: 'Resolvido',
      DISMISSED: 'Descartado',
    };
    return labels[status];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-border alert-detail-dialog max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalhes do Alerta</DialogTitle>
          <DialogDescription>
            Revise as informações e atualize o status do alerta.
          </DialogDescription>
        </DialogHeader>

        <div className="alert-details space-y-4 py-4">
          <div className="client-and-rule-info grid grid-cols-2 gap-4">
            <div className="client-field">
              <Label className="text-muted-foreground text-xs">Cliente</Label>
              <p className="font-medium">{alert.clientName}</p>
            </div>
            <div className="rule-field">
              <Label className="text-muted-foreground text-xs">Regra</Label>
              <p className="font-medium">{alert.ruleCode}</p>
            </div>
          </div>

          <div className="description-field">
            <Label className="text-muted-foreground text-xs">Descrição</Label>
            <p className="text-foreground">{alert.ruleDescription}</p>
          </div>

          <div className="severity-and-status-info grid grid-cols-2 gap-4">
            <div className="severity-field">
              <Label className="text-muted-foreground text-xs">Severidade</Label>
              <div className="mt-1">
                <StatusBadge type={alert.severity} />
              </div>
            </div>
            <div className="status-field">
              <Label className="text-muted-foreground text-xs">Status Atual</Label>
              <div className="mt-1">
                <StatusBadge type={alert.status} />
              </div>
            </div>
          </div>

          <div className="alert-date-field">
            <Label className="text-muted-foreground text-xs">Data do Alerta</Label>
            <p>{format(alert.createdAt, "dd/MM/yyyy 'às' HH:mm")}</p>
          </div>

          {alert.resolvedAt && (
            <div className="resolved-info-fields grid grid-cols-2 gap-4">
              <div className="resolved-by-field">
                <Label className="text-muted-foreground text-xs">Resolvido por</Label>
                <p>{alert.resolvedBy}</p>
              </div>
              <div className="resolved-date-field">
                <Label className="text-muted-foreground text-xs">Data da Resolução</Label>
                <p>{format(alert.resolvedAt, "dd/MM/yyyy 'às' HH:mm")}</p>
              </div>
            </div>
          )}

          <div className="resolution-notes-field space-y-2">
            <Label htmlFor="notes">Notas de Resolução</Label>
            <Textarea
              id="notes"
              placeholder="Adicione observações sobre a análise..."
              value={resolutionNotes}
              onChange={(e) => onResolutionNotesChange(e.target.value)}
              className="bg-muted/50"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>

          {alert.status === 'NEW' && (
            <Button variant="secondary" onClick={() => onStatusUpdate('UNDER_REVIEW')}>
              <Clock className="h-4 w-4 mr-2" />
              Iniciar Análise
            </Button>
          )}

          {(alert.status === 'NEW' || alert.status === 'UNDER_REVIEW') && (
            <>
              <Button variant="outline" onClick={() => onStatusUpdate('DISMISSED')}>
                <XCircle className="h-4 w-4 mr-2" />
                Descartar
              </Button>
              <Button onClick={() => onStatusUpdate('RESOLVED')}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Resolver
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
