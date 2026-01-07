import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface FilterOption {
  value: string;
  label: string;
}

export interface SelectFilter {
  type: 'select';
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: FilterOption[];
  width?: string;
}

export interface SearchFilter {
  type: 'search';
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export type Filter = SelectFilter | SearchFilter;

interface DataFiltersProps {
  filters: Filter[];
}

export function DataFilters({ filters }: DataFiltersProps) {
  const renderFilter = (filter: Filter, index: number) => {
    if (filter.type === 'search') {
      return (
        <div key={index} className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={filter.placeholder}
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            className="pl-10 bg-muted/50"
          />
        </div>
      );
    }

    if (filter.type === 'select') {
      return (
        <Select key={index} value={filter.value} onValueChange={filter.onChange}>
          <SelectTrigger className={`${filter.width || 'w-full sm:w-[160px]'} bg-muted/50`}>
            <SelectValue placeholder={filter.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {filter.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    return null;
  };

  return (
    <div className="glass rounded-xl p-4 border border-border mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        {filters.map((filter, index) => renderFilter(filter, index))}
      </div>
    </div>
  );
}