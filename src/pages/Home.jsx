import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductList from '../components/ProductList';

const Home = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';

  return (
    <div>
      {!searchQuery && !category && (
        <section className="mb-12">
          <div className="bg-blue-600 text-white rounded-xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600 to-transparent"></div>
            <div className="relative z-10 max-w-xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to ShoppyGlobe</h1>
              <p className="text-blue-100 mb-6">
                Discover amazing products at incredible prices. Shop with confidence and enjoy a seamless shopping experience.
              </p>
              <a href="#products" className="inline-block px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
                Shop Now
              </a>
            </div>
          </div>
        </section>
      )}
      
      <section id="products">
        <ProductList searchQuery={searchQuery} category={category} />
      </section>
    </div>
  );
};

export default Home;