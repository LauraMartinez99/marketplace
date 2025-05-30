'use client';

import Link from 'next/link';
import { FiShoppingCart } from 'react-icons/fi';
import { useCartStore } from '@/lib/store/cartStore';

export default function Header() {
  const items = useCartStore(state => state.items);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white hover:text-blue-300 transition-colors">
            Marketplace
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link 
              href="/cart"
              className="relative p-2 text-white hover:text-blue-300 transition-colors"
            >
              <FiShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 