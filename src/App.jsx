import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy loaded components
const Home = lazy(() => import('./pages/Home'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const CartPage = lazy(() => import('./pages/CartPage'));
const Checkout = lazy(() => import('./pages/Checkout'));
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
              <p className="text-center">© 2025 ShoppyGlobe. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </Router>
    </Provider>
  );
}

export default App;