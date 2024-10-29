import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchData = async () => {
    await fetch('https://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // For removing products
  const remove_product = async (id) => {
    await fetch('https://localhost:4000/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchData();  
  };

  return (
    <div className='flex flex-col items-center w-full h-auto py-4 px-5 my-2 rounded-md bg-white'>
      <h1 className='text-2xl font-semibold mb-4'>All Products List</h1>
      <div className='w-full overflow-x-auto'>
        <div className='grid grid-cols-6 gap-2 py-5 px-2 text-gray-700 text-xs sm:text-sm md:text-base font-semibold'>
          <p>Products</p>
          <p>Title</p>
          <p>Old Price</p>
          <p>New Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
        <hr className='mb-2' />
        {allproducts.map((product) => (
          <div
            key={product.id} // Use product.id as the key
            className='grid grid-cols-6 gap-2 py-3 px-2 text-gray-700 text-xs sm:text-sm md:text-base font-semibold'
          >
            <img src={product.image} alt='Error' className='w-10 h-10 object-cover' />
            <p className='truncate'>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p className='truncate'>{product.category}</p>
            <img 
              onClick={() => { remove_product(product.id) }} 
              src={cross_icon} 
              alt='Remove' 
              className='cursor-pointer ml-2' 
            />
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;