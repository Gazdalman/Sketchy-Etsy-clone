import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOneProduct } from "../../store/singleProduct";
import { useModal } from "../../context/Modal";
import "./ConfirmAdd.css";
import { decreaseQuantity, getAllProducts } from "../../store/product";

export default function ConfirmAdd({ page, product, user }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();


  const addToCart = async() => {
    if (page) {
      await dispatch(getOneProduct(product.id))
      closeModal()
    } else {
      await dispatch(getAllProducts())
      closeModal()
    }
  }


  useEffect(() => {
    const decrease = async () => {
      const res = await dispatch(decreaseQuantity(product.id, 1));
    }

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
    decrease()
  }, []);

  return (
    <div className="confirmAddToMessageContainer">
      <h1>Successfully added to Cart!</h1>
      <button onClick={addToCart}>OK! 😊 </button>
    </div>
  );
}

/*
<OpenModalButton
    buttonText=""
    modalComponent={<ConfirmAdd where="" product={} user={user} />} />
*/
