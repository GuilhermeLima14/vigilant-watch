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

interface VolumeData {
  name: string;
  volume: number;
  transacoes: number;
}

interface VolumeByClientChartProps {
  data: VolumeData[];
  formatCurrency: (value: number) => string;
}

const CHART_COLORS = {
  primary: 'hsl(217, 91%, 60%)',
};

export function VolumeByClientChart({
  data,
  formatCurrency,
}: VolumeByClientChartProps) {
  return (
    <div className="volume-by-client-section glass rounded-xl p-6 border border-border lg:col-span-2">
      <h3 className="volume-by-client-title text-lg font-semibold mb-4">
        Volume por Cliente
      </h3>
      <div className="volume-by-client-chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical">
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
              contentStyle={getTooltipStyle()}
              formatter={(value: number) => formatCurrency(value)}
            />
            <Bar dataKey="volume" fill={CHART_COLORS.primary} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
