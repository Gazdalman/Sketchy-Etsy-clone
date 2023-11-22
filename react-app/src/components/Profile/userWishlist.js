import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWish } from "../../store/wishlist";
import { addItemToCart, getCart, updateQuantity } from "../../store/cart";
import OpenModalButton from "../OpenModalButton";
import DeleteWish from "../DeleteModal/deleteModalWishlist";

export default function UserWishlist({ user }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getWish())
      .then(() => dispatch(getCart()))
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    console.log(wishlist);
  }, [isLoaded]);

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
    <>
      {isLoaded && (
        <div>
          {Object.values(wishlist.products).map((product) => (
            <div key={product.id}>
              <div>{product.name}</div>
              <div>{product.price}</div>
              <OpenModalButton
                modalClasses={["delete-button-container"]}
                buttonText="Delete Product"
                modalComponent={<DeleteWish product={product} />}
              />
              <button
                value={product.id}
                onClick={(e) => handleClick(e, product)}
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
