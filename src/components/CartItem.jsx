import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  
  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };
  
  const handleIncrement = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };
  
  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      handleRemove();
    }
  };

  return (
    <div className="group flex items-center py-4 border-b border-gray-200 animate-fadeIn hover:bg-gray-50 transition-colors rounded-lg px-4">
      <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="ml-4 flex-grow">
        <Link 
          to={`/product/${item.id}`} 
          className="font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-1"
        >
          {item.title}
        </Link>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-1">
            <button 
              onClick={handleDecrement}
              className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition-all transform hover:scale-105"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            <button 
              onClick={handleIncrement}
              className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition-all transform hover:scale-105"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <div className="text-right">
            <div className="text-lg font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
            <div className="text-sm text-gray-500">${item.price.toFixed(2)} each</div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={handleRemove}
        className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-all transform hover:scale-110 hover:rotate-12"
        aria-label="Remove item"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default CartItem;