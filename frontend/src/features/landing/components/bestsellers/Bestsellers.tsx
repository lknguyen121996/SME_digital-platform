import Image from 'next/image';
import imgArrow from '@/features/landing/assets/arrow.svg';
import type { MedusaProduct } from '@/types/medusa';

// Bestsellers Assets - from Figma
const imgTitle = 'https://www.figma.com/api/mcp/asset/daf9e9f6-35ca-4d06-8a26-9a3044d78285';

/**
 * Mock product data using Medusa-aligned types
 * In future, this will be fetched from API via getProducts()
 */
const products: MedusaProduct[] = [
  {
    id: 'prod_01',
    title: 'Château Margaux Cabernet Sauvignon 2015',
    description: '',
    handle: 'chateau-margaux-2015',
    status: 'published',
    thumbnail: 'https://www.figma.com/api/mcp/asset/8dc72770-056e-4bca-b302-e57eea648ca7',
    images: [],
    variants: [{ id: 'v1', title: 'Default', prices: [{ amount: '1290000', currency_code: 'vnd' }], inventory_quantity: 10, options: [] }],
    options: [],
  },
  {
    id: 'prod_02',
    title: 'Château Margaux Cabernet Sauvignon 2015',
    description: '',
    handle: 'chateau-margaux-2015-2',
    status: 'published',
    thumbnail: 'https://www.figma.com/api/mcp/asset/9dfeb8c3-c13e-44e2-ae9b-278939b11834',
    images: [],
    variants: [{ id: 'v2', title: 'Default', prices: [{ amount: '1290000', currency_code: 'vnd' }], inventory_quantity: 10, options: [] }],
    options: [],
  },
  {
    id: 'prod_03',
    title: 'Château Margaux Cabernet Sauvignon 2015',
    description: '',
    handle: 'chateau-margaux-2015-3',
    status: 'published',
    thumbnail: 'https://www.figma.com/api/mcp/asset/59676f4a-cd2f-4c6b-9cf1-97f2093e5887',
    images: [],
    variants: [{ id: 'v3', title: 'Default', prices: [{ amount: '1290000', currency_code: 'vnd' }], inventory_quantity: 10, options: [] }],
    options: [],
  },
  {
    id: 'prod_04',
    title: 'Château Margaux Cabernet Sauvignon 2015',
    description: '',
    handle: 'chateau-margaux-2015-4',
    status: 'published',
    thumbnail: 'https://www.figma.com/api/mcp/asset/fee8419a-a8f8-4010-8f4d-9476cb0535ac',
    images: [],
    variants: [{ id: 'v4', title: 'Default', prices: [{ amount: '1290000', currency_code: 'vnd' }], inventory_quantity: 10, options: [] }],
    options: [],
  },
  {
    id: 'prod_05',
    title: 'Château Margaux Cabernet Sauvignon 2015',
    description: '',
    handle: 'chateau-margaux-2015-5',
    status: 'published',
    thumbnail: 'https://www.figma.com/api/mcp/asset/3fa15591-a63c-4f75-a92b-3dcb77b03449',
    images: [],
    variants: [{ id: 'v5', title: 'Default', prices: [{ amount: '1290000', currency_code: 'vnd' }], inventory_quantity: 10, options: [] }],
    options: [],
  },
  {
    id: 'prod_06',
    title: 'Château Margaux Cabernet Sauvignon 2015',
    description: '',
    handle: 'chateau-margaux-2015-6',
    status: 'published',
    thumbnail: 'https://www.figma.com/api/mcp/asset/63003265-bf1c-4330-9fce-fbb85a36792b',
    images: [],
    variants: [{ id: 'v6', title: 'Default', prices: [{ amount: '1290000', currency_code: 'vnd' }], inventory_quantity: 10, options: [] }],
    options: [],
  },
];

// Product card with custom styling for landing page layout
function ProductCardStyled({ product }: { product: MedusaProduct }) {
  return (
    <div className="flex flex-col gap-[1.6vh] w-[26.6vh]">
      <div className="relative w-full aspect-[266/338] bg-[#f3f1eb] overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-contain p-[1vh]"
        />
      </div>
      <div className="flex flex-col gap-[0.8vh]">
        <p className="font-['Myriad_Pro:Regular'] text-[1.8vh] text-[#69624a] leading-[1.4]">
          {product.title}
        </p>
        <p className="font-['Myriad_Pro:Bold'] text-[1.8vh] text-[#701620] leading-normal">
          {product.variants[0]?.prices[0] && new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
          }).format(parseInt(product.variants[0].prices[0].amount, 10))}
        </p>
      </div>
    </div>
  );
}

// Large product card for featured items
function ProductCardLarge({ product }: { product: MedusaProduct }) {
  return (
    <div className="flex flex-col gap-[1.6vh] flex-1 min-w-px">
      <div className="relative w-full aspect-[729/729] bg-[#f6f5f1] flex items-center justify-center p-[1vh] rounded-tl-[300vh] rounded-tr-[300vh] overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col gap-[0.8vh]">
        <p className="font-['Myriad_Pro:Regular'] text-[1.8vh] text-[#69624a] leading-[1.4]">
          {product.title}
        </p>
        <p className="font-['Myriad_Pro:Bold'] text-[1.8vh] text-[#701620] leading-normal">
          {product.variants[0]?.prices[0] && new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
          }).format(parseInt(product.variants[0].prices[0].amount, 10))}
        </p>
      </div>
    </div>
  );
}

function Bestsellers() {
  return (
    <section className="relative w-full py-[10vh] flex flex-col items-center">
      {/* Header */}
      <div className="relative w-full max-w-[140vh] mx-auto flex flex-col items-end gap-[3vh]">
        <div className="relative aspect-[1383/255] w-full max-w-[138.3vh]">
          <img
            src={imgTitle}
            alt="Bestsellers"
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>
        <a href="/shop" className="relative z-30 flex items-center justify-end gap-[1vh] group cursor-pointer">
          <span className="font-['Myriad_Pro:Bold'] text-[2vh] text-[#701620] text-center uppercase">XEM THÊM</span>
          <div className="relative w-[5vh] h-[1vh] overflow-hidden">
            <Image
              src={imgArrow}
              alt=""
              fill
              className="object-contain group-hover:translate-x-2 transition-transform duration-300"
            />
          </div>
        </a>
      </div>

      {/* Products Grid */}
      <div className="relative w-full max-w-[140vh] mx-auto mt-[5vh]">
        {/* Row 1 */}
        <div className="flex gap-[27vh] mb-[3.2vh]">
          <div className="flex gap-[3.2vh]">
            <ProductCardStyled product={products[0]} />
            <ProductCardStyled product={products[1]} />
          </div>
          <ProductCardLarge product={products[0]} />
        </div>

        {/* Row 2 */}
        <div className="flex gap-[27vh]">
          <div className="flex gap-[3.2vh]">
            <ProductCardStyled product={products[2]} />
            <ProductCardStyled product={products[3]} />
          </div>
          <div className="flex gap-[3.2vh] flex-1 min-w-px">
            <ProductCardStyled product={products[4]} />
            <ProductCardStyled product={products[5]} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Bestsellers;
