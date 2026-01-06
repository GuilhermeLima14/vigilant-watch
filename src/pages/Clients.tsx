import { useState } from 'react';
import { useDataStore } from '@/store/dataStore';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/ui/page-header';
import { ClientsFilters } from '@/components/clients/ClientsFilters';
import { ClientsTable } from '@/components/clients/ClientsTable';
import { AddClientDialog } from '@/components/clients/AddClientDialog';
import { useToast } from '@/hooks/use-toast';
import type { RiskLevel, KYCStatus } from '@/types';

export default function Clients() {
  const { clients, addClient } = useDataStore();
  const { toast } = useToast();
  
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [kycFilter, setKycFilter] = useState<string>('all');

  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.country.toLowerCase().includes(search.toLowerCase());
    const matchesRisk = riskFilter === 'all' || client.riskLevel === riskFilter;
    const matchesKyc = kycFilter === 'all' || client.kycStatus === kycFilter;
    return matchesSearch && matchesRisk && matchesKyc;
  });

  const handleAddClient = (clientData: {
    name: string;
    country: string;
    riskLevel: RiskLevel;
    kycStatus: KYCStatus;
  }) => {
    if (!clientData.name || !clientData.country) {
      toast({
        title: 'Erro',
        description: 'Preencha todos os campos obrigatórios.',
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
      <PageHeader title="Clientes" description="Gerenciamento de clientes e KYC">
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