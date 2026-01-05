import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign,
  Shield,
  Check,
  X,
  Info,
  Copy
} from 'lucide-react';
import { toast } from 'sonner';

const ColorSwatch = ({ name, variable, hsl }: { name: string; variable: string; hsl: string }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(variable);
    toast.success(`Copiado: ${variable}`);
  };

  return (
    <div 
      className="group cursor-pointer rounded-lg border border-border p-3 transition-all hover:border-primary"
      onClick={copyToClipboard}
    >
      <div 
        className="h-16 rounded-md mb-3 border border-border/50"
        style={{ backgroundColor: `hsl(${hsl})` }}
      />
      <p className="text-sm font-medium text-foreground">{name}</p>
      <p className="text-xs text-muted-foreground font-mono">{variable}</p>
      <p className="text-xs text-muted-foreground mt-1">{hsl}</p>
      <Copy className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-2" />
    </div>
  );
};

const TypographySample = ({ name, className, sample }: { name: string; className: string; sample: string }) => (
  <div className="border-b border-border pb-4">
    <p className="text-xs text-muted-foreground mb-2 font-mono">{className}</p>
    <p className={className}>{sample}</p>
    <p className="text-xs text-muted-foreground mt-1">{name}</p>
  </div>
);

const SpacingSample = ({ name, size, px }: { name: string; size: string; px: string }) => (
  <div className="flex items-center gap-4">
    <div className="w-20 text-sm text-muted-foreground font-mono">{name}</div>
    <div 
      className="bg-primary h-4 rounded"
      style={{ width: px }}
    />
    <div className="text-xs text-muted-foreground">{px}</div>
  </div>
);

export default function StyleGuide() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <PageHeader 
        title="Design System & Style Guide"
        description="Documentação completa do sistema de design do UBS Watchdog"
      />

      <Tabs defaultValue="colors" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="colors">Cores</TabsTrigger>
          <TabsTrigger value="typography">Tipografia</TabsTrigger>
          <TabsTrigger value="spacing">Espaçamento</TabsTrigger>
          <TabsTrigger value="components">Componentes</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
        </TabsList>

        {/* COLORS TAB */}
        <TabsContent value="colors" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Cores Principais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <ColorSwatch name="Background" variable="--background" hsl="222 47% 6%" />
                <ColorSwatch name="Foreground" variable="--foreground" hsl="210 40% 98%" />
                <ColorSwatch name="Primary" variable="--primary" hsl="217 91% 60%" />
                <ColorSwatch name="Secondary" variable="--secondary" hsl="217 33% 17%" />
                <ColorSwatch name="Accent" variable="--accent" hsl="187 92% 45%" />
                <ColorSwatch name="Muted" variable="--muted" hsl="217 33% 14%" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cores Semânticas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ColorSwatch name="Success" variable="--success" hsl="142 71% 45%" />
                <ColorSwatch name="Warning" variable="--warning" hsl="38 92% 50%" />
                <ColorSwatch name="Destructive" variable="--destructive" hsl="0 84% 60%" />
                <ColorSwatch name="Info" variable="--info" hsl="199 89% 48%" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cores de Interface</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <ColorSwatch name="Card" variable="--card" hsl="222 47% 8%" />
                <ColorSwatch name="Border" variable="--border" hsl="217 33% 17%" />
                <ColorSwatch name="Input" variable="--input" hsl="217 33% 17%" />
                <ColorSwatch name="Ring" variable="--ring" hsl="217 91% 60%" />
                <ColorSwatch name="Muted FG" variable="--muted-foreground" hsl="215 20% 55%" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cores de Gráficos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <ColorSwatch name="Chart 1" variable="--chart-1" hsl="217 91% 60%" />
                <ColorSwatch name="Chart 2" variable="--chart-2" hsl="187 92% 45%" />
                <ColorSwatch name="Chart 3" variable="--chart-3" hsl="142 71% 45%" />
                <ColorSwatch name="Chart 4" variable="--chart-4" hsl="38 92% 50%" />
                <ColorSwatch name="Chart 5" variable="--chart-5" hsl="0 84% 60%" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TYPOGRAPHY TAB */}
        <TabsContent value="typography" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Família Tipográfica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-2xl font-bold mb-2">Inter</p>
                <p className="text-muted-foreground">Font-family: 'Inter', sans-serif</p>
                <p className="text-muted-foreground mt-2">Weights: 300, 400, 500, 600, 700</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hierarquia de Texto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <TypographySample 
                name="Heading 1 - Títulos principais" 
                className="text-4xl font-bold text-foreground" 
                sample="UBS Watchdog Dashboard"
              />
              <TypographySample 
                name="Heading 2 - Seções" 
                className="text-3xl font-bold text-foreground" 
                sample="Monitoramento de Transações"
              />
              <TypographySample 
                name="Heading 3 - Subseções" 
                className="text-2xl font-semibold text-foreground" 
                sample="Alertas de Compliance"
              />
              <TypographySample 
                name="Heading 4 - Cards" 
                className="text-xl font-semibold text-foreground" 
                sample="Total de Clientes"
              />
              <TypographySample 
                name="Body Large" 
                className="text-lg text-foreground" 
                sample="Texto principal para descrições importantes."
              />
              <TypographySample 
                name="Body Regular" 
                className="text-base text-foreground" 
                sample="Texto padrão para conteúdo geral e parágrafos."
              />
              <TypographySample 
                name="Body Small" 
                className="text-sm text-muted-foreground" 
                sample="Texto secundário para informações complementares."
              />
              <TypographySample 
                name="Caption" 
                className="text-xs text-muted-foreground" 
                sample="Labels e textos auxiliares de menor importância."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pesos de Fonte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xl font-light">Light (300) - Uso em números grandes</p>
              <p className="text-xl font-normal">Regular (400) - Texto padrão</p>
              <p className="text-xl font-medium">Medium (500) - Ênfase leve</p>
              <p className="text-xl font-semibold">Semibold (600) - Títulos e labels</p>
              <p className="text-xl font-bold">Bold (700) - Destaques principais</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SPACING TAB */}
        <TabsContent value="spacing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Escala de Espaçamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <SpacingSample name="0.5" size="2px" px="2px" />
              <SpacingSample name="1" size="4px" px="4px" />
              <SpacingSample name="2" size="8px" px="8px" />
              <SpacingSample name="3" size="12px" px="12px" />
              <SpacingSample name="4" size="16px" px="16px" />
              <SpacingSample name="5" size="20px" px="20px" />
              <SpacingSample name="6" size="24px" px="24px" />
              <SpacingSample name="8" size="32px" px="32px" />
              <SpacingSample name="10" size="40px" px="40px" />
              <SpacingSample name="12" size="48px" px="48px" />
              <SpacingSample name="16" size="64px" px="64px" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Border Radius</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary rounded-sm mb-2" />
                  <p className="text-xs text-muted-foreground">sm (2px)</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary rounded mb-2" />
                  <p className="text-xs text-muted-foreground">default (6px)</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary rounded-md mb-2" />
                  <p className="text-xs text-muted-foreground">md (8px)</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary rounded-lg mb-2" />
                  <p className="text-xs text-muted-foreground">lg (12px)</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary rounded-xl mb-2" />
                  <p className="text-xs text-muted-foreground">xl (16px)</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary rounded-full mb-2" />
                  <p className="text-xs text-muted-foreground">full</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* COMPONENTS TAB */}
        <TabsContent value="components" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Botões</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-3">Variantes</p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="default">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-3">Tamanhos</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon"><Shield className="h-4 w-4" /></Button>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-3">Com Ícones</p>
                <div className="flex flex-wrap gap-3">
                  <Button><Users className="mr-2 h-4 w-4" /> Clientes</Button>
                  <Button variant="outline"><AlertTriangle className="mr-2 h-4 w-4" /> Alertas</Button>
                  <Button variant="secondary"><Check className="mr-2 h-4 w-4" /> Confirmar</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inputs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Input Padrão</Label>
                  <Input placeholder="Digite aqui..." />
                </div>
                <div className="space-y-2">
                  <Label>Input Desabilitado</Label>
                  <Input placeholder="Desabilitado" disabled />
                </div>
                <div className="space-y-2">
                  <Label>Select</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Opção 1</SelectItem>
                      <SelectItem value="2">Opção 2</SelectItem>
                      <SelectItem value="3">Opção 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Informação</AlertTitle>
                <AlertDescription>Esta é uma mensagem informativa padrão.</AlertDescription>
              </Alert>
              <Alert className="border-success/50 bg-success/10">
                <Check className="h-4 w-4 text-success" />
                <AlertTitle className="text-success">Sucesso</AlertTitle>
                <AlertDescription>Operação realizada com sucesso.</AlertDescription>
              </Alert>
              <Alert className="border-warning/50 bg-warning/10">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <AlertTitle className="text-warning">Atenção</AlertTitle>
                <AlertDescription>Verifique as informações antes de continuar.</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <X className="h-4 w-4" />
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>Ocorreu um erro ao processar sua solicitação.</AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* BADGES TAB */}
        <TabsContent value="badges" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status Badges - Sistema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-3">Níveis de Risco</p>
                <div className="flex flex-wrap gap-3">
                  <StatusBadge type="LOW" />
                  <StatusBadge type="MEDIUM" />
                  <StatusBadge type="HIGH" />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-3">Status KYC</p>
                <div className="flex flex-wrap gap-3">
                  <StatusBadge type="APPROVED" />
                  <StatusBadge type="PENDING" />
                  <StatusBadge type="EXPIRED" />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-3">Severidade de Alerta</p>
                <div className="flex flex-wrap gap-3">
                  <StatusBadge type="LOW" />
                  <StatusBadge type="MEDIUM" />
                  <StatusBadge type="HIGH" />
                  <StatusBadge type="CRITICAL" />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-3">Status de Alerta</p>
                <div className="flex flex-wrap gap-3">
                  <StatusBadge type="NEW" />
                  <StatusBadge type="UNDER_REVIEW" />
                  <StatusBadge type="RESOLVED" />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-3">Tipos de Transação</p>
                <div className="flex flex-wrap gap-3">
                  <StatusBadge type="DEPOSIT" />
                  <StatusBadge type="WITHDRAWAL" />
                  <StatusBadge type="TRANSFER" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Badges Padrão</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CARDS TAB */}
        <TabsContent value="cards" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Stat Cards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title="Total de Clientes"
                  value="2,847"
                  icon={Users}
                  trend={{ value: 12, isPositive: true }}
                />
                <StatCard
                  title="Transações Hoje"
                  value="R$ 1.2M"
                  icon={DollarSign}
                  trend={{ value: 8, isPositive: true }}
                />
                <StatCard
                  title="Alertas Ativos"
                  value="23"
                  icon={AlertTriangle}
                  trend={{ value: 5, isPositive: false }}
                />
                <StatCard
                  title="Taxa de Resolução"
                  value="94%"
                  icon={TrendingUp}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cards Padrão</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="text-lg">Glass Card</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Card com efeito glass morphism usando backdrop-blur.
                    </p>
                  </CardContent>
                </Card>
                <Card className="glass card-glow">
                  <CardHeader>
                    <CardTitle className="text-lg">Glass + Glow</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Card com glass morphism e efeito de brilho.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* CSS TOKENS REFERENCE */}
      <Card>
        <CardHeader>
          <CardTitle>Referência Rápida - CSS Tokens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-muted-foreground">
{`/* Cores Principais */
--background: 222 47% 6%;
--foreground: 210 40% 98%;
--primary: 217 91% 60%;
--secondary: 217 33% 17%;
--accent: 187 92% 45%;

/* Semânticas */
--success: 142 71% 45%;
--warning: 38 92% 50%;
--destructive: 0 84% 60%;
--info: 199 89% 48%;

/* Gradientes */
--gradient-primary: linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(187 92% 45%) 100%);

/* Efeitos */
.glass { @apply bg-card/50 backdrop-blur-xl border border-border/50; }
.card-glow { box-shadow: 0 0 40px -10px hsl(var(--primary) / 0.3); }
.gradient-text { background-image: var(--gradient-primary); }`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
