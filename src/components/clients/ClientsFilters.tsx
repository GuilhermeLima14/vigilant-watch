import { RiskLevel, KYCStatus } from '@/types/api';
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
        { value: String(RiskLevel.Low), label: 'Baixo' },
        { value: String(RiskLevel.Medium), label: 'Médio' },
        { value: String(RiskLevel.High), label: 'Alto' },
      ],
    },
    {
      type: 'select',
      value: kycFilter,
      onChange: onKycFilterChange,
      placeholder: 'Status KYC',
      options: [
        { value: 'all', label: 'Todos os Status' },
        { value: String(KYCStatus.Pending), label: 'Pendente' },
        { value: String(KYCStatus.Verified), label: 'Verificado' },
        { value: String(KYCStatus.Rejected), label: 'Rejeitado' },
      ],
    },
  ];

  return <DataFilters filters={filters} />;
}