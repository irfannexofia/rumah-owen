"use client";

import { useEffect } from "react";
import Script from "next/script";
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
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,
'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '952462847483804');fbq('track', 'PageView');`}
      </Script>
      <noscript><img height="1" width="1" style={{ display: "none" }} src="https://www.facebook.com/tr?id=952462847483804&ev=PageView&noscript=1" alt="" /></noscript>
      {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </>
  );
}
