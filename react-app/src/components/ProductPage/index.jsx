import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getAllProducts } from "../../store/product";
import { getWish, addWish, removeWish } from "../../store/wishlist";
// import { addItemToCart, updateQuantity } from "../../store/cart";

import OpenModalButton from "../OpenModalButton";
import ConfirmAdd from "../ConfirmAddTo";

import "./ProductPage.css";
import skull from "../../assets/skull.png";
import introImg from "../../assets/intro.png";

const ProductPage = ({ prods, word }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  //const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products);
  const userWish = useSelector((state) => state.wishlist);
  const prodArr = Object.values(products);
  const [isLoaded, setIsLoaded] = useState(false);



  // console.log("user", user);
  // console.log("products state", products);
  // console.log("favorite", favorite)
  // console.log("local storage fav", storedFavorite)
  // console.log("user wish", userWish);

  useEffect(() => {
    dispatch(getAllProducts())
      .then(() => {
        // * Only gather wishlist if there is a user signed in otherwise unauthorized triggers in console
        if (user) {
          dispatch(getWish());
        }
      })
      .then(() => {
        setIsLoaded(true)
      });
  }, [dispatch]);


  const addToWish = (e, product) => {
    e.preventDefault();

    const productId = product.id;
    // console.log(userWish);
    if (userWish && userWish.products) {
      if (userWish.products[productId]) {
        dispatch(removeWish(productId));
        if (e.target.className == "fa-solid fa-heart") {
          e.target.className = "fa-regular fa-heart";
        }
      } else {
        dispatch(addWish(productId));

      if (e.target.className == "fa-regular fa-heart") {
        e.target.className = "fa-solid fa-heart";
      }
    }
  };




  const handleClick = (e, prodId) => {
    e.preventDefault();
    if (cart[prodId]) {
      dispatch(updateQuantity(prodId, "inc"));
    } else {
      dispatch(addItemToCart(prodId));
    }
  };

  return isLoaded ? (
    <div className="products-page">
      <div className="home-about">
        <img src={skull} alt="graphic-img" />
        <div className="home-about-details">
          <h1>Welcome to Sketchy</h1>
          <h2>where creativity meets questionable!</h2>
        </div>
      </div>
      <div className="home-intro">
        <img src={introImg} alt="sale" />
      </div>
      <h2 style={{ color: "#503980" }}>Peruse Our Products</h2>
      <div className="products-main-container">
        {prodArr.map((product) => (
          <div key={product.id} className="products-card" >
            <a key={product.id} href={`/products/${product.id}`}>
              <div>
                <img
                  className="products-img"
                  src={product.preview}
                  alt={`Product #${product.id} - ${product.name}`}
                />

                <div className="products-detail">
                  <div>{product.name}</div>
                  <span id="price">
                    {"  "}${product.price}
                    {"  "}
                  </span>
                </div>
                {/* <span>By {product.seller}</span> */}
              </div>
              <span>By {product.seller}</span>
            </a>

            <div style={{ margin: 20 }} className="prod-btns-container">
              {user && user.id != product.seller_id && (
                <div className="prod-page-btn-container">
                  {/* {  userWish.products[product.id] == undefined  &&  ( */}

                  <div
                    className="wish-btn"
                    onClick={(e) => addToWish(e, product)}
                  >
                    {user &&
                    userWish.products &&
                    userWish.products[product.id] ? (
                      <i className="fa-solid fa-heart"></i> //style={{ fontSize: 40, color: "#ab434a", marginRight: 5, cursor: "pointer" }}></i>
                    ) : (
                      <i className="fa-regular fa-heart"></i> //style={{ fontSize: 40, color: "#ab434a", marginRight: 5, cursor: "pointer" }}></i>
                    )}
                  </div>

                  <div className="add-to-cart-btn">
                    <OpenModalButton
                      buttonText="Add to Cart"
                      modalComponent={
                        <ConfirmAdd product={product} user={user} />
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <h3>Loading...</h3>
  );
};

export default ProductPage;
