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
import { RiskLevel, KYCStatus } from '@/types/api';

// Interface local que estende o ClientResponseDto com campos do frontend
interface Client {
  externalId: string;
  name: string;
  countryCode: string;
  riskLevel: RiskLevel;
  kycStatus: KYCStatus;
  createdAt: Date;
  updatedAt: Date;
}

interface ClientsTableProps {
  clients: Client[];
}

function getFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return '🏳️';
  
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

// Mapeia enum numérico para badge type (string)
function getRiskBadgeType(riskLevel: RiskLevel): string {
  const mapping: Record<RiskLevel, string> = {
    [RiskLevel.Low]: 'LOW',
    [RiskLevel.Medium]: 'MEDIUM',
    [RiskLevel.High]: 'HIGH',
  };
  return mapping[riskLevel] || 'LOW';
}

function getKycBadgeType(kycStatus: KYCStatus): string {
  const mapping: Record<KYCStatus, string> = {
    [KYCStatus.Pending]: 'PENDING',
    [KYCStatus.Verified]: 'APPROVED',
    [KYCStatus.Rejected]: 'REJECTED',
  };
  return mapping[kycStatus] || 'PENDING';
}

export function ClientsTable({ clients }: ClientsTableProps) {
  const columns: Column<Client>[] = [
    {
      header: 'Cliente',
      accessor: (client) => (
        <div>
          <div className="font-medium text-foreground">{client.name}</div>
          <div className="text-xs text-muted-foreground">
            ID: {client.externalId.slice(0, 8)}...
          </div>
        </div>
      ),
    },
    {
      header: 'País',
      accessor: (client) => (
        <span className="inline-flex items-center gap-1.5">
          <span className="text-lg">{getFlagEmoji(client.countryCode)}</span>
          <span>{client.countryCode}</span>
        </span>
      ),
    },
    // {
    //   header: 'Nível de Risco',
    //   accessor: (client) => <StatusBadge type={getRiskBadgeType(client.riskLevel) as any} />,
    // },
    // {
    //   header: 'Status KYC',
    //   accessor: (client) => <StatusBadge type={getKycBadgeType(client.kycStatus) as any} />,
    // },
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
      getRowKey={(client) => client.externalId}
    />
  );
}