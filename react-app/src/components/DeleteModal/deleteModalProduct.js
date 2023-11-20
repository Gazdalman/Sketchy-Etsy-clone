import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";


import "./deleteModal.css"

//PLEASE CHANGE names/variables

function DeleteProduct({ product }) {
    const { closeModal } = useModal();
    const history = useHistory();
    const dispatch = useDispatch();


    const deleteButton =  async (e) => {
        e.preventDefault();

        await dispatch(removeProduct(product.id)).then(closeModal);

        history.push("/");
    };

    return (
        <div className="delete-button-container">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this product from your product list?</p>
            <button id="delete-btn" onClick={deleteButton}>Yes (Delete product)</button>
            <button id="keep-btn" onClick={closeModal}>No (Keep product)</button>
        </div>
    );
}

export default DeleteProduct;
