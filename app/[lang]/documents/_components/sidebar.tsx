'use client';

import React, { ComponentRef, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { useParams, usePathname } from 'next/navigation';
import { useOrganization, UserButton } from '@clerk/nextjs';
import { useTheme } from 'next-themes';

import OrganizationSwitcher from '@/components/organization-switcher';

import {
  ChevronsLeft,
  MenuIcon,
  Plus,
  PlusCircleIcon,
  Search,
  Settings,
  Trash,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { api } from '@/convex/_generated/api';
import Item from './item';
import { useMutation } from 'convex/react';
import { toast } from 'sonner';
import DocumentList from './document-list';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import TrashBox from './trash-box';
import { useSearch } from '@/hooks/use-search';
import { useSettings } from '@/hooks/use-settings';
import Navbar from './navbar';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const { theme } = useTheme();
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const create = useMutation(api.documents.create);
  const params = useParams();
  const router = useRouter();
  const { organization } = useOrganization();

  const search = useSearch();
  const settings = useSettings();

  const isResettingRef = useRef(false);
  const sideBarRef = useRef<ComponentRef<'aside'>>(null);
  const navBarRef = useRef<ComponentRef<'div'>>(null);

  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    isResettingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResettingRef.current) return;

    let newWidth = e.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sideBarRef.current && navBarRef.current) {
      sideBarRef.current.style.width = `${newWidth}px`;
      navBarRef.current.style.setProperty('left', `${newWidth}px`);
      navBarRef.current.style.setProperty(
        'width',
        `calc(100% - ${newWidth}px)`,
      );
    }
  };

  const handleMouseUp = () => {
    isResettingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const resetWidth = () => {
    if (sideBarRef.current && navBarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sideBarRef.current.style.width = isMobile ? '100%' : '240px';
      navBarRef.current.style.setProperty(
        'width',
        isMobile ? '0' : 'calc(100% - 240px)',
      );
      navBarRef.current.style.setProperty('left', isMobile ? '100%' : '240px');

      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sideBarRef.current && navBarRef.current) {
      setIsResetting(true);
      setIsCollapsed(true);

      sideBarRef.current.style.width = '0';
      navBarRef.current.style.setProperty('width', '100%');
      navBarRef.current.style.setProperty('left', '0');

      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const handleCreate = () => {
    const promise = create({
      title: 'Untitled',
      orgId: organization?.id as string,
    }).then(documentId => {
      router.push(`/documents/${documentId}`);
    });
    toast.promise(promise, {
      loading: 'Creating a new note...',
      success: 'A new note created!',
      error: 'Failed to create new note.',
    });
  };

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [isMobile, pathname]);

  return (
    <>
      <aside
        ref={sideBarRef}
        className={cn(
          'group/sidebar relative z-40 flex w-60 flex-col justify-between overflow-y-auto bg-secondary',
          isResetting && 'transition-all duration-300 ease-in-out',
          isMobile && 'w-0',
        )}
      >
        <div className="p-3">
          <OrganizationSwitcher />
        </div>
        <div className="flex-1">
          <Item
            label="Search"
            icon={Search}
            isSearch
            onClick={() => search.toggle()}
          />
          <Item
            label="Settings"
            icon={Settings}
            onClick={() => settings.toggle()}
          />
          <Item label="New page" icon={PlusCircleIcon} onClick={handleCreate} />
          <div className="mt-4">
            <DocumentList />
            <Item label="Add a page" icon={Plus} onClick={handleCreate} />
          </div>
          <Popover>
            <PopoverTrigger className="mt-4 w-full">
              <Item label="Trash" icon={Trash} />
            </PopoverTrigger>
            <PopoverContent
              className="w-72 p-0"
              side={isMobile ? 'bottom' : 'right'}
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>
        <button
          type="button"
          className={cn(
            'absolute right-2 top-3 h-6 w-6 rounded-sm text-muted-foreground opacity-0 transition hover:bg-neutral-300 group-hover/sidebar:opacity-100 dark:hover:bg-neutral-600',
            isMobile && 'opacity-100',
          )}
          onClick={collapse}
        >
          <ChevronsLeft />
        </button>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover/sidebar:opacity-100"
        />
        <div className="flex items-center justify-center p-3">
          <UserButton
            showName
            appearance={{
              variables: { colorText: theme === 'light' ? 'black' : 'white' },
            }}
          />
        </div>
      </aside>
      <div
        ref={navBarRef}
        className={cn(
          'w-[calc(100% - 240px)] absolute left-60 top-0 z-40',
          isResetting && 'transition-all duration-300 ease-in-out',
          isMobile && 'left-0 w-full',
        )}
      >
        {params.documentId ? (
          <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
        ) : (
          <nav className="w-full bg-transparent px-3 py-2">
            {isCollapsed && (
              <MenuIcon
                role="button"
                className="h-6 w-6 text-muted-foreground"
                onClick={resetWidth}
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
}
