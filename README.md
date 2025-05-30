# Marketplace - Next.js Learning Project

A modern e-commerce marketplace built with Next.js 15, TypeScript, and Tailwind CSS. This project was developed as a learning exercise to explore modern web development technologies and best practices.

## 🌐 Live Demo

Check out the live demo: [Marketplace](https://marketplace-laurafma.vercel.app/)

## 🚀 Technologies Used

- **Next.js 15**: For server-side rendering and routing
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For utility-first styling
- **Zustand**: For state management
- **Platzi Fake Store API**: For product data

## ✨ Features

- **Product Listing**
  - Responsive grid layout
  - Search functionality
  - Category filtering
  - Price sorting
  - Loading states and error handling

- **Product Details**
  - Image gallery
  - Product information
  - Related products
  - Add to cart functionality

- **Shopping Cart**
  - Add/remove items
  - Update quantities
  - Persistent cart state
  - Cart summary

- **User Interface**
  - Responsive design
  - Modern and clean UI
  - Loading states and animations
  - Error handling

## 🛠️ Project Structure

```
src/
├── app/
│   ├── page.tsx (Product listing)
│   ├── product/[id]/
│   │   └── page.tsx (Product detail)
│   ├── cart/
│   │   └── page.tsx (Shopping cart)
│   └── profile/
│       └── page.tsx (User profile)
├── components/
│   ├── ui/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── CartItem.tsx
│   │   └── ProductFilters.tsx
│   └── layout/
│       └── Header.tsx
├── lib/
│   ├── store/
│   │   └── cartStore.ts (Zustand store)
│   └── api/
│       ├── products.ts
│       └── categories.ts
└── types/
    └── index.ts
```

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Learning Points

- Next.js 15 App Router implementation
- TypeScript integration and type safety
- Tailwind CSS for responsive design
- State management with Zustand
- API integration and data fetching
- Component composition and reusability
- Responsive design patterns
- Error handling and loading states

## 🎯 Future Improvements

- [ ] Add authentication
- [ ] Implement checkout process
- [ ] Add user reviews and ratings
- [ ] Implement wishlist functionality
- [ ] Add product search with filters
- [ ] Implement user orders history
- [ ] Add admin dashboard

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Platzi Fake Store API](https://fakeapi.platzi.com/) for providing the product data
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Zustand](https://github.com/pmndrs/zustand) for state management
