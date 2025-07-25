import React, { useState } from "react";

const ShoppingList = () => {
  const [listOfItems, setListOfItems] = useState([]);
  const [item, setItem] = useState({
    name: "",
    quantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({
      ...item,
      [name]: value,
    });
  };

  const handleAdd = () => {
    console.log(item);
    setListOfItems([...listOfItems, item]);
    setItem({
      ...item,
      name: "",
      quantity: "",
    });
  };
  return (
    <div>
      Name:
      <input
        type="text"
        name="name"
        value={item.name}
        onChange={handleChange}
      />
      <br />
      quantity:
      <input
        type="text"
        name="quantity"
        value={item.quantity}
        onChange={handleChange}
      />
      <button onClick={handleAdd}>Add to Cart</button>
      <h1>list of Shopping Items to purchase</h1>
      {listOfItems.map((item) => (
        <li key={Math.random()}>{item.name + " " + item.quantity}</li>
      ))}
    </div>
  );
};

export default ShoppingList;
