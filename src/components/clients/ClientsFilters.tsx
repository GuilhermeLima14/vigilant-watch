import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
  return (
    <div className="glass rounded-xl p-4 border border-border mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou país..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-muted/50"
          />
        </div>
        
        <Select value={riskFilter} onValueChange={onRiskFilterChange}>
          <SelectTrigger className="w-full sm:w-[160px] bg-muted/50">
            <SelectValue placeholder="Risco" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Riscos</SelectItem>
            <SelectItem value="LOW">Baixo</SelectItem>
            <SelectItem value="MEDIUM">Médio</SelectItem>
            <SelectItem value="HIGH">Alto</SelectItem>
            <SelectItem value="CRITICAL">Crítico</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={kycFilter} onValueChange={onKycFilterChange}>
          <SelectTrigger className="w-full sm:w-[160px] bg-muted/50">
            <SelectValue placeholder="Status KYC" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Status</SelectItem>
            <SelectItem value="PENDING">Pendente</SelectItem>
            <SelectItem value="APPROVED">Aprovado</SelectItem>
            <SelectItem value="REJECTED">Rejeitado</SelectItem>
            <SelectItem value="EXPIRED">Expirado</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}