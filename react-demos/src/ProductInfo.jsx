import React from "react";

const ProductInfo = () => {
  const product = {
    name: "laptop",
    price: "$1200",
    avialability: "inStock",
  };
  return (
    <div>
      <p>{product.name}</p>
      <p>{product.price}</p>
      <p>{product.avialability}</p>
    </div>
  );
};

export default ProductInfo;
