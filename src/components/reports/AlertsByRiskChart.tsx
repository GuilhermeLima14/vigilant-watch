import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { RiskLevel } from '@/types/api';

interface ClientReport {
  clientId: string;
  clientName: string;
  totalTransactions: number;
  totalVolume: number;
  alertCount: number;
  riskLevel: RiskLevel;
}

interface AlertsByRiskChartProps {
  reports: ClientReport[];
}

const COLORS = {
  success: 'hsl(142, 71%, 45%)',
  warning: 'hsl(38, 92%, 50%)',
  destructive: 'hsl(0, 84%, 60%)',
};

export function AlertsByRiskChart({ reports }: AlertsByRiskChartProps) {
  const alertsByRisk = [
    { 
      name: 'Baixo', 
      value: reports
        .filter(r => r.riskLevel === RiskLevel.Low)
        .reduce((acc, r) => acc + r.alertCount, 0), 
      color: COLORS.success 
    },
    { 
      name: 'Médio', 
      value: reports
        .filter(r => r.riskLevel === RiskLevel.Medium)
        .reduce((acc, r) => acc + r.alertCount, 0), 
      color: COLORS.warning 
    },
    { 
      name: 'Alto', 
      value: reports
        .filter(r => r.riskLevel === RiskLevel.High)
        .reduce((acc, r) => acc + r.alertCount, 0), 
      color: COLORS.destructive 
    },
  ];

  return (
    <div className="glass rounded-xl p-6 border border-border">
      <h3 className="text-lg font-semibold mb-4">Alertas por Nível de Risco</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={alertsByRisk}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={4}
            dataKey="value"
          >
            {alertsByRisk.map((entry, index) => (
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