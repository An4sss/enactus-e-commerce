"use client"
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const ProductList = () => {
  // State to hold the list of products
  const [products, setProducts] = useState([]);

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      console.log(data); // Log the entire response data for inspection
      setProducts(data); // Ensure this matches your API response structure
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Use useEffect to fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Add a conditional rendering to prevent accessing undefined




  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-0 m-0 list-none pt-14">
      {products.map((product, index) => {
        
        return(
        
      
          <ProductCard
            productId={product._id}
            title={product.name}          // Use the appropriate field from your API response
            imageUrl={product.imageUrl}   // Corrected field name from your log
            productUrl={product.productUrl || '#'} // Ensure there's a fallback if productUrl is not defined
            price={product.price}          // Use the appropriate field from your API response
          />
      )})}
    </ul>
  );
};

export default ProductList;
