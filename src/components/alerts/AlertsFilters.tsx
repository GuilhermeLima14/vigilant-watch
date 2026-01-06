import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
  return (
    <div className="glass rounded-xl p-4 border border-border mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por cliente ou descrição..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-muted/50"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-full sm:w-[160px] bg-muted/50">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Status</SelectItem>
            <SelectItem value="NEW">Novo</SelectItem>
            <SelectItem value="UNDER_REVIEW">Em Análise</SelectItem>
            <SelectItem value="RESOLVED">Resolvido</SelectItem>
            <SelectItem value="DISMISSED">Descartado</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={severityFilter} onValueChange={onSeverityFilterChange}>
          <SelectTrigger className="w-full sm:w-[160px] bg-muted/50">
            <SelectValue placeholder="Severidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="LOW">Baixa</SelectItem>
            <SelectItem value="MEDIUM">Média</SelectItem>
            <SelectItem value="HIGH">Alta</SelectItem>
            <SelectItem value="CRITICAL">Crítica</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}