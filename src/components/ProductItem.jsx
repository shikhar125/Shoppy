import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart, Star } from 'lucide-react';
import { addToCart } from '../redux/slices/cartSlice';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const isInCart = cartItems.some(item => item.id === product.id);
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ 
      id: product.id, 
      title: product.title, 
      price: product.price, 
      image: product.thumbnail,
      quantity: 1
    }));
  };
  
  const discountPercentage = Math.round(product.discountPercentage || 0);
  
  return (
    <Link 
      to={`/product/${product.id}`} 
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
        />
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discountPercentage}%
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
      
      <div className="p-4">
        <div className="flex items-center space-x-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={14}
              className={`${i < Math.round(product.rating) 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300'}`} 
            />
          ))}
          <span className="text-xs text-gray-600 ml-1">({product.rating})</span>
        </div>
      
        <h3 className="font-medium text-gray-900 mb-1 truncate group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>
        
        <p className="text-sm text-gray-500 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-baseline space-x-2">
            <span className="text-lg font-semibold text-gray-900">${product.price}</span>
            {discountPercentage > 0 && (
              <span className="text-sm text-gray-500 line-through">
                ${Math.round(product.price / (1 - product.discountPercentage / 100))}
              </span>
            )}
          </div>
          
          <button 
            onClick={handleAddToCart}
            className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
              isInCart 
                ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
            }`}
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} className="transform transition-transform group-hover:rotate-12" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;