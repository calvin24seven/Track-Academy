import type { ClassValue } from 'clsx';

/**
 * cn — class merger
 * Filters falsy values and joins with spaces.
 * Deliberately simple — no clsx/tailwind-merge dependency for MVP.
 */
export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(' ');
}

/**
 * formatDate — UK date format
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}