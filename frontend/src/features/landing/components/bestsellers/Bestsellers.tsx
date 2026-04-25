import Image from 'next/image';
import imgArrow from '@/features/landing/assets/arrow.svg';
import type { Product } from '@/types';

// Bestsellers Assets - from Figma
const imgTitle = 'https://www.figma.com/api/mcp/asset/daf9e9f6-35ca-4d06-8a26-9a3044d78285';
const imgProduct1 = 'https://www.figma.com/api/mcp/asset/8dc72770-056e-4bca-b302-e57eea648ca7';
const imgProduct2 = 'https://www.figma.com/api/mcp/asset/9dfeb8c3-c13e-44e2-ae9b-278939b11834';
const imgProduct3 = 'https://www.figma.com/api/mcp/asset/59676f4a-cd2f-4c6b-9cf1-97f2093e5887';
const imgProduct4 = 'https://www.figma.com/api/mcp/asset/fee8419a-a8f8-4010-8f4d-9476cb0535ac';
const imgProduct5 = 'https://www.figma.com/api/mcp/asset/3fa15591-a63c-4f75-a92b-3dcb77b03449';
const imgProduct6 = 'https://www.figma.com/api/mcp/asset/63003265-bf1c-4330-9fce-fbb85a36792b';
const imgMaskGroup = 'https://www.figma.com/api/mcp/asset/6f1c2959-16f3-4632-902d-29b957546308';

const products: Product[] = [
  {
    id: '1',
    name: 'Château Margaux Cabernet Sauvignon 2015',
    price: '1,290,000₫',
    image: imgProduct1,
  },
  {
    id: '2',
    name: 'Château Margaux Cabernet Sauvignon 2015',
    price: '1,290,000₫',
    image: imgProduct2,
  },
  {
    id: '3',
    name: 'Château Margaux Cabernet Sauvignon 2015',
    price: '1,290,000₫',
    image: imgProduct3,
  },
  {
    id: '4',
    name: 'Château Margaux Cabernet Sauvignon 2015',
    price: '1,290,000₫',
    image: imgProduct4,
  },
  {
    id: '5',
    name: 'Château Margaux Cabernet Sauvignon 2015',
    price: '1,290,000₫',
    image: imgProduct5,
  },
  {
    id: '6',
    name: 'Château Margaux Cabernet Sauvignon 2015',
    price: '1,290,000₫',
    image: imgProduct6,
  }
];

function ProductCard({ name, price, image }: Product) {
  return (
    <div className="flex flex-col gap-[1.6vh] w-[26.6vh]">
      <div className="relative w-full aspect-[266/338] bg-[#f3f1eb] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-contain p-[1vh]"
        />
      </div>
      <div className="flex flex-col gap-[0.8vh]">
        <p className="font-['Myriad_Pro:Regular'] text-[1.8vh] text-[#69624a] leading-[1.4]">
          {name}
        </p>
        <p className="font-['Myriad_Pro:Bold'] text-[1.8vh] text-[#701620] leading-normal">
          {price}
        </p>
      </div>
    </div>
  );
}

function ProductCardLarge({ name, price, image }: Product) {
  return (
    <div className="flex flex-col gap-[1.6vh] flex-1 min-w-px">
      <div className="relative w-full aspect-[729/729] bg-[#f6f5f1] flex items-center justify-center p-[1vh] rounded-tl-[300vh] rounded-tr-[300vh] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col gap-[0.8vh]">
        <p className="font-['Myriad_Pro:Regular'] text-[1.8vh] text-[#69624a] leading-[1.4]">
          {name}
        </p>
        <p className="font-['Myriad_Pro:Bold'] text-[1.8vh] text-[#701620] leading-normal">
          {price}
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
            <ProductCard {...products[0]} />
            <ProductCard {...products[1]} />
          </div>
          <ProductCardLarge
            id="mask-group"
            name="Saint Jacques de Siran (by Chateau Siran, Margaux)"
            price="746,000₫"
            image={imgMaskGroup}
          />
        </div>

        {/* Row 2 */}
        <div className="flex gap-[27vh]">
          <div className="flex gap-[3.2vh]">
            <ProductCard {...products[2]} />
            <ProductCard {...products[3]} />
          </div>
          <div className="flex gap-[3.2vh] flex-1 min-w-px">
            <ProductCard {...products[4]} />
            <ProductCard {...products[5]} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Bestsellers;
