import React from "react";

const ProductList = () => {
  const products = [
    {
      id: 101,
      name: "Wireless Headphones",
      price: 99.99,
    },
    {
      id: 102,
      name: "Smartphone",
      price: 599.99,
    },
    {
      id: 103,
      name: "Laptop",
      price: 899.99,
    },
    {
      id: 104,
      name: "Smart Watch",
      price: 199.99,
    },
    {
      id: 105,
      name: "Bluetooth Speaker",
      price: 49.99,
    },
    {
      id: 106,
      name: "Power Bank",
      price: 29.99,
    },
  ];
  return (
    <div>
      {products.map((product) => (
        <ul key={product.id}>
          <li>{product.id}</li>
          <li>{product.name}</li>
          <li>{product.price}</li>
        </ul>
      ))}
    </div>
  );
};

export default ProductList;
