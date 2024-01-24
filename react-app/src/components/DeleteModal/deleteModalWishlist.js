import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { getWish, removeWish } from "../../store/wishlist";

import "./deleteModal.css";

function DeleteWish({ product }) {
  const { closeModal } = useModal();
  const history = useHistory();
  const dispatch = useDispatch();

  console.log("product to delete ====>", product);

  const deleteWish = async (e) => {
    e.preventDefault();

    await dispatch(removeWish(product.id)).then(closeModal);
    await dispatch(getWish()).then(() => history.push("/wishlist"));
  };

  return (
    <div className="modal-delete-button-container" id="deleteModel">
      <h2 id="delModalTitle">Confirm Delete</h2>
      <p id="delModalText">
        Are you sure you want to remove this product from your wishlist?
      </p>
      <div id="delModalButtons">
        <button id="delete-btn" onClick={deleteWish}>
          Yes (Delete product)
        </button>
        <button id="keep-btn" onClick={closeModal}>
          No (Keep product)
        </button>
      </div>
    </div>
  );
}

export default DeleteWish;
