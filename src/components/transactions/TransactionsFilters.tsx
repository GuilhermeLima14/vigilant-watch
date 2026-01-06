import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  return (
    <div className="glass rounded-xl p-4 border border-border mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por cliente ou contraparte..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-muted/50"
          />
        </div>
        
        <Select value={typeFilter} onValueChange={onTypeFilterChange}>
          <SelectTrigger className="w-full sm:w-[160px] bg-muted/50">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Tipos</SelectItem>
            <SelectItem value="DEPOSIT">Depósito</SelectItem>
            <SelectItem value="WITHDRAWAL">Saque</SelectItem>
            <SelectItem value="TRANSFER">Transferência</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={clientFilter} onValueChange={onClientFilterChange}>
          <SelectTrigger className="w-full sm:w-[200px] bg-muted/50">
            <SelectValue placeholder="Cliente" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Clientes</SelectItem>
            {clients.map((client) => (
              <SelectItem key={client.id} value={client.id}>
                {client.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}