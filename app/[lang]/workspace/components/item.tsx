'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import {
  ChevronDown,
  ChevronRight,
  LucideIcon,
  MoreHorizontal,
  Plus,
  Trash,
} from 'lucide-react';
import { toast } from 'sonner';

interface ItemProps {
  id?: Id<'documents'>;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  onExpand?: () => void;
  isSearch?: boolean;
  level?: number;
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export default function Item({
  id,
  documentIcon,
  active,
  expanded,
  onExpand,
  isSearch,
  level = 0,
  label,
  icon: Icon,
  onClick,
}: ItemProps) {
  const { user } = useUser();
  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archive);

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  const handleExpand = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onExpand?.();
  };

  const handleCreate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const promise = create({ title: 'Untitled', parentDocument: id }).then(
      () => {
        if (!expanded) onExpand?.();
      },
    );

    toast.promise(promise, {
      loading: 'Creating a new note...',
      success: 'A new note created!',
      error: 'Failed to create new note.',
    });
  };
  const handleArchive = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (!id) return;
    const promise = archive({ id });

    toast.promise(promise, {
      loading: 'Moving a note to trash...',
      success: 'Note moved to trash!',
      error: 'Failed to move a note to trash.',
    });
  };

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: `${12 * (level + 1)}px` }}
      className={cn(
        'group flex min-h-[27px] items-center gap-2 px-3 py-1 text-sm font-medium text-muted-foreground hover:bg-primary/5',
        active && 'bg-primary/5 text-primary',
      )}
    >
      {!!id && (
        <div
          className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600"
          onClick={handleExpand}
          role="button"
        >
          <ChevronIcon className="h-4 w-4 text-muted-foreground/50" />
        </div>
      )}
      {documentIcon ? (
        <div className="h-[18px] text-muted-foreground">{documentIcon}</div>
      ) : (
        <Icon className="h-[18px] shrink-0" />
      )}
      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>k
        </kbd>
      )}
      {!!id && (
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
              <div className="ml-auto h-full rounded-sm opacity-0 hover:bg-neutral-300 group-hover:opacity-100 dark:hover:bg-neutral-600">
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60"
              align="start"
              side="right"
              forceMount
            >
              <DropdownMenuItem onClick={handleArchive}>
                <Trash className="h-4 w-4" /> Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="text-xs text-muted-foreground">
                Last edited by: {user?.fullName}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            className="ml-auto h-full rounded-sm opacity-0 hover:bg-neutral-300 group-hover:opacity-100 dark:hover:bg-neutral-600"
            onClick={handleCreate}
          >
            <Plus className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : '12px',
      }}
      className="flex gap-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};
