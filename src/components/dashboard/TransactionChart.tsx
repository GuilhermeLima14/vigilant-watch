import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Transaction } from '@/types';

interface TransactionChartProps {
  transactions: Transaction[];
}

const COLORS = {
  primary: 'hsl(217, 91%, 60%)',
};

export function TransactionChart({ transactions }: TransactionChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  const transactionsByType = [
    { 
      name: 'Depósitos', 
      value: transactions
        .filter(t => t.type === 'DEPOSIT')
        .reduce((acc, t) => acc + t.amount, 0) 
    },
    { 
      name: 'Saques', 
      value: transactions
        .filter(t => t.type === 'WITHDRAWAL')
        .reduce((acc, t) => acc + t.amount, 0) 
    },
    { 
      name: 'Transferências', 
      value: transactions
        .filter(t => t.type === 'TRANSFER')
        .reduce((acc, t) => acc + t.amount, 0) 
    },
  ];

  return (
    <div className="glass rounded-xl p-6 border border-border lg:col-span-2">
      <h3 className="text-lg font-semibold mb-4">Volume por Tipo de Transação</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={transactionsByType}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 20%, 88%)" />
          <XAxis dataKey="name" stroke="hsl(215, 20%, 55%)" fontSize={12} />
          <YAxis 
            stroke="hsl(215, 20%, 55%)" 
            fontSize={12} 
            tickFormatter={(v) => formatCurrency(v)} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              color: 'hsl(var(--foreground))'
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
            formatter={(value: number) => formatCurrency(value)}
          />
          <Bar dataKey="value" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}