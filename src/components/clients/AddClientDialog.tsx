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
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    riskLevel: 'LOW' as RiskLevel,
    kycStatus: 'PENDING' as KYCStatus,
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.country) {
      return;
    }
    
    onAddClient(formData);
    setIsOpen(false);
    setFormData({
      name: '',
      country: '',
      riskLevel: 'LOW',
      kycStatus: 'PENDING',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Cliente
        </Button>
      </DialogTrigger>
      <DialogContent className="glass border-border">
        <DialogHeader>
          <DialogTitle>Cadastrar Cliente</DialogTitle>
          <DialogDescription>
            Adicione um novo cliente ao sistema de monitoramento.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome *</Label>
            <Input
              id="name"
              placeholder="Nome da empresa ou pessoa"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-muted/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="country">País *</Label>
            <Input
              id="country"
              placeholder="Código do país (ex: BR, US)"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value.toUpperCase() })}
              maxLength={2}
              className="bg-muted/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Nível de Risco</Label>
            <Select
              value={formData.riskLevel}
              onValueChange={(v) => setFormData({ ...formData, riskLevel: v as RiskLevel })}
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
          
          <div className="space-y-2">
            <Label>Status KYC</Label>
            <Select
              value={formData.kycStatus}
              onValueChange={(v) => setFormData({ ...formData, kycStatus: v as KYCStatus })}
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
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Cadastrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}