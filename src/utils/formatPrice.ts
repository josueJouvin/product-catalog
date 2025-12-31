/**
 * Formatea un precio numérico al formato de dólares estadounidenses.
 *
 * @param price - El precio a formatear
 * @returns String formateado como "$1,234.56"
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
