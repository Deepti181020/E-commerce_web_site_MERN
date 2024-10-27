import React from 'react';
import data_product from '../Asset/data';
import Item from '../Items/Item';

const RelatedProducts = () => {
    return (
        <div className='relatedproducts flex flex-col items-center gap-2 h-auto lg:h-[90vh] px-4'>
            <h1 className='text-[#171717] text-[28px] sm:text-[40px] lg:text-[50px] font-semibold text-center'>
                Related Products
            </h1>
            <hr className='w-[100px] sm:w-[150px] lg:w-[200px] h-[4px] sm:h-[5px] lg:h-[6px] rounded-[10px] bg-[#252525]' />
            
            <div className="relatedproducts-items mt-[20px] flex flex-wrap gap-4 sm:gap-6 lg:gap-7 justify-center">
                {data_product.map((item, index) => {
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
        </div>
    );
};

export default RelatedProducts;
