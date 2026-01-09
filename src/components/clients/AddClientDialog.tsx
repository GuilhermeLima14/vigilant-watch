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
import { RiskLevel, KYCStatus } from '@/types/api';

interface AddClientDialogProps {
  onAddClient: (client: {
    name: string;
    countryCode: string;
    riskLevel: RiskLevel;
    kycStatus: KYCStatus;
  }) => void;
}

export function AddClientDialog({ onAddClient }: AddClientDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    countryCode: '',
    riskLevel: RiskLevel.Low,
    kycStatus: KYCStatus.Pending,
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.countryCode) {
      return;
    }
    
    onAddClient(formData);
    setIsOpen(false);
    setFormData({
      name: '',
      countryCode: '',
      riskLevel: RiskLevel.Low,
      kycStatus: KYCStatus.Pending,
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
            <Label htmlFor="country">Código do País *</Label>
            <Input
              id="country"
              placeholder="BR, US, DE..."
              value={formData.countryCode}
              onChange={(e) => setFormData({ ...formData, countryCode: e.target.value.toUpperCase() })}
              maxLength={2}
              className="bg-muted/50"
            />
            <p className="text-xs text-muted-foreground">
              Digite o código ISO de 2 letras (ex: BR, US, DE)
            </p>
          </div>
          
          <div className="space-y-2">
            <Label>Nível de Risco</Label>
            <Select
              value={String(formData.riskLevel)}
              onValueChange={(v) => setFormData({ ...formData, riskLevel: Number(v) as RiskLevel })}
            >
              <SelectTrigger className="bg-muted/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={String(RiskLevel.Low)}>Baixo</SelectItem>
                <SelectItem value={String(RiskLevel.Medium)}>Médio</SelectItem>
                <SelectItem value={String(RiskLevel.High)}>Alto</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Status KYC</Label>
            <Select
              value={String(formData.kycStatus)}
              onValueChange={(v) => setFormData({ ...formData, kycStatus: Number(v) as KYCStatus })}
            >
              <SelectTrigger className="bg-muted/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={String(KYCStatus.Pending)}>Pendente</SelectItem>
                <SelectItem value={String(KYCStatus.Verified)}>Verificado</SelectItem>
                <SelectItem value={String(KYCStatus.Rejected)}>Rejeitado</SelectItem>
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