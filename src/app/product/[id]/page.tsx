'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Product } from '@/types';
import { getProduct, getProducts } from '@/lib/api/products';
import ProductDetail from '@/components/ui/ProductDetail';
import Header from '@/components/layout/Header';
import ProductCard from '@/components/ui/ProductCard';
import { useCartStore } from '@/lib/store/cartStore';

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const productId = parseInt(params.id as string);
        const data = await getProduct(productId);
        setProduct(data);

        // Load related products (products from the same category)
        const allProducts = await getProducts(0, 4);
        const related = allProducts
          .filter(p => p.category.id === data.category.id && p.id !== data.id)
          .slice(0, 4);
        setRelatedProducts(related);
      } catch (error) {
        setError('Failed to load product');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [params.id]);

  const handleAddToCart = (quantity: number) => {
    if (product) {
      addItem(product, quantity);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error || 'Product not found'}</div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main>
        <ProductDetail product={product} onAddToCart={handleAddToCart} />

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
} 