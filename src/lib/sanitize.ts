/**
 * Sanitizes a string for safe rendering in the DOM.
 * Prevents XSS attacks by escaping HTML entities in user-generated
 * or Firestore-sourced content before rendering.
 */
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Validates that a value is a safe, non-empty string.
 * Returns the sanitized string or a fallback value.
 */
export function safeString(input: unknown, fallback = ''): string {
  if (typeof input !== 'string' || input.trim().length === 0) return fallback;
  return sanitizeString(input);
}

/**
 * Validates that a value is a finite number within optional bounds.
 * Returns the number or a fallback value.
 */
export function safeNumber(input: unknown, fallback = 0, min?: number, max?: number): number {
  if (typeof input !== 'number' || !Number.isFinite(input)) return fallback;
  if (min !== undefined && input < min) return min;
  if (max !== undefined && input > max) return max;
  return input;
}
