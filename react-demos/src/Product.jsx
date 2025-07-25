import React from "react";

const Product = (props) => {
  console.log(props);

  return (
    <div>
      <h2>{props.productName}</h2>
      <p>{props.productPrice}</p>
    </div>
  );
};

export default Product;
