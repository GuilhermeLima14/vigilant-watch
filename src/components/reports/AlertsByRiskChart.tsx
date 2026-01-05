import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getTooltipStyle } from '@/lib/theme-colors';

interface AlertsByRiskData {
  name: string;
  value: number;
  color: string;
}

interface AlertsByRiskChartProps {
  data: AlertsByRiskData[];
}

export function AlertsByRiskChart({ data }: AlertsByRiskChartProps) {
  return (
    <div className="alerts-by-risk-section glass rounded-xl p-6 border border-border">
      <h3 className="alerts-by-risk-title text-lg font-semibold mb-4">
        Alertas por Nível de Risco
      </h3>
      <div className="alerts-by-risk-chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`risk-cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(222, 47%, 8%)',
                border: '1px solid hsl(217, 33%, 17%)',
                borderRadius: '8px',
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
    </div>
  );
}
