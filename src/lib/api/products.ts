import { Product, Category } from '@/types';

const API_URL = 'https://api.escuelajs.co/api/v1';

export async function getProducts(offset = 0, limit = 12): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products?offset=${offset}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

export async function getProduct(id: number): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${id}`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
}

export async function getProductsByCategory(categoryId: number): Promise<Product[]> {
  const res = await fetch(`${API_URL}/categories/${categoryId}/products`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) throw new Error('Failed to fetch products by category');
  return res.json();
}

export function filterAndSortProducts(
  products: Product[],
  search: string,
  category: string,
  sortBy: 'price_asc' | 'price_desc' | 'title_asc' | 'title_desc'
): Product[] {
  let filtered = [...products];

  // Apply search filter
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(
      product =>
        product.title.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
    );
  }

  // Apply category filter
  if (category) {
    filtered = filtered.filter(product => product.category.id.toString() === category);
  }

  // Apply sorting
  switch (sortBy) {
    case 'price_asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'title_asc':
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'title_desc':
      filtered.sort((a, b) => b.title.localeCompare(a.title));
      break;
  }

  return filtered;
} 