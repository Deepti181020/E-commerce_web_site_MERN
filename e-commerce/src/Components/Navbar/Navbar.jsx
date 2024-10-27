import React, { useContext, useState } from 'react';
import './Navbar.css';
import logo from '../Asset/logo.png';
import cart_icon from '../Asset/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import search_icon from "../Asset/search_icon.png";

const Navbar = () => {
  const [menu, setMenu] = useState('home');
  const { getTotalCartItems, all_product } = useContext(ShopContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const results = all_product.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category?.toLowerCase() === searchQuery.toLowerCase()
    );
    setSearchResults(results);
    setIsMenuOpen(false); // Close the menu on mobile if open
  };

  const handleSearchReset = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div className="navbar flex justify-between items-center p-4 lg:px-8 xl:px-12 relative">
      {/* Burger Icon for Mobile */}
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
          </svg>
        </button>
      </div>

      {/* Logo Section */}
      <div className="nav-logo flex items-center gap-2 sm:gap-3">
        <img src={logo} alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
        <p className='text-lg sm:text-xl md:text-2xl xl:text-[30px] font-semibold text-[#141313]'>
          SHOPAHOLIC
        </p>
      </div>

      {/* Menu Links and Search */}
      <ul className={`nav-menu ${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center gap-4 sm:gap-6 lg:gap-8 xl:gap-10 text-[#323131] text-base sm:text-lg lg:text-xl xl:text-2xl font-medium absolute md:static top-16 md:top-auto left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 transition-transform duration-300 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        {/* Menu Links */}
        {['home', 'men', 'women', 'kids'].map((item) => (
          <li key={item} onClick={() => setMenu(item)} className='cursor-pointer'>
            <Link to={item === 'home' ? '/' : `/${item}`}>{item.charAt(0).toUpperCase() + item.slice(1)}</Link>
            {menu === item && <hr className='w-[70%] h-[3px] md:w-[80%] md:h-[5px] bg-[#131313] rounded' />}
          </li>
        ))}

        {/* Search Section */}
        <div className="search-bar flex items-center border border-gray-400 rounded-full px-3 py-1 lg:ml-4 relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="outline-none text-sm lg:text-base"
          />
          {searchQuery ? (
            <button onClick={handleSearchReset} className="ml-2 text-gray-600">
              <span className="text-sm lg:text-base">&times;</span>
            </button>
          ) : (
            <button onClick={handleSearch} className="ml-2">
              <img
                src={search_icon}
                alt="Search"
                className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
              />
            </button>
          )}
          
          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="search-results absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg p-2 shadow-lg z-10">
              {searchResults.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id} className="block p-2 hover:bg-gray-100" onClick={handleSearchReset}>
                  {product.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </ul>

      {/* Login and Cart Section */}
      <div className="nav-login-cart flex items-center gap-4 sm:gap-8 lg:gap-12">
        {localStorage.getItem('auth-token') ? (
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to logout?')) {
                localStorage.removeItem('auth-token');
                window.location.replace('/');
              }
            }}
            className="w-[80px] sm:w-[100px] md:w-[120px] lg:w-[150px] h-[35px] sm:h-[40px] md:h-[45px] lg:h-[50px] rounded-full bg-white border border-gray-400 text-sm sm:text-base md:text-lg lg:text-xl text-[#323131]"
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="w-[80px] sm:w-[100px] md:w-[120px] lg:w-[150px] h-[35px] sm:h-[40px] md:h-[45px] lg:h-[50px] rounded-full bg-white border border-gray-400 text-sm sm:text-base md:text-lg lg:text-xl text-[#323131]">
              Login
            </button>
          </Link>
        )}
        <div className="relative">
          <Link to='/cart'>
            <img src={cart_icon} alt="cart" className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
          </Link>
          <div className="nav-cart-count absolute top-[-10px] right-[-10px] w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full bg-red-600 text-white text-xs md:text-sm">
            {getTotalCartItems()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
