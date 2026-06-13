// Fake Store API doesn't provide colours, sizes or stock.
// We fake it using simple arrays and the product id to keep it consistent across page loads.

const COLOURS = ['Black', 'White', 'Red'];
const COLOUR_HEX: Record<string, string> = {
  Black: '#111111',
  White: '#eeeeee',
  Red: '#c0392b',
};

const CLOTHING_SIZES = ['S', 'M', 'L'];
const DEFAULT_SIZES = ['One Size'];

const STOCK_STATUSES: Array<'available' | 'low-stock' | 'sold-out'> = [
  'available',
  'low-stock',
  'sold-out',
];

export function getProductVariants(productId: number, category: string) {
  // Pick 3 colours using the product id
  const c1 = COLOURS[productId % COLOURS.length];
  const c2 = COLOURS[(productId + 1) % COLOURS.length];
  const c3 = COLOURS[(productId + 2) % COLOURS.length];

  const colours = [...new Set([c1, c2, c3])].map((name) => ({
    name,
    hex: COLOUR_HEX[name],
  }));

  const isClothing = category.includes('clothing');
  const sizeLabels = isClothing ? CLOTHING_SIZES : DEFAULT_SIZES;

  const sizes = sizeLabels.map((label, i) => ({
    label,
    status: STOCK_STATUSES[(productId + i) % STOCK_STATUSES.length],
  }));

  const isOnSale = productId % 4 === 0;
  const originalPrice = isOnSale
    ? parseFloat((productId + 10).toFixed(2))
    : null;

  return { colours, sizes, isOnSale, originalPrice };
}
