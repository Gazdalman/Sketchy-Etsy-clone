import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { removeWish } from "../../store/wishlist";

import "./deleteModal.css"


function DeleteWish({ product }) {
    const { closeModal } = useModal();
    const history = useHistory();
    const dispatch = useDispatch();


    const deleteWish =  async (e) => {
        e.preventDefault();

        await dispatch(removeWish(product.id)).then(closeModal);

        history.push("/wishlist");
    };

    return (
        <div className="delete-button-container">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this product from your wishlist?</p>
            <button id="delete-btn" onClick={deleteWish}>Yes (Delete product)</button>
            <button id="keep-btn" onClick={closeModal}>No (Keep product)</button>
        </div>
    );
}

export default DeleteWish;
