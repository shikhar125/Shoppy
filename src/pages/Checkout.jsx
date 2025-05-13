import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowLeft, CreditCard, Truck, CheckCircle } from 'lucide-react';

const Checkout = () => {
  const { items } = useSelector(state => state.cart);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  // Calculate cart totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = items.length > 0 ? 10 : 0;
  const total = subtotal + shipping;
  
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // In a real app, this would submit to a backend
    setOrderPlaced(true);
  };
  
  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">You need to add items to your cart before checking out.</p>
        <Link 
          to="/" 
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }
  
  if (orderPlaced) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 text-green-600 rounded-full mb-6">
          <CheckCircle size={48} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-8">Thank you for your order. Your order number is #{Math.floor(Math.random() * 10000)}.</p>
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
      <Link to="/cart" className="inline-flex items-center text-blue-600 hover:underline mb-6">
        <ArrowLeft size={18} className="mr-1" />
        Back to Cart
      </Link>
      
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handlePlaceOrder}>
            {/* Shipping Address */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Truck size={24} className="text-blue-600 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Shipping Address
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input 
                      type="text" 
                      required
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input 
                      type="text" 
                      required
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input 
                      type="text" 
                      required
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input 
                      type="text" 
                      required
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Zip Code
                    </label>
                    <input 
                      type="text" 
                      required
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input 
                      type="email" 
                      required
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment Details */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <CreditCard size={24} className="text-blue-600 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Payment Details
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="1234 5678 9012 3456"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiration Date
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="MM/YY"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVC
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="123"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name on Card
                    </label>
                    <input 
                      type="text" 
                      required
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Place Order
            </button>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-24">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                      <p className="text-xs text-gray-500">${item.price} × {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 border-t border-gray-200 pt-4">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;