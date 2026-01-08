import { useState } from 'react';
import { useDataStore } from '@/store/dataStore';
import { TransactionType } from '@/types/api';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/ui/page-header';
import { TransactionsFilters } from '@/components/transactions/TransactionsFilters';
import { TransactionsTable } from '@/components/transactions/TransactionsTable';
import { AddTransactionDialog } from '@/components/transactions/AddTransactionDialog';
import { useToast } from '@/hooks/use-toast';

export default function Transactions() {
  const { transactions, clients, addTransaction, getClientByInternalId } = useDataStore();
  const { toast } = useToast();
  
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [clientFilter, setClientFilter] = useState<string>('all');

  // Filtrar transações
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = 
      transaction.clientName?.toLowerCase().includes(search.toLowerCase()) ||
      transaction.counterparty.toLowerCase().includes(search.toLowerCase());
    
    const matchesType = typeFilter === 'all' || transaction.type === Number(typeFilter);
    const matchesClient = clientFilter === 'all' || transaction.clientId === Number(clientFilter);
    
    return matchesSearch && matchesType && matchesClient;
  });

  // Handler para adicionar transação
  const handleAddTransaction = (transactionData: {
    clientId: number;
    type: TransactionType;
    amount: { value: number; currencyCode: string };
    counterparty: string;
    counterpartyCountry: string;
  }) => {
    if (!transactionData.clientId || !transactionData.amount.value || !transactionData.counterparty) {
      toast({
        title: 'Erro',
        description: 'Preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    const client = getClientByInternalId(transactionData.clientId);
    
    addTransaction({
      clientId: transactionData.clientId,
      clientName: client?.name,
      type: transactionData.type,
      amount: transactionData.amount,
      counterPartyId: 999, // Mock counter party ID
      counterparty: transactionData.counterparty,
      counterpartyCountry: transactionData.counterpartyCountry,
      occurredAt: new Date(),
    });
    
    toast({
      title: 'Transação registrada',
      description: 'A transação foi registrada com sucesso.',
    });
  };

  return (
    <AppLayout>
      <PageHeader 
        title="Transações" 
        description={`Histórico e registro de transações • ${filteredTransactions.length} transação(ões)`}
      >
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