import React, { useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import UsersList from '../components/admin/UsersList';
import ManageProducts from '../components/admin/ManageProducts';
import AddProduct from './AddProduct';

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/signin');
      return;
    }
    const user = JSON.parse(userStr);
    if (user.role !== 'admin') {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2 style={{ fontSize: '1.2rem', marginBottom: '2rem', paddingLeft: '1rem', color: 'var(--secondary)' }}>
          Admin Panel
        </h2>

        <Link to="/admin" style={linkStyle(location.pathname === '/admin')}>
          Manage Users
        </Link>
        <Link to="/admin/add-product" style={linkStyle(location.pathname === '/admin/add-product')}>
          Add Product
        </Link>
        <Link to="/admin/products" style={linkStyle(location.pathname === '/admin/products')}>
          Manage Products
        </Link>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        <Routes>
          <Route path="/" element={<UsersList />} />
          <Route path="/add-product" element={<AddProduct isAdminEmbedded={true} />} />
          <Route path="/products" element={<ManageProducts />} />
        </Routes>
      </main>
    </div>
  );
};

const linkStyle = (isActive) => ({
  padding: '1rem',
  textDecoration: 'none',
  color: isActive ? 'var(--primary-dark)' : 'var(--text-muted)',
  backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
  fontWeight: isActive ? '500' : '400',
  borderRadius: '8px',
  transition: 'var(--transition-smooth)',
  fontFamily: "'Montserrat', sans-serif",
  textTransform: 'uppercase',
  fontSize: '0.8rem',
  letterSpacing: '1px'
});

export default AdminDashboard;
