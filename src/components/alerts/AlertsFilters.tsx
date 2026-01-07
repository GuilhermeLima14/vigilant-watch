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
        { value: 'NEW', label: 'Novo' },
        { value: 'UNDER_REVIEW', label: 'Em Análise' },
        { value: 'RESOLVED', label: 'Resolvido' },
        { value: 'DISMISSED', label: 'Descartado' },
      ],
    },
    {
      type: 'select',
      value: severityFilter,
      onChange: onSeverityFilterChange,
      placeholder: 'Severidade',
      options: [
        { value: 'all', label: 'Todas' },
        { value: 'LOW', label: 'Baixa' },
        { value: 'MEDIUM', label: 'Média' },
        { value: 'HIGH', label: 'Alta' },
        { value: 'CRITICAL', label: 'Crítica' },
      ],
    },
  ];

  return <DataFilters filters={filters} />;
}