import { AlertStatus, AlertSeverity } from '@/types/api';
import { DataFilters, Filter } from '@/components/shared/DataFilters';

interface AlertsFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  severityFilter: string;
  onSeverityFilterChange: (value: string) => void;
}

export function AlertsFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  severityFilter,
  onSeverityFilterChange,
}: AlertsFiltersProps) {
  const filters: Filter[] = [
    {
      type: 'search',
      value: search,
      onChange: onSearchChange,
      placeholder: 'Buscar por cliente ou descrição...',
    },
    {
      type: 'select',
      value: statusFilter,
      onChange: onStatusFilterChange,
      placeholder: 'Status',
      options: [
        { value: 'all', label: 'Todos os Status' },
        { value: String(AlertStatus.New), label: 'Novo' },
        { value: String(AlertStatus.Review), label: 'Em Análise' },
        { value: String(AlertStatus.Resolved), label: 'Resolvido' },
      ],
    },
    {
      type: 'select',
      value: severityFilter,
      onChange: onSeverityFilterChange,
      placeholder: 'Severidade',
      options: [
        { value: 'all', label: 'Todas' },
        { value: String(AlertSeverity.Low), label: 'Baixa' },
        { value: String(AlertSeverity.Medium), label: 'Média' },
        { value: String(AlertSeverity.High), label: 'Alta' },
        { value: String(AlertSeverity.Critical), label: 'Crítica' },
      ],
    },
  ];

  return <DataFilters filters={filters} />;
}