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

  //  const [search, setSearch] = useState("");

  // console.log( "🚀 ~ file: index.js:24 ~ Navigation ~ filteredData:", filteredData );
  // console.log("🚀 ~ file: index.js:30 ~ Navigation ~ search:", search);

  // const [isLoaded, setIsLoaded] = useState(false);

  const [render, setRender] = useState(false);
  // // const filterFunc = (e) => {
  // //   const searchWord = e.target.value;

  //   setSearch(searchWord);
  //   const newFilter = productArr.filter((value) => {
  //     if (
  //       value.name.toLowerCase().includes(searchWord.toLowerCase())
  //       // ||
  //       // value.category.find(
  //       //   (ele) => ele.name.toLowerCase() == searchWord.toLowerCase()
  //       // )
  //     ) {
  //       return value;
  //     }
  //   });
  //   if (searchWord === "") {
  //     setFilteredData(productArr);

  //   setSearch(searchWord);
  //   const newFilter = productArr.filter((value) => {
  //     if (
  //       value.name.toLowerCase().includes(searchWord.toLowerCase())
  //       // ||
  //       // value.category.find(
  //       //   (ele) => ele.name.toLowerCase() == searchWord.toLowerCase()
  //       // )
  //     ) {
  //       return value;
  //     }
  //   });
  //   if (searchWord === "") {
  //     setFilteredData(productArr);

  //     history.push("/home");
  //     // setRender(!render);
  //   } else {
  //     setFilteredData(newFilter);

  //     changePage();

  //     // setRender(!render);
  //   }
  //   return <ProductShowing prods={filteredData} words={search} />;
  // };
  // const changePage = () => {
  //   // <ProductShowing prods={filteredData} />;
  //   history.push("/search");
  // };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch, isLoaded, render]);

  return (
    <div className="nav-main-container">
      <div className="nav-sub-container-logo">
        <NavLink className="nav-link" to="/home">
          <div style={{ fontSize: 60, cursor: "pointer", marginLeft: 55}} className="nav-btn">
            <i className="fa-solid fa-skull "></i>
          </div>
        </NavLink>
      </div>

      <div className="nav-sub-container">
        <NavLink className="nav-link" to="/wishlist">
          <div style={{ fontSize: 40 }} className="nav-btn">
            <i className="fa-solid fa-heart"></i>
          </div>
        </NavLink>

        <NavLink className="nav-link" to="/cart">
          <div style={{ fontSize: 40, cursor: "pointer" }} className="nav-btn">
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
