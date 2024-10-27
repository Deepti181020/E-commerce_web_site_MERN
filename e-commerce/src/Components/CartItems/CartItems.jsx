import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Asset/cart_cross_icon.png';
import './CartItems.css';

const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItem, removeFromCart,addToCart } = useContext(ShopContext);

    //useState to store the success message
    const [message,setMessage] = useState(" ");

    const showMessage = (msg) =>{
        setMessage(msg);
        setTimeout(()=>{
            setMessage("");
        },3000);
    };

    const handleAddToCart = (itemId) =>{
        addToCart(itemId);
        showMessage('Product is added successfully.');
    }

    const handleRemoveFromCart = (itemId) =>{
        removeFromCart(itemId);
        showMessage('Product is removed successfully.');
    }
    return (
        <div className='my-[50px] mx-[20px] md:mx-[50px] lg:mx-[150px]'>
            {/* Display the success message */}
            {message && <div className="message bg-[#f9f9f9] text-black p-3 rounded border border-[#ffffff] mb-4 opacity-100">{message}</div>}
            <div className="cartitems-format-main grid grid-cols-6 items-center gap-[10px] lg:gap-[75px] py-[20px] text-[#454545] text-[12px] sm:text-[14px] md:text-[16px] font-semibold">
                <p className='col-span-2 lg:col-span-1'>Products</p>
                <p className='hidden md:block'>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr className='h-[2px] bg-[#e2e2e2] border-0 mb-2'/>
            {all_product.map((e) => {
                if (cartItem[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartitems-format grid grid-cols-6 items-center gap-[10px] lg:gap-[75px] py-[20px] text-[#454545] text-[12px] sm:text-[14px] md:text-[16px] font-medium">
                                <img src={e.image} alt="" className='h-[50px] sm:h-[62px] col-span-2 lg:col-span-1' />
                                <p className='hidden md:block break-words'>{e.name}</p>
                                <p>${e.new_price}</p>
                                {/* Quantity */}
                                <div className='cartitems-quantity w-[40px] sm:w-[50px] md:w-[60px] h-[30px] sm:h-[40px] md:h-[50px] border-[1px] rounded-md bg-white flex items-center justify-between'>
                                    <button onClick={() => handleRemoveFromCart(e.id)} className="px-2">-</button>
                                    <span>{cartItem[e.id]}</span>
                                    <button onClick={() => handleAddToCart(e.id)} className="px-2">+</button>
                                </div>

                                <p>${e.new_price * cartItem[e.id]}</p>
                                <img src={remove_icon} onClick={() => { handleRemoveFromCart(e.id) }}
                                    alt="" className='w-[12px] sm:w-[15px] cursor-pointer' />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
            <div className="cartitems-down flex flex-col md:flex-row my-[50px] md:my-[100px] gap-10">
                <div className="cartitems-total flex-1 flex flex-col gap-[20px] sm:gap-[40px]">
                    <h1>Cart Total</h1>
                    <div>
                        <div className='cartitems-total-item flex justify-between pt-[15px]'>
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item flex justify-between pt-[15px]">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item flex justify-between pt-[15px]">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    {/* Wrap the button with Link */}
                    <Link to="/add-address" className='w-full md:w-[260px] h-[50px] outline-none bg-[#0c0c0c] text-[#fff] text-sm font-semibold flex items-center justify-center'>
                        PROCEED TO CHECKOUT
                    </Link>
                </div>
                <div className="cartitems-promocode flex-1 text-[14px] sm:text-[16px] font-medium mt-8">
                    <p className='text-[#3c3c3c]'>Enter your promocode</p>
                    <div className="cartitems-promobox flex w-full md:w-[500px] mt-[15px] pl-2 sm:pl-5 h-12 sm:h-14 bg-[#eaeaea]">
                        <input type="text" placeholder='Promo code' className='border-none outline-none bg-transparent text-sm w-[70%] h-full'/>
                        <button className='w-[30%] h-full text-[12px] sm:text-[16px] bg-[#0c0c0c] text-white cursor-pointer'>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItems;
