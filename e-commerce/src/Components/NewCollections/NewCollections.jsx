import React, { useEffect, useState } from 'react';
import './NewCollections.css';
import Item from '../Items/Item';

const NewCollections = () => {
  const [new_collections, setNew_Collections] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/newcollections`)
      .then((response) => response.json())
      .then((data) => setNew_Collections(data));
  }, []);

  return (
    <div id ="new-collections" className='new-collections flex flex-col items-center gap-[10px] min-h-[90vh]'>
      <h1 className='text-[#171717] text-[30px] md:text-[50px] font-semibold'>NEW COLLECTIONS</h1>
      <hr className='w-3/4 md:w-1/3 lg:w-1/4 h-[6px] rounded-[8px] bg-[#252525]'/>
      <div className="collections grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 mt-[30px] w-full px-4">
        {new_collections.map((item, index) => (
          <Item
            key={index}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default NewCollections;
