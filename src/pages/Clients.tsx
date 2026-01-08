import { useState } from 'react';
import { useDataStore } from '@/store/dataStore';
import { RiskLevel, KYCStatus } from '@/types/api';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/ui/page-header';
import { ClientsFilters } from '@/components/clients/ClientsFilters';
import { ClientsTable } from '@/components/clients/ClientsTable';
import { AddClientDialog } from '@/components/clients/AddClientDialog';
import { useToast } from '@/hooks/use-toast';

export default function Clients() {
  const { clients, addClient } = useDataStore();
  const { toast } = useToast();
  
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [kycFilter, setKycFilter] = useState<string>('all');

  // Filtrar clientes
  const filteredClients = clients.filter((client) => {
    const matchesSearch = 
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.countryCode.toLowerCase().includes(search.toLowerCase());
    
    const matchesRisk = riskFilter === 'all' || client.riskLevel === Number(riskFilter);
    const matchesKyc = kycFilter === 'all' || client.kycStatus === Number(kycFilter);
    
    return matchesSearch && matchesRisk && matchesKyc;
  });

  // Handler para adicionar cliente
  const handleAddClient = (clientData: {
    name: string;
    countryCode: string;
    riskLevel: RiskLevel;
    kycStatus: KYCStatus;
  }) => {
    if (!clientData.name || !clientData.countryCode) {
      toast({
        title: 'Erro',
        description: 'Preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    // Validar código do país (2 caracteres)
    if (clientData.countryCode.length !== 2) {
      toast({
        title: 'Erro',
        description: 'O código do país deve ter exatamente 2 caracteres.',
        variant: 'destructive',
      });
      return;
    }
    
    addClient(clientData);
    
    toast({
      title: 'Cliente cadastrado',
      description: `${clientData.name} foi adicionado com sucesso.`,
    });
  };

  return (
    <AppLayout>
      <PageHeader 
        title="Clientes" 
        description={`Gerenciamento de clientes e KYC • ${filteredClients.length} cliente(s)`}
      >
        <AddClientDialog onAddClient={handleAddClient} />
      </PageHeader>

      <ClientsFilters
        search={search}
        onSearchChange={setSearch}
        riskFilter={riskFilter}
        onRiskFilterChange={setRiskFilter}
        kycFilter={kycFilter}
        onKycFilterChange={setKycFilter}
      />

      <ClientsTable clients={filteredClients} />
    </AppLayout>
  );
}