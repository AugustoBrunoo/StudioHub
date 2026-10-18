/**
 * Formats a number to Brazilian Real (BRL) currency format.
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

/**
 * Formats an ISO date string or Date object into localized Brazilian Portuguese date.
 */
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pt-BR', options ?? {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(d);
}

/**
 * Extracts initials from a user's full name (up to 2 characters).
 */
export function getInitials(name: string): string {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
