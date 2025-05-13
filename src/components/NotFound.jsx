import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="mb-8 text-blue-600">
        <ShoppingBag size={80} />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
      <p className="text-gray-600 max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved.
        Let's get you back to shopping!
      </p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;