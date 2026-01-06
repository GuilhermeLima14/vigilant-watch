import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { ClientReport } from '@/types';

interface AlertsByRiskChartProps {
  reports: ClientReport[];
}

const COLORS = {
  success: 'hsl(142, 71%, 45%)',
  warning: 'hsl(38, 92%, 50%)',
  destructive: 'hsl(0, 84%, 60%)',
  critical: '#991b1b',
};

export function AlertsByRiskChart({ reports }: AlertsByRiskChartProps) {
  const alertsByRisk = [
    { 
      name: 'Baixo', 
      value: reports
        .filter(r => r.riskLevel === 'LOW')
        .reduce((acc, r) => acc + r.alertCount, 0), 
      color: COLORS.success 
    },
    { 
      name: 'Médio', 
      value: reports
        .filter(r => r.riskLevel === 'MEDIUM')
        .reduce((acc, r) => acc + r.alertCount, 0), 
      color: COLORS.warning 
    },
    { 
      name: 'Alto', 
      value: reports
        .filter(r => r.riskLevel === 'HIGH')
        .reduce((acc, r) => acc + r.alertCount, 0), 
      color: COLORS.destructive 
    },
    { 
      name: 'Crítico', 
      value: reports
        .filter(r => r.riskLevel === 'CRITICAL')
        .reduce((acc, r) => acc + r.alertCount, 0), 
      color: COLORS.critical 
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