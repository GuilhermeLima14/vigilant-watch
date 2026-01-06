import { useState } from 'react';
import { useDataStore } from '@/store/dataStore';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/ui/page-header';
import { TransactionsFilters } from '@/components/transactions/TransactionsFilters';
import { TransactionsTable } from '@/components/transactions/TransactionsTable';
import { AddTransactionDialog } from '@/components/transactions/AddTransactionDialog';
import { useToast } from '@/hooks/use-toast';
import type { TransactionType } from '@/types';

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

  const handleAddTransaction = (transactionData: {
    clientId: string;
    type: TransactionType;
    amount: number;
    currency: string;
    counterparty: string;
    counterpartyCountry: string;
  }) => {
    if (!transactionData.clientId || !transactionData.amount || !transactionData.counterparty) {
      toast({
        title: 'Erro',
        description: 'Preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    const client = clients.find(c => c.id === transactionData.clientId);
    
    addTransaction({
      clientId: transactionData.clientId,
      clientName: client?.name,
      type: transactionData.type,
      amount: transactionData.amount,
      currency: transactionData.currency,
      counterparty: transactionData.counterparty,
      counterpartyCountry: transactionData.counterpartyCountry,
      transactionDate: new Date(),
    });
    
    toast({
      title: 'Transação registrada',
      description: 'A transação foi registrada com sucesso.',
    });
  };

  return (
    <AppLayout>
      <PageHeader title="Transações" description="Histórico e registro de transações">
        <AddTransactionDialog clients={clients} onAddTransaction={handleAddTransaction} />
      </PageHeader>

      <TransactionsFilters
        search={search}
        onSearchChange={setSearch}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        clientFilter={clientFilter}
        onClientFilterChange={setClientFilter}
        clients={clients}
      />

      <TransactionsTable transactions={filteredTransactions} />
    </AppLayout>
  );
}