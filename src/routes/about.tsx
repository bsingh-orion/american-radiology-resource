import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, btnLine, btnPrimary } from "@/components/site-shell";
import { ADDRESS_LINES, BRANDS, MAPS_URL, PHONE_DISPLAY, PHONE_TEL, publicUrl } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — American Radiology Resource" },
      {
        name: "description",
        content:
          "American Radiology Resource is an independent remarketer of previously owned medical imaging equipment, led by David Pac in Timonium, Maryland.",
      },
    ],
  }),
  component: AboutPage,
});

const FACTS = [
  ["Principal", "David Pac, President"],
  ["Base", ADDRESS_LINES.join(", ")],
  ["Phone", PHONE_DISPLAY],
  ["Work", "Sales, purchases, mobile rental, install, site planning, service, training, financing"],
];

function AboutPage() {
  return (
    <SiteShell>
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-12 md:grid-cols-12 md:px-8 md:py-16">
        <div className="md:col-span-7">
          <p className="font-mono text-xs uppercase tracking-widest text-laser">About</p>
          <h1 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
            An independent desk for pre-owned imaging.
          </h1>
          <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-mist">
            <p>
              American Radiology Resource sources previously owned medical imaging equipment and places it with hospitals, imaging centers, and physician groups that need a scanner sooner than a factory can build one.
            </p>
            <p>
              The work covers CT, MRI, and PET/CT, cath and angio labs, rad and fluoro rooms, and the mobile coaches that keep a schedule alive while a fixed room is out. We also buy systems coming out of service.
            </p>
            <p>
              David Pac is president. The phone number on this site is his. Equipment lives where it was last installed, and we say so.
            </p>
            <p>
              We are not a hospital, not a reading group, and not an original equipment manufacturer. We are the people you call when the question is which used system fits the room.
            </p>
          </div>
          <dl className="mt-10 border-t border-mist/20">
            {FACTS.map(([label, value]) => (
              <div key={label} className="grid gap-1 border-b border-mist/20 py-4 sm:grid-cols-4">
                <dt className="font-mono text-xs uppercase tracking-widest text-laser">{label}</dt>
                <dd className="text-sm sm:col-span-3">{value}</dd>
              </div>
            ))}
          </dl>
          <a href={MAPS_URL} className="mt-4 inline-flex min-h-11 items-center text-sm text-mist underline decoration-mist/40 underline-offset-4">
            2415 Spring Lake Drive on the map
          </a>
        </div>
        <aside className="md:col-span-5">
          <figure className="border border-mist/20 bg-panel">
            <img src={publicUrl("photos/mri.jpg")} alt="Representative MRI suite" className="aspect-photo w-full object-cover" />
            <figcaption className="px-4 py-3 text-xs leading-relaxed text-mist">
              A representative suite, not a unit currently on offer. Manufacturers we regularly place: {BRANDS.join(", ")}.
            </figcaption>
          </figure>
          <div className="mt-6 flex flex-col gap-3">
            <a href={`tel:${PHONE_TEL}`} className={btnPrimary}>
              Call {PHONE_DISPLAY}
            </a>
            <Link to="/contact" className={btnLine}>
              Send a note
            </Link>
          </div>
        </aside>
      </div>
    </SiteShell>
  );
}
