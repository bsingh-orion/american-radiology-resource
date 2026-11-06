import { useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { LaserPlate } from "@/components/console";
import { SiteShell, btnLine, btnPrimary } from "@/components/site-shell";
import {
  BRANDS,
  MODALITIES,
  PHONE_DISPLAY,
  PHONE_TEL,
  SETTINGS,
  STEPS,
  TIMELINES,
  type InterestId,
  type SettingId,
} from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "American Radiology Resource — Pre-owned CT, MRI & mobile imaging" },
      {
        name: "description",
        content:
          "Buy, sell, or rent previously owned CT, MRI, PET/CT, and cath lab systems. Interim mobile coaches. Timonium, Maryland. Call (443) 831-4998.",
      },
    ],
  }),
  component: Home,
});

const SELECTABLE = MODALITIES.filter((item) =>
  ["mri", "ct", "pet", "cath", "mobile", "rad"].includes(item.id),
);

function Home() {
  const [active, setActive] = useState<InterestId>("mri");
  const modality = SELECTABLE.find((item) => item.id === active) ?? SELECTABLE[0];

  return (
    <SiteShell>
      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:px-8 lg:grid-cols-12 lg:py-14">
        <div className="flex flex-col lg:col-span-5">
          <p className="font-mono text-xs uppercase tracking-widest text-laser">
            Pre-owned imaging · Timonium
          </p>
          <h1 className="mt-4 font-display text-5xl leading-none sm:text-6xl">
            The next scanner is already built.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-mist">
            American Radiology Resource places previously owned CT, MRI, PET/CT, and cath labs —
            fixed rooms and coaches — and stays through the install.
          </p>
          <div className="mt-8 flex flex-col gap-2" role="tablist" aria-label="Modalities">
            {SELECTABLE.map((item) => {
              const selected = item.id === modality.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(item.id)}
                  className={`flex min-h-11 items-center justify-between border px-3 text-left transition-colors duration-200 ease-snap ${
                    selected
                      ? "border-laser bg-panel text-bone"
                      : "border-mist/20 text-mist hover:border-mist/50 hover:text-bone"
                  }`}
                >
                  <span className="font-medium">{item.name}</span>
                  <span className="hidden font-mono text-xs sm:inline">{item.kicker}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link to="/contact" search={{ interest: modality.id }} className={btnPrimary}>
              Ask about {modality.name}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <a href={`tel:${PHONE_TEL}`} className={btnLine}>
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
        <div className="lg:col-span-7">
          <LaserPlate modality={modality} />
          <div className="mt-4 border border-mist/20 bg-panel p-5">
            <p className="font-mono text-xs uppercase tracking-widest text-laser">{modality.kicker}</p>
            <p className="mt-3 text-sm leading-relaxed text-mist">{modality.summary}</p>
          </div>
        </div>
      </section>

      <Brief />

      <Steps />

      <section className="border-t border-mist/20">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 font-mono text-xs uppercase tracking-widest text-mist md:flex-row md:items-center md:justify-between md:px-8">
          <p>Systems we place</p>
          <p className="text-bone">{BRANDS.join("  ·  ")}</p>
        </div>
      </section>
    </SiteShell>
  );
}

function Brief() {
  const [modality, setModality] = useState<InterestId>("ct");
  const [setting, setSetting] = useState<SettingId>("either");
  const [timeline, setTimeline] = useState<string>(TIMELINES[0]);
  const name = SELECTABLE.find((item) => item.id === modality)?.name ?? "System";
  const settingLabel = SETTINGS.find((item) => item.id === setting)?.label ?? "Either";

  return (
    <section className="border-y border-void bg-bone text-void">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
        <p className="font-mono text-xs uppercase tracking-widest text-laser">Build a brief</p>
        <h2 className="mt-2 max-w-xl font-display text-4xl leading-none sm:text-5xl">
          Three choices. Then we talk about a real system.
        </h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Choice label="Modality">
            {SELECTABLE.map((item) => (
              <Chip key={item.id} selected={modality === item.id} onClick={() => setModality(item.id)}>
                {item.name}
              </Chip>
            ))}
          </Choice>
          <Choice label="How it sits">
            {SETTINGS.map((item) => (
              <Chip key={item.id} selected={setting === item.id} onClick={() => setSetting(item.id)}>
                {item.label}
              </Chip>
            ))}
          </Choice>
          <Choice label="When">
            {TIMELINES.map((item) => (
              <Chip key={item} selected={timeline === item} onClick={() => setTimeline(item)}>
                {item}
              </Chip>
            ))}
          </Choice>
        </div>
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border border-void/15 bg-void p-5 text-bone sm:flex-row sm:items-center">
          <p className="font-mono text-sm leading-relaxed">
            {name} · {settingLabel} · {timeline}
          </p>
          <Link
            to="/contact"
            search={{ interest: modality, setting, timeline }}
            className={btnPrimary}
          >
            Use this brief
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Choice({ label, children }: { label: string; children: ReactNode }) {
  return (
    <fieldset>
      <legend className="font-mono text-xs uppercase tracking-widest text-panel">{label}</legend>
      <div className="mt-3 flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`min-h-11 border px-3 text-sm transition-colors duration-200 ease-snap active:scale-[0.96] ${
        selected ? "border-void bg-void text-bone" : "border-void/20 text-void hover:border-void"
      }`}
    >
      {children}
    </button>
  );
}

function Steps() {
  const [index, setIndex] = useState(0);
  const step = STEPS[index];

  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:px-8 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <p className="font-mono text-xs uppercase tracking-widest text-laser">How a placement works</p>
        <h2 className="mt-3 font-display text-4xl leading-none">Four moves. One phone number.</h2>
      </div>
      <div className="lg:col-span-8">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Placement steps">
          {STEPS.map((item, i) => (
            <button
              key={item.num}
              type="button"
              role="tab"
              aria-selected={i === index}
              onClick={() => setIndex(i)}
              className={`min-h-11 min-w-16 border px-4 font-mono text-sm transition-colors duration-200 ease-snap ${
                i === index ? "border-laser bg-laser text-void" : "border-mist/30 text-mist hover:text-bone"
              }`}
            >
              {item.num}
            </button>
          ))}
        </div>
        <div className="mt-6 border border-mist/20 bg-panel p-6">
          <h3 className="font-display text-3xl">{step.title}</h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-mist">{step.body}</p>
        </div>
      </div>
    </section>
  );
}
