'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

interface CategoryItem {
  id: string;
  name: string;
  count: number;
}

const categories: CategoryItem[] = [
  { id: 'all', name: 'Tất cả', count: 0 },
  { id: 'red-wine', name: 'Rượu vang đỏ', count: 12 },
  { id: 'white-wine', name: 'Rượu vang trắng', count: 8 },
  { id: 'rose-wine', name: 'Rượu vang hồng', count: 5 },
  { id: 'champagne', name: 'Champagne', count: 6 },
];

export function FilterPanel({ isOpen, onClose, className }: FilterPanelProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 10000000,
  });

  if (!isOpen) return null;

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div
      className={cn(
        'bg-white border border-[#e8e0d5] rounded-lg p-4',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#701620]">Bộ lọc</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-[#f5f0e6] rounded-full transition-colors duration-300 md:hidden"
        >
          <svg
            className="w-5 h-5 text-[#69624a]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-[#69624a] mb-3">Danh mục</h4>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={cn(
                'px-3 py-1.5 text-sm rounded-full transition-colors duration-300',
                selectedCategory === category.id
                  ? 'bg-[#701620] text-white'
                  : 'bg-[#f5f0e6] text-[#2c2c2c] hover:bg-[#e8e0d5]'
              )}
            >
              {category.name}
              {category.count > 0 && (
                <span className="ml-1 text-xs opacity-70">({category.count})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-[#69624a] mb-3">Khoảng giá</h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
            placeholder="Từ"
            className="w-full px-3 py-2 border border-[#e8e0d5] rounded-lg text-sm text-[#2c2c2c] placeholder:text-[#69624a]/60 focus:outline-none focus:border-[#701620] focus:ring-1 focus:ring-[#701620]"
          />
          <span className="text-[#69624a]">-</span>
          <input
            type="number"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
            placeholder="Đến"
            className="w-full px-3 py-2 border border-[#e8e0d5] rounded-lg text-sm text-[#2c2c2c] placeholder:text-[#69624a]/60 focus:outline-none focus:border-[#701620] focus:ring-1 focus:ring-[#701620]"
          />
        </div>
      </div>

      {/* Active Filters */}
      {selectedCategory !== 'all' && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-[#69624a] mb-2">Bộ lọc đang chọn:</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default" className="bg-[#701620] text-white">
              {categories.find((c) => c.id === selectedCategory)?.name}
              <button
                onClick={() => setSelectedCategory('all')}
                className="ml-1 hover:opacity-70"
              >
                ×
              </button>
            </Badge>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t border-[#e8e0d5]">
        <button
          onClick={() => setSelectedCategory('all')}
          className="flex-1 px-4 py-2 border border-[#e8e0d5] rounded-lg text-[#69624a] hover:bg-[#f5f0e6] transition-colors duration-300"
        >
          Đặt lại
        </button>
        <button
          onClick={onClose}
          className="flex-1 px-4 py-2 bg-[#701620] text-white rounded-lg hover:bg-[#901825] transition-colors duration-300"
        >
          Áp dụng
        </button>
      </div>
    </div>
  );
}