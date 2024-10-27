import React from 'react';

const DescriptionBox = () => {
    return (
        <div className='description-box my-[40px] lg:my-[100px] mx-[20px] sm:mx-[40px] lg:mx-[100px]'>
            <div className='descriptionbox-navigator flex flex-col sm:flex-row gap-2'>
                <div className='descriptonbox-nav-box flex items-center justify-center text-[14px] sm:text-[16px] font-semibold w-full sm:w-[170px] h-[40px]
                border-[1px] border-solid border-[#d0d0d0] pl-[10px] sm:pl-[30px]'>
                    Description
                </div>
                <div className='descriptonbox-nav-box flex items-center justify-center text-[14px] sm:text-[16px] font-semibold w-full sm:w-[170px] h-[40px]
                border-[1px] border-solid border-[#d0d0d0] pl-[10px] sm:pl-[30px] bg-[#fbfbfb] text-[#555]'>
                    Review(122)
                </div>
            </div>

            <div className="descriptionbox-description flex flex-col gap-[20px] sm:gap-[25px] border-[1px] border-solid border-[#d0d0d0] p-[20px] sm:p-[48px] pb-[40px] sm:pb-[60px]">
                <p className='text-[14px] sm:text-[16px]'>
                    E-commerce, or electronic commerce, refers to the buying and selling of goods or services over the internet. It enables businesses and consumers to engage in transactions digitally, eliminating the need for physical storefronts. E-commerce platforms can range from large online marketplaces like Amazon and eBay to smaller, specialized shops that cater to niche markets. The convenience of online shopping, 24/7 availability, and a wide range of products are key drivers of its popularity.
                </p>
                <p className='text-[14px] sm:text-[16px]'>
                    An e-commerce website enables businesses to sell products or services online, providing a platform for users to browse, purchase, and make payments. It offers features such as product listings, search options, shopping carts, and secure payment gateways. Customers can select items, add them to a cart, and complete transactions using credit cards, digital wallets, or other payment methods. E-commerce websites also handle customer accounts, shipping information, and order tracking, ensuring a smooth shopping experience.
                </p>
            </div>
        </div>
    );
}

export default DescriptionBox;
