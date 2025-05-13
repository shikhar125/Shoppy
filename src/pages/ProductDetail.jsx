import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Star, ShoppingCart, ArrowLeft, Plus, Minus } from 'lucide-react';
import { addToCart } from '../redux/slices/cartSlice';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const cartItem = cartItems.find(item => item.id === parseInt(id));
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);
  
  const handleAddToCart = () => {
    dispatch(addToCart({
      id: parseInt(id),
      title: product.title,
      price: product.price,
      image: product.thumbnail,
      quantity
    }));
  };
  
  const handleQuantityChange = (newQuantity) => {
    setQuantity(Math.max(1, newQuantity));
  };
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-6 rounded-lg">
        <h2 className="font-semibold text-xl mb-2">Error loading product</h2>
        <p>{error}</p>
        <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="bg-yellow-50 text-yellow-700 p-6 rounded-lg text-center">
        <h2 className="font-semibold text-xl mb-2">Product not found</h2>
        <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }
  
  // Calculate discount percentage
  const discountPercentage = Math.round(product.discountPercentage || 0);
  const originalPrice = discountPercentage > 0 
    ? Math.round(product.price / (1 - product.discountPercentage / 100)) 
    : null;

  return (
    <div>
      <Link to="/" className="inline-flex items-center text-blue-600 hover:underline mb-6">
        <ArrowLeft size={18} className="mr-1" />
        Back to Products
      </Link>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Images */}
          <div>
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-square">
              <img 
                src={product.images[selectedImage]} 
                alt={product.title} 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((image, index) => (
                <button 
                  key={index}
                  className={`bg-gray-100 rounded overflow-hidden aspect-square ${
                    selectedImage === index ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.title} - view ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
              {product.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
            
            <div className="flex items-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={18}
                  className={`${i < Math.round(product.rating) 
                    ? 'text-yellow-400 fill-yellow-400' 
                    : 'text-gray-300'}`} 
                />
              ))}
              <span className="text-sm text-gray-600 ml-1">{product.rating} rating</span>
            </div>
            
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                {originalPrice && (
                  <span className="text-lg text-gray-500 line-through ml-2">
                    ${originalPrice.toFixed(2)}
                  </span>
                )}
                {discountPercentage > 0 && (
                  <span className="ml-2 bg-red-100 text-red-700 text-sm px-2 py-1 rounded">
                    Save {discountPercentage}%
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {product.stock > 0 
                  ? `In stock: ${product.stock} units` 
                  : 'Out of stock'}
              </p>
            </div>
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center">
                <button 
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="p-2 rounded-l-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                >
                  <Minus size={16} />
                </button>
                <input 
                  type="number" 
                  min="1"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="w-16 text-center border-y border-gray-200 py-2"
                />
                <button 
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="p-2 rounded-r-md bg-gray-100 text-gray-600 hover:bg-gray-200"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium ${
                cartItem 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              } transition-colors`}
            >
              <ShoppingCart size={20} className="mr-2" />
              {cartItem ? 'Update Cart' : 'Add to Cart'}
            </button>
            
            {/* Product Specs */}
            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-2">Specifications</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Brand</span>
                  <span className="font-medium">{product.brand}</span>
                </li>
                <li className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">{product.category}</span>
                </li>
                {Object.entries(product).filter(([key]) => 
                  !['id', 'title', 'description', 'price', 'discountPercentage', 
                    'rating', 'stock', 'brand', 'category', 'thumbnail', 'images'].includes(key)
                ).map(([key, value]) => (
                  <li key={key} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    <span className="font-medium">{value.toString()}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;