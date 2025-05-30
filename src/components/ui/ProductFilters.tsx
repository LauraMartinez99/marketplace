'use client';

import { useState, useEffect } from 'react';
import { FiSearch, FiChevronDown } from 'react-icons/fi';
import { getCategories } from '@/lib/api/categories';

interface ProductFiltersProps {
  onFilterChange: (filters: {
    search: string;
    category: string;
    sort: string;
  }) => void;
  currentCategory: string;
}

export default function ProductFilters({ onFilterChange, currentCategory }: ProductFiltersProps) {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('asc');
  const [isOpen, setIsOpen] = useState(false);

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

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onFilterChange({ search: value, category: currentCategory, sort });
  };

  const handleCategoryChange = (category: string) => {
    onFilterChange({ search, category, sort });
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    onFilterChange({ search, category: currentCategory, sort: value });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Search Input */}
      <div className="flex-1">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Category Dropdown */}
      <div className="relative w-full sm:w-48">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
        >
          <span className="truncate font-medium">
            {currentCategory ? categories.find(c => c.id.toString() === currentCategory)?.name : 'All Categories'}
          </span>
          <FiChevronDown className={`ml-2 flex-shrink-0 transition-transform text-gray-700 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            <button
              onClick={() => {
                handleCategoryChange('');
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-900 font-medium ${
                !currentCategory ? 'bg-blue-50' : ''
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  handleCategoryChange(category.id.toString());
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-900 font-medium ${
                  currentCategory === category.id.toString() ? 'bg-blue-50' : ''
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sort Dropdown */}
      <select
        value={sort}
        onChange={(e) => handleSortChange(e.target.value)}
        className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 font-medium appearance-none"
      >
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
    </div>
  );
} 