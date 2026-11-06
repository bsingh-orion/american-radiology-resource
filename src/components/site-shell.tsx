import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { ADDRESS_LINES, MAPS_URL, NAV, PHONE_DISPLAY, PHONE_TEL } from "@/data/site";

const linkClass =
  "inline-flex min-h-11 items-center text-sm text-mist transition-colors duration-200 ease-snap hover:text-bone";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-void text-bone">
      <a href="#content" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-mist/20 bg-void/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <Link to="/" className="flex min-h-11 items-center gap-3" onClick={() => setOpen(false)}>
          <Mark />
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-medium leading-tight sm:text-base">
              American Radiology Resource
            </span>
            <span className="font-mono text-xs text-mist">Timonium · field desk</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={linkClass}
              activeProps={{ className: `${linkClass} text-bone` }}
            >
              {item.label}
            </Link>
          ))}
          <a href={`tel:${PHONE_TEL}`} className={btnPrimary}>
            <Phone className="size-4" aria-hidden />
            <span className="font-mono tabular-nums">{PHONE_DISPLAY}</span>
          </a>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <a href={`tel:${PHONE_TEL}`} className={btnPrimary} aria-label={`Call ${PHONE_DISPLAY}`}>
            <Phone className="size-4" aria-hidden />
            Call
          </a>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center border border-mist/40 text-bone transition-transform duration-150 ease-snap active:scale-[0.96]"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" className="border-t border-mist/20 px-5 py-2 lg:hidden" aria-label="Mobile">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex min-h-11 items-center border-b border-mist/20 text-base"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-mist/20 bg-panel">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <Mark />
            <p className="font-display text-2xl leading-none">American Radiology Resource</p>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-mist">
            Previously owned CT, MRI, PET/CT, and cath lab systems. Mobile coaches when the room is not ready. Timonium, Maryland.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="font-mono text-xs uppercase tracking-widest text-laser">Visit</p>
          <address className="mt-3 text-sm not-italic leading-relaxed">
            {ADDRESS_LINES.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <a
            href={MAPS_URL}
            className="mt-3 inline-flex min-h-11 items-center text-sm text-mist underline decoration-mist/40 underline-offset-4"
          >
            Open in maps
          </a>
        </div>
        <div className="md:col-span-4">
          <p className="font-mono text-xs uppercase tracking-widest text-laser">Call</p>
          <a href={`tel:${PHONE_TEL}`} className="mt-3 block font-mono text-3xl tabular-nums text-bone">
            {PHONE_DISPLAY}
          </a>
          <p className="mt-2 text-sm text-mist">David Pac, President</p>
          <Link to="/contact" className={`${btnLine} mt-5`}>
            Build a brief
          </Link>
        </div>
      </div>
      <div className="border-t border-mist/20">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-4 font-mono text-xs text-mist sm:flex-row sm:justify-between md:px-8">
          <p>© {new Date().getFullYear()} American Radiology Resource</p>
          <p>Availability changes. Confirm specifications before you commit.</p>
        </div>
      </div>
    </footer>
  );
}

function Mark() {
  return (
    <span className="relative grid size-10 shrink-0 place-items-center border border-mist/40 font-display text-sm leading-none text-bone" aria-hidden>
      <span className="absolute left-0 top-0 size-2 border-l-2 border-t-2 border-laser" />
      ARR
    </span>
  );
}

const tap = "transition-transform duration-150 ease-snap active:scale-[0.96]";

export const btnBase = `inline-flex min-h-11 items-center justify-center gap-2 px-5 text-sm font-medium transition-colors duration-200 ease-snap ${tap}`;

export const btnPrimary = `${btnBase} bg-laser text-void hover:bg-bone`;

export const btnLine = `${btnBase} border border-mist/40 bg-transparent text-bone hover:border-bone`;

export const fieldClass =
  "w-full min-h-11 border border-mist/30 bg-void px-3 text-base text-bone outline-none placeholder:text-mist focus:border-laser";
