import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { removeItem } from "../../store/cart";

import "./deleteModal.css";

//PLEASE CHANGE names/variables

function DeleteItem({ product }) {
  const { closeModal } = useModal();
  const history = useHistory();
  const dispatch = useDispatch();

  const deleteItem = async (e) => {
    e.preventDefault();

    await dispatch(removeItem(product.id)).then(closeModal);

    history.push("/cart");
  };

  return (
    <div className="delete-cart-modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this product from your cart?</p>
      <button id="delete-btn" onClick={deleteItem}>
        Yes (Delete product)
      </button>
      <button id="keep-btn" onClick={closeModal}>
        No (Keep product)
      </button>
    </div>
  );
}

export default DeleteItem;
