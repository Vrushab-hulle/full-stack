import React, { useEffect, useState } from "react";

const Products_per_page = 10;

const UserInfoList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    const data = await fetch("https://dummyjson.com/products?limit=500");
    const response = await data.json();
    console.log(response.products);
    setProducts(response.products);
  }

  const numberofPages = Math.ceil(products.length / Products_per_page);
  return (
    <div>
      <button
        disabled={currentPage === 0}
        onClick={() => setCurrentPage((prev) => prev - 1)}
      >
        prev
      </button>
      {Array(numberofPages)
        .fill()
        .map((_, i) => (
          <span
            key={i}
            style={{
              margin: "5px",
              backgroundColor: currentPage === i ? "blue" : "white",
              color: currentPage === i ? "white" : "black",
              cursor:'pointer'
            }}
            onClick={(i) => setCurrentPage(i)}
            
          >
            {i}
          </span>
        ))}
      <button
        disabled={currentPage === numberofPages - 1}
        onClick={() => setCurrentPage((prev) => prev + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default UserInfoList;
