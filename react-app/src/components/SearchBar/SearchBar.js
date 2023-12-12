import React, { useEffect, useState } from "react";
import ProductPage from "../ProductPage";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/product";
import { getWish } from "../../store/wishlist";

function SearchBar({ placeholder, data }) {
  const dispatch = useDispatch();
  console.log("🚀 ~ file: SearchBar.js:4 ~ SearchBar ~ data:", data);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const productObj = useSelector((state) => state.products);
  const productArr = Object.values(productObj);
  const [isLoaded, setIsLoaded] = useState(false);
  console.log(
    "🚀 ~ file: SearchBar.js:10 ~ SearchBar ~ productArr:",
    productArr
  );

  console.log(
    "🚀 ~ file: SearchBar.js:7 ~ SearchBar ~ filteredData:",
    filteredData
  );
  const filterFunc = (e) => {
    const searchWord = e.target.value;
    setSearch(searchWord);
    const newFilter = Object.values(data).filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData(Object.values(data));
    } else {
      setFilteredData(newFilter);
    }
  };

  useEffect(() => {
    dispatch(getAllProducts())
      .then(() => dispatch(getWish()))
      .then(() => {
        setIsLoaded(true);
      });
  }, [dispatch]);
  return (
    <div>
      <div>
        <div>
          <i className="fa fa-search"></i>
          <input
            type="text"
            placeholder={placeholder}
            className="form-input"
            value={search}
            onChange={filterFunc}
          />
          <span className="left-pan">
            <i className="fa fa-microphone"></i>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
