"use client";

import { FormEvent, useState } from "react";
import { trackEvent } from "@/lib/tracking";

const inputClass = "w-full rounded-2xl border border-line bg-white/70 px-4 py-3 text-sm outline-none transition focus:border-olive";

export function PropertySearch() {
  return (
    <section className="container-pad mt-8 relative z-10">
      <div className="card p-5 md:p-8">
        <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Property Search</p>
            <h2 className="mt-2 font-serif text-3xl">Find a Property That Fits You</h2>
          </div>
          <button onClick={() => trackEvent("Search")} className="btn-primary">Search Properties</button>
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          {[
            ["Location", ["Gading Serpong", "BSD", "Alam Sutera", "Karawaci"]],
            ["Budget", ["Under Rp1B", "Rp1B – Rp2B", "Rp2B – Rp3B", "Rp3B – Rp5B", "Above Rp5B"]],
            ["Property Type", ["House", "New Project", "Secondary"]],
            ["Bedrooms", ["2+", "3+", "4+", "5+"]]
          ].map(([label, options]) => (
            <label key={label as string} className="text-sm font-semibold text-muted">
              {label as string}
              <select className={`${inputClass} mt-2`} aria-label={label as string}>
                {(options as string[]).map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MatchingForm() {
  const [submitted, setSubmitted] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    trackEvent("PropertyMatchSubmit");
    trackEvent("Lead", { form: "property_matching" });
    setSubmitted(true);
  }

  if (submitted) {
    return <div className="card p-8 text-lg text-olive">Thank you. Owen will review your requirements and contact you through WhatsApp.</div>;
  }

  return (
    <form onSubmit={submit} onFocus={() => trackEvent("PropertyMatchStart")} className="card grid gap-4 p-5 md:grid-cols-2 md:p-8">
      {["Preferred location", "Budget", "Land size", "Building size", "Bedrooms", "Bathrooms", "Preferred timeline", "WhatsApp number"].map((field) => (
        <input key={field} required={field === "WhatsApp number"} className={inputClass} placeholder={field} />
      ))}
      <select className={inputClass} defaultValue="">
        <option value="" disabled>New project / secondary</option>
        <option>New Project</option>
        <option>Secondary</option>
        <option>Open to both</option>
      </select>
      <select className={inputClass} defaultValue="">
        <option value="" disabled>Purpose</option>
        <option>Own stay</option>
        <option>Upgrade</option>
        <option>Investment</option>
      </select>
      <button className="btn-primary md:col-span-2">Find My Property</button>
    </form>
  );
}

export function VisitForm({ property = "" }: { property?: string }) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    trackEvent("ScheduleVisit");
    trackEvent("FormSubmit", { form: "schedule_visit" });
  }

  return (
    <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
      {["Name", "WhatsApp", "Property", "Preferred date", "Preferred time"].map((field) => (
        <input key={field} required className={inputClass} placeholder={field} defaultValue={field === "Property" ? property : ""} />
      ))}
      <button className="btn-primary sm:col-span-2">Schedule a Visit</button>
    </form>
  );
}

