# Marketplace Development Plan

## Instructions

- Record fixes for mistakes or corrections to avoid repetition in the Lessons section.
- Organize thoughts and plan steps before starting a task in the Scratchpad section.
- Use todo markers for progress tracking:
  - [ ] Pending tasks
  - [X] Completed tasks
- Update Scratchpad after completing subtasks.
- Reflect and plan after milestones for better task management.
- Always refer to Scratchpad before planning the next step.

## Lessons

1. In Next.js 15, both page components AND API route handlers with dynamic segments must handle params as a Promise. Example:
   ```typescript
   // For routes like /api/items/[id]/route.ts
   export async function GET(
     request: NextRequest,
     { params }: { params: Promise<{ id: string }> }
   ): Promise<NextResponse> {
     const { id } = await params;
     // Rest of your handler code
     return NextResponse.json({ /* your response */ });
   }
   ```
2. When importing `useRouter` from 'next/navigation', the component must be marked as a client component using the `'use client'` directive at the top of the file.
3. Ensure Tailwind CSS is correctly configured in `tailwind.config.ts` and `globals.css` for Next.js 15.
4. Leverage TypeScript for all components and utility functions to ensure type safety and improve maintainability.
5. Prioritize responsive design from the start, testing on various screen sizes.
6. Use semantic HTML elements for better accessibility and SEO.

## Scratchpad

### 1. Project Setup and Configuration [ ]

- [X] Create empty GitHub repo and clone it locally
- [X] Initialize new Next.js 15 project with TypeScript inside the repo
- [X] Set up project structure:
  ```
  src/
  ├── app/
  │   ├── page.tsx (Product listing)
  │   ├── product/[id]/
  │   │   └── page.tsx (Product detail)
  │   └── cart/
  │       └── page.tsx (Shopping cart)
  ├── components/
  │   ├── ui/
  │   │   ├── ProductCard.tsx
  │   │   ├── ProductGrid.tsx
  │   │   ├── ProductDetail.tsx
  │   │   ├── CartItem.tsx
  │   │   └── Navbar.tsx
  │   └── layout/
  │       └── Header.tsx
  ├── lib/
  │   ├── store/
  │   │   └── cartStore.ts (Zustand store)
  │   └── api/
  │       └── products.ts (API client using native fetch)
  └── types/
      └── index.ts (TypeScript interfaces)
  ```
- [X] Configure ESLint and Prettier
- [ ] Install and configure dependencies:
  - [X] Tailwind CSS for styling (already configured in Next.js 15)
  - [X] Zustand for state management
  - [X] React Icons for UI icons
  Note: We'll use Next.js native fetch API instead of Axios for better integration with Next.js caching and revalidation features.

### 2. Core Features Development [ ]

- [ ] Implement Product Listing Page:
  - [ ] Create ProductCard component:
    - [ ] Display product image (first image from images array)
    - [ ] Show product title
    - [ ] Show product price with proper formatting
    - [ ] Add "Add to Cart" button
  - [ ] Create ProductGrid component:
    - [ ] Responsive grid layout
    - [ ] Loading state
    - [ ] Error handling
  - [ ] Implement data fetching:
    - [ ] Create API client for Platzi Fake Store API:
      ```typescript
      // lib/api/products.ts
      interface Product {
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

      async function getProducts(offset = 0, limit = 10): Promise<Product[]> {
        const res = await fetch(
          `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`,
          { next: { revalidate: 3600 } }
        );
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      }
      ```
    - [ ] Implement pagination:
      - [ ] Add pagination controls
      - [ ] Handle offset and limit parameters
      - [ ] Add loading states for page transitions
    - [ ] Add search and filter functionality:
      - [ ] Search by title
      - [ ] Filter by category
      - [ ] Sort by price

- [ ] Implement Product Detail Page:
  - [ ] Create ProductDetail component:
    - [ ] Display product image gallery (all images from images array)
    - [ ] Show product title and description
    - [ ] Show product price with proper formatting
    - [ ] Show category information
    - [ ] Add quantity selector
    - [ ] Add "Add to Cart" button
  - [ ] Implement data fetching:
    - [ ] Fetch single product data by ID or slug
    - [ ] Handle loading state
    - [ ] Handle error state
  - [ ] Add related products section:
    - [ ] Fetch related products using `/products/<id>/related` endpoint
    - [ ] Display related products in a horizontal scrollable list

- [ ] Implement Shopping Cart Page:
  - [ ] Create CartItem component:
    - [ ] Display product image
    - [ ] Show product title
    - [ ] Show product price
    - [ ] Add quantity controls
    - [ ] Add remove button
  - [ ] Implement cart state management with Zustand:
    ```typescript
    // lib/store/cartStore.ts
    interface CartItem {
      id: number;
      title: string;
      price: number;
      quantity: number;
      image: string;
    }

    interface CartStore {
      items: CartItem[];
      addItem: (product: Product) => void;
      removeItem: (id: number) => void;
      updateQuantity: (id: number, quantity: number) => void;
      clearCart: () => void;
      total: number;
    }
    ```
  - [ ] Add persistence using localStorage
  - [ ] Add checkout button (disabled for MVP)

### 3. UI/UX Development [ ]

- [ ] Design and implement responsive layout:
  - [ ] Create Header component with navigation
  - [ ] Implement mobile menu
  - [ ] Add cart icon with item count
- [ ] Style components with Tailwind CSS:
  - [ ] Product cards
  - [ ] Product detail page
  - [ ] Cart items
  - [ ] Buttons and inputs
- [ ] Add loading states and animations:
  - [ ] Skeleton loaders
  - [ ] Loading spinners
  - [ ] Transition effects
- [ ] Implement error handling:
  - [ ] Error boundaries
  - [ ] Error messages
  - [ ] Fallback UI

### 4. State Management and Data Flow [ ]

- [ ] Set up Zustand store:
  - [ ] Define cart state interface
  - [ ] Implement cart actions:
    - [ ] Add item
    - [ ] Remove item
    - [ ] Update quantity
    - [ ] Clear cart
  - [ ] Add persistence (localStorage)
- [ ] Implement API integration:
  - [ ] Create API client
  - [ ] Add error handling
  - [ ] Implement caching
  - [ ] Add loading states

### 5. Performance and SEO Optimization [ ]

- [ ] Optimize images:
  - [ ] Use Next.js Image component
  - [ ] Implement lazy loading
  - [ ] Add proper alt texts
- [ ] Implement SEO:
  - [ ] Add metadata
  - [ ] Create sitemap
  - [ ] Add robots.txt
- [ ] Performance improvements:
  - [ ] Code splitting
  - [ ] Bundle optimization
  - [ ] Caching strategies

### 6. Testing and Quality Assurance [ ]

- [ ] Add unit tests:
  - [ ] Test components
  - [ ] Test store actions
  - [ ] Test API integration
- [ ] Add integration tests:
  - [ ] Test user flows
  - [ ] Test cart functionality
- [ ] Manual testing:
  - [ ] Cross-browser testing
  - [ ] Mobile responsiveness
  - [ ] User flows

### 7. Deployment [ ]

- [ ] Choose hosting platform (Vercel recommended)
- [ ] Set up CI/CD pipeline
- [ ] Configure environment variables
- [ ] Deploy application
- [ ] Monitor performance

### 8. Documentation [ ]

- [ ] Create README:
  - [ ] Project setup instructions
  - [ ] Development guidelines
  - [ ] API documentation
- [ ] Add code comments
- [ ] Document component usage


