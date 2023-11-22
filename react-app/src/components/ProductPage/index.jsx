import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { NavLink, useHistory } from "react-router-dom";
import { getAllProducts } from "../../store/product";
import { getWish, addWish } from "../../store/wishlist";
import { addItemToCart, updateQuantity } from "../../store/cart";

// import './SpotsIndex.css';

const ProductPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session)
  const cart = useSelector(state => state.cart)
  const products = useSelector((state) => state.products)
  const userWish = useSelector((state) => state.wishlist)
  const prodArr = Object.values(products)
  const [isLoaded, setIsLoaded] = useState(false);


  console.log('user', user)
  console.log('products state', products)
  console.log('user wish', userWish)


  useEffect(() => {

    dispatch(getAllProducts())
      .then(() => {
        setIsLoaded(true);
      });

    dispatch(getWish());

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
      <div>
        <h1>Peruse Our Products</h1>

        {prodArr.map((product) => (
          <div key={product.id}>
            <a key={product.id} href={`/products/${product.id}`}>
              <div>{product.name}</div>
              <span>${product.price}</span>
              <span>{product.seller}</span>
            </a>

            {user && !userWish.products[product.id] && (
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
            )}
          </div>
    ))}
      </div>
  ) : null
};

export default ProductPage;
