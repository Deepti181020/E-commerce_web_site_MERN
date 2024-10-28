import React, { useState } from 'react';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setproductDetails] = useState({
    name: "",
    image: "",
    category: "",
    new_price: "",
    old_price: ""
  })
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const removeImage = () => {
    setImage(false);
  };

  const changeHandler = (e) => {
    setproductDetails({ ...productDetails, [e.target.name]: e.target.value })
  }

  const Add_Product = async () => {
    try {
      console.log(productDetails);
  
      let responseData;
      let product = productDetails;
  
      let formData = new FormData();
      formData.append('product', image);
  
      const response = await fetch('http://localhost:4000/upload', {
        method: "POST",
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      responseData = await response.json();
  
      if (responseData.success) {
        product.image = responseData.image_url;
        console.log(product);
        //Now store the product data into the MongoDB
        const AddProductRes= await fetch('http://localhost:4000/addproduct',{
          method:'POST',
          headers:{
            Accept:'application/json',
            'content-type':'application/json',
          },
          body:JSON.stringify(product),
        })

        const ProductResponse = await AddProductRes.json();
        if(ProductResponse.success){
          alert('Product is added successfully');
          //After product is sucessfully added now clear the input filed
          setproductDetails({
            name: "",
            image: "",
            category: "",
            new_price: "",
            old_price: ""

          })
          setImage(false);
        }
        else{
          alert('Failed to add product !Please try again')
        }
      }
    } catch (error) {
      console.log('Failed to upload the image:', error);
      alert('There was an error uploading the product. Please try again later');
    }
  };
  

  return (
    <div className="add-product box-border w-[100%] max-w-[800px] py-[30px] px-[50px] my-[20px] ml-1 rounded-[6px] bg-white">
      <div className="addproduct-item-fields w-[100%] text-[#7b7b7b] text-[16px]">
        <p className="mb-2">Product Title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="Product Name"
          className="box-border w-[100%] h-[50px] rounded-[4px] pl-[15px] outline-none text-[#7b7b7b] text-[14px] border border-solid border-[#c3c3c3]"
        />
      </div>
      <div className="addproduct-price flex gap-12 ">
        <div className="addproduct-item-fields w-[100%] text-[#7b7b7b] text-[16px]">
          <p className="mt-3 mb-2">Product Price</p>
          <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder="Enter Price"
            className="box-border w-[100%] h-[50px] rounded-[4px] pl-[15px] outline-none text-[#7b7b7b] text-[14px] border border-solid border-[#c3c3c3]"
          />
        </div>
        <div className="addproduct-item-fields w-[100%] text-[#7b7b7b] text-[16px]">
          <p className="mt-3 mb-2">Offer Price</p>
          <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder="Product Name"
            className="box-border w-[100%] h-[50px] rounded-[4px] pl-[15px] outline-none text-[#7b7b7b] text-[14px] border border-solid border-[#c3c3c3]"
          />
        </div>
      </div>
      <div className="addproduct-item-fields w-[100%] text-[#7b7b7b] text-[16px]">
        <p className="mt-3 mb-2">Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" id="category"
          className="addproduct-selector p-3 w-[200px] h-[50px] text-[14px] text-[#7b7b7b] border border-solid border-[#7b7b7b8d] rounded-[4px] pl-[40px]"
        >
          <option value="option" className="font-extralight">---Select---</option>
          <option value="Women">Women</option>
          <option value="Men">Men</option>
          <option value="Kids">Kids</option>
        </select>
      </div>
      <div className="addproduct-item-fields w-[20%] text-[#221010] text-[16px]">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            alt=""
            className="addproduct-thumbnail-img mt-3 mb-2 h-[150px] w-[150px] rounded-[10px] object-contain"
          />
        </label>
        <input onChange={imageHandler} type="file" name="image" id="file-input" hidden
          className="box-border w-[100%] h-[50px] rounded-[4px] pl-[15px] outline-none text-[#7b7b7b] text-[14px] border border-solid border-[#c3c3c3]"
        />
        {image && (
          <button
            onClick={removeImage}
            className="mt-3 w-[150px] h-[40px] rounded-[4px] bg-red-500 text-white text-[14px] hover:bg-red-600"
          >
            Remove Image
          </button>
        )}
      </div>
      <button onClick={() => { Add_Product() }} className="addproduct-btn mt-5 w-[160px] h-[50px] rounded-[6px] text-white bg-[#5168ed] border-none cursor-pointer text-ehite text-[16px] hover:bg-blue-700 font-semibold">
        ADD PRODUCT
      </button>
    </div>
  );
};

export default AddProduct;