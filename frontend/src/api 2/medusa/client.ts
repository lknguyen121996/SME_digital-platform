import { MedusaProduct } from '@/types/medusa';

/**
 * Medusa store API configuration
 */
export const MEDUSA_API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BASE_URL || 'http://localhost:9000',
  publishableApiKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_API_KEY || '',
} as const;

/**
 * Mock product data for development before backend is ready
 */
export const MOCK_PRODUCTS: MedusaProduct[] = [
  {
    id: 'prod_01',
    title: 'Triple Oak 36 Mois',
    description: 'Premium red wine aged for 36 months in French oak barrels',
    handle: 'triple-oak-36-mois',
    status: 'published',
    thumbnail: 'https://figma.com/file/demo-image-1.png',
    images: [],
    variants: [
      {
        id: 'var_01',
        title: 'Default',
        prices: [{ amount: '1500000', currency_code: 'vnd' }],
        inventory_quantity: 50,
        options: [{ value: '750ml' }],
      },
    ],
    options: [
      {
        id: 'opt_01',
        title: 'Volume',
        values: ['750ml'],
      },
    ],
  },
  {
    id: 'prod_02',
    title: 'Cabernet Sauvignon Reserve',
    description: 'Rich and bold Cabernet from the Napa Valley',
    handle: 'cabernet-sauvignon-reserve',
    status: 'published',
    thumbnail: 'https://figma.com/file/demo-image-2.png',
    images: [],
    variants: [
      {
        id: 'var_02',
        title: 'Default',
        prices: [{ amount: '890000', currency_code: 'vnd' }],
        inventory_quantity: 30,
        options: [{ value: '750ml' }],
      },
    ],
    options: [],
  },
  {
    id: 'prod_03',
    title: 'Chardonnay Premium',
    description: 'Crisp and elegant white wine',
    handle: 'chardonnay-premium',
    status: 'published',
    thumbnail: 'https://figma.com/file/demo-image-3.png',
    images: [],
    variants: [
      {
        id: 'var_03',
        title: 'Default',
        prices: [{ amount: '720000', currency_code: 'vnd' }],
        inventory_quantity: 45,
        options: [{ value: '750ml' }],
      },
    ],
    options: [],
  },
  {
    id: 'prod_04',
    title: 'Pinot Noir Elegance',
    description: 'Smooth and silky Pinot Noir',
    handle: 'pinot-noir-elegance',
    status: 'published',
    thumbnail: 'https://figma.com/file/demo-image-4.png',
    images: [],
    variants: [
      {
        id: 'var_04',
        title: 'Default',
        prices: [{ amount: '1100000', currency_code: 'vnd' }],
        inventory_quantity: 25,
        options: [{ value: '750ml' }],
      },
    ],
    options: [],
  },
  {
    id: 'prod_05',
    title: 'Merlot Classic',
    description: 'Medium-bodied Merlot with rich fruit flavors',
    handle: 'merlot-classic',
    status: 'published',
    thumbnail: 'https://figma.com/file/demo-image-5.png',
    images: [],
    variants: [
      {
        id: 'var_05',
        title: 'Default',
        prices: [{ amount: '650000', currency_code: 'vnd' }],
        inventory_quantity: 60,
        options: [{ value: '750ml' }],
      },
    ],
    options: [],
  },
  {
    id: 'prod_06',
    title: 'Sauvignon Blanc Fresh',
    description: 'Light and refreshing white wine',
    handle: 'sauvignon-blanc-fresh',
    status: 'published',
    thumbnail: 'https://figma.com/file/demo-image-6.png',
    images: [],
    variants: [
      {
        id: 'var_06',
        title: 'Default',
        prices: [{ amount: '580000', currency_code: 'vnd' }],
        inventory_quantity: 40,
        options: [{ value: '750ml' }],
      },
    ],
    options: [],
  },
];
