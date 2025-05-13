import React, { useState } from 'react';
import { Grid, List } from 'lucide-react';
import ProductItem from './ProductItem';
import LoadingSpinner from './LoadingSpinner';
import useProducts from '../hooks/useProducts';

const ProductList = ({ searchQuery = '', category = '' }) => {
  const [viewMode, setViewMode] = useState('grid');
  const { products, loading, error } = useProducts();
  
  // Filter products based on search query and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery 
      ? product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
      
    const matchesCategory = category
      ? product.category.toLowerCase() === category.toLowerCase()
      : true;
      
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        <h2 className="font-semibold mb-2">Error loading products</h2>
        <p>{error}</p>
      </div>
    );
  }
  
  if (filteredProducts.length === 0) {
    return (
      <div className="bg-yellow-50 text-yellow-700 p-6 rounded-lg text-center">
        <h2 className="font-semibold text-xl mb-2">No products found</h2>
        <p>Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          {category 
            ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` 
            : 'All Products'}
        </h2>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
            aria-label="Grid view"
          >
            <Grid size={20} />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
            aria-label="List view"
          >
            <List size={20} />
          </button>
        </div>
      </div>
      
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm p-4 flex">
              <div className="w-24 h-24 flex-shrink-0">
                <img 
                  src={product.thumbnail} 
                  alt={product.title} 
                  className="w-full h-full object-cover object-center rounded"
                />
              </div>
              <div className="ml-4 flex-grow">
                <h3 className="font-medium text-gray-900">{product.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-semibold text-gray-900">${product.price}</span>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Add to cart logic
                    }}
                    className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                    aria-label="Add to cart"
                  >
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;