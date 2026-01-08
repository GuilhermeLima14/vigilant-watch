import { Clock } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertStatus, AlertSeverity } from '@/types/api';

interface Alert {
  id: number;
  clientId: number;
  clientName?: string;
  transactionId: number;
  ruleCode: number;
  ruleDescription: string;
  severity: AlertSeverity;
  status: AlertStatus;
  resolutionNotes?: string;
  resolvedBy?: string;
  createdAt: Date;
  resolvedAt?: Date;
}

interface AlertStatusChartProps {
  alerts: Alert[];
}

const COLORS = {
  primary: 'hsl(217, 91%, 60%)',
  warning: 'hsl(38, 92%, 50%)',
  success: 'hsl(142, 71%, 45%)',
};

export function AlertStatusChart({ alerts }: AlertStatusChartProps) {
  const alertsByStatus = [
    { 
      name: 'Novos', 
      value: alerts.filter(a => a.status === AlertStatus.New).length, 
      color: COLORS.primary 
    },
    { 
      name: 'Em Análise', 
      value: alerts.filter(a => a.status === AlertStatus.Review).length, 
      color: COLORS.warning 
    },
    { 
      name: 'Resolvidos', 
      value: alerts.filter(a => a.status === AlertStatus.Resolved).length, 
      color: COLORS.success 
    },
  ];

  return (
    <div className="glass rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Status dos Alertas</h3>
        <Clock className="h-5 w-5 text-primary" />
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={alertsByStatus}
            cx="50%"
            cy="50%"
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {alertsByStatus.map((entry, index) => (
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
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}