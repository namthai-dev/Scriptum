import { usePathname } from 'next/navigation';

import { Locale } from '@/features/internationalization/i18n-config';

export function useSwitchLocaleHref() {
  const pathName = usePathname();

  const getSwitchLocaleHref = (locale: Locale) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return getSwitchLocaleHref;
}
