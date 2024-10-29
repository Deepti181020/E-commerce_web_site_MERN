import React, { useEffect, useState } from 'react';
import Item from '../Items/Item';

const Popular = () => {
  const [popular_Women, setPopular_Women] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://localhost:4000/popular-women")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setPopular_Women(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching popular women products.</div>;

  return (
    <div className='popular flex flex-col items-center gap-4 p-4 md:p-8 lg:p-12'>
      <h1 className='text-[#171717] text-2xl md:text-4xl lg:text-5xl font-semibold text-center'>POPULAR IN WOMEN</h1>
      <hr className='w-1/2 md:w-1/3 lg:w-1/4 h-1 rounded bg-[#252525]' />
      <div className="popular-item grid grid-cols-2 gap-4 mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
        {popular_Women.map((item, index) => (
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
}

export default Popular;
