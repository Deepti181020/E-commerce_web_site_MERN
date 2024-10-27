import React from 'react';
import { Link } from 'react-router-dom';

const Item = (props) => {
  return (
    <div className='item w-full sm:w-[150px] md:w-[200px] lg:w-[250px] xl:w-[300px]'>
      <Link to={`/product/${props.id}`}>
        <img 
          src={props.image} 
          alt="" 
          className='w-full h-auto object-cover'
          onClick={() => window.scrollTo(0, 0)}
        />
      </Link>
      <p className='my-1.5 mx-0 text-sm sm:text-base break-words overflow-hidden'>{props.name}</p>
      <div className="item-prices flex gap-3 text-xs sm:text-sm md:text-base">
        <div className="item-price-new text-[#374151] font-semibold">
          ${props.new_price}
        </div>
        <div className="item-price-old text-[#8c8c8c] font-medium line-through">
          ${props.old_price}
        </div>
      </div>
    </div>
  );
}

export default Item;
