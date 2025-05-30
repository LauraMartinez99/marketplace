interface Category {
  id: number;
  name: string;
  image: string;
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch('https://api.escuelajs.co/api/v1/categories', {
    next: { revalidate: 3600 }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }

  return res.json();
} 