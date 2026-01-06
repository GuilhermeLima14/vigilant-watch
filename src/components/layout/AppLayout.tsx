import { ReactNode } from 'react';
import { TopNav } from './TopNav';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-background">
      <TopNav />
      <main className="p-4">
        {children}
      </main>
    </div>
  );
}
