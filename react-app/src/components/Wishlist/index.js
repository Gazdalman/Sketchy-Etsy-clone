import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getWish } from "../../store/wishlist";
import OpenModalButton from "../OpenModalButton";
import DeleteWish from "../DeleteModal/deleteModalWishlist";
import { addItemToCart, updateQuantity } from "../../store/cart";
import "./Wishlist.css";

export default function Wishlist() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const allProducts = wishlist.products
    ? Object.values(wishlist.products)
    : null;
  const [isLoaded, setIsLoaded] = useState(false);

  console.log("product id", wishlist.products);
  console.log("all product", allProducts);

  useEffect(() => {
    if (user) {
      dispatch(getWish()).then(() => setIsLoaded(true));
    }
  }, [dispatch]);

  if (!user) {
    history.push("/login");
  }

  const handleClick = (e, product) => {
    e.preventDefault();
    const productId = product.id;
    if (cart[productId]) {
      dispatch(updateQuantity(productId, "inc"));
    } else {
      dispatch(addItemToCart(productId));
    }
  };

  return (
    isLoaded && (
      <>
        <h1>Wishlist</h1>
        {allProducts && allProducts.length > 0 && (
          <>
            {allProducts.map((product) => (
              <div className="all-products" key={product.id}>
                <div>{product.name}</div>
                <div>{product.price}</div>
                <div className="wishlist-buttons">
                  <div className="delete-buttons">
                    <OpenModalButton
                      modalClasses={["delete-button-container"]}
                      buttonText="Delete Product"
                      modalComponent={<DeleteWish product={product} />}
                    />
                  </div>
                  <button
                    className="cart-button"
                    value={product.id}
                    onClick={(e) => handleClick(e, product)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </>
    )
  );
}
