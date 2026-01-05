import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Clock } from 'lucide-react';
import { getTooltipStyle } from '@/lib/theme-colors';

interface AlertStatusData {
  name: string;
  value: number;
  color: string;
}

interface AlertStatusChartProps {
  data: AlertStatusData[];
}

export function AlertStatusChart({ data }: AlertStatusChartProps) {
  return (
    <div className="alert-status-section glass rounded-xl p-6 border border-border">
      <div className="alert-status-header flex items-center justify-between mb-4">
        <h3 className="alert-status-title text-lg font-semibold">Status dos Alertas</h3>
        <Clock className="alert-status-icon h-5 w-5 text-primary" />
      </div>
      <div className="alert-status-chart-container">
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`alert-status-cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={getTooltipStyle()} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
