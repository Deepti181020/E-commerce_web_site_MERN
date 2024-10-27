import React from 'react';
import './Offers.css';
import exclusive_image from '../Asset/exclusive_image.png';

const Offers = () => {
  return (
    <div className="offers w-[90%] lg:w-[80%] h-auto lg:h-[75vh] flex flex-col lg:flex-row m-auto py-6 sm:py-8 lg:py-0 px-4 sm:px-6 lg:px-[140px] mb-[100px]">
      <div className="offers-left flex-1 flex flex-col justify-center text-center lg:text-left">
        <h1 className="text-[#171717] text-[24px] sm:text-[30px] lg:text-[70px] font-semibold leading-tight lg:leading-normal">
          Exclusive Offers
        </h1>
        <h1 className="text-[#171717] text-[24px] sm:text-[30px] lg:text-[70px] font-semibold leading-tight lg:leading-normal">
          Only For You
        </h1>
        <p className="text-[#171717] text-[16px] sm:text-[18px] lg:text-[22px] font-semibold mt-2 sm:mt-4">
          ONLY ON BEST SELLERS PRODUCTS
        </p>
        <div className="flex justify-center lg:justify-start">
          <button className="w-[180px] sm:w-[220px] lg:w-[280px] h-[50px] sm:h-[60px] lg:h-[70px] bg-black text-white rounded-full border-none mt-4 sm:mt-6 lg:mt-[30px] text-[16px] sm:text-[18px] lg:text-[22px] font-medium cursor-pointer">
            Check Now
          </button>
        </div>
      </div>
      <div className="offers-right flex-1 flex justify-center lg:justify-end items-center pt-4 sm:pt-6 lg:pt-[30px] pb-4 lg:pb-[20px]">
        <img
          src={exclusive_image}
          alt="Exclusive Offers"
          className="max-w-[90%] sm:max-w-[100%] lg:max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default Offers;
