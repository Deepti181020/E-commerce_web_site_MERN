import React from 'react';
import arrow_icon from '../Asset/breadcrum_arrow.png';

const Breadcrum = (props) => {
    const { product } = props;

    return (
        <div className='breadcrum flex flex-wrap items-center gap-1 sm:gap-2 text-[12px] sm:text-[14px] md:text-[16px] font-semibold text-[#5e5e5e] my-[10px] sm:my-[15px] md:my-[25px] mx-[10px] sm:mx-[20px] md:mx-[40px] uppercase'>
            HOME <img src={arrow_icon} alt="" className='w-[8px] sm:w-[10px] md:w-[12px]' />
            SHOP <img src={arrow_icon} alt="" className='w-[8px] sm:w-[10px] md:w-[12px]' />
            {product && product.category && (
                <>
                    {product.category} <img src={arrow_icon} alt="" className='w-[8px] sm:w-[10px] md:w-[12px]' />
                </>
            )}
            {product && product.name && product.name}
        </div>
    );
};

export default Breadcrum;
