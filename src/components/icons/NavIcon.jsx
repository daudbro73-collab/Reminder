const ICONS = {
  tasks: (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="3" width="16" height="18" rx="2.5" />
    <path d="M9 8.5l2 2 4.5-4.5" />
    <path d="M9 13.5h6M9 17h4" />
  </svg>
  ),
  quran: (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path
      d="M6.25 4.75h11.75a1.75 1.75 0 0 1 1.75 1.75v11.5a1.75 1.75 0 0 1-1.75 1.75H6.25a1.75 1.75 0 0 1-1.75-1.75V6.5a1.75 1.75 0 0 1 1.75-1.75z"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path d="M6.25 4.75v13.25" strokeWidth="1.5" />
    <path d="M4.75 6.75v9.25" strokeWidth="2.25" />
    <path d="M9.25 9.25h7.5M9.25 12h5.5" strokeWidth="1.2" opacity="0.35" />
  </svg>
  ),
  tracker: (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19V5" />
    <path d="M4 19h16" />
    <rect x="7" y="12" width="3" height="5" rx="1" />
    <rect x="12" y="9" width="3" height="8" rx="1" />
    <rect x="17" y="6" width="3" height="11" rx="1" />
  </svg>
  ),
  calendar: (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
    <path d="M8 3.5v4M16 3.5v4M3.5 10h17" />
    <circle cx="9" cy="14.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="14.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="14.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="9" cy="17.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="17.5" r="1" fill="currentColor" stroke="none" />
  </svg>
  ),
  habits: (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3.5l6.5 3v6c0 4.2-2.8 7.4-6.5 8.5-3.7-1.1-6.5-4.3-6.5-8.5v-6L12 3.5z" />
    <path d="M9.5 12l1.8 1.8L15 10" />
  </svg>
  ),
  profile: (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
  ),
};

export default function NavIcon({ name, size = 20, className = '' }) {
  const icon = ICONS[name];
  if (!icon) return null;

  return (
    <span
      className={`nav-icon ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {icon}
    </span>
  );
}
