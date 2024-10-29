import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ShopContext = createContext(null);
//for the null cart count
const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0;
    }
    return cart;
}
const ShopContextProvider = (props) => {
    //Display all products from database
    const [all_product,setAll_Product] = useState([]);

    //create the usestate to change the cart number
    const [cartItem, setCartItem] = useState(getDefaultCart());

    useEffect(() => {
        // Fetch all products
        const fetchProducts = async () => {
          try {
            const response = await axios.get("http://localhost:4000/allproducts");
            setAll_Product(response.data); // Store the parsed data into setAll_Product
          } catch (error) {
            console.error('Error fetching products:', error);
            // Handle error if needed
          }
        };
      
        // Fetch cart quantity from the server and initialize the cart state
        const fetchCart = async () => {
          const token = localStorage.getItem('auth-token');
          if (token) {
            try {
              const response = await axios.get("http://localhost:4000/getcart", {
                headers: {
                  Accept: "application/json",
                  'auth-token': token,
                  'Content-Type': 'application/json',
                }
              });
              setCartItem(response.data.cartData || {}); // Initialize cart from server data
            } catch (error) {
              console.error('Error fetching cart:', error);
              // Handle error if needed
            }
          }
        };
      
        fetchProducts();
        fetchCart();
      }, []);


    // console.log(cartItem)

const addToCart = async (itemId) => {
  setCartItem((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

  const token = localStorage.getItem('auth-token');
  if (token) {
    try {
      const response = await axios.post("http://localhost:4000/addtocart", 
        { itemId: itemId }, // Send the itemId in the request body
        {
          headers: {
            Accept: 'application/json',
            'auth-token': token,
            'Content-Type': 'application/json',
          }
        }
      );

      console.log(response.data.message); // Log the message from the server
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Handle error if needed
    }
  }
};


const removeFromCart = async (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: Math.max((prev[itemId] || 1) - 1, 0) }));
  
    const token = localStorage.getItem('auth-token');
    if (token) {
      try {
        const response = await axios.post("http://localhodt:4000/removecart", 
          { itemId: itemId }, // Send the itemId in the request body
          {
            headers: {
              Accept: 'application/json',
              'auth-token': token,
              'Content-Type': 'application/json',
            }
          }
        );
  
        console.log(response.data.message); // Log the message from the server
      } catch (error) {
        console.error('Error removing from cart:', error);
        // Handle error if needed
      }
    }
  };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItem[item];
            }
        }
        return totalAmount; 
    }

    const getTotalCartItems = () =>{
        let totaCartlItem = 0;
        for(const item in cartItem){
            if (cartItem[item] > 0) 
            {
                totaCartlItem += cartItem[item]; 
            }
        }
        return totaCartlItem
    }
    

    const contextValue = { getTotalCartItems,getTotalCartAmount, all_product, cartItem, addToCart, removeFromCart };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );

};
export default ShopContextProvider;