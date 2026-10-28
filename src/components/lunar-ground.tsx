import { copy, profile, type Locale } from "@/content/site";

// The moon horizon is the bottom of every page; the footer sits on its shadowed edge.
export function LunarGround({ locale }: { locale: Locale }) {
  return (
    <footer className="relative h-[420px] overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative SVG, rendered 1:1 so the dither stays crisp */}
      <img
        src="/art/moon.svg"
        alt=""
        aria-hidden="true"
        width={2560}
        height={420}
        className="pointer-events-none absolute top-0 left-1/2 h-[420px] w-[2560px] max-w-none -translate-x-1/2 select-none"
      />
      <div className="container-site absolute inset-x-0 bottom-8 flex flex-col gap-1 text-body-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>{copy[locale].footer.colophon}</p>
      </div>
    </footer>
  );
}
