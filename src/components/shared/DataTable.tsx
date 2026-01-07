import { ReactNode } from 'react';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => ReactNode);
  align?: 'left' | 'center' | 'right';
  className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface DataTableProps<T extends Record<string, any>> {
  data: T[];
  columns: Column<T>[];
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  getRowKey?: (row: T, index: number) => string | number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DataTable<T extends Record<string, any>>({ 
  data, 
  columns, 
  emptyMessage = 'Nenhum dado encontrado',
  onRowClick,
  getRowKey
}: DataTableProps<T>) {
  const defaultGetRowKey = (row: T, index: number): string | number => {
    if ('id' in row && typeof row.id === 'string') {
      return row.id;
    }
    if ('clientId' in row && typeof row.clientId === 'string') {
      return row.clientId;
    }
    return index;
  };

  const getKey = getRowKey || defaultGetRowKey;

  const renderCell = (row: T, column: Column<T>) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(row);
    }
    return row[column.accessor] as ReactNode;
  };

  return (
    <div className="glass rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr className="bg-muted/30">
              {columns.map((column, index) => (
                <th 
                  key={index} 
                  className={column.align === 'right' ? 'text-right' : column.align === 'center' ? 'text-center' : ''}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-8 text-muted-foreground">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr 
                  key={getKey(row, index)}
                  className={`transition-colors ${onRowClick ? 'cursor-pointer hover:bg-muted/40' : ''}`}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((column, colIndex) => (
                    <td 
                      key={colIndex}
                      className={`${column.className || ''} ${
                        column.align === 'right' ? 'text-right' : 
                        column.align === 'center' ? 'text-center' : ''
                      }`}
                    >
                      {renderCell(row, column)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}