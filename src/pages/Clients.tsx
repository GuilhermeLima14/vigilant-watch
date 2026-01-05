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

  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.country.toLowerCase().includes(search.toLowerCase());
    const matchesRisk = riskFilter === 'all' || client.riskLevel === riskFilter;
    const matchesKyc = kycFilter === 'all' || client.kycStatus === kycFilter;
    return matchesSearch && matchesRisk && matchesKyc;
  });

  const handleAddClient = (newClient: any) => {
    if (!newClient.name || !newClient.country) {
      toast({
        title: 'Erro',
        description: 'Preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    addClient(newClient);
    toast({
      title: 'Cliente cadastrado',
      description: `${newClient.name} foi adicionado com sucesso.`,
    });
  };

  return (
    <AppLayout>
      <PageHeader title="Clientes" description="Gerenciamento de clientes e KYC">
        <AddClientDialog onAddClient={handleAddClient} />
      </PageHeader>

      <ClientsFilterSection
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
