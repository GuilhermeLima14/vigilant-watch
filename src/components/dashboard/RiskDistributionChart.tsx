import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getTooltipStyle } from '@/lib/theme-colors';

interface RiskData {
  name: string;
  value: number;
  color: string;
}

interface RiskDistributionChartProps {
  data: RiskData[];
}

export function RiskDistributionChart({ data }: RiskDistributionChartProps) {
  return (
    <div className="risk-distribution-section glass rounded-xl p-6 border border-border">
      <h3 className="risk-distribution-title text-lg font-semibold mb-4">
        Distribuição de Risco
      </h3>
      <div className="risk-distribution-chart-container">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`risk-cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={getTooltipStyle()} />
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
