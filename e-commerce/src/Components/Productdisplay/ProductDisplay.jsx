import React, { useContext, useState } from 'react';
import star_icon from '../Asset/star_icon.png';
import star_dull_icon from "../Asset/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    const [cartQuantity,setCartQuantity] = useState ("");

    const successMessage = (message) =>{
        setCartQuantity(message);
        setTimeout(()=>{
            setCartQuantity(" ");
        },2000);
    }

    const cartHandler = (itemId)=>{
        addToCart(itemId);
        successMessage("Product is added successfully!");
    }

    if (!product) {
        return <div>Loading...</div>; // Display a loading state if the product data is not available yet
    }

    return (
        <div className='productdisplay flex flex-col lg:flex-row mt-0 mb-1 mx-4 lg:mx-[100px]'>
            {/* Left side: Image list and main image */}
            {cartQuantity && <div className="cartQuantity bg-[#f9f9f9] text-black p-3 rounded border border-[#ffffff] mb-4 opacity-100">{cartQuantity}</div>}
            <div className="product-display-left flex gap-4 lg:gap-5">
                {/* Thumbnail images */}
                <div className="productdisplay-img-list flex flex-col gap-3 lg:gap-5">
                    <img src={product.image} alt="" className='h-[70px] lg:h-[100px]' />
                    <img src={product.image} alt="" className='h-[70px] lg:h-[100px]' />
                    <img src={product.image} alt="" className='h-[70px] lg:h-[100px]' />
                    <img src={product.image} alt="" className='h-[70px] lg:h-[100px]' />
                </div>
                {/* Main product image */}
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img w-[350px] lg:w-[586px] h-[250px] lg:h-[450px] my-3' src={product.image} alt="" />
                </div>
            </div>

            {/* Right side: Product details */}
            <div className="product-display-right flex flex-col my-0 lg:mx-[40px]">
                <h1 className='text-[#3d3d3d] text-[24px] lg:text-[40px] font-bold'>{product.name}</h1>
                {/* Star ratings */}
                <div className="productdisplay-right-star flex mt-[13px] items-center gap-1 text-[#1c1c1c] text-[14px] lg:text-[16px]">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(1223)</p>
                </div>
                {/* Prices */}
                <div className="productdisplay-right-prices flex my-[15px] lg:my-[20px] gap-5 lg:gap-7 text-[18px] lg:text-[24px] font-bold">
                    <div className="productdisplay-right-price-old text-[#818181] line-through">
                        ${product.old_price}
                    </div>
                    <div className="productdisplay-right-price-new">
                        ${product.new_price}
                    </div>
                </div>
                {/* Description */}
                <div className="productdisplay-right-description text-[14px] lg:text-[16px]">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid quia voluptates quo, tenetur odit amet quisquam explicabo optio obcaecati voluptast.
                </div>
                {/* Size selection */}
                <div className="productdisplay-right-size mt-[30px] lg:mt-[40px] text-[#656565] text-[18px] lg:text-[20px] font-semibold">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes flex my-[15px] lg:my-[20px] gap-2 lg:gap-[15px]">
                        <div className='py-[10px] px-[18px] lg:py-[14px] lg:px-[24px] bg-[#ebebeb] rounded-[3px] cursor-pointer border-[1px] border-solid border-[#6f6e6e]'>S</div>
                        <div className='py-[10px] px-[18px] lg:py-[14px] lg:px-[24px] bg-[#ebebeb] rounded-[3px] cursor-pointer border-[1px] border-solid border-[#6f6e6e]'>M</div>
                        <div className='py-[10px] px-[18px] lg:py-[14px] lg:px-[24px] bg-[#ebebeb] rounded-[3px] cursor-pointer border-[1px] border-solid border-[#6f6e6e]'>L</div>
                        <div className='py-[10px] px-[18px] lg:py-[14px] lg:px-[24px] bg-[#ebebeb] rounded-[3px] cursor-pointer border-[1px] border-solid border-[#6f6e6e]'>XL</div>
                        <div className='py-[10px] px-[18px] lg:py-[14px] lg:px-[24px] bg-[#ebebeb] rounded-[3px] cursor-pointer border-[1px] border-solid border-[#6f6e6e]'>XXL</div>
                    </div>
                </div>
                {/* Add to cart button and category */}
                <div>
                    <button onClick={() => { cartHandler(product.id) }} className='py-2 lg:py-3 px-6 lg:px-9 w-full lg:w-[200px] text-[12px] lg:text-[14px] font-semibold text-white bg-[#131212] mb-[10px] lg:mb-[20px] border-none outline-none cursor-pointer'>
                        ADD TO CART
                    </button>
                    <p className='productdisplay-right-category mt-[5px]'><span className='font-semibold'>Category :</span> Women, T-Shirt, Crop-top</p>
                    <p className='productdisplay-right-category'><span>Tags :</span> Modern, Latest</p>
                </div>
            </div>
        </div>
    );
}

export default ProductDisplay;
