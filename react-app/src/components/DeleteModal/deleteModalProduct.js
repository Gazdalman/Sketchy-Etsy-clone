import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";

import "./deleteModal.css";
import { deleteProductThunk } from "../../store/product";

//PLEASE CHANGE names/variables

function DeleteProduct({ product, refresh }) {
  const { closeModal } = useModal();
  const history = useHistory();
  const dispatch = useDispatch();

  const deleteButton = async (e) => {
    e.preventDefault();

    await dispatch(deleteProductThunk(product.id))
      .then(() => (refresh ? history.go(0) : history.goBack()))
      .then(closeModal);

    history.push("/");
  };

  return (
    <div className="delete-button-container" id="deleteModel">
      <h2 id="delModalTitle">Confirm Delete</h2>
      <p id="delModalText">
        Are you sure you want to remove this product from your product list?
      </p>
      <div id="delModalButtons">
        <button id="delete-btn" onClick={deleteButton}>
          Yes (Delete product)
        </button>
        <button id="keep-btn" onClick={closeModal}>
          No (Keep product)
        </button>
      </div>
    </div>
  );
}

export default DeleteProduct;
