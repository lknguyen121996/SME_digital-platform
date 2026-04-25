'use client';

import { useState, useEffect } from 'react';

const galleryImages = [
  { id: 1, src: 'https://www.figma.com/api/mcp/asset/63182425-23fb-4e3d-b211-c4d46cac4927' },
  { id: 2, src: 'https://www.figma.com/api/mcp/asset/cb270f20-ba01-4cce-8964-40c664c011a5' },
  { id: 3, src: 'https://www.figma.com/api/mcp/asset/e73d1590-7a1e-4c7b-8020-1e9e21e2f7f8' },
  { id: 4, src: 'https://www.figma.com/api/mcp/asset/2fa92c5a-35c0-4903-8947-3a9e5cb6b925' },
  { id: 5, src: 'https://www.figma.com/api/mcp/asset/db664771-569b-40be-b855-9a16d7b3b69f' },
];

function GalleryItem({ src, isActive }: { src: string; isActive: boolean }) {
  return (
    <div
      className={`relative w-[20vw] h-[20vw] shrink-0 overflow-hidden transition-opacity duration-500 ${
        isActive ? 'opacity-100' : 'opacity-0 absolute'
      }`}
    >
      <img src={src} alt="" className="w-full h-full object-cover" />
    </div>
  );
}

function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full bg-[#f9f8f6] overflow-hidden">
      <div className="flex justify-center">
        {galleryImages.map((image, index) => (
          <GalleryItem key={image.id} src={image.src} isActive={index === currentIndex} />
        ))}
      </div>
    </section>
  );
}

export default Gallery;
