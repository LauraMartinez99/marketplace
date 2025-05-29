'use client';

import { useState, useEffect } from 'react';
import { Category } from '@/types';
import { getCategories } from '@/lib/api/products';
import { FiSearch, FiFilter } from 'react-icons/fi';

interface ProductFiltersProps {
  onSearch: (search: string) => void;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: 'price_asc' | 'price_desc' | 'title_asc' | 'title_desc') => void;
}

export default function ProductFilters({
  onSearch,
  onCategoryChange,
  onSortChange,
}: ProductFiltersProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSort, setSelectedSort] = useState<'price_asc' | 'price_desc' | 'title_asc' | 'title_desc'>('price_asc');

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };
    loadCategories();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);
    onCategoryChange(value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as 'price_asc' | 'price_desc' | 'title_asc' | 'title_desc';
    setSelectedSort(value);
    onSortChange(value);
  };

  return (
    <div className="space-y-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="w-full md:w-48">
          <div className="relative">
            <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full pl-10 pr-4 py-2 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 appearance-none"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort Options */}
        <div className="w-full md:w-48">
          <select
            value={selectedSort}
            onChange={handleSortChange}
            className="w-full px-4 py-2 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          >
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="title_asc">Name: A to Z</option>
            <option value="title_desc">Name: Z to A</option>
          </select>
        </div>
      </div>
    </div>
  );
} 