import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { NavLink, useHistory } from "react-router-dom";
import { getAllProducts } from "../../store/product";
import { addWish } from "../../store/wishlist";
import { addItemToCart, updateQuantity } from "../../store/cart";

// import './SpotsIndex.css';

const ProductPage = () => {
  const history = useHistory();
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.session.user);
  const prodArr = Object.values(products);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  console.log("products state", products);

  useEffect(() => {
    dispatch(getAllProducts()).then(() => {
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

  return (
    isLoaded && (
      <div>
        <h1>Peruse Our Products</h1>
        <div>
          {prodArr.map((product) => (
            <div key={product.id}>
              <a key={product.id} href={`/products/${product.id}`}>
                <div>{product.name}</div>
                <span>${product.price}</span>
                <span>{product.seller}</span>
              </a>
              <div style={{ margin: 20 }}>
                {user.id != product.seller_id && (
                  <>
                    <button
                      className="add-wish-btn"
                      onClick={(e) => addToWish(e, product)}
                    >
                      Add to Wishlist
                    </button>
                    <button
                      value={product.id}
                      onClick={(e) => handleClick(e, product.id)}
                    >
                      Add to cart
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default ProductPage;
