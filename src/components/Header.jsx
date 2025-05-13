import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingCart, Menu, X, Search, ShoppingBag } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const cartItems = useSelector(state => state.cart.items);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    setIsMenuOpen(false);
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-md'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">ShoppyGlobe</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
         
            <Link to="/?category=furniture" className="text-gray-700 hover:text-blue-600 transition-colors">Home & Garden</Link>
          </nav>
          
          {/* Search Form - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 flex-grow max-w-md mx-4">
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent border-none outline-none flex-grow"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="text-gray-500 hover:text-blue-600">
              <Search className="h-5 w-5" />
            </button>
          </form>
          
          {/* Cart & Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-blue-600 transition-colors" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button className="md:hidden text-gray-700" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-full px-4 py-2 mb-4">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent border-none outline-none flex-grow"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="text-gray-500 hover:text-blue-600">
                <Search className="h-5 w-5" />
              </button>
            </form>
            <nav className="flex flex-col space-y-4 pb-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/?category=furniture" className="text-gray-700 hover:text-blue-600 transition-colors">Home & Garden</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;