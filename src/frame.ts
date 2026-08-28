// Moldura vetorial mantida como texto para evitar assets binários no repositório.
const frameSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" aria-label="Moldura Camply 90.000">
  <defs>
    <linearGradient id="ring" x1="0" y1="0" x2="0.9" y2="1">
      <stop stop-color="#8f4dff"/><stop offset=".32" stop-color="#6a1eea"/><stop offset=".72" stop-color="#4a119f"/><stop offset="1" stop-color="#842cff"/>
    </linearGradient>
    <linearGradient id="bottom" x1="0" y1="0" x2="0" y2="1">
      <stop stop-color="#a85cff" stop-opacity="0"/><stop offset=".34" stop-color="#8130f4" stop-opacity=".76"/><stop offset=".62" stop-color="#42108e" stop-opacity=".98"/><stop offset="1" stop-color="#6420ce"/>
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="7"/></filter>
    <path id="top-arc" d="M 98 400 A 302 302 0 0 1 702 400"/>
    <mask id="ring-cutout"><rect width="800" height="800" fill="white"/><circle cx="400" cy="400" r="309" fill="black"/></mask>
    <clipPath id="circle-clip"><circle cx="400" cy="400" r="397"/></clipPath>
  </defs>
  <circle cx="400" cy="400" r="398" fill="url(#ring)" mask="url(#ring-cutout)"/>
  <circle cx="400" cy="400" r="394" fill="none" stroke="#bd91ff" stroke-width="2"/>
  <circle cx="400" cy="400" r="311" fill="none" stroke="#9c55ff" stroke-width="8"/>
  <circle cx="400" cy="400" r="385" fill="none" stroke="#d7bcff" stroke-opacity=".35" stroke-width="3"/>
  <text fill="white" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="900" letter-spacing=".3"><textPath href="#top-arc" startOffset="4%">EU VOTO CAMPLY!   |   EU VOTO CAMPLY!</textPath></text>
  <g clip-path="url(#circle-clip)">
    <rect x="0" y="415" width="800" height="385" fill="url(#bottom)"/>
    <ellipse cx="400" cy="492" rx="285" ry="70" fill="#b962ff" opacity=".36" filter="url(#glow)"/>
  </g>
  <g fill="white" font-family="Arial, Helvetica, sans-serif" text-anchor="middle">
    <text x="400" y="518" font-size="16" font-weight="700" letter-spacing=".7">──  DEPUTADO ESTADUAL  ──</text>
    <text x="400" y="602" font-size="84" font-weight="900" letter-spacing="-4">CAMPLY</text>
    <text x="400" y="692" font-size="104" font-weight="900" letter-spacing="-7">90.000</text>
    <text x="400" y="730" font-size="24" font-style="italic">Juntos por mais conquistas!</text>
  </g>
  <path d="M617 578l18 25 53-67" fill="none" stroke="white" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M279 750c68-16 164-17 242 0" fill="none" stroke="white" stroke-width="6" stroke-linecap="round"/>
</svg>`

export const frameUrl = `data:image/svg+xml,${encodeURIComponent(frameSvg)}`
