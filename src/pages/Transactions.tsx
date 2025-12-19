import { useState } from 'react';
import { Plus, Search, Calendar, ArrowUpRight, ArrowDownRight, ArrowLeftRight as ArrowTransfer } from 'lucide-react';
import { useDataStore } from '@/store/dataStore';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/ui/page-header';
import { StatusBadge } from '@/components/ui/status-badge';
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
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import type { TransactionType } from '@/types';

export default function Transactions() {
  const { transactions, clients, addTransaction } = useDataStore();
  const { toast } = useToast();
  
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [clientFilter, setClientFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // New transaction form state
  const [newTransaction, setNewTransaction] = useState({
    clientId: '',
    type: 'DEPOSIT' as TransactionType,
    amount: '',
    currency: 'USD',
    counterparty: '',
    counterpartyCountry: '',
    transactionDate: new Date(),
  });

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = 
      transaction.clientName?.toLowerCase().includes(search.toLowerCase()) ||
      transaction.counterparty.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    const matchesClient = clientFilter === 'all' || transaction.clientId === clientFilter;
    return matchesSearch && matchesType && matchesClient;
  });

  const handleAddTransaction = () => {
    if (!newTransaction.clientId || !newTransaction.amount || !newTransaction.counterparty) {
      toast({
        title: 'Erro',
        description: 'Preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    const client = clients.find(c => c.id === newTransaction.clientId);
    
    addTransaction({
      clientId: newTransaction.clientId,
      clientName: client?.name,
      type: newTransaction.type,
      amount: parseFloat(newTransaction.amount),
      currency: newTransaction.currency,
      counterparty: newTransaction.counterparty,
      counterpartyCountry: newTransaction.counterpartyCountry.toUpperCase(),
      transactionDate: newTransaction.transactionDate,
    });
    
    setIsDialogOpen(false);
    setNewTransaction({
      clientId: '',
      type: 'DEPOSIT',
      amount: '',
      currency: 'USD',
      counterparty: '',
      counterpartyCountry: '',
      transactionDate: new Date(),
    });
    
    toast({
      title: 'Transação registrada',
      description: 'A transação foi registrada com sucesso.',
    });
  };

  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency,
    }).format(value);
  };

  const getTypeIcon = (type: TransactionType) => {
    switch (type) {
      case 'DEPOSIT':
        return <ArrowDownRight className="h-4 w-4 text-success" />;
      case 'WITHDRAWAL':
        return <ArrowUpRight className="h-4 w-4 text-destructive" />;
      case 'TRANSFER':
        return <ArrowTransfer className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <AppLayout>
      <PageHeader title="Transações" description="Histórico e registro de transações">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo *</Label>
                  <Select
                    value={newTransaction.type}
                    onValueChange={(v) => setNewTransaction({ ...newTransaction, type: v as TransactionType })}
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
              
              <div className="space-y-2">
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
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="counterparty">Contraparte *</Label>
                  <Input
                    id="counterparty"
                    placeholder="Nome do banco/empresa"
                    value={newTransaction.counterparty}
                    onChange={(e) => setNewTransaction({ ...newTransaction, counterparty: e.target.value })}
                    className="bg-muted/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="counterpartyCountry">País</Label>
                  <Input
                    id="counterpartyCountry"
                    placeholder="US"
                    value={newTransaction.counterpartyCountry}
                    onChange={(e) => setNewTransaction({ ...newTransaction, counterpartyCountry: e.target.value.toUpperCase() })}
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
              <Button onClick={handleAddTransaction}>
                Registrar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageHeader>

      {/* Filters */}
      <div className="glass rounded-xl p-4 border border-border mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por cliente ou contraparte..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-muted/50"
            />
          </div>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[160px] bg-muted/50">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Tipos</SelectItem>
              <SelectItem value="DEPOSIT">Depósito</SelectItem>
              <SelectItem value="WITHDRAWAL">Saque</SelectItem>
              <SelectItem value="TRANSFER">Transferência</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={clientFilter} onValueChange={setClientFilter}>
            <SelectTrigger className="w-full sm:w-[200px] bg-muted/50">
              <SelectValue placeholder="Cliente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Clientes</SelectItem>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr className="bg-muted/30">
                <th>Tipo</th>
                <th>Cliente</th>
                <th>Valor</th>
                <th>Contraparte</th>
                <th>País</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-muted-foreground">
                    Nenhuma transação encontrada
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="transition-colors">
                    <td>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(transaction.type)}
                        <StatusBadge type={transaction.type} />
                      </div>
                    </td>
                    <td>
                      <div className="font-medium text-foreground">{transaction.clientName}</div>
                    </td>
                    <td>
                      <span className={`font-mono font-medium ${
                        transaction.type === 'WITHDRAWAL' ? 'text-destructive' : 
                        transaction.type === 'DEPOSIT' ? 'text-success' : 'text-foreground'
                      }`}>
                        {formatCurrency(transaction.amount, transaction.currency)}
                      </span>
                    </td>
                    <td className="text-muted-foreground">{transaction.counterparty}</td>
                    <td>
                      <span className="inline-flex items-center gap-1.5">
                        <span className="text-lg">{getFlagEmoji(transaction.counterpartyCountry)}</span>
                        <span className="text-muted-foreground">{transaction.counterpartyCountry}</span>
                      </span>
                    </td>
                    <td className="text-muted-foreground text-sm">
                      {format(transaction.transactionDate, 'dd/MM/yyyy HH:mm')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}

function getFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return '🏳️';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
