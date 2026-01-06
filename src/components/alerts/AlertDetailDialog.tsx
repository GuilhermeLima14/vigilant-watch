import { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
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
  alert: Alert | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (alertId: string, status: AlertStatus, notes: string) => void;
}

export function AlertDetailDialog({ alert, isOpen, onClose, onUpdateStatus }: AlertDetailDialogProps) {
  const [resolutionNotes, setResolutionNotes] = useState('');

  useEffect(() => {
    if (alert) {
      setResolutionNotes(alert.resolutionNotes || '');
    }
  }, [alert]);

  const handleUpdateStatus = (newStatus: AlertStatus) => {
    if (!alert) return;
    onUpdateStatus(alert.id, newStatus, resolutionNotes);
    onClose();
  };

  if (!alert) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass border-border max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalhes do Alerta</DialogTitle>
          <DialogDescription>
            Revise as informações e atualize o status do alerta.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-muted-foreground text-xs">Cliente</Label>
              <p className="font-medium">{alert.clientName}</p>
            </div>
            <div>
              <Label className="text-muted-foreground text-xs">Regra</Label>
              <p className="font-medium">{alert.ruleCode}</p>
            </div>
          </div>
          
          <div>
            <Label className="text-muted-foreground text-xs">Descrição</Label>
            <p className="text-foreground">{alert.ruleDescription}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-muted-foreground text-xs">Severidade</Label>
              <div className="mt-1">
                <StatusBadge type={alert.severity} />
              </div>
            </div>
            <div>
              <Label className="text-muted-foreground text-xs">Status Atual</Label>
              <div className="mt-1">
                <StatusBadge type={alert.status} />
              </div>
            </div>
          </div>

          <div>
            <Label className="text-muted-foreground text-xs">Data do Alerta</Label>
            <p>{format(alert.createdAt, "dd/MM/yyyy 'às' HH:mm")}</p>
          </div>

          {alert.resolvedAt && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground text-xs">Resolvido por</Label>
                <p>{alert.resolvedBy}</p>
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">Data da Resolução</Label>
                <p>{format(alert.resolvedAt, "dd/MM/yyyy 'às' HH:mm")}</p>
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
        
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          
          {alert.status === 'NEW' && (
            <Button
              variant="secondary"
              onClick={() => handleUpdateStatus('UNDER_REVIEW')}
            >
              <Clock className="h-4 w-4 mr-2" />
              Iniciar Análise
            </Button>
          )}
          
          {(alert.status === 'NEW' || alert.status === 'UNDER_REVIEW') && (
            <>
              <Button
                variant="outline"
                onClick={() => handleUpdateStatus('DISMISSED')}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Descartar
              </Button>
              <Button onClick={() => handleUpdateStatus('RESOLVED')}>
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