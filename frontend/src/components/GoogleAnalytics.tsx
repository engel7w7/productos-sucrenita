'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { GA_TRACKING_ID, pageView } from '@/lib/analytics';

function AnalyticsRouteListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const queryString = searchParams?.toString();
    const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;
    pageView(targetUrl);
  }, [pathname, searchParams]);

  return null;
}

export function GoogleAnalytics() {
  if (!GA_TRACKING_ID) return null;

  return (
    <Suspense fallback={null}>
      <AnalyticsRouteListener />
    </Suspense>
  );
}
