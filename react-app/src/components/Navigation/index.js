import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import ProductPage from "../ProductPage";
import { getAllProducts } from "../../store/product";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ProductShowing from "../ProductShowing";

const handleClick = (e) => {
  e.preventDefault();
  alert("Feature Coming Soon!");
};

function Navigation({ isLoaded }) {
  const productArr = Object.values(useSelector((state) => state.products));

  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const location = useLocation();
  const [filteredData, setFilteredData] = useState(productArr);
  console.log(
    "🚀 ~ file: index.js:24 ~ Navigation ~ filteredData:",
    filteredData
  );

  const [search, setSearch] = useState("");
  console.log("🚀 ~ file: index.js:30 ~ Navigation ~ search:", search);

  // const [isLoaded, setIsLoaded] = useState(false);
  const [render, setRender] = useState(false);
  const filterFunc = (e) => {
    const searchWord = e.target.value;

    setSearch(searchWord);
    const newFilter = productArr.filter((value) => {
      if (
        value.name.toLowerCase().includes(searchWord.toLowerCase())
        // ||
        // value.category.find(
        //   (ele) => ele.name.toLowerCase() == searchWord.toLowerCase()
        // )
      ) {
        return value;
      }
    });
    if (searchWord === "") {
      setFilteredData(productArr);

      history.push("/home");
      // setRender(!render);
    } else {
      setFilteredData(newFilter);

      changePage();

      // setRender(!render);
    }
    return <ProductShowing prods={filteredData} words={search} />;
  };
  const changePage = () => {
    // <ProductShowing prods={filteredData} />;
    history.push("/search");
  };
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch, isLoaded, render]);

  return (
    <div className="nav-main-container">
      <div className="nav-sub-container-logo">
        <NavLink className="nav-link" to="/home">
          <div style={{ fontSize: 50, cursor: "pointer" }} className="nav-btn">
            <i className="fa-solid fa-skull "></i>
          </div>
        </NavLink>

        {/* <div className="category">
            <div onClick={(e) => handleClick(e)}>
              Categories <i class="fa-solid fa-caret-down"></i>
            </div>
          </div> */}
      </div>
      {/* <div className="search-bar">
          Search <i class="fa-solid fa-magnifying-glass"></i>
          <input value={search} onChange={filterFunc} />
          <div onClick={(e) => handleClick(e)}></div>
        </div>
        //{" "} */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          height: "30px",
          top: "175px",
        }}
      >
        <i
          className="fa fa-search"
          style={{
            position: "relative",
            top: " 5px",
            left: "25px",
            fontSize: "20px",
          }}
        ></i>
        <input
          style={{
            padding: "0 30px",
            borderRadius: "15px",
          }}
          type="text"
          placeholder={"Search Our Products..."}
          className="form-input"
          value={search}
          onChange={(e) => {
            filterFunc(e);
          }}
        />
      </div>
      <div className="nav-sub-container">
        <NavLink className="nav-link" to="/wishlist">
          <div style={{ fontSize: 33 }} className="nav-btn">
            <i className="fa-solid fa-heart"></i>
          </div>
        </NavLink>

        <NavLink className="nav-link" to="/cart">
          <div style={{ fontSize: 33, cursor: "pointer" }} className="nav-btn">
            <i class="fa-solid fa-cart-shopping"></i>
          </div>
        </NavLink>

        {isLoaded &&
          location.pathname != "/login" &&
          location.pathname != "/signup" && (
            <li>
              <ProfileButton user={sessionUser} />
            </li>
          )}
      </div>
    </div>
  );
}

export default Navigation;
