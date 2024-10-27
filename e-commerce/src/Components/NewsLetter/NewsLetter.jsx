import React from 'react';
import './NewsLetter.css';
const NewsLetter = () => {
  return (
    <div className='newsletter w-full md:w-[75%] h-auto md:h-[55vh] flex flex-col items-center justify-center mt-20 m-auto px-[20px] sm:px-[40px] md:px-[140px] py-[20px] md:py-0 mb-[50px] md:mb-[150px] gap-[20px]'>
      <h1 className='text-[#262121] text-[28px] sm:text-[40px] md:text-[60px] font-semibold text-center'>
        Get Exclusive Offers
      </h1>
      <h1 className='text-[#262121] text-[28px] sm:text-[40px] md:text-[60px] font-semibold text-center'>
        On Your Mail
      </h1>
      <p className='text-[#262121] text-[16px] sm:text-[18px] md:text-[22px] text-center'>
        Subscribe to our newsletter and stay updated
      </p>
      <div className='flex flex-col sm:flex-row items-center justify-between bg-white w-full sm:w-[500px] md:w-[730px] h-[50px] sm:h-[60px] md:h-[70px] rounded-[50px] pl-2'>
        <input
          type="email"
          className='w-full sm:w-[300px] md:w-[500px] rounded-none outline-none text-[14px] sm:text-[16px] p-2'
          placeholder='Enter your mail'
        />
        <button className='w-full sm:w-[150px] md:w-[200px] h-[50px] sm:h-[60px] md:h-[70px] rounded-[50px] bg-black text-white text-[14px] sm:text-[16px] mt-2 sm:mt-0 mx-auto '>
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;
