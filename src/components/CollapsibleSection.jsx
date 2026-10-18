import { useState } from 'react';

export default function CollapsibleSection({
  title,
  icon,
  badge,
  defaultOpen = false,
  className = '',
  children,
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className={`collapsible-section ${open ? 'open' : ''} ${className}`}>
      <button
        type="button"
        className="collapsible-header"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {icon && <span className="collapsible-icon">{icon}</span>}
        <span className="collapsible-title">{title}</span>
        {badge != null && badge !== '' && (
          <span className="collapsible-badge">{badge}</span>
        )}
        <span className="collapsible-chevron" aria-hidden="true">
          {open ? '▲' : '▼'}
        </span>
      </button>
      {open && <div className="collapsible-body">{children}</div>}
    </section>
  );
}
