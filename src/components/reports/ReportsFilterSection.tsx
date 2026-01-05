import { BarChart3 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Client } from '@/types';

interface ReportsFilterSectionProps {
  clientFilter: string;
  onClientFilterChange: (value: string) => void;
  clients: Client[];
}

export function ReportsFilterSection({
  clientFilter,
  onClientFilterChange,
  clients,
}: ReportsFilterSectionProps) {
  return (
    <section className="reports-filter-section glass rounded-xl p-4 border border-border mb-6">
      <div className="filter-controls flex items-center gap-4">
        <BarChart3 className="filter-icon h-5 w-5 text-muted-foreground" />
        <div className="client-filter-select flex-1">
          <Select value={clientFilter} onValueChange={onClientFilterChange}>
            <SelectTrigger className="w-full sm:w-[300px] bg-muted/50">
              <SelectValue placeholder="Selecione um cliente" />
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
    </section>
  );
}
