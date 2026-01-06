import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { Client } from '@/types';

interface RiskDistributionChartProps {
  clients: Client[];
}

const COLORS = {
  success: 'hsl(142, 71%, 45%)',
  warning: 'hsl(38, 92%, 50%)',
  destructive: 'hsl(0, 84%, 60%)',
  critical: '#991b1b',
};

export function RiskDistributionChart({ clients }: RiskDistributionChartProps) {
  const riskDistribution = [
    { 
      name: 'Baixo', 
      value: clients.filter(c => c.riskLevel === 'LOW').length, 
      color: COLORS.success 
    },
    { 
      name: 'Médio', 
      value: clients.filter(c => c.riskLevel === 'MEDIUM').length, 
      color: COLORS.warning 
    },
    { 
      name: 'Alto', 
      value: clients.filter(c => c.riskLevel === 'HIGH').length, 
      color: COLORS.destructive 
    },
    { 
      name: 'Crítico', 
      value: clients.filter(c => c.riskLevel === 'CRITICAL').length, 
      color: COLORS.critical 
    },
  ];

  return (
    <div className="glass rounded-xl p-6 border border-border">
      <h3 className="text-lg font-semibold mb-4">Distribuição de Risco</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={riskDistribution}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={4}
            dataKey="value"
          >
            {riskDistribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              color: 'hsl(var(--foreground))'
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value) => <span className="text-foreground text-sm">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}