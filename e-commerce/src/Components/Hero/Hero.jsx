import React from 'react';
import hand_icon from '../Asset/hand_icon.png';
import arrow_icon from '../Asset/arrow.png';
import hero_img from '../Asset/hero_image.png';

const Hero = () => {

  const scrollToCollections =() =>{
    document.getElementById('new-collections').scrollIntoView({ behavior: 'smooth' });

  }
  return (
    <div className="hero bg-gradient-to-b from-[#eaebef] via-[#f4ebe7] to-[#b0a8a6] flex flex-row sm:flex-row items-center justify-center p-4 lg:p-0">
      <div className="hero-left flex-1 flex flex-col items-center sm:items-start text-center sm:text-left gap-2 sm:gap-2 sm:pl-4 lg:pl-[180px]">
        <h2 className="text-[16px] sm:text-[18px] lg:text-[26px] font-semibold text-[#151313]">NEW ARRIVALS ONLY</h2>
        <div className="flex items-center gap-3 sm:gap-4">
          <p className="text-[30px] sm:text-[40px] lg:text-[80px] font-bold text-black">new</p>
          <img src={hand_icon} alt="Hand Icon" className="w-[40px] sm:w-[50px] lg:w-[100px]" />
        </div>
        <p className="text-[30px] sm:text-[40px] lg:text-[80px] font-bold text-black">collections</p>
        <p className="text-[30px] sm:text-[40px] lg:text-[80px] font-bold text-black">for everyone</p>
        <div onClick={scrollToCollections} className="hero-latest-btn flex items-center justify-center sm:justify-center gap-3 w-[180px] sm:w-[250px] lg:w-[310px] h-[45px] sm:h-[60px] lg:h-[70px] rounded-full bg-[#1d1d30] text-white mt-4 sm:mt-5 lg:mt-6 font-medium text-[16px] sm:text-[20px] lg:text-[22px] cursor-pointer">
          <div>latest Collections</div>
          <img src={arrow_icon} alt="Arrow Icon" className="w-4 sm:w-5" />
        </div>
      </div>
      <div className="hero-right flex-1 flex items-center justify-center mt-4 sm:mt-0">
        <img src={hero_img} alt="Hero Image" className="w-[200px] sm:w-[300px] lg:w-[500px] mt-4 sm:mt-0 lg:mt-10" />
      </div>
    </div>
  );
};

export default Hero;
