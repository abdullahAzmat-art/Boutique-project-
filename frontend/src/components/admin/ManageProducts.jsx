import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://boutique-project-eta.vercel.app/api/products');
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to fetch products');
      
      setProducts(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://boutique-project-eta.vercel.app/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to delete product');

      // Update local state
      setProducts(products.filter(p => p._id !== productId));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div style={{color: 'red'}}>{error}</div>;

  return (
    <div>
      <h2 style={{fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', marginBottom: '2rem'}}>Manage Products</h2>
      
      <div className="admin-table-wrap" style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
          <thead style={{ backgroundColor: '#FAF6F1', textAlign: 'left' }}>
            <tr>
              <th style={thStyle}>Product</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => {
              const name = product.title || product.name;
              const image = product.picture?.url || product.image_url;
              return (
                <tr key={product._id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      {image && (
                        <img 
                          src={image} 
                          alt={name} 
                          style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                        />
                      )}
                      <span>{name}</span>
                    </div>
                  </td>
                  <td style={tdStyle}>{product.category}</td>
                  <td style={tdStyle}>Rs. {product.price}</td>
                  <td style={tdStyle}>
                    <button 
                      onClick={() => handleDelete(product._id)}
                      style={{ color: '#ef4444', padding: '6px', borderRadius: '4px', backgroundColor: '#fee2e2' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const thStyle = {
  padding: '1rem',
  fontFamily: "'Montserrat', sans-serif",
  fontSize: '0.8rem',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
  letterSpacing: '1px'
};

const tdStyle = {
  padding: '1rem',
  fontFamily: "'Montserrat', sans-serif",
  fontSize: '0.9rem'
};

export default ManageProducts;
