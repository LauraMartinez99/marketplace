'use client';

import Image from 'next/image';
import { CartItem as CartItemType } from '@/lib/store/cartStore';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-200">
      {/* Product Image */}
      <div className="relative w-24 h-24 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover rounded-lg"
          sizes="96px"
        />
      </div>

      {/* Product Info */}
      <div className="flex-grow">
        <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
        <p className="text-lg font-bold text-blue-600 mt-1">
          ${item.price.toFixed(2)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
          disabled={item.quantity <= 1}
        >
          <FiMinus className="w-4 h-4" />
        </button>
        <span className="w-8 text-center text-gray-900">{item.quantity}</span>
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
        >
          <FiPlus className="w-4 h-4" />
        </button>
      </div>

      {/* Subtotal */}
      <div className="text-lg font-bold text-gray-900 w-24 text-right">
        ${(item.price * item.quantity).toFixed(2)}
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(item.id)}
        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
      >
        <FiTrash2 className="w-5 h-5" />
      </button>
    </div>
  );
} 