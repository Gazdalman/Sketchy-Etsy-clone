import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getAllProducts } from "../../store/product";
import { getWish, addWish, removeWish } from "../../store/wishlist";
// import { addItemToCart, updateQuantity } from "../../store/cart";

import OpenModalButton from "../OpenModalButton";
import ConfirmAdd from "../ConfirmAddTo";

import "./ProductPage.css";

const ProductPage = () => {
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
        setIsLoaded(true);
      });
  }, [dispatch]);

  const addToWish = (e, product) => {
    e.preventDefault();

    const productId = product.id;

    if (userWish && userWish.products) {

      if (userWish.products[productId]) {

        dispatch(removeWish(productId));
        if (e.target.className == "fa-solid fa-heart") {
          e.target.className = "fa-regular fa-heart";
        };

      } else {
        dispatch(addWish(productId));

      if (e.target.className == "fa-regular fa-heart") {
        e.target.className = "fa-solid fa-heart";
      }
    }
  };

  return isLoaded ? (
    <div>
      <h1>Peruse Our Products</h1>
      <div className="products-main-contianer">
        {prodArr.map((product) => (
          <div key={product.id} className="products-card">
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
                <span>By {product.seller}</span>
              </div>
            </a>

            <div style={{ margin: 20 }} className="prod-btns-container">
              {user && user.id != product.seller_id && (
                <div id="prod-page-btn-container">
                  <div
                    className="add-wish-btn"
                    onClick={(e) => addToWish(e, product)}
                  >
                    {user &&
                    userWish.products &&
                    userWish.products[product.id] ? (
                      <i className="fa-solid fa-heart"></i>
                    ) : (
                      <i className="fa-regular fa-heart"></i>
                    )}
                  </div>

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
