const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

export function preserveUtmParams() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const stored: Record<string, string> = {};

  utmKeys.forEach((key) => {
    const value = params.get(key);
    if (value) stored[key] = value;
  });

  if (Object.keys(stored).length) {
    sessionStorage.setItem("rumah_owen_utm", JSON.stringify(stored));
  }
}

export function trackEvent(name: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const eventData = {
    ...data,
    utm: sessionStorage.getItem("rumah_owen_utm")
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...eventData });
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}
