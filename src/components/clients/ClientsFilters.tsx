import { DataFilters, Filter } from '@/components/shared/DataFilters';

interface ClientsFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  riskFilter: string;
  onRiskFilterChange: (value: string) => void;
  kycFilter: string;
  onKycFilterChange: (value: string) => void;
}

export function ClientsFilters({
  search,
  onSearchChange,
  riskFilter,
  onRiskFilterChange,
  kycFilter,
  onKycFilterChange,
}: ClientsFiltersProps) {
  const filters: Filter[] = [
    {
      type: 'search',
      value: search,
      onChange: onSearchChange,
      placeholder: 'Buscar por nome ou país...',
    },
    {
      type: 'select',
      value: riskFilter,
      onChange: onRiskFilterChange,
      placeholder: 'Risco',
      options: [
        { value: 'all', label: 'Todos os Riscos' },
        { value: 'LOW', label: 'Baixo' },
        { value: 'MEDIUM', label: 'Médio' },
        { value: 'HIGH', label: 'Alto' },
        { value: 'CRITICAL', label: 'Crítico' },
      ],
    },
    {
      type: 'select',
      value: kycFilter,
      onChange: onKycFilterChange,
      placeholder: 'Status KYC',
      options: [
        { value: 'all', label: 'Todos os Status' },
        { value: 'PENDING', label: 'Pendente' },
        { value: 'APPROVED', label: 'Aprovado' },
        { value: 'REJECTED', label: 'Rejeitado' },
        { value: 'EXPIRED', label: 'Expirado' },
      ],
    },
  ];

  return <DataFilters filters={filters} />;
}