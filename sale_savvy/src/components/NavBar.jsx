import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/NavBar.css';

const NavBar = ({ cartCount }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={() => navigate('/')}>
        <div className="navbar-brand">SaleSavvy</div>
      </div>

      {/* Search Bar Section */}
      <div className="navbar-center">
        <div className="search-bar">
          <select className="category-dropdown">
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="books">Books</option>
            <option value="home">Home</option>
          </select>
          <input type="text" placeholder="Search products..." className="search-input" />
          <button className="search-button">Search</button>
        </div>
      </div>

      {/* Links & Cart Section */}
      <div className="navbar-right">
        <Link to="/account" className="nav-link">Account</Link>
        <Link to="/orders" className="nav-link">Orders</Link>
        <div className="cart-icon" onClick={() => navigate('/cart')}>
          🛒
          <span className="cart-badge">{cartCount || 0}</span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
