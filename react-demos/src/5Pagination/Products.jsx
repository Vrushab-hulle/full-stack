import React from "react";

const Products = ({ img, title }) => {
  return (
      <div className="flex border flex-col w-[200px] m-[5px] items-center">
        <img src={img} alt={title} className="w-[200px] h-[200px]" />
        <p>{title}</p>
      </div>
  );
};

export default Products;
