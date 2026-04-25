import { clsx, type ClassValue } from 'clsx';

/**
 * Utility functions
 */

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
