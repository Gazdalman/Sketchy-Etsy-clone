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
  const [favorite, setFavorite ] = useState([]);




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
    // const savedFavorite = favorite.find((item) => item == productId);
    const removeFav = favorite.indexOf(productId);

    if (favorite.includes(productId)) {

        setFavorite(favorite.splice(removeFav, 1));
        dispatch(removeWish(productId));

          if (e.target.className == "fa-solid fa-heart") {
              e.target.className = "fa-regular fa-heart"
          }

    }else {

        setFavorite(favorite.concat(productId));
        dispatch(addWish(productId));

        if (e.target.className == "fa-regular fa-heart") {
            e.target.className="fa-solid fa-heart"
        }
    }

  };

  const handleClick = (e, prodId) => {
    e.preventDefault();
    if (cart[prodId]) {
      dispatch(updateQuantity(prodId, "inc"));
    } else {
      dispatch(addWish(productId));

        if (e.target.className == "fa-regular fa-heart") {
          e.target.className = "fa-solid fa-heart";
        };
      };

    }

  };





  const handleClick = (e, product) => {
    e.preventDefault();
    const message = "Item added to your shopping cart! 😊";
    alert(message);
    // if (cart[prodId]) {
    //   dispatch(updateQuantity(prodId, "inc"));
    // } else {
    // dispatch(addItemToCart(prodId));
    // }
    let currCart = null;

    currCart = localStorage.getItem(`${user.id}Cart`);

    let updateCart = {};
    if (currCart) {
      const cart = JSON.parse(currCart);

      if (cart[product.id]) {
        cart[product.id].quantity++;
        updateCart = { ...cart };
      } else {
        product.quantity = 1;
        updateCart = { ...cart };
        updateCart[product.id] = product;
      }
    } else {
      product.quantity = 1;
      updateCart[product.id] = product;
    }

    localStorage.setItem(`${user.id}Cart`, JSON.stringify(updateCart));
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

                <img className="products-img" src="https://images.unsplash.com/photo-1627798133922-270bb80af5ed?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="product"/>

              <div className="products-detail">
                <div>{product.name}</div>
                <span id="price">{"  "}${product.price}{"  "}</span>
              </div>
              <span>By {product.seller}</span>
            </a>

            <div style={{ margin: 20 }} className="prod-btns-container">
              {user && user.id != product.seller_id && (
                <div id="prod-page-btn-container">
                  <div
                    className="add-wish-btn"
                    onClick={(e) => addToWish(e, product)}
                  >
                    {user && userWish.products && userWish.products[product.id] ? (
                      <i className="fa-solid fa-heart" style={{ fontSize: 50, color: "#ab434a", marginLeft: 5, cursor: "pointer" }}></i>
                    ) : (
                      <i className="fa-regular fa-heart" style={{ fontSize: 50, color: "#ab434a", marginLeft: 5, cursor: "pointer" }}></i>
                    )}
                  </div>

                  {/* )} */}

                  <OpenModalButton
                    buttonText="Add to Cart"
                    modalComponent={
                      <ConfirmAdd product={product} user={user} />
                    }
                  />
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
