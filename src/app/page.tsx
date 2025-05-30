'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { getProducts, filterAndSortProducts } from '@/lib/api/products';
import ProductFilters from '@/components/ui/ProductFilters';
import ProductCard from '@/components/ui/ProductCard';
import Header from '@/components/layout/Header';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface Filters {
  search: string;
  category: string;
  sortBy: 'price_asc' | 'price_desc' | 'title_asc' | 'title_desc';
}

const ITEMS_PER_PAGE = 12;

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    category: '',
    sortBy: 'price_asc'
  });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;
        const data = await getProducts(offset, ITEMS_PER_PAGE, filters.category);
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        setError('Failed to load products');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [currentPage, filters.category]);

  useEffect(() => {
    const filtered = filterAndSortProducts(
      products,
      filters.search,
      filters.category,
      filters.sortBy
    );
    setFilteredProducts(filtered);
  }, [products, filters]);

  const handleSearch = (search: string) => {
    setFilters(prev => ({ ...prev, search }));
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({ ...prev, category }));
    setCurrentPage(1);
  };

  const handleSortChange = (sortBy: 'price_asc' | 'price_desc' | 'title_asc' | 'title_desc') => {
    setFilters(prev => ({ ...prev, sortBy }));
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Products</h1>
        
        <ProductFilters
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
          onSortChange={handleSortChange}
          currentCategory={filters.category}
        />

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No products found</p>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-8 flex justify-center items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <span className="px-4 py-2 text-gray-600">
            Page {currentPage}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={filteredProducts.length < ITEMS_PER_PAGE}
            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </main>
    </>
  );
}
