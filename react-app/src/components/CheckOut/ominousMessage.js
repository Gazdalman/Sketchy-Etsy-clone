import { useModal } from "../../context/Modal";

export default function CheckOutMessage() {
  const { closeModal } = useModal();

  return (
    <div>
      <h1>Don't worry! 😈 </h1>
      <p>We already know where you live...</p>
      <p>...and we've already got your card info</p>
      <h3>...No we will not be explaining how...</h3>
    </div>
  );
}
