import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { LaserPlate } from "@/components/console";
import { SiteShell, btnPrimary } from "@/components/site-shell";
import { MODALITIES, type InterestId } from "@/data/site";

export const Route = createFileRoute("/equipment")({
  head: () => ({
    meta: [
      { title: "Equipment — American Radiology Resource" },
      {
        name: "description",
        content:
          "Previously owned MRI, CT, PET/CT, cath and angio labs, rad rooms, and mobile imaging coaches. Ask American Radiology Resource what is available.",
      },
    ],
  }),
  component: EquipmentPage,
});

function EquipmentPage() {
  const [active, setActive] = useState<InterestId>("mri");
  const modality = MODALITIES.find((item) => item.id === active) ?? MODALITIES[0];

  return (
    <SiteShell>
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:px-8 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-4">
          <p className="font-mono text-xs uppercase tracking-widest text-laser">Equipment</p>
          <h1 className="mt-3 font-display text-5xl leading-none">Pick a modality.</h1>
          <p className="mt-4 text-sm leading-relaxed text-mist">
            Not a live inventory. Scanners move. Choose the kind of system, then ask what is actually free.
          </p>
          <div className="mt-6 flex flex-col gap-2" role="tablist" aria-label="Equipment">
            {MODALITIES.map((item) => {
              const selected = item.id === modality.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(item.id)}
                  className={`flex min-h-11 items-center justify-between border px-3 text-left text-sm transition-colors duration-200 ease-snap ${
                    selected ? "border-laser bg-panel text-bone" : "border-mist/20 text-mist hover:text-bone"
                  }`}
                >
                  <span>{item.name}</span>
                  <span className="font-mono text-xs">{selected ? "open" : "view"}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="lg:col-span-8">
          <LaserPlate modality={modality} />
          <div className="mt-4 border border-mist/20 bg-panel p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-laser">{modality.kicker}</p>
            <h2 className="mt-2 font-display text-4xl">{modality.name}</h2>
            <p className="mt-4 text-sm leading-relaxed text-mist">{modality.summary}</p>
            <ul className="mt-5 flex flex-col gap-2 text-sm">
              {modality.points.map((point) => (
                <li key={point} className="border-l-2 border-laser pl-3">
                  {point}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              search={{ interest: modality.id }}
              className={`${btnPrimary} mt-8`}
            >
              Ask what is available
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <p className="mt-4 text-xs leading-relaxed text-mist">
              Photographs are representative rooms and coaches, not a serial number on offer.
            </p>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
