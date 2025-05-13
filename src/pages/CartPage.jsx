import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import CartItem from '../components/CartItem';

const CartPage = () => {
  const { items } = useSelector(state => state.cart);
  
  // Calculate cart totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = items.length > 0 ? 10 : 0;
  const total = subtotal + shipping;
  
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 text-blue-600 rounded-full mb-6">
          <ShoppingBag size={48} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
        <Link 
          to="/" 
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Cart Items ({items.length})
              </h2>
              
              <div>
                {items.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-24">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                  <span className="text-gray-900 font-semibold">Total</span>
                  <span className="text-xl font-bold text-gray-900">${total.toFixed(2)}</span>
                </div>
              </div>
              
              <Link 
                to="/checkout" 
                className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Proceed to Checkout
                <ArrowRight size={18} className="ml-2" />
              </Link>
              
              <Link 
                to="/" 
                className="mt-4 w-full flex items-center justify-center px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;