import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { RiskLevel } from '@/types/api';

interface Client {
  externalId: string;
  name: string;
  countryCode: string;
  riskLevel: RiskLevel;
  kycStatus: number;
  createdAt: Date;
  updatedAt: Date;
}

interface RiskDistributionChartProps {
  clients: Client[];
}

const COLORS = {
  success: 'hsl(142, 71%, 45%)',
  warning: 'hsl(38, 92%, 50%)',
  destructive: 'hsl(0, 84%, 60%)',
};

export function RiskDistributionChart({ clients }: RiskDistributionChartProps) {
  const riskDistribution = [
    { 
      name: 'Baixo', 
      value: clients.filter(c => c.riskLevel === RiskLevel.Low).length, 
      color: COLORS.success 
    },
    { 
      name: 'Médio', 
      value: clients.filter(c => c.riskLevel === RiskLevel.Medium).length, 
      color: COLORS.warning 
    },
    { 
      name: 'Alto', 
      value: clients.filter(c => c.riskLevel === RiskLevel.High).length, 
      color: COLORS.destructive 
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