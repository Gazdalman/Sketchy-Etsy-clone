import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { getAllProducts } from "../../store/product";
import { getWish, addWish } from "../../store/wishlist";
import { addItemToCart, updateQuantity } from "../../store/cart";
import "./index.css"

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
  // console.log("user wish", userWish);

  useEffect(() => {
    dispatch(getAllProducts())
      .then(() => dispatch(getWish()))
      .then(() => {
        setIsLoaded(true);
      });
  }, [dispatch]);

  const addToWish = (e, product) => {
    e.preventDefault();

    const productId = product.id;
    dispatch(addWish(productId));
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
    <div className="product-container">
      <h1>Peruse Our Products</h1>

      {prodArr.map((product) => (
        <div key={product.id}>
          <a key={product.id} href={`/products/${product.id}`}>
            <div>
              <img
                src={product.preview}
                alt={`Product #${product.id} - ${product.name}`}
              />
            </div>
            <div>{product.name}</div>
            <span>${product.price}</span>
            <span>{product.seller}</span>
          </a>
          {user && products.seller_id != user.id && (
            <div style={{ margin: 20 }}>
              {user.id != product.seller_id && (
                <>
                  {userWish.products[product.id] == undefined && (
                    <button
                      className="add-wish-btn"
                      onClick={(e) => addToWish(e, product)}
                    >
                      Add to Wishlist
                    </button>
                  )}
                  <button
                    value={product.id}
                    onClick={(e) => handleClick(e, product.id)}
                  >
                    Add to cart
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  ) : null;
};

export default ProductPage;
