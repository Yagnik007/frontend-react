import React from "react";

const Product = ({ product }) => {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>Description: {product.description}</p>
      <p>Price: ${product.price}</p>
      <img src={product.image} alt={product.name} />
    </div>
  );
};

export default Product;
