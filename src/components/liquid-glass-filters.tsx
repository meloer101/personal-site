// SVG filters behind the liquid glass (mirrors the Figma "Liquid Glass" effect style). Rendered once per page.
//
// #liquid-glass  backdrop lens for buttons and cards: a displacement map that is neutral (50% grey) in the middle
//                and ramps at the edges, stretched to the element, so only the rim bends what is behind it.
//                Chromium only; elsewhere `backdrop-filter: url()` is ignored and the CSS rim highlight remains.
// #name-lens     the hero name: a wobbling dark band just inside each letter edge plus a specular rim (light at -45°).
//                Applied to SVG <text>, which Safari renders (its feDisplacementMap bug is limited to foreignObject).

const edgeMap = (gradient: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" preserveAspectRatio="none"><defs>${gradient}</defs><rect width="100" height="100" fill="url(#g)"/></svg>`,
  )}`;

// Red drives x, green drives y. >50% samples inward from the leading edge, <50% from the trailing edge.
const MAP_X = edgeMap(
  '<linearGradient id="g" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#ff0000"/><stop offset="0.16" stop-color="#800000"/><stop offset="0.84" stop-color="#800000"/><stop offset="1" stop-color="#000000"/></linearGradient>',
);
const MAP_Y = edgeMap(
  '<linearGradient id="g" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#00ff00"/><stop offset="0.16" stop-color="#008000"/><stop offset="0.84" stop-color="#008000"/><stop offset="1" stop-color="#000000"/></linearGradient>',
);

export function LiquidGlassFilters() {
  return (
    <svg aria-hidden="true" width="0" height="0" className="pointer-events-none absolute">
      <defs>
        {/* The filter region and both maps match the element exactly; the default -10%/120% region stretches
            the map past the edges and darkens the lens. */}
        <filter id="liquid-glass" x="0" y="0" width="1" height="1" colorInterpolationFilters="sRGB">
          <feImage href={MAP_X} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="mapX" />
          <feImage href={MAP_Y} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="mapY" />
          <feComposite in="mapX" in2="mapY" operator="arithmetic" k2="1" k3="1" result="map" />
          <feDisplacementMap in="SourceGraphic" in2="map" scale="28" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        <filter id="name-lens" x="-5%" y="-25%" width="110%" height="150%" colorInterpolationFilters="sRGB">
          {/* thin band just inside the letter edge */}
          <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="soft" />
          <feComposite in="SourceAlpha" in2="soft" operator="arithmetic" k2="1.8" k3="-1.8" result="edge" />
          {/* break the band into patches so it reads as refracted dark sky, not an inner shadow */}
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="7" result="noise" />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  6 0 0 0 -2.6"
            result="patches"
          />
          <feComposite in="edge" in2="patches" operator="in" result="patchyEdge" />
          <feDisplacementMap
            in="patchyEdge"
            in2="noise"
            scale="8"
            xChannelSelector="R"
            yChannelSelector="G"
            result="wobble"
          />
          <feComposite in="wobble" in2="SourceAlpha" operator="in" result="band" />
          <feFlood floodColor="#0b0b0c" floodOpacity="0.85" />
          <feComposite in2="band" operator="in" result="shade" />
          {/* lens rim: a 1.5px ring just outside each letter, lit from the top-left */}
          <feMorphology in="SourceAlpha" operator="dilate" radius="1.5" result="grown" />
          <feComposite in="grown" in2="SourceAlpha" operator="out" result="ring" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="bump" />
          <feSpecularLighting
            in="bump"
            surfaceScale="3"
            specularConstant="1.2"
            specularExponent="16"
            lightingColor="#ffffff"
            result="spec"
          >
            <feDistantLight azimuth="225" elevation="40" />
          </feSpecularLighting>
          <feComposite in="spec" in2="ring" operator="in" result="rim" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="shade" />
            <feMergeNode in="rim" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}
