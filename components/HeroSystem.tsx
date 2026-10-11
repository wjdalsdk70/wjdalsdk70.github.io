export default function HeroSystem() {
  return (
    <figure className="hero-system">
      <div className="system-orbit" aria-hidden="true" />
      <svg viewBox="0 0 460 420" className="system-illustration" aria-hidden="true" focusable="false">
        <defs>
          <pattern id="system-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#d7cabb" />
          </pattern>
          <linearGradient id="system-face" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#b35a32" /><stop offset="1" stopColor="#793c24" />
          </linearGradient>
          <linearGradient id="system-top" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#f7d8b5" /><stop offset="1" stopColor="#dfac7d" />
          </linearGradient>
          <filter id="system-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>
        <rect width="460" height="420" fill="url(#system-grid)" opacity=".6" />
        <ellipse cx="230" cy="347" rx="112" ry="24" fill="#744027" opacity=".12" filter="url(#system-shadow)" />
        <g fill="none" stroke="#c6a98d" strokeWidth="1.2">
          <path d="M52 133H85L125 157" /><path d="M334 187H400V90H365" />
          <path d="M133 290H72V354H184" /><path d="M326 297H393V334" />
          <ellipse cx="230" cy="237" rx="205" ry="87" strokeDasharray="3 8" transform="rotate(-18 230 237)" />
        </g>
        <g className="system-packets" fill="none" stroke="#b45309" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 150">
          <path d="M52 133H85L125 157" /><path d="M334 187H400V90H365" />
          <path d="M133 290H72V354H184" /><path d="M326 297H393V334" />
        </g>
        <g className="system-stack">
          {[244, 178, 112].map((y, index) => (
            <g key={y}>
              <path d={`M110 ${y + 22}L230 ${y + 82}L350 ${y + 22}L230 ${y - 38}Z`} fill={index === 2 ? 'url(#system-top)' : '#ead9c5'} stroke="#c19b78" strokeWidth="1" />
              <path d={`M110 ${y + 22}L230 ${y + 82}V${y + 119}L110 ${y + 59}Z`} fill={index === 2 ? '#b4663c' : '#c7a98b'} />
              <path d={`M230 ${y + 82}L350 ${y + 22}V${y + 59}L230 ${y + 119}Z`} fill={index === 2 ? 'url(#system-face)' : '#9d785a'} />
              <path d={`M125 ${y + 44}L174 ${y + 68}`} stroke={index === 2 ? '#f2c498' : '#eadbc9'} strokeWidth="3" strokeLinecap="round" />
              <path d={`M125 ${y + 54}L156 ${y + 69}`} stroke={index === 2 ? '#f2c498' : '#eadbc9'} strokeWidth="2" strokeLinecap="round" opacity=".7" />
              <circle cx="326" cy={y + 55} r="3" fill="#f8ddb3" />
              <circle className="system-indicator" cx="313" cy={y + 62} r="3" fill="#e1c889" />
            </g>
          ))}
          <path d="M216 119L200 128L216 137M244 133L260 142L244 151M238 121L222 149" fill="none" stroke="#925031" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <g fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="1">
          <rect x="13" y="109" width="69" height="33" rx="8" fill="#faf8f5" stroke="#d8c6b3" /><text x="47" y="130" textAnchor="middle" fill="#856446">API</text>
          <rect x="350" y="66" width="75" height="33" rx="8" fill="#faf8f5" stroke="#d8c6b3" /><text x="387" y="87" textAnchor="middle" fill="#856446">CLOUD</text>
          <rect x="354" y="329" width="77" height="33" rx="8" fill="#faf8f5" stroke="#d8c6b3" /><text x="392" y="350" textAnchor="middle" fill="#856446">DATA</text>
          <rect x="166" y="341" width="64" height="30" rx="8" fill="#faf8f5" stroke="#d8c6b3" /><text x="198" y="361" textAnchor="middle" fill="#856446">AI</text>
          <text x="26" y="34" fill="#a48a72" fontSize="9">THE SYSTEM BEHIND THE SERVICE</text>
          <text x="435" y="399" fill="#a48a72" fontSize="9" textAnchor="end">DESIGN / BUILD / IMPROVE</text>
        </g>
      </svg>
      <figcaption>보이지 않는 곳에서, 서비스가 이어지도록.</figcaption>
    </figure>
  )
}
