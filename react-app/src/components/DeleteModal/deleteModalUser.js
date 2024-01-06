import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../store/session";

import "./deleteModal.css";

function DeleteAccount() {
  const { closeModal } = useModal();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const deleteAccount = (e) => {
    e.preventDefault();
    if (["nina", "ann", "toney", "rod", "demoUser5"].includes(user.username)) {
      const message = "No deleteing demo users...you heathen...";
      alert(message);
    } else {
      dispatch(deleteUser())
        .then(closeModal)
        .then(() => history.push("/home"));
    }
  };

  return (
    <div className="modal-delete-button-container" id="deleteModel">
      <h2 id="delModalTitle">Confirm Delete</h2>
      <p id="delModalText">Are you sure you want to delete your account?</p>
      <div id="delModalButtons">
        <button id="delete-btn" onClick={deleteAccount}>
          Yes (Delete account)
        </button>
        <button id="keep-btn" onClick={closeModal}>
          No (Keep account)
        </button>
      </div>
    </div>
  );
}

export default DeleteAccount;
