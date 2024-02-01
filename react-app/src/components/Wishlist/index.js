import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getWish } from "../../store/wishlist";
import OpenModalButton from "../OpenModalButton";
import DeleteWish from "../DeleteModal/deleteModalWishlist";
import { addItemToCart, updateQuantity } from "../../store/cart";
import ConfirmAdd from "../ConfirmAddTo";
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

  const products = useSelector((state) => state.products)


  const [isLoaded, setIsLoaded] = useState(false);

  // console.log("wishlist products", allProducts);
  // console.log("all products", products);


  useEffect(() => {
    if (user) {
      dispatch(getWish()).then(() => setIsLoaded(true));
    }
  }, [dispatch]);

  if (!user) {
    history.push("/login");
  }

  // const handleClick = (e, product) => {
  //   e.preventDefault();
  //   const productId = product.id;
  //   if (cart[productId]) {
  //     dispatch(updateQuantity(productId, "inc"));
  //   } else {
  //     dispatch(addItemToCart(productId));
  //   }
  // };

  return (
    isLoaded && (
      <>
        <h1>Wishlist</h1>
        <div className="wishlist-container">
          {allProducts && allProducts.length > 0 && (
            <>
              {allProducts.map((product) => (
                <div className="wish-product-cards" key={product.id}>
                  <div>{product.name}</div>
                  <a key={product.id} href={`/products/${product.id}`}>
                    <div className="wish-product-img">
                      <img
                        src={product.img}
                        alt="stock pic"
                        style={{ width: "80%", height: "auto" }}
                      />
                    </div>
                  </a>
                  <div>{product.price}</div>
                  <div className="wishlist-buttons">
                    <div className="wishlist-delete-button">
                      <OpenModalButton
                        buttonText="Delete Product"
                        modalComponent={<DeleteWish product={product} />}
                      />
                    </div>

                    <div className="wishlist-cart-button">
                        <OpenModalButton
                          buttonText="Add to cart"
                          modalComponent={
                            <ConfirmAdd product={products[product.id]} user={user} />
                          }
                        />
                      </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </>
    )
  );
}
