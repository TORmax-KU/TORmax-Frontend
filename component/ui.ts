// Shared class names for layouts that several components render. The visual rules
// themselves live in app/globals.css (the ui-* component classes and design tokens).

export const panel = 'ui-panel';
export const sectionTitle = 'ui-section-title';

// Main column + sticky sidebar used by the TOR and posting detail pages.
export const detailLayout = 'mx-auto grid w-full max-w-6xl items-start gap-5 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-8 lg:px-8';

// Badge tone for a project's availability (open / draft / anything else).
export const availabilityTone = (availability: string) =>
  availability === 'open' ? 'ui-badge-ok' : availability === 'draft' ? 'ui-badge-brand' : 'ui-badge-warn';
