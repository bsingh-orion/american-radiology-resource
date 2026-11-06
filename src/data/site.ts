export function publicUrl(path: string) {
  const base = import.meta.env.BASE_URL || "/";
  return `${base}${path.replace(/^\//, "")}`;
}

export const PHONE_DISPLAY = "(443) 831-4998";
export const PHONE_TEL = "+14438314998";
export const ADDRESS_LINES = ["2415 Spring Lake Drive", "Timonium, Maryland 21093"];
export const MAPS_URL =
  "https://maps.google.com/?q=2415+Spring+Lake+Drive+Timonium+Maryland+21093";

export const NAV = [
  { to: "/equipment", label: "Equipment" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export type InterestId =
  | "mri"
  | "ct"
  | "pet"
  | "cath"
  | "mobile"
  | "rad"
  | "sell"
  | "service"
  | "other";

export const INTERESTS: { id: InterestId; label: string }[] = [
  { id: "mri", label: "MRI — buy or rent" },
  { id: "ct", label: "CT — buy or rent" },
  { id: "pet", label: "PET/CT" },
  { id: "cath", label: "Cath or angio lab" },
  { id: "mobile", label: "Mobile or modular" },
  { id: "rad", label: "Rad or fluoro room" },
  { id: "sell", label: "Selling a system we should look at" },
  { id: "service", label: "Install, de-install, or service" },
  { id: "other", label: "Something else" },
];

export const SETTINGS = [
  { id: "fixed", label: "Fixed room" },
  { id: "coach", label: "Mobile coach" },
  { id: "either", label: "Either" },
] as const;

export type SettingId = (typeof SETTINGS)[number]["id"];

export const TIMELINES = [
  "As soon as a match exists",
  "Within 30 days",
  "This quarter",
  "Planning only",
] as const;

export type Modality = {
  id: InterestId;
  name: string;
  kicker: string;
  summary: string;
  points: string[];
  image?: string;
  imageAlt?: string;
};

export const MODALITIES: Modality[] = [
  {
    id: "mri",
    name: "MRI",
    kicker: "Fixed rooms and mobiles",
    summary:
      "1.5T systems, conventional and wide-bore, from the manufacturers imaging departments already know how to run. A fixed room when you are building permanent capacity, or a coach when the magnet room is still a drawing.",
    points: [
      "GE, Siemens, Philips, Toshiba, Hitachi",
      "Sale, or a short- or long-term rental",
      "Magnets, chillers, and trailer options discussed with the system",
    ],
    image: publicUrl("photos/mri.jpg"),
    imageAlt: "Representative wide-bore MRI suite of the kind American Radiology Resource places",
  },
  {
    id: "ct",
    name: "CT",
    kicker: "16-slice through high-slice",
    summary:
      "Previously owned CT for replacement rooms, added outpatient capacity, and mobile coverage while a fixed gantry is out. We talk tube seconds, software level, and site power before anyone talks price.",
    points: [
      "Fixed scanners and CT coaches",
      "Configurations matched to the studies you actually run",
      "De-install of the outgoing system if that is part of the job",
    ],
    image: publicUrl("photos/ct.jpg"),
    imageAlt: "Representative CT gantry room of the kind American Radiology Resource places",
  },
  {
    id: "cath",
    name: "Cath & angio",
    kicker: "Labs, not just boxes",
    summary:
      "Cath labs, angio labs, and combined rooms. These are projects — ceiling rails, power, and a usable geometry — so the conversation starts with the room you have, not a brochure photograph.",
    points: [
      "Single-plane and biplane discussions",
      "De-install, rigging path, and reinstall coordinated",
      "Interim coverage when a lab is dark",
    ],
    image: publicUrl("photos/cath.jpg"),
    imageAlt: "Representative catheterization laboratory of the kind American Radiology Resource places",
  },
  {
    id: "pet",
    name: "PET/CT",
    kicker: "Fixed and mobile",
    summary:
      "Previously owned PET/CT systems and mobile PET coaches for sites adding oncology or cardiac PET without waiting on a new-build schedule.",
    points: [
      "System, hot lab adjacencies, and coach placement treated as one question",
      "Availability confirmed before anyone is asked to hold a pad",
    ],
  },
  {
    id: "mobile",
    name: "Mobile & modular",
    kicker: "When the building is not ready",
    summary:
      "CT coaches, MRI mobiles, PET mobiles, empty trailers, and modular buildings. Useful as a bridge during construction, after a failure, or when volume does not yet justify a fixed room.",
    points: [
      "Short-term and longer interim rentals",
      "Pad, power, and access reviewed before a coach is promised",
      "Chillers and support gear sourced with the magnet when needed",
    ],
    image: publicUrl("photos/hero.jpg"),
    imageAlt: "Representative mobile imaging coach parked at a hospital",
  },
  {
    id: "rad",
    name: "Rad & fluoro",
    kicker: "Rooms that still earn their keep",
    summary:
      "Radiography rooms and rad/fluoro rooms for clinics and hospitals replacing a tired room without turning it into a capital campaign.",
    points: [
      "Matched to room size and the work you do in it",
      "Removal of the outgoing equipment arranged with the install",
    ],
  },
];

export const SERVICES = [
  {
    num: "01",
    title: "Equipment sales",
    body: "Previously owned CT, MRI, PET/CT, cath and angio labs, and rad rooms. You get a specific system, its history as we know it, and a straight answer if it is the wrong fit.",
  },
  {
    num: "02",
    title: "Equipment purchases",
    body: "If you are replacing a scanner, we will look at buying the outgoing system. A clean removal is often worth more than a hopeful listing that sits for a year.",
  },
  {
    num: "03",
    title: "Mobile rentals",
    body: "Interim CT, MRI, and PET coaches on a short or longer term. The point is to keep the schedule while a room is built, repaired, or still being decided.",
  },
  {
    num: "04",
    title: "Installation & de-installation",
    body: "Rigging in and rigging out. Magnet ramps, gantry moves, and the unglamorous sequencing that keeps a department from being dark longer than it has to be.",
  },
  {
    num: "05",
    title: "Site planning",
    body: "Power, cooling, shielding conversations, pad, and access — reviewed against the system you are actually considering, not a generic room template.",
  },
  {
    num: "06",
    title: "Service arrangements",
    body: "Service coverage can be arranged around the system you take. We do not pretend a pre-owned scanner is maintenance-free, and we will not leave that as a surprise.",
  },
  {
    num: "07",
    title: "Training",
    body: "Applications orientation for the team that will run the system. Ask as well about interim staffing if a go-live and a vacancy land in the same week.",
  },
  {
    num: "08",
    title: "Financing",
    body: "When a purchase makes more sense than a rental but cash this quarter does not, we can discuss financing alongside the equipment — not as a separate errand after the fact.",
  },
] as const;

export const STEPS = [
  {
    num: "01",
    title: "Tell us the constraint",
    body: "Modality, roughly when you need it, and what the site can actually accept. A phone call is enough to start.",
  },
  {
    num: "02",
    title: "We match a real system",
    body: "Not a category page. A specific scanner or coach, with the caveats attached, or a clear no if nothing on the market fits.",
  },
  {
    num: "03",
    title: "Site, move, install",
    body: "Planning, de-install of what you have, delivery, and installation sequenced so the room is not surprised by the machine.",
  },
  {
    num: "04",
    title: "Hand it to the team",
    body: "Training, service coverage, and a person you can still call after the truck leaves.",
  },
] as const;

export const BRANDS = ["GE", "Siemens", "Philips", "Toshiba", "Hitachi"] as const;
