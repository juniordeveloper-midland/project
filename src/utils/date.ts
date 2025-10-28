export function formatDateTime(value?: string | number | Date) {
  if (!value) return '';
  const tz = (import.meta.env.VITE_TIMEZONE as string) || 'UTC';
  const date = typeof value === 'string' || typeof value === 'number' ? new Date(value) : value;
  try {
    return new Intl.DateTimeFormat(undefined, {
      year: 'numeric', month: 'short', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false,
      timeZone: tz
    }).format(date);
  } catch {
    // fallback to toLocaleString if timezone not supported
    return date.toLocaleString();
  }
}
