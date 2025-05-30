'use client';

import Header from '@/components/layout/Header';
import { FiUser, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <FiUser className="w-10 h-10 text-gray-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
                <p className="text-gray-500">Premium Member</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <FiMail className="w-5 h-5 text-gray-400" />
                <span>user@example.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <FiMapPin className="w-5 h-5 text-gray-400" />
                <span>New York, USA</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <FiPhone className="w-5 h-5 text-gray-400" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
              <div className="text-center py-8 text-gray-500">
                No recent orders found
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 