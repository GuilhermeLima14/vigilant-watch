import { ArrowUpRight, ArrowDownRight, ArrowLeftRight as ArrowTransfer } from 'lucide-react';
import { StatusBadge } from '@/components/ui/status-badge';
import { format } from 'date-fns';
import type { Transaction, TransactionType } from '@/types';

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
    case 'DEPOSIT':
      return <ArrowDownRight className="h-4 w-4 text-success" />;
    case 'WITHDRAWAL':
      return <ArrowUpRight className="h-4 w-4 text-destructive" />;
    case 'TRANSFER':
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

  return (
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
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-muted-foreground">
                  Nenhuma transação encontrada
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
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
  );
}