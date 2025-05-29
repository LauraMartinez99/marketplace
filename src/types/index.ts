export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
    slug: string;
  };
  images: string[];
}

export interface ProductFilters {
  search: string;
  category: string;
  sortBy: 'price_asc' | 'price_desc' | 'title_asc' | 'title_desc';
}

export interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
} 