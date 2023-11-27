import { useModal } from "../../context/Modal";
import logo from "../../assets/Logo.png"

export default function CheckOutMessage() {
  const { closeModal } = useModal();

  return (
    <>
    {/* <img src={logo} alt="logo" style={{width:300, height:300}}/> */}
    <div className="checkout-message">
      <p style={{fontSize:30}} className="blue"> Just Kidding! 😈 </p>
      <p className="purple">We already know where you live...</p>
      <p className="red">...and we've already got your card info</p>
      <p className="green">...No we will not be explaining how...</p>
    </div>
    </>
  );
}
