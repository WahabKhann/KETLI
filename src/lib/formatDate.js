/** Readable single-line date, e.g. "28 Sep 2026". */
export function formatLongDate(isoDate) {
  const date = parseDate(isoDate);
  if (!date) return '';
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function parseDate(isoDate) {
  if (!isoDate) return null;
  const date = new Date(`${isoDate}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}
