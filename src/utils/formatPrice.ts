/**
 * Formats a numeric price to US dollar format.
 *
 * @param price - The price to format
 * @returns Formatted string as "$1,234.56"
 *
 * @example
 * formatPrice(2849.97) // "$2,849.97"
 * formatPrice(100) // "$100.00"
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};
