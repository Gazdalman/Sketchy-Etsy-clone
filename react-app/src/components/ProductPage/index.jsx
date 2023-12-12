import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { getAllProducts } from "../../store/asdfsadfasdfasdfas";
import { getWish, addWish, removeWish } from "../../store/wishlist";
import { addItemToCart, updateQuantity } from "../../store/cart";
import "./index.css";

import "./ProductPage.css";

const ProductPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const cart = useSelector((state) => state.cart);
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

      }else {
          dispatch(addWish(productId));

          if (e.target.className == "fa-regular fa-heart") {
            e.target.className = "fa-solid fa-heart";
          };
    };

    }

  };

  const handleClick = (e, prod) => {
    e.preventDefault();
    const message = "Item added to your shopping cart! 😊"
    alert(message);
    dispatch(addItemToCart(prod.id))

  };

  return isLoaded ? (
    <div className="products-page">
      <div className="home-intro">
         <span>Hello</span>
      </div>
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
                <div className="prod-page-btn-container">
                  {/* {  userWish.products[product.id] == undefined  &&  ( */}

                  <div
                    className="wish-btn"
                    onClick={(e) => addToWish(e, product)}
                  >
                    {user && userWish.products && userWish.products[product.id] ? (
                      <i className="fa-solid fa-heart" style={{fontSize:50, color:"#ab434a", marginLeft:5, cursor:"pointer"}}></i>
                    ) : (
                      <i className="fa-regular fa-heart" style={{fontSize:50, color:"#ab434a", marginLeft:5, cursor:"pointer"}}></i>
                    )}
                  </div>

                  <button
                    value={product.id}
                    disabled={!product.units_available}
                    onClick={(e) => handleClick(e, product)}
                    className="add-to-cart-btn"
                  >
                    Add to cart
                  </button>
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
