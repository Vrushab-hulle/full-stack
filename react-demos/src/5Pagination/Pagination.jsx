import React, { useEffect, useState } from "react";
import Products from "./Products";

const PAGE_SIZE = 12;

const Pagination = () => {
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

  const numberOfPages = Math.ceil(products.length / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const handlePageChange = (i) => {
    setCurrentPage(i);
  };

  return products.length === 0 ? (
    "Products Not Avaialbale"
  ) : (
    <div>
      <h1>Pagination</h1>
      <div>
        <button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>
        {
          //fill the array with undefined value
          // _ means we are ignoring 1st paramter of map method i.e current element
          new Array(numberOfPages).fill().map((_, i) => (
            <span
              key={i}
              onClick={() => handlePageChange(i)}
              className={`p-[5px] border cursor-pointer ${
                currentPage === i ? "bg-blue-500 text-white" : ""
              }`}
            >
              {i + 1}
            </span>
          ))
        }
        <button
          disabled={currentPage === numberOfPages - 1}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
      <div className="flex flex-wrap">
        {products.slice(start, end).map((p) => (
          <Products key={p.id} img={p.thumbnail} title={p.title} />
        ))}
      </div>
    </div>
  );
};

export default Pagination;
