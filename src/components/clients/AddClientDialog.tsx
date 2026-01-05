import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { RiskLevel, KYCStatus } from '@/types';

interface AddClientDialogProps {
  onAddClient: (client: {
    name: string;
    country: string;
    riskLevel: RiskLevel;
    kycStatus: KYCStatus;
  }) => void;
}

export function AddClientDialog({ onAddClient }: AddClientDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    country: '',
    riskLevel: 'LOW' as RiskLevel,
    kycStatus: 'PENDING' as KYCStatus,
  });

  const handleSubmit = () => {
    onAddClient(newClient);
    setNewClient({
      name: '',
      country: '',
      riskLevel: 'LOW',
      kycStatus: 'PENDING',
    });
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Cliente
        </Button>
      </DialogTrigger>
      <DialogContent className="glass border-border add-client-dialog">
        <DialogHeader>
          <DialogTitle>Cadastrar Cliente</DialogTitle>
          <DialogDescription>
            Adicione um novo cliente ao sistema de monitoramento.
          </DialogDescription>
        </DialogHeader>

        <div className="form-fields grid gap-4 py-4">
          <div className="name-field space-y-2">
            <Label htmlFor="name">Nome *</Label>
            <Input
              id="name"
              placeholder="Nome da empresa ou pessoa"
              value={newClient.name}
              onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
              className="bg-muted/50"
            />
          </div>

          <div className="country-field space-y-2">
            <Label htmlFor="country">País *</Label>
            <Input
              id="country"
              placeholder="Código do país (ex: BR, US)"
              value={newClient.country}
              onChange={(e) =>
                setNewClient({ ...newClient, country: e.target.value.toUpperCase() })
              }
              maxLength={2}
              className="bg-muted/50"
            />
          </div>

          <div className="risk-level-field space-y-2">
            <Label>Nível de Risco</Label>
            <Select
              value={newClient.riskLevel}
              onValueChange={(v) => setNewClient({ ...newClient, riskLevel: v as RiskLevel })}
            >
              <SelectTrigger className="bg-muted/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">Baixo</SelectItem>
                <SelectItem value="MEDIUM">Médio</SelectItem>
                <SelectItem value="HIGH">Alto</SelectItem>
                <SelectItem value="CRITICAL">Crítico</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="kyc-status-field space-y-2">
            <Label>Status KYC</Label>
            <Select
              value={newClient.kycStatus}
              onValueChange={(v) => setNewClient({ ...newClient, kycStatus: v as KYCStatus })}
            >
              <SelectTrigger className="bg-muted/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Pendente</SelectItem>
                <SelectItem value="APPROVED">Aprovado</SelectItem>
                <SelectItem value="REJECTED">Rejeitado</SelectItem>
                <SelectItem value="EXPIRED">Expirado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Cadastrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
