'use client';

import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Item from './item';
import { cn } from '@/lib/utils';
import { FileIcon } from 'lucide-react';
import { useOrganization } from '@clerk/nextjs';

interface DocumentListProps {
  parentDocumentId?: Id<'documents'>;
  level?: number;
  data?: Doc<'documents'>[];
}

export default function DocumentList({
  level = 0,
  parentDocumentId,
}: DocumentListProps) {
  const params = useParams();
  const router = useRouter();
  const { organization } = useOrganization();

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId,
    orgId: organization?.id || '',
  });

  const handleExpand = (documentId: string) => {
    setExpanded(prev => ({
      ...prev,
      [documentId]: !prev[documentId],
    }));
  };

  const handleRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  //   Loading state
  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <p
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
        className={cn(
          'hidden text-sm font-medium text-muted-foreground/80',
          expanded && 'last:block',
          level === 0 && 'hidden',
        )}
      >
        No pages inside
      </p>
      {documents.map(document => (
        <div key={document._id}>
          <Item
            id={document._id}
            onClick={() => handleRedirect(document._id)}
            label={document.title}
            icon={FileIcon}
            documentIcon={document.icon}
            active={params.documentId === document._id}
            level={level}
            onExpand={() => handleExpand(document._id)}
            expanded={expanded[document._id]}
          />
          {expanded[document._id] && (
            <DocumentList parentDocumentId={document._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
}
