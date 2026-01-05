import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { getTooltipStyle } from '@/lib/theme-colors';

interface TransactionData {
  name: string;
  value: number;
}

interface TransactionVolumeChartProps {
  data: TransactionData[];
  formatCurrency: (value: number) => string;
}

const CHART_COLORS = {
  primary: 'hsl(217, 91%, 60%)',
};

export function TransactionVolumeChart({
  data,
  formatCurrency,
}: TransactionVolumeChartProps) {
  return (
    <div className="transaction-volume-section glass rounded-xl p-6 border border-border lg:col-span-2">
      <h3 className="transaction-volume-title text-lg font-semibold mb-4">
        Volume por Tipo de Transação
      </h3>
      <div className="transaction-volume-chart-container">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 17%)" />
            <XAxis dataKey="name" stroke="hsl(215, 20%, 55%)" fontSize={12} />
            <YAxis
              stroke="hsl(215, 20%, 55%)"
              fontSize={12}
              tickFormatter={(v) => formatCurrency(v)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(222, 47%, 8%)',
                border: '1px solid hsl(217, 33%, 17%)',
                borderRadius: '8px',
              }}
              formatter={(value: number) => formatCurrency(value)}
            />
            <Bar dataKey="value" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
