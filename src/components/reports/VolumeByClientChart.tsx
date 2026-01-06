import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { ClientReport } from '@/types';

interface VolumeByClientChartProps {
  reports: ClientReport[];
}

const COLORS = {
  primary: 'hsl(217, 91%, 60%)',
};

export function VolumeByClientChart({ reports }: VolumeByClientChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  const volumeByClient = reports
    .sort((a, b) => b.totalVolume - a.totalVolume)
    .slice(0, 8)
    .map(r => ({
      name: r.clientName.length > 15 ? r.clientName.slice(0, 15) + '...' : r.clientName,
      volume: r.totalVolume,
      transacoes: r.totalTransactions,
    }));

  return (
    <div className="glass rounded-xl p-6 border border-border lg:col-span-2">
      <h3 className="text-lg font-semibold mb-4">Volume por Cliente</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={volumeByClient} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 17%)" />
          <XAxis 
            type="number" 
            stroke="hsl(215, 20%, 55%)" 
            fontSize={12} 
            tickFormatter={(v) => formatCurrency(v)} 
          />
          <YAxis 
            type="category" 
            dataKey="name" 
            stroke="hsl(215, 20%, 55%)" 
            fontSize={11} 
            width={120} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              color: 'hsl(var(--foreground))'
            }}
            formatter={(value: number) => formatCurrency(value)}
          />
          <Bar dataKey="volume" fill={COLORS.primary} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}