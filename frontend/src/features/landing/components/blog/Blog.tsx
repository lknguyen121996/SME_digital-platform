'use client';

import Image from 'next/image';
import imgArrow from '@/features/landing/assets/arrow.svg';
import type { BlogPost } from '@/types';

const imgMidsectionWomanPouringVinegarSpoonHeldByFriend2 = 'https://www.figma.com/api/mcp/asset/92edbeb6-f811-453c-b30b-090363461cb3';
const imgMidsectionWomanPouringVinegarSpoonHeldByFriend3 = 'https://www.figma.com/api/mcp/asset/c83c9cc6-3a83-4d1e-bbd1-c5bcdbcac0cb';
const imgMidsectionWomanPouringVinegarSpoonHeldByFriend4 = 'https://www.figma.com/api/mcp/asset/951ebde6-f766-483e-a5d4-50c77f21d419';
const imgVector25 = 'https://www.figma.com/api/mcp/asset/68c7e01a-13be-4d85-9c3c-f750f8cc91b7';
const imgBlogDateIcon = 'https://www.figma.com/api/mcp/asset/d23ebdc7-d53e-4103-b635-4c2fe1d63647';

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Đằng Sau Mỗi Chai Rượu Vang — Hành Trình Của Sự Hoàn Hảo',
    date: 'Th 6  18/07/2025',
    description: 'Tìm hiểu cách các nhà sản xuất hiện đại hướng tới sự bền vững — từ năng lượng mặt trời, vườn nho hữu cơ cho đến quy trình tái chế, tất cả vì một ly rượu thân thiện với thiên...',
    image: imgMidsectionWomanPouringVinegarSpoonHeldByFriend2,
  },
  {
    id: 2,
    title: 'Đằng Sau Mỗi Chai Rượu Vang — Hành Trình Của Sự Hoàn Hảo',
    date: 'Th 6  18/07/2025',
    description: 'Tìm hiểu cách các nhà sản xuất hiện đại hướng tới sự bền vững — từ năng lượng mặt trời, vườn nho hữu cơ cho đến quy trình tái chế, tất cả vì một ly rượu thân thiện với thiên...',
    image: imgMidsectionWomanPouringVinegarSpoonHeldByFriend3,
  },
  {
    id: 3,
    title: 'Đằng Sau Mỗi Chai Rượu Vang — Hành Trình Của Sự Hoàn Hảo',
    date: 'Th 6  18/07/2025',
    description: 'Tìm hiểu cách các nhà sản xuất hiện đại hướng tới sự bền vững — từ năng lượng mặt trời, vườn nho hữu cơ cho đến quy trình tái chế, tất cả vì một ly rượu thân thiện với thiên...',
    image: imgMidsectionWomanPouringVinegarSpoonHeldByFriend4,
  },
];

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="flex flex-col border border-[#a49e83] w-full">
      <div className="relative w-full aspect-[4096/2731] overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-[1.6vh] p-[2.4vh]">
        <div className="flex gap-[0.8vh] items-center">
          <div className="w-[1.8vh] h-[1.8vh]">
            <img src={imgBlogDateIcon} alt="" className="w-full h-full object-contain" />
          </div>
          <p className="font-['Myriad_Pro:Regular'] text-[1.4vh] text-[#69624a]">{post.date}</p>
        </div>
        <p className="font-['Myriad_Pro:Semibold'] text-[2vh] text-[#701620] leading-[1.5]">
          {post.title}
        </p>
        <p className="font-['Myriad_Pro:Regular'] text-[1.6vh] text-[#69624a] leading-[1.5] text-justify">
          {post.description}
        </p>
      </div>
    </div>
  );
}

function Blog() {
  return (
    <section className="relative w-full py-[10vh] flex flex-col items-center bg-[#f9f8f6]">
      <div className="relative w-full max-w-[140vh] mx-auto flex flex-col gap-[5vh]">
        <div className="flex flex-col gap-[3vh]">
          <div className="flex items-center justify-between w-full">
            <div>
              <p className="font-['Beautique_Display:Regular'] text-[4vh] text-[#701620] leading-[1.5]">
                Là khi vị vang kể chuyện gu uống
              </p>
            </div>
            <div>
              <p className="font-['Beautique_Display:Bold'] text-[13vh] text-[#5d080a] text-right leading-normal">
                Vang "Viết"
              </p>
            </div>
          </div>
          <div className="w-full h-[0.1vh]">
            <img src={imgVector25} alt="" className="w-full h-full object-contain" />
          </div>
          <div className="flex justify-end">
            <a href="/blog" className="flex items-center gap-[1.2vh] group">
              <span className="font-['Libre_Franklin:SemiBold'] text-[1.6vh] text-[#5d080a] uppercase">Xem thêm</span>
              <div className="relative w-[5vh] h-[1vh] overflow-hidden">
                <Image src={imgArrow} alt="" fill className="object-contain group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </a>
          </div>
        </div>

        <div className="flex gap-[3.2vh]">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog;
