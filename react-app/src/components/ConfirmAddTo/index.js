import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useModal } from "../../context/Modal";

import "./ConfirmAdd.css";

export default function ConfirmAdd({ product, user }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  useEffect(() => {
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
  }, []);

  return (
    <div className="confirmAddToMessageContainer">
      <h1>Successfully added to Cart!</h1>
      <button onClick={closeModal}>OK! 😊 </button>
    </div>
  );
}

/*
<OpenModalButton
    buttonText=""
    modalComponent={<ConfirmAdd where="" product={} user={user} />} />
*/
