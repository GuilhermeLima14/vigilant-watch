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
import type { Client, TransactionType } from '@/types';

interface AddTransactionDialogProps {
  clients: Client[];
  onAddTransaction: (transaction: {
    clientId: string;
    type: TransactionType;
    amount: number;
    currency: string;
    counterparty: string;
    counterpartyCountry: string;
  }) => void;
}

export function AddTransactionDialog({ clients, onAddTransaction }: AddTransactionDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    clientId: '',
    type: 'DEPOSIT' as TransactionType,
    amount: '',
    currency: 'USD',
    counterparty: '',
    counterpartyCountry: '',
  });

  const handleSubmit = () => {
    if (!formData.clientId || !formData.amount || !formData.counterparty) {
      return;
    }

    onAddTransaction({
      clientId: formData.clientId,
      type: formData.type,
      amount: parseFloat(formData.amount),
      currency: formData.currency,
      counterparty: formData.counterparty,
      counterpartyCountry: formData.counterpartyCountry.toUpperCase(),
    });
    
    setIsOpen(false);
    setFormData({
      clientId: '',
      type: 'DEPOSIT',
      amount: '',
      currency: 'USD',
      counterparty: '',
      counterpartyCountry: '',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Transação
        </Button>
      </DialogTrigger>
      <DialogContent className="glass border-border">
        <DialogHeader>
          <DialogTitle>Registrar Transação</DialogTitle>
          <DialogDescription>
            Adicione uma nova transação ao sistema.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Cliente *</Label>
            <Select
              value={formData.clientId}
              onValueChange={(v) => setFormData({ ...formData, clientId: v })}
            >
              <SelectTrigger className="bg-muted/50">
                <SelectValue placeholder="Selecione o cliente" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tipo *</Label>
              <Select
                value={formData.type}
                onValueChange={(v) => setFormData({ ...formData, type: v as TransactionType })}
              >
                <SelectTrigger className="bg-muted/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DEPOSIT">Depósito</SelectItem>
                  <SelectItem value="WITHDRAWAL">Saque</SelectItem>
                  <SelectItem value="TRANSFER">Transferência</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Moeda</Label>
              <Select
                value={formData.currency}
                onValueChange={(v) => setFormData({ ...formData, currency: v })}
              >
                <SelectTrigger className="bg-muted/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="BRL">BRL</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Valor *</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="bg-muted/50"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="counterparty">Contraparte *</Label>
              <Input
                id="counterparty"
                placeholder="Nome do banco/empresa"
                value={formData.counterparty}
                onChange={(e) => setFormData({ ...formData, counterparty: e.target.value })}
                className="bg-muted/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="counterpartyCountry">País</Label>
              <Input
                id="counterpartyCountry"
                placeholder="US"
                value={formData.counterpartyCountry}
                onChange={(e) => setFormData({ ...formData, counterpartyCountry: e.target.value.toUpperCase() })}
                maxLength={2}
                className="bg-muted/50"
              />
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Registrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}