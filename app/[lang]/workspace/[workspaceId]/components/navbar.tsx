'use client';

import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { MenuIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import Title from './title';
import { Id } from '@/convex/_generated/dataModel';

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

export default function Navbar({ isCollapsed, onResetWidth }: NavbarProps) {
  const params = useParams();

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<'documents'>,
  });

  if (document === undefined) {
    return (
      <nav className="flex w-full items-center gap-4 bg-background px-3 py-2">
        <Title.Skeleton />
      </nav>
    );
  }

  if (document === null) return null;
  return (
    <>
      <nav className="flex w-full items-center gap-4 bg-background px-3 py-2">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex w-full items-center justify-between">
          <Title initialData={document} />
        </div>
      </nav>
    </>
  );
}
