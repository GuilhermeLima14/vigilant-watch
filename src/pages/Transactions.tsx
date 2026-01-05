import { useState } from 'react';
import { useDataStore } from '@/store/dataStore';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/ui/page-header';
import { TransactionsFilterSection } from '@/components/transactions/TransactionsFilterSection';
import { TransactionsTable } from '@/components/transactions/TransactionsTable';
import { AddTransactionDialog } from '@/components/transactions/AddTransactionDialog';
import { useToast } from '@/hooks/use-toast';

export default function Transactions() {
  const { transactions, clients, addTransaction } = useDataStore();
  const { toast } = useToast();

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [clientFilter, setClientFilter] = useState<string>('all');

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.clientName?.toLowerCase().includes(search.toLowerCase()) ||
      transaction.counterparty.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    const matchesClient = clientFilter === 'all' || transaction.clientId === clientFilter;
    return matchesSearch && matchesType && matchesClient;
  });

  const handleAddTransaction = (newTransaction: any) => {
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
      ...newTransaction,
      clientName: client?.name,
      counterpartyCountry: newTransaction.counterpartyCountry.toUpperCase(),
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

  return (
    <AppLayout>
      <PageHeader title="Transações" description="Histórico e registro de transações">
        <AddTransactionDialog clients={clients} onAddTransaction={handleAddTransaction} />
      </PageHeader>

      <TransactionsFilterSection
        search={search}
        onSearchChange={setSearch}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        clientFilter={clientFilter}
        onClientFilterChange={setClientFilter}
        clients={clients}
      />

      <TransactionsTable
        transactions={filteredTransactions}
        formatCurrency={formatCurrency}
      />
    </AppLayout>
  );
}
