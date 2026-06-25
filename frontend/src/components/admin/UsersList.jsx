import React, { useState, useEffect } from 'react';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://boutique-project-eta.vercel.app/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to fetch users');
      
      setUsers(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://boutique-project-eta.vercel.app/api/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role: newRole })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to update role');

      // Update local state
      setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div style={{color: 'red'}}>{error}</div>;

  return (
    <div>
      <h2 style={{fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', marginBottom: '2rem'}}>Manage Users</h2>
      
      <div className="admin-table-wrap" style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
          <thead style={{ backgroundColor: '#FAF6F1', textAlign: 'left' }}>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Joined</th>
              <th style={thStyle}>Role</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={tdStyle}>{user.name}</td>
                <td style={tdStyle}>{user.email}</td>
                <td style={tdStyle}>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td style={tdStyle}>
                  <span style={{ 
                    padding: '4px 10px', 
                    borderRadius: '20px', 
                    fontSize: '0.75rem', 
                    backgroundColor: user.role === 'admin' ? '#e0f2fe' : '#f3f4f6',
                    color: user.role === 'admin' ? '#0369a1' : '#4b5563',
                    fontWeight: '500'
                  }}>
                    {user.role}
                  </span>
                </td>
                <td style={tdStyle}>
                  <select 
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ddd' }}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
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

export default UsersList;
