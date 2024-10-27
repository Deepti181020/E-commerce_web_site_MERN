import React from 'react'
import './Navbar.css'
import logo_big from '../../assets/logo_big.png'
import nav_profile from '../../assets/nav-profile.svg'
const Navbar = () => {
    return (
        <div className='navbar flex items-center justify-between py-[20px] px-[50px] bg-white'>
            <div className='flex items-center py-[1px] px-[50px] bg-white'>
                <img src={logo_big} alt="Error" className='w-[50px]' />
                <div className='items-center flex flex-col'>
                    <h2 className='font-semibold text-[20px]' >SHOPAHOLIC</h2>
                    <p className='font-medium'>Admin Panel</p>
                </div>
            </div>

            <img src={nav_profile} alt="" className='w-[75px]' />
        </div>
    )
}

export default Navbar
