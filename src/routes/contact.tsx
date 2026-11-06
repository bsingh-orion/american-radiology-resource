import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, btnPrimary, fieldClass } from "@/components/site-shell";
import {
  ADDRESS_LINES,
  INTERESTS,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  SETTINGS,
  TIMELINES,
  type InterestId,
  type SettingId,
} from "@/data/site";

const INTEREST_IDS = new Set<string>(INTERESTS.map((item) => item.id));
const SETTING_IDS = new Set<string>(SETTINGS.map((item) => item.id));
const TIMELINE_IDS = new Set<string>(TIMELINES);

type ContactSearch = { interest?: InterestId; setting?: SettingId; timeline?: string };

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): ContactSearch => {
    const out: ContactSearch = {};
    if (typeof search.interest === "string" && INTEREST_IDS.has(search.interest)) {
      out.interest = search.interest as InterestId;
    }
    if (typeof search.setting === "string" && SETTING_IDS.has(search.setting)) {
      out.setting = search.setting as SettingId;
    }
    if (typeof search.timeline === "string" && TIMELINE_IDS.has(search.timeline)) {
      out.timeline = search.timeline;
    }
    return out;
  },
  head: () => ({
    meta: [
      { title: "Contact — American Radiology Resource" },
      {
        name: "description",
        content:
          "Call David Pac at American Radiology Resource, (443) 831-4998, or leave the details of the system you need. Timonium, Maryland.",
      },
    ],
  }),
  component: ContactPage,
});

type FormState = {
  name: string;
  organization: string;
  phone: string;
  email: string;
  interest: InterestId | "";
  timeline: string;
  message: string;
};

function draftFromSearch(search: ContactSearch) {
  const interest = INTERESTS.find((item) => item.id === search.interest)?.label;
  const setting = SETTINGS.find((item) => item.id === search.setting)?.label;
  const bits = [interest, setting, search.timeline].filter(Boolean);
  return bits.length > 0 ? `Brief: ${bits.join(" · ")}.` : "";
}

function ContactPage() {
  const search = Route.useSearch();
  const [form, setForm] = useState<FormState>({
    name: "",
    organization: "",
    phone: "",
    email: "",
    interest: search.interest ?? "",
    timeline: search.timeline ?? TIMELINES[0],
    message: draftFromSearch(search),
  });
  const [error, setError] = useState("");
  const [ready, setReady] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      interest: search.interest ?? prev.interest,
      timeline: search.timeline ?? prev.timeline,
      message: prev.message || draftFromSearch(search),
    }));
  }, [search.interest, search.setting, search.timeline]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function compose() {
    const interest = INTERESTS.find((item) => item.id === form.interest)?.label ?? "Not specified";
    return [
      "American Radiology Resource — equipment inquiry",
      `Name: ${form.name}`,
      `Organization: ${form.organization}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email || "—"}`,
      `Interest: ${interest}`,
      `Timing: ${form.timeline}`,
      "",
      form.message,
    ].join("\n");
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!form.name.trim() || !form.organization.trim() || !form.phone.trim() || !form.interest || !form.message.trim()) {
      setError("Name, organization, phone, what you need, and a short note are required.");
      setReady("");
      return;
    }
    setError("");
    setReady(compose());
    setCopied(false);
  }

  async function copyNote() {
    try {
      await navigator.clipboard.writeText(ready);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <SiteShell>
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:grid-cols-12 md:px-8 md:py-20">
        <div className="md:col-span-5">
          <p className="font-mono text-xs uppercase tracking-widest text-laser">Contact</p>
          <h1 className="mt-3 font-display text-5xl leading-none">Call first if you can.</h1>
          <p className="mt-5 leading-relaxed text-mist">
            The fastest path is the phone. David Pac answers the line published for American
            Radiology Resource. The form does not file itself anywhere — it prepares a note you
            can paste into a text or email, so nothing you type sits on a server.
          </p>
          <a href={`tel:${PHONE_TEL}`} className="mt-8 block font-mono text-4xl tabular-nums text-bone">
            {PHONE_DISPLAY}
          </a>
          <p className="mt-2 text-sm text-mist">David Pac, President</p>
          <address className="mt-8 text-sm not-italic leading-relaxed">
            {ADDRESS_LINES.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <a href={MAPS_URL} className="mt-3 inline-flex min-h-11 items-center text-sm text-mist underline decoration-mist/40 underline-offset-4">
            Directions
          </a>
        </div>

        <div className="md:col-span-7">
          {ready ? (
            <div className="border border-mist/20 bg-panel p-6 md:p-8">
              <h2 className="font-display text-3xl">Your note is ready.</h2>
              <p className="mt-3 text-sm leading-relaxed text-mist">
                Call {PHONE_DISPLAY} and read it, or copy it into a message. We did not store or
                send this.
              </p>
              <pre className="mt-5 overflow-x-auto whitespace-pre-wrap border border-mist/20 bg-void p-4 font-mono text-sm leading-relaxed">
                {ready}
              </pre>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a href={`tel:${PHONE_TEL}`} className={btnPrimary}>
                  Call {PHONE_DISPLAY}
                </a>
                <button type="button" onClick={copyNote} className="inline-flex min-h-11 items-center justify-center border border-mist/40 px-5 text-sm font-medium transition-transform duration-150 ease-snap hover:border-bone active:scale-[0.96]">
                  {copied ? "Copied" : "Copy the note"}
                </button>
                <button
                  type="button"
                  onClick={() => setReady("")}
                  className="inline-flex min-h-11 items-center justify-center px-5 text-sm text-mist underline"
                >
                  Edit
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-4 border border-mist/20 bg-panel p-6 md:p-8" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" value={form.name} onChange={(v) => update("name", v)} autoComplete="name" />
                <Field label="Organization" value={form.organization} onChange={(v) => update("organization", v)} autoComplete="organization" />
                <Field label="Phone" value={form.phone} onChange={(v) => update("phone", v)} autoComplete="tel" type="tel" />
                <Field label="Email (optional)" value={form.email} onChange={(v) => update("email", v)} autoComplete="email" type="email" required={false} />
              </div>
              <label className="flex flex-col gap-2 text-sm font-medium">
                What you need
                <select
                  className={fieldClass}
                  value={form.interest}
                  onChange={(event) => update("interest", event.target.value as InterestId | "")}
                >
                  <option value="">Select</option>
                  {INTERESTS.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium">
                Timing
                <select
                  className={fieldClass}
                  value={form.timeline}
                  onChange={(event) => update("timeline", event.target.value)}
                >
                  {TIMELINES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium">
                The useful details
                <textarea
                  className={`${fieldClass} min-h-36 py-3`}
                  value={form.message}
                  onChange={(event) => update("message", event.target.value)}
                  placeholder="Modality, approximate age you can accept, fixed or mobile, city, and anything the room cannot do."
                />
              </label>
              {error ? (
                <p className="text-sm text-laser" role="alert">
                  {error}
                </p>
              ) : null}
              <button type="submit" className={`${btnPrimary} self-start`}>
                Prepare my note
              </button>
            </form>
          )}
        </div>
      </div>
    </SiteShell>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  required = true,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium">
      {label}
      <input
        className={fieldClass}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
