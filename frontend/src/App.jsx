import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import SignIn from './pages/SignIn';
import AddProduct from './pages/AddProduct';
import ProductDetail from './pages/ProductDetail';
import SignUp from './pages/SignUp';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';

  return (
    <>
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;
