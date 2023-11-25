import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { NavLink, useHistory } from "react-router-dom";
import { getAllProducts } from "../../store/product";
import { getWish, addWish, removeWish } from "../../store/wishlist";
import { addItemToCart, updateQuantity } from "../../store/cart";

import "./ProductPage.css"

const ProductPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products);
  const userWish = useSelector((state) => state.wishlist);
  const prodArr = Object.values(products);
  const [isLoaded, setIsLoaded] = useState(false);
  const [favorite, setFavorite ] = useState([]);




  // console.log("user", user);
  console.log("products state", products);
  console.log("favorite", favorite)
  // console.log("local storage fav", storedFavorite)
  console.log("user wish", userWish);

  useEffect(() => {
    dispatch(getAllProducts())
      .then(() => dispatch(getWish()))
      .then(() => {
        setIsLoaded(true)
      });
  }, [dispatch, favorite]);

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
      dispatch(addItemToCart(prodId));
    }
  };

  return isLoaded ? (
    <>
      <h1>Peruse Our Products</h1>
      <div className="products-main-contianer">
        {prodArr.map((product) => (
          <div key={product.id} className="products-card">
            <a key={product.id} href={`/products/${product.id}`}>
              <img className="products-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/640px-Banana-Single.jpg" alt="product"/>
              <div className="products-detail">
                <div>{product.name}</div>
                <span id="price">{"  "}${product.price}{"  "}</span>
              </div>
                <span>{product.seller}</span>
            </a>

              <div style={{ margin: 20 }} className="prod-btns-container">
                {user.id != product.seller_id && (
                  <>
                    {/* { userWish.products[product.id] == undefined  &&  ( */}
                      <div
                        className="add-wish-btn"
                        onClick={(e) => addToWish(e, product)}
                      >
                        { Object.values(userWish.products).includes(product.id)  ?  <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart" ></i> }
                      </div>

                    {/* )} */}


                    <button
                      value={product.id}
                      onClick={(e) => handleClick(e, product.id)}
                      className="add-to-cart-btn"
                    >
                      Add to cart
                    </button>
                  </>
                )}
              </div>

          </div>
        ))}
      </div>
    </>
  ) : null;
};

export default ProductPage;
