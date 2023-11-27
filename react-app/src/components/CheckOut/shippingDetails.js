import "./CheckOut.css"

export default function ShippingDetails() {

  return (
    <div id="form-container">
      {/* <form id="checkout-form"> */}
        <label>
          {" "}
          Address:
          <input type="text" />
        </label>
        <label>
          {" "}
          City:
          <input type="text" />
        </label>
        <label>
          {" "}
          State:
          <input type="text" />
        </label>
        <label>
          {" "}
          Country:
          <input  type="text" />
        </label>
        <label>
          {" "}
          Name on Card:
          <input type="text" />
        </label>
        <label>
          {" "}
          Card Number
          <input type="text" />
        </label>
        <label>
          {" "}
          CVV:
          <input  type="text" />
        </label>
        <label>
          {" "}
          Expiration Date:
          <input  type="month" min={Date.now()} />
        </label>
      {/* </form> */}
    </div>
  );
}
