import React from 'react';
import { Link } from 'react-router-dom';
import add_product_icon from '../../assets/Product_Cart.svg';
import list_product_icon from '../../assets/Product_list_icon.svg';

const Sidebar = () => {
  return (
    <div className='sidebar flex lg:flex-col lg:items-center lg:justify-start lg:pt-8 md:flex-row sm:flex-row items-center md:justify-center sm:justify-center w-full lg:w-[250px] lg:h-[100vh] sm:h-auto md:h-auto gap-5 bg-white mt-1'>
      <Link to={'/addproduct'} style={{ textDecoration: 'none' }}>
        <div className='sidebar-item flex items-center justify-center py-2 px-3 rounded-md bg-gray-200 gap-3 cursor-pointer hover:bg-gray-500 w-auto'>
          <img src={add_product_icon} alt="Add Product Icon" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to={'/listproduct'} style={{ textDecoration: 'none' }}>
        <div className='sidebar-item flex items-center justify-center py-2 px-3 rounded-md bg-gray-200 gap-3 cursor-pointer hover:bg-gray-500 w-auto'>
          <img src={list_product_icon} alt="Product List Icon" />
          <p>Product List</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
