import { ArrowUpRight, ArrowDownRight, ArrowLeftRight as ArrowTransfer } from 'lucide-react';
import { DataTable, Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/ui/status-badge';
import { format } from 'date-fns';
import { TransactionType } from '@/types/api';

interface Transaction {
  id: number;
  externalId: string;
  clientId: number;
  clientName?: string;
  type: TransactionType;
  amount: {
    value: number;
    currencyCode: string;
  };
  counterPartyId: number;
  counterparty: string;
  counterpartyCountry: string;
  occurredAt: Date;
  createdAt: Date;
}

interface TransactionsTableProps {
  transactions: Transaction[];
}

function getFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return '🏳️';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function getTypeIcon(type: TransactionType) {
  switch (type) {
    case TransactionType.Deposit:
      return <ArrowDownRight className="h-4 w-4 text-success" />;
    case TransactionType.Withdraw:
      return <ArrowUpRight className="h-4 w-4 text-destructive" />;
    case TransactionType.Transfer:
      return <ArrowTransfer className="h-4 w-4 text-primary" />;
  }
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency,
    }).format(value);
  };

  const columns: Column<Transaction>[] = [
    {
      header: 'Tipo',
      accessor: (transaction) => (
        <div className="flex items-center gap-2">
          {getTypeIcon(transaction.type)}
          <StatusBadge type={transaction.type} />
        </div>
      ),
    },
    {
      header: 'Cliente',
      accessor: (transaction) => (
        <div className="font-medium text-foreground">{transaction.clientName}</div>
      ),
    },
    {
      header: 'Valor',
      accessor: (transaction) => (
        <span className={`font-mono font-medium ${
          transaction.type === TransactionType.Withdraw ? 'text-destructive' : 
          transaction.type === TransactionType.Deposit ? 'text-success' : 'text-foreground'
        }`}>
          {formatCurrency(transaction.amount.value, transaction.amount.currencyCode)}
        </span>
      ),
    },
    {
      header: 'Contraparte',
      accessor: (transaction) => (
        <span className="text-muted-foreground">{transaction.counterparty}</span>
      ),
    },
    {
      header: 'País',
      accessor: (transaction) => (
        <span className="inline-flex items-center gap-1.5">
          <span className="text-lg">{getFlagEmoji(transaction.counterpartyCountry)}</span>
          <span className="text-muted-foreground">{transaction.counterpartyCountry}</span>
        </span>
      ),
    },
    {
      header: 'Data',
      accessor: (transaction) => (
        <span className="text-muted-foreground text-sm">
          {format(transaction.occurredAt, 'dd/MM/yyyy HH:mm')}
        </span>
      ),
    },
  ];

  return (
    <DataTable 
      data={transactions} 
      columns={columns} 
      emptyMessage="Nenhuma transação encontrada"
      getRowKey={(transaction) => transaction.externalId}
    />
  );
}