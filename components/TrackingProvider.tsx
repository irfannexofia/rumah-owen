"use client";

import { useEffect } from "react";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { preserveUtmParams, trackEvent } from "@/lib/tracking";

export function TrackingProvider() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gaId = process.env.NEXT_PUBLIC_GA4_ID;

  useEffect(() => {
    preserveUtmParams();
    trackEvent("PageView");
  }, []);

  return (
    <>
      {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </>
  );
}
