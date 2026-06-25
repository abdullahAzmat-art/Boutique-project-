import React, { useState } from 'react';
import { UploadCloud, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const AddProduct = ({ isAdminEmbedded = false }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [category, setCategory] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [image, setImage] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!title || !description || !price || !category || !image || !whatsappNumber) {
        throw new Error('Please fill in all required fields and select an image.');
      }

      // Generate unique file path
      const fileExt = image.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      // Upload image to Supabase bucket
      const { error: uploadError } = await supabase.storage
        .from('Boutique-Product')
        .upload(filePath, image);

      if (uploadError) {
        throw new Error(`Failed to upload image: ${uploadError.message}`);
      }

      // Get public URL
      const { data } = supabase.storage
        .from('Boutique-Product')
        .getPublicUrl(filePath);

      const publicUrl = data.publicUrl;

      const payload = {
        title,
        description,
        price: Number(price),
        category,
        discountPrice: discountPrice ? Number(discountPrice) : undefined,
        picture: {
          url: publicUrl,
          bucket: 'Boutique-Product'
        },
        whatsappNumber
      };

      const token = localStorage.getItem('token');
      const response = await fetch('https://boutique-project-eta.vercel.app/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to add product');
      }

      setSuccess('Product added successfully!');
      // Reset form
      setTitle('');
      setDescription('');
      setPrice('');
      setDiscountPrice('');
      setCategory('');
      setWhatsappNumber('');
      setImage(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-page fade-in" style={{ 
      paddingTop: isAdminEmbedded ? '0' : '100px', 
      paddingBottom: '50px', 
      minHeight: '100vh',
      backgroundColor: 'var(--bg-cream)' 
    }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div className="add-product-card">
          {/* Decorative element */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '6px',
            background: 'linear-gradient(90deg, var(--primary), var(--accent))'
          }}></div>

          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ 
              fontSize: '0.8rem', 
              textTransform: 'uppercase', 
              letterSpacing: '3px', 
              color: 'var(--primary)',
              marginBottom: '1rem',
              fontWeight: '600'
            }}>Admin Portal</p>
            <h1 className="font-serif" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', color: 'var(--secondary)' }}>
              Add New Product
            </h1>
          </div>

          {error && (
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#FFF1F2', 
              color: '#BE123C', 
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem',
              border: '1px solid #FECDD3'
            }}>
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {success && (
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#F0FDF4', 
              color: '#15803D', 
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem',
              border: '1px solid #BBF7D0'
            }}>
              <CheckCircle size={18} />
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Product Title *</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Silk Evening Dress"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-grid-2">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Price (Rs.) *</label>
                <input 
                  type="number" 
                  step="0.01"
                  className="form-input" 
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Discount Price (Rs.)</label>
                <input 
                  type="number" 
                  step="0.01"
                  className="form-input" 
                  placeholder="Optional"
                  value={discountPrice}
                  onChange={(e) => setDiscountPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Category *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Formal Wear"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">WhatsApp Number *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. 1234567890"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Description *</label>
              <textarea 
                className="form-input" 
                placeholder="Describe the material, fit, and style..."
                rows="4"
                style={{ resize: 'vertical', fontFamily: 'inherit' }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Product Image *</label>
              <div style={{
                border: '2px dashed #E8E0D8',
                padding: '2.5rem',
                textAlign: 'center',
                backgroundColor: '#FAFAF9',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem'
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = '#E8E0D8'}
              onClick={() => document.getElementById('imageUpload').click()}
              >
                <input 
                  type="file" 
                  id="imageUpload"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
                <UploadCloud size={32} color="var(--primary)" />
                <div>
                  <span style={{ color: 'var(--primary)', fontWeight: '600' }}>Click to upload</span>
                  <span style={{ color: 'var(--text-muted)' }}> or drag and drop</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>PNG, JPG, WEBP up to 5MB</p>
                {image && (
                  <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--secondary)', fontWeight: '500' }}>
                    Selected: {image.name}
                  </div>
                )}
              </div>
            </div>

            <button 
              type="submit" 
              className="btn-primary" 
              style={{ width: '100%', marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              disabled={loading}
            >
              {loading ? (
                <span style={{ opacity: 0.8 }}>Uploading & Saving...</span>
              ) : (
                'Publish Product'
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
