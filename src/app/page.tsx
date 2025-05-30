'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { getProducts } from '@/lib/api/products';
import ProductGrid from '@/components/ui/ProductGrid';
import ProductFilters from '@/components/ui/ProductFilters';
import Header from '@/components/layout/Header';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    sort: 'asc',
  });

  useEffect(() => {
    loadProducts();
  }, [filters]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts(0, 100, filters.category);
      let filteredProducts = data;

      // Apply search filter
      if (filters.search) {
        filteredProducts = data.filter(product =>
          product.title.toLowerCase().includes(filters.search.toLowerCase())
        );
      }

      // Apply sort
      filteredProducts.sort((a, b) => {
        if (filters.sort === 'asc') {
          return a.price - b.price;
        }
        return b.price - a.price;
      });

      setProducts(filteredProducts);
    } catch (error) {
      setError('Failed to load products');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center text-red-500">{error}</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <ProductFilters
            onFilterChange={handleFilterChange}
            currentCategory={filters.category}
          />
        </div>
        <ProductGrid products={products} loading={loading} />
      </main>
    </div>
  );
}
