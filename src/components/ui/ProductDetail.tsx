'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (quantity: number) => void;
}

export default function ProductDetail({ product, onAddToCart }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.images[selectedImage]}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square overflow-hidden rounded-lg ${
                  selectedImage === index ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.title} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 12vw"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
            <p className="mt-2 text-sm font-medium text-gray-700">
              Category: <span className="text-blue-600">{product.category.name}</span>
            </p>
          </div>

          <div className="text-3xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
            <p className="text-gray-800 leading-relaxed">{product.description}</p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4 pt-4">
            <div className="flex items-center border border-gray-300 rounded-lg bg-white">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                disabled={quantity <= 1}
              >
                <FiMinus className="w-4 h-4" />
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                className="w-16 text-center border-x border-gray-300 py-2 text-gray-900 bg-white"
              />
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                <FiPlus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => onAddToCart(quantity)}
            className="w-full md:w-auto flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <FiShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
} 