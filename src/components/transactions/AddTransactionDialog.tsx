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
import type { TransactionType, Client } from '@/types';

interface AddTransactionDialogProps {
  clients: Client[];
  onAddTransaction: (transaction: {
    clientId: string;
    type: TransactionType;
    amount: number;
    currency: string;
    counterparty: string;
    counterpartyCountry: string;
    transactionDate: Date;
  }) => void;
}

export function AddTransactionDialog({
  clients,
  onAddTransaction,
}: AddTransactionDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    clientId: '',
    type: 'DEPOSIT' as TransactionType,
    amount: '',
    currency: 'USD',
    counterparty: '',
    counterpartyCountry: '',
    transactionDate: new Date(),
  });

  const handleSubmit = () => {
    onAddTransaction({
      clientId: newTransaction.clientId,
      type: newTransaction.type,
      amount: parseFloat(newTransaction.amount),
      currency: newTransaction.currency,
      counterparty: newTransaction.counterparty,
      counterpartyCountry: newTransaction.counterpartyCountry,
      transactionDate: newTransaction.transactionDate,
    });
    setNewTransaction({
      clientId: '',
      type: 'DEPOSIT',
      amount: '',
      currency: 'USD',
      counterparty: '',
      counterpartyCountry: '',
      transactionDate: new Date(),
    });
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Transação
        </Button>
      </DialogTrigger>
      <DialogContent className="glass border-border add-transaction-dialog">
        <DialogHeader>
          <DialogTitle>Registrar Transação</DialogTitle>
          <DialogDescription>
            Adicione uma nova transação ao sistema.
          </DialogDescription>
        </DialogHeader>

        <div className="form-fields grid gap-4 py-4">
          <div className="client-field space-y-2">
            <Label>Cliente *</Label>
            <Select
              value={newTransaction.clientId}
              onValueChange={(v) => setNewTransaction({ ...newTransaction, clientId: v })}
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

          <div className="type-and-currency-fields grid grid-cols-2 gap-4">
            <div className="type-field space-y-2">
              <Label>Tipo *</Label>
              <Select
                value={newTransaction.type}
                onValueChange={(v) =>
                  setNewTransaction({ ...newTransaction, type: v as TransactionType })
                }
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

            <div className="currency-field space-y-2">
              <Label>Moeda</Label>
              <Select
                value={newTransaction.currency}
                onValueChange={(v) => setNewTransaction({ ...newTransaction, currency: v })}
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

          <div className="amount-field space-y-2">
            <Label htmlFor="amount">Valor *</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={newTransaction.amount}
              onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
              className="bg-muted/50"
            />
          </div>

          <div className="counterparty-fields grid grid-cols-2 gap-4">
            <div className="counterparty-field space-y-2">
              <Label htmlFor="counterparty">Contraparte *</Label>
              <Input
                id="counterparty"
                placeholder="Nome do banco/empresa"
                value={newTransaction.counterparty}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, counterparty: e.target.value })
                }
                className="bg-muted/50"
              />
            </div>

            <div className="country-field space-y-2">
              <Label htmlFor="counterpartyCountry">País</Label>
              <Input
                id="counterpartyCountry"
                placeholder="US"
                value={newTransaction.counterpartyCountry}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    counterpartyCountry: e.target.value.toUpperCase(),
                  })
                }
                maxLength={2}
                className="bg-muted/50"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Registrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
