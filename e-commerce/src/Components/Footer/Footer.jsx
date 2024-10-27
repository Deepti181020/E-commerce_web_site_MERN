import React from 'react';
import './Footer.css';
import footer_logo from '../Asset/logo_big.png';
import instagram_icon from '../Asset/instagram_icon.png';
import pintester_icon from '../Asset/pintester_icon.png';
import whatsapp_icon from '../Asset/whatsapp_icon.png';

const Footer = () => {
  return (
    <div className='footer flex flex-col justify-center items-center gap-[50px] lg:gap-[50px] bg-slate-300 py-10 lg:py-16'>
      <div className="footer-logo flex items-center gap-[15px] sm:gap-[20px]">
        <img src={footer_logo} alt="" className="w-[50px] sm:w-[60px] lg:w-[80px]" />
        <p className='text-[#383838] text-[36px] sm:text-[40px] lg:text-[46px] font-bold'>SHOPAHOLIC</p>
      </div>
      <ul className='footer-links flex flex-wrap justify-center list-none gap-[30px] sm:gap-[40px] lg:gap-[50px] text-[#3f3d3d] text-[18px] sm:text-[20px]'>
        <li className='cursor-pointer'>Company</li>
        <li className='cursor-pointer'>Products</li>
        <li className='cursor-pointer'>Offices</li>
        <li className='cursor-pointer'>About</li>
        <li className='cursor-pointer'>Contact</li>
      </ul>
      <div className="footer-social-icon flex gap-[20px] sm:gap-[25px]">
        <div className='footer-icons-container p-[8px] sm:p-[10px] pb-[5px] sm:pb-[6px] bg-[#fbfbfb]'>
            <img src={instagram_icon} alt="" />
        </div>
        <div className='footer-icons-container p-[8px] sm:p-[10px] pb-[5px] sm:pb-[6px] bg-[#fbfbfb]'>
            <img src={pintester_icon} alt="" />
        </div>
        <div className='footer-icons-container p-[8px] sm:p-[10px] pb-[5px] sm:pb-[6px] bg-[#fbfbfb]'>
            <img src={whatsapp_icon} alt="" />
        </div>
      </div>
      <div className="footer-copyright flex flex-col items-center gap-[20px] sm:gap-[30px] w-[100%] text-[#1a1a1a] text-[16px] sm:text-[18px] lg:text-[20px]">
        <hr className='w-[70%] sm:w-[80%] h-[2px] sm:h-[3px] bg-[#b1b0b0]' />
        <p>Copyright 2024 - All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
