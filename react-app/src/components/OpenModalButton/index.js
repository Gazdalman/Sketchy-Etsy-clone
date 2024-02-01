import React from "react";
import { useModal } from "../../context/Modal";
import "./index.css";

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  buttonDisabled,
  onModalClose, // optional: callback function that will be called once the modal is closed
  modalClasses,
}) {
  const { setModalContent, setOnModalClose } = useModal();
  let classes;
  if (modalClasses) {
    classes =
      modalClasses.length > 1 ? modalClasses.join(" ") : modalClasses[0];
  }

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (
    <button
      // style={{ padding: "5px", width: "100%", margin: "0", marginTop: "2px" }}
      className={classes}
      onClick={onClick}
      disabled={buttonDisabled ? true : false}
    >
      {buttonText}
    </button>
  );
}

export default OpenModalButton;
