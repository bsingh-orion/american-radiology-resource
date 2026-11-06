import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, btnLine, btnPrimary } from "@/components/site-shell";
import { PHONE_DISPLAY, PHONE_TEL, SERVICES } from "@/data/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — American Radiology Resource" },
      {
        name: "description",
        content:
          "Equipment sales and purchases, mobile rentals, installation, site planning, service coverage, training, and financing from American Radiology Resource.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const [open, setOpen] = useState(0);

  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <p className="font-mono text-xs uppercase tracking-widest text-laser">Services</p>
        <h1 className="mt-3 max-w-3xl font-display text-5xl leading-none sm:text-6xl">
          From the outgoing system to the one that replaces it.
        </h1>
        <p className="mt-5 max-w-2xl text-mist">
          The trouble in a pre-owned deal is rarely the invoice. It is the rigging path, the power, the tube history, and the week the department cannot be dark.
        </p>

        <div className="mt-10 border-t border-mist/20">
          {SERVICES.map((service, index) => {
            const expanded = open === index;
            return (
              <div key={service.num} className="border-b border-mist/20">
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setOpen(index)}
                  className="flex min-h-16 w-full items-center gap-4 py-4 text-left"
                >
                  <span className={`font-mono text-sm ${expanded ? "text-laser" : "text-mist"}`}>{service.num}</span>
                  <span className="font-display text-2xl sm:text-3xl">{service.title}</span>
                </button>
                <div className={`fold ${expanded ? "open" : ""}`}>
                  <div>
                    <p className="max-w-2xl pb-5 pl-10 text-sm leading-relaxed text-mist">{service.body}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <section className="mt-14 grid gap-6 border border-mist/20 bg-panel p-6 md:grid-cols-2 md:p-8">
          <div>
            <h2 className="font-display text-4xl">A rental is a project too.</h2>
            <p className="mt-4 text-sm leading-relaxed text-mist">
              A coach needs a pad, power, a place for patients to wait, and a date it can leave. We would rather decline a rental than park a trailer the site cannot support.
            </p>
          </div>
          <div className="flex flex-col items-start justify-end gap-3">
            <a href={`tel:${PHONE_TEL}`} className={btnPrimary}>
              Call {PHONE_DISPLAY}
            </a>
            <Link to="/contact" search={{ interest: "mobile", setting: "coach" }} className={btnLine}>
              Describe the site
            </Link>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
