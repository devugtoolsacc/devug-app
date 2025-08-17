'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  {
    label: 'Home',
    href: '/',
  },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {links.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                asChild
                className={pathname === link.href ? 'bg-accent' : ''}
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary">DevUG</Badge>
            <div className="w-10 h-10 rounded-full bg-muted"></div>
          </div>
        </nav>
      </div>
    </header>
  );
}
