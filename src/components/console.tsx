import { useRef, useState, type PointerEvent } from "react";
import { MODALITIES, type Modality } from "@/data/site";

export function LaserPlate({ modality }: { modality: Modality }) {
  const frame = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 46 });
  const [live, setLive] = useState(false);

  function track(event: PointerEvent<HTMLDivElement>) {
    const box = frame.current?.getBoundingClientRect();
    if (!box) return;
    const x = Math.min(100, Math.max(0, ((event.clientX - box.left) / box.width) * 100));
    const y = Math.min(100, Math.max(0, ((event.clientY - box.top) / box.height) * 100));
    setPos({ x, y });
    setLive(true);
  }

  return (
    <div
      ref={frame}
      onPointerMove={track}
      onPointerLeave={() => setLive(false)}
      className="relative aspect-photo overflow-hidden bg-panel"
    >
      {MODALITIES.filter((item) => item.image).map((item) => (
        <img
          key={item.id}
          src={item.image}
          alt={item.id === modality.id ? (item.imageAlt ?? "") : ""}
          width={1728}
          height={1152}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-snap ${
            item.id === modality.id ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {modality.image ? null : (
        <div className="field-grid absolute inset-0 flex flex-col justify-between p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-laser">{modality.kicker}</p>
          <p className="font-display text-6xl leading-none sm:text-7xl">{modality.name}</p>
        </div>
      )}
      <span className="pointer-events-none absolute left-3 top-3 size-4 border-l-2 border-t-2 border-laser" />
      <span className="pointer-events-none absolute right-3 top-3 size-4 border-r-2 border-t-2 border-laser" />
      <span className="pointer-events-none absolute bottom-3 left-3 size-4 border-b-2 border-l-2 border-laser" />
      <span className="pointer-events-none absolute bottom-3 right-3 size-4 border-b-2 border-r-2 border-laser" />
      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-laser"
        style={{ left: `${pos.x}%`, opacity: live ? 0.9 : 0.45 }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 h-px bg-laser"
        style={{ top: `${pos.y}%`, opacity: live ? 0.9 : 0.45 }}
      />
      <p className="pointer-events-none absolute bottom-4 left-8 font-mono text-xs tabular-nums text-bone">
        X {pos.x.toFixed(0).padStart(2, "0")} · Y {pos.y.toFixed(0).padStart(2, "0")}
        {live ? "" : " · move across the frame"}
      </p>
    </div>
  );
}
