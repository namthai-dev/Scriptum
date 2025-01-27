'use client';

import React, { ComponentRef, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { useTheme } from 'next-themes';

import OrganizationSwitcher from '@/components/organization-switcher';
import ThemeSwitcher from '@/components/theme-switcher';

import { ChevronsLeft, MenuIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Sidebar() {
  const { theme } = useTheme();
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 768px)');

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
          'group/sidebar relative z-50 flex w-60 flex-col justify-between overflow-y-auto bg-secondary',
          isResetting && 'transition-all duration-300 ease-in-out',
          isMobile && 'w-0',
        )}
      >
        <div className="p-3">
          <OrganizationSwitcher />
        </div>
        <div ref={navBarRef} className={cn('flex-1')}>
          Other tools
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
        <div className="flex items-center justify-between p-3">
          <UserButton
            showName
            appearance={{
              variables: { colorText: theme === 'light' ? 'black' : 'white' },
            }}
          />
          <ThemeSwitcher />
        </div>
      </aside>
      <div
        ref={navBarRef}
        className={cn(
          'w-[calc(100% - 240px)] absolute left-60 top-0 z-50',
          isResetting && 'transition-all duration-300 ease-in-out',
          isMobile && 'left-0 w-full',
        )}
      >
        <nav className="w-full bg-transparent px-3 py-2">
          {isCollapsed && (
            <MenuIcon
              role="button"
              className="h-6 w-6 text-muted-foreground"
              onClick={resetWidth}
            />
          )}
        </nav>
      </div>
    </>
  );
}
