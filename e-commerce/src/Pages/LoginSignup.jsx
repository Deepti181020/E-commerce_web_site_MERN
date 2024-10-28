import React, { useState } from 'react';
import axios from 'axios';


const LoginSignup = () => { 
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isAgreed, setIsAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckbox = () => setIsAgreed(!isAgreed);

  const login = async () => {
    if (!isAgreed) {
      alert("Please agree to the terms and conditions.");
      return;
    }
    if (!formData.email || !formData.password) {
      alert("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      // Assuming the token is in the response data
      localStorage.setItem("auth-token", response.data.token);
      window.location.replace("/");
    } catch (error) {
      console.error("Error during login:", error);
      // Axios error handling
      const errorMessage = error.response?.data?.errors || error.message || "Login failed.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };


  const signup = async () => {
    if (!isAgreed) {
      alert("Please agree to the terms and conditions.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      // Assuming the token is in the response data
      if (response.data.token) {
        localStorage.setItem("auth-token", response.data.token);
        window.location.replace("/");
      } else {
        alert(response.data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred during signup:", error);
      // Axios error handling
      const errorMessage = error.response
        ? `Error: ${error.response.status} ${error.response.statusText}`
        : "User already has an account!";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginsignup w-full min-h-screen bg-[#dddff0] flex items-center justify-center py-6">
      <div className="loginsignup-container w-full max-w-[580px] bg-white mx-4 py-2 px-6 sm:px-10 sm:py-10 rounded-[20px] sm:rounded-[30px] lg:rounded-[50px] shadow-md">
        <h1 className="text-[20px] font-medium mb-4">{state}</h1>
        <div className="loginsignup-fields flex flex-col gap-5 mt-6">
          {state === "Sign Up" && (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Enter Your Name"
              className="h-[40px] w-full pl-4 border border-solid border-[#c9c9c9] outline-none text-[#5c5c5c] text-[16px] rounded-md"
            />
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
            className="h-[40px] w-full pl-4 border border-solid border-[#c9c9c9] outline-none text-[#5c5c5c] text-[16px] rounded-md"
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
            className="h-[40px] w-full pl-4 border border-solid border-[#c9c9c9] outline-none text-[#5c5c5c] text-[16px] rounded-md"
          />
        </div>
        <button
          className="w-full h-[45px] text-white bg-black mt-6 border-0 text-[18px] font-medium cursor-pointer rounded-md"
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
          disabled={loading}
        >
          {loading ? "Processing..." : "Continue"}
        </button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login mt-4 text-[#5c5c5c] text-[14px] font-medium text-center">
            Already have an account?{" "}
            <span
              className="text-[#4141c2] font-medium cursor-pointer"
              onClick={() => {
                setState("Login");
              }}
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="loginsignup-login mt-4 text-[#5c5c5c] text-[14px] font-medium text-center">
            Create a new account?{" "}
            <span
              className="text-[#4141c2] font-medium cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Sign Up here
            </span>
          </p>
        )}
        <div className="loginsignup-agree flex items-center mt-6 gap-3 text-[#5c5c5c] text-[14px] font-medium">
          <input
            type="checkbox"
            checked={isAgreed}
            onChange={handleCheckbox}
            className="w-4 h-4"
          />
          <p>By continuing, I agree to all terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;