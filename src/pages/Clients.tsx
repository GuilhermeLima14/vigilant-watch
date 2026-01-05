import { useState } from 'react';
import { useDataStore } from '@/store/dataStore';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/ui/page-header';
import { ClientsFilterSection } from '@/components/clients/ClientsFilterSection';
import { ClientsTable } from '@/components/clients/ClientsTable';
import { AddClientDialog } from '@/components/clients/AddClientDialog';
import { useToast } from '@/hooks/use-toast';

export default function Clients() {
  const { clients, addClient } = useDataStore();
  const { toast } = useToast();
  
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [kycFilter, setKycFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // New client form state
  const [newClient, setNewClient] = useState({
    name: '',
    country: '',
    riskLevel: 'LOW' as RiskLevel,
    kycStatus: 'PENDING' as KYCStatus,
  });

  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.country.toLowerCase().includes(search.toLowerCase());
    const matchesRisk = riskFilter === 'all' || client.riskLevel === riskFilter;
    const matchesKyc = kycFilter === 'all' || client.kycStatus === kycFilter;
    return matchesSearch && matchesRisk && matchesKyc;
  });

  const handleAddClient = () => {
    if (!newClient.name || !newClient.country) {
      toast({
        title: 'Erro',
        description: 'Preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }
    
    addClient(newClient);
    setIsDialogOpen(false);
    setNewClient({
      name: '',
      country: '',
      riskLevel: 'LOW',
      kycStatus: 'PENDING',
    });
    
    toast({
      title: 'Cliente cadastrado',
      description: `${newClient.name} foi adicionado com sucesso.`,
    });
  };

  return (
    <AppLayout>
      <PageHeader title="Clientes" description="Gerenciamento de clientes e KYC">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="glass border-border">
            <DialogHeader>
              <DialogTitle>Cadastrar Cliente</DialogTitle>
              <DialogDescription>
                Adicione um novo cliente ao sistema de monitoramento.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  placeholder="Nome da empresa ou pessoa"
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  className="bg-muted/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="country">País *</Label>
                <Input
                  id="country"
                  placeholder="Código do país (ex: BR, US)"
                  value={newClient.country}
                  onChange={(e) => setNewClient({ ...newClient, country: e.target.value.toUpperCase() })}
                  maxLength={2}
                  className="bg-muted/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Nível de Risco</Label>
                <Select
                  value={newClient.riskLevel}
                  onValueChange={(v) => setNewClient({ ...newClient, riskLevel: v as RiskLevel })}
                >
                  <SelectTrigger className="bg-muted/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">Baixo</SelectItem>
                    <SelectItem value="MEDIUM">Médio</SelectItem>
                    <SelectItem value="HIGH">Alto</SelectItem>
                    <SelectItem value="CRITICAL">Crítico</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Status KYC</Label>
                <Select
                  value={newClient.kycStatus}
                  onValueChange={(v) => setNewClient({ ...newClient, kycStatus: v as KYCStatus })}
                >
                  <SelectTrigger className="bg-muted/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pendente</SelectItem>
                    <SelectItem value="APPROVED">Aprovado</SelectItem>
                    <SelectItem value="REJECTED">Rejeitado</SelectItem>
                    <SelectItem value="EXPIRED">Expirado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddClient}>
                Cadastrar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageHeader>

      {/* Filters */}
      <div className="glass rounded-xl p-4 border border-border mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou país..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-muted/50"
            />
          </div>
          
          <Select value={riskFilter} onValueChange={setRiskFilter}>
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
          
          <Select value={kycFilter} onValueChange={setKycFilter}>
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

      {/* Table */}
      <div className="glass rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
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
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-muted-foreground">
                    Nenhum cliente encontrado
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => (
                  <tr key={client.id} className="transition-colors">
                    <td>
                      <div className="font-medium text-foreground">{client.name}</div>
                      <div className="text-xs text-muted-foreground">ID: {client.id}</div>
                    </td>
                    <td>
                      <span className="inline-flex items-center gap-1.5">
                        <span className="text-lg">{getFlagEmoji(client.country)}</span>
                        <span>{client.country}</span>
                      </span>
                    </td>
                    <td><StatusBadge type={client.riskLevel} /></td>
                    <td><StatusBadge type={client.kycStatus} /></td>
                    <td className="text-muted-foreground text-sm">
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
    </AppLayout>
  );
}

function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
