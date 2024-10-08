import Image from 'next/image';
import React from 'react';

const ProductCard = ({ title, imageUrl, productUrl, price,productId }) => {
  const handleAddToCart = async () => {
    try {
      // Get the token from local storage
      const token = localStorage.getItem('yourTokenKey'); // Replace 'token' with your actual key if different

      const response = await fetch('api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '', // Include token if available
        },
        body: JSON.stringify({
          productId,
          status: 'pending'
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Product added to cart:', data);
      // You can add additional logic here, e.g., show a success message
    } catch (error) {
      console.error('Error adding product to cart:', error);
      // Handle the error, e.g., show an error message
    }
  };

  return (
    <div className="border  border-gray-300 rounded-lg overflow-hidden shadow-md bg-white transition-transform duration-200 ease-in-out max-w-full flex flex-col">
      <div className="text-center flex flex-col justify-between ">
        <div className="p-0  ">
          <Image
            src={imageUrl}
            alt={title}
            width={500}
            height={500}
            loading="lazy"
            className="w-fit h-96 object-cover transform transition-transform duration-200 ease-in-out hover:scale-105"
          />
        </div>
        <div className="p-4 flex-1">
          <h3 className="text-base font-semibold my-2 text-gray-800">
            <a href={productUrl} className="text-gray-800 no-underline">
              {title}
            </a>
          </h3>
          <div className="text-xl mb-2 font-bold text-black">
            <span className="font-bold text-gray-700">PRICE: </span>
            {price} DT
          </div>
          <button 
            onClick={handleAddToCart} 
            className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200 ease-in-out"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
