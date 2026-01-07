import { MoreHorizontal, Eye, Edit } from 'lucide-react';
import { DataTable, Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import type { Client } from '@/types';

interface ClientsTableProps {
  clients: Client[];
}

function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export function ClientsTable({ clients }: ClientsTableProps) {
  const columns: Column<Client>[] = [
    {
      header: 'Cliente',
      accessor: (client) => (
        <div>
          <div className="font-medium text-foreground">{client.name}</div>
          <div className="text-xs text-muted-foreground">ID: {client.id}</div>
        </div>
      ),
    },
    {
      header: 'País',
      accessor: (client) => (
        <span className="inline-flex items-center gap-1.5">
          <span className="text-lg">{getFlagEmoji(client.country)}</span>
          <span>{client.country}</span>
        </span>
      ),
    },
    {
      header: 'Nível de Risco',
      accessor: (client) => <StatusBadge type={client.riskLevel} />,
    },
    {
      header: 'Status KYC',
      accessor: (client) => <StatusBadge type={client.kycStatus} />,
    },
    {
      header: 'Criado em',
      accessor: (client) => (
        <span className="text-muted-foreground text-sm">
          {format(client.createdAt, 'dd/MM/yyyy')}
        </span>
      ),
    },
    {
      header: 'Ações',
      align: 'right',
      accessor: (client) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="h-4 w-4 mr-2" />
              Visualizar
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <DataTable 
      data={clients} 
      columns={columns} 
      emptyMessage="Nenhum cliente encontrado"
    />
  );
}