import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Asset/dropdown_icon.png';
import Item from '../Components/Items/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [loading, setLoading] = useState(false);
  const [productsToDisplay, setProductsToDisplay] = useState(12); // Initially display 12 products

  // Load more products by incrementing the number of products to display
  const loadMoreProducts = () => {
    setLoading(true);
    setTimeout(() => {
      // Increase the number of products to display
      setProductsToDisplay((prev) => Math.min(prev + 12, filterProducts.length)); // Avoid loading more than available
      setLoading(false);
    }, 1000);
  };

  // Filter products based on the category prop
  const filterProducts = all_product.filter((item) => item.category === props.category);

  return (
    <div className='shop-category'>
      <img 
        src={props.banner} 
        alt="Error"  
        className='shopcategory-banner block my-8 mx-auto w-11/12 sm:w-10/12 md:w-4/5 lg:w-3/4'
      />
      <div className="shopcategory-indexSort flex flex-col md:flex-row my-4 mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-20 justify-between items-center">
        <p className='mb-4 md:mb-0 text-center md:text-left'>
          <span className='font-semibold'>Showing 1-{Math.min(productsToDisplay, filterProducts.length)}</span> out of {filterProducts.length} products
        </p>
        <div className="shopCategory-sort flex justify-between items-center py-2 px-4 rounded-full border border-gray-500">
          Sort by <img src={dropdown_icon} alt="Sort Icon" className='ml-2'/>
        </div>
      </div>
      <div className="shopcategory-products grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 my-6 mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12">
        {filterProducts.slice(0, productsToDisplay).map((item, index) => {
          return (
            <Item  
              key={index}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>

      {/* Loading indicator */}
      {loading && <div className="text-center text-lg font-medium my-4">Loading...</div>}
      
      {/* Explore More button - hide it when all products are displayed */}
      {productsToDisplay < filterProducts.length ? (
        <div
          className="shopcategory-loadmore flex justify-center items-center my-16 mx-auto w-3/4 sm:w-1/2 lg:w-1/3 xl:w-1/4 h-16 rounded-full bg-gray-300 text-lg font-medium cursor-pointer"
          onClick={loadMoreProducts}>
          Explore More
        </div>
      ):(<div className="text-center text-lg font-medium my-4 text-gray-500">
        No more products to display
      </div>)}
    </div>
  );
}

export default ShopCategory;
