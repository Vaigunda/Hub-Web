import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // For accessing URL parameters

const ProductDetailPage = () => {
  const { productId } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.hubapi.com/cms/v3/hubdb/tables/100594471/rows/${productId}?portalId=43983695`
        );

        const data = response.data;
        if (data) {
          setProduct(data); // Set the product data
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  const { values } = product;
  const features = values.features.split(", ");
  const specifications = values.specifications.split(", ");

  return (
    <div className="p-8 bg-[#01C5FB] min-h-screen w-full">
      <div className="flex flex-row w-full">
        {/* Left Part: Image, Name, and Buttons */}
        <div className="w-1/3 h-screen bg-white">
          <img
            src={values.image.url}
            alt={values.name}
            className="w-full h-auto object-cover rounded-lg"
          />
          
          {/* Product Name under the image */}
          <div className="text-center font-semibold text-xl mt-4 text-[#21355D]">
            {values.name}
          </div>

          <div className="flex justify-between mt-4 mb-4 mx-4">
            <button className="w-full py-2.5 mr-2 bg-gradient-to-r from-[#4b6cb7] to-[#182848] text-white text-lg font-bold border-none mt-4 rounded-md cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-[#182848] hover:to-[#4b6cb7]">
              Buy Now
            </button>
            <button className="w-full py-2.5 bg-gradient-to-r from-[#4b6cb7] to-[#182848] text-white text-lg font-bold border-none mt-4 rounded-md cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-[#182848] hover:to-[#4b6cb7]">
              Add to Cart
            </button>
          </div>
        </div>

        {/* Right Part: Features, Specifications, Description, and Price */}
        <div className="w-2/3 p-5 max-h-screen overflow-y-auto bg-white">
          {/* Description */}
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-[#21355D]">Description:</h2>
            <p className="text-black">{values.description}</p>
            <hr className="my-4 border-1 border-black" />

            {/* Price on the Same Line */}
            <div className="flex items-center mt-4">
              <h3 className="text-xl font-bold text-[#21355D] mr-2">Price:</h3>
              <p className="text-xl text-black">Rs.{values.price}</p>
            </div>
          </div>
          <hr className="my-4 border-1 border-black" />

          {/* Features */}
          <div className="p-4">
            <h2 className="text-2xl font-bold text-[#21355D] mb-4">Features:</h2>
            <ul className="list-disc pl-5 text-black">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          <hr className="my-4 border-1 border-black" />

          {/* Specifications */}
          <div className="p-4">
            <h2 className="text-2xl font-bold text-[#21355D] mb-4">Specifications:</h2>
            <div className="text-black">
              {specifications.map((spec, index) => {
                const [key, value] = spec.split(": ");
                return (
                  <div key={index} className="mb-2">
                    <strong>{key}:</strong> {value}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
