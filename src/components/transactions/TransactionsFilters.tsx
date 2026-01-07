import { DataFilters, Filter } from '@/components/shared/DataFilters';
import type { Client } from '@/types';

interface TransactionsFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  typeFilter: string;
  onTypeFilterChange: (value: string) => void;
  clientFilter: string;
  onClientFilterChange: (value: string) => void;
  clients: Client[];
}

export function TransactionsFilters({
  search,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  clientFilter,
  onClientFilterChange,
  clients,
}: TransactionsFiltersProps) {
  const filters: Filter[] = [
    {
      type: 'search',
      value: search,
      onChange: onSearchChange,
      placeholder: 'Buscar por cliente ou contraparte...',
    },
    {
      type: 'select',
      value: typeFilter,
      onChange: onTypeFilterChange,
      placeholder: 'Tipo',
      options: [
        { value: 'all', label: 'Todos os Tipos' },
        { value: 'DEPOSIT', label: 'Depósito' },
        { value: 'WITHDRAWAL', label: 'Saque' },
        { value: 'TRANSFER', label: 'Transferência' },
      ],
    },
    {
      type: 'select',
      value: clientFilter,
      onChange: onClientFilterChange,
      placeholder: 'Cliente',
      width: 'w-full sm:w-[200px]',
      options: [
        { value: 'all', label: 'Todos os Clientes' },
        ...clients.map(client => ({
          value: client.id,
          label: client.name,
        })),
      ],
    },
  ];

  return <DataFilters filters={filters} />;
}