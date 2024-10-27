import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./Components/Navbar/Navbar";
import Home from './Pages/Home'
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Product from "./Pages/Product";
import ShopCategory from "./Pages/ShopCategory";
import Footer from "./Components/Footer/Footer";
import men_banner from "./Components/Asset/banner_mens.png"
import women_banner from "./Components/Asset/banner_women.png"
import kids_banner from "./Components/Asset/banner_kids.png"
import Address from "./Components/Address/Address";


function App() {
  const isAuthenticated = localStorage.getItem('auth-token'); 
  return (
    <>
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/men" element={<ShopCategory banner={men_banner} category="Men" />} />
            <Route path="/women" element={<ShopCategory banner={women_banner} category="Women" />} />
            <Route path="/kids" element={<ShopCategory banner={kids_banner} category="Kids" />} />
            <Route path="/product" element={<Product />}>
              <Route path=":productId" element={<Product />} />
            </Route>
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/cart" element={<Cart />} />
            {/* Private route for /add-address */}
            <Route 
              path="/add-address" 
              element={
                isAuthenticated ? <Address /> : <Navigate to="/login" />
              } 
            />
          </Routes>
          <Footer/>
      </BrowserRouter>


    </>
  )
}

export default App
