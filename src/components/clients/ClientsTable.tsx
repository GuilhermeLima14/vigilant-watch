import { MoreHorizontal, Eye, Edit } from 'lucide-react';
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

export function ClientsTable({ clients }: ClientsTableProps) {
  return (
    <div className="clients-table-section glass rounded-xl border border-border overflow-hidden">
      <div className="clients-table-wrapper overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr className="bg-muted/30">
              <th>Cliente</th>
              <th>País</th>
              <th>Nível de Risco</th>
              <th>Status KYC</th>
              <th>Criado em</th>
              <th className="text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-muted-foreground">
                  Nenhum cliente encontrado
                </td>
              </tr>
            ) : (
              clients.map((client) => (
                <tr key={client.id} className="clients-table-row transition-colors">
                  <td>
                    <div className="client-name font-medium text-foreground">{client.name}</div>
                    <div className="client-id text-xs text-muted-foreground">ID: {client.id}</div>
                  </td>
                  <td>
                    <span className="country-badge inline-flex items-center gap-1.5">
                      <span className="country-flag text-lg">{getFlagEmoji(client.country)}</span>
                      <span>{client.country}</span>
                    </span>
                  </td>
                  <td className="risk-status-cell">
                    <StatusBadge type={client.riskLevel} />
                  </td>
                  <td className="kyc-status-cell">
                    <StatusBadge type={client.kycStatus} />
                  </td>
                  <td className="created-date-cell text-muted-foreground text-sm">
                    {format(client.createdAt, 'dd/MM/yyyy')}
                  </td>
                  <td className="text-right">
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
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
