import React from 'react';
import ProductCard from './ProductCard'; // Ensure this path is correct

const ProductGrid = ({ products }) => {
  return (
    <ul className="grid product-grid contains-card contains-card--product contains-card--standard grid--4-col-desktop grid--2-col-tablet-down" role="list" aria-label="Slider">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          title={product.title}
          imageUrl={product.imageUrl}
          productUrl={product.productUrl}
          price={product.price}
        />
      ))}
    </ul>
  );
};

export default ProductGrid;
