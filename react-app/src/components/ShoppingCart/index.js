// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { getCart, updateQuantity } from "../../store/cart";
// import OpenModalButton from "../OpenModalButton";
// import DeleteItem from "../DeleteModal/deleteModalCart";

// export default function Cart() {
//   const history = useHistory();
//   const dispatch = useDispatch();

//   const user = useSelector((state) => state.session.user);
//   const cart = useSelector((state) => state.cart);

//   const [isLoaded, setIsLoaded] = useState(false);
//   const [loadedCart, setLoadedCart] = useState(Object.values(cart));

//   useEffect(() => {
//     if (user.id) {
//       dispatch(getCart()).then(() => {
//         setIsLoaded(true);
//       });
//     }
//   }, [dispatch]);

//   useEffect(() => {
//     setLoadedCart(Object.values(cart));
//   }, [isLoaded]);

//   const removeItem = (itemId) => {
//     // ! WHY ARE YOU FUCKING LOOPING?!?!?!?!
//     // * open delete modal
//   };

//   const decQuant = (item) => {
//     // dispatch to change quantity
//     const change = "dec";
//     if (Number(item.quantity) === 1) {
//       // ! WHY ARE YOU FUCKING LOOPING?!?!?!?!
//       // * open delete modal
//     } else {
//       dispatch(updateQuantity(item.id, change));
//     }
//   };
//   const incQuant = (item) => {
//     // dispatch to change quantity
//     const change = "inc";
//     dispatch(updateQuantity(item.id, change));
//   };

//   return (
//     <div>
//       <h1>Shopping Cart</h1>
//       {isLoaded &&
//         loadedCart.map((item) => (
//           <div key={item.id}>
//             <h3>{item.name}</h3>
//             <p>{item.price}</p>
//             <p>{item.description}</p>
//             <p>
//               {item.quantity}
//               {/* Buttons curretly disabled */}
//               {/* plus & minus buttons alter quantity -> when quantity hits 0, item fully removed from cart */}
//               <button onClick={() => decQuant(item)} disabled={true}>
//                 {" "}
//                 -{" "}
//               </button>
//               <button onClick={() => incQuant(item)} disabled={true}>
//                 {" "}
//                 +{" "}
//               </button>
//             </p>
//             {/* remove removes item from cart entirely */}
//             <>
//               <OpenModalButton
//                 modalClasses={["delete-button-container"]}
//                 buttonText="Remove from Cart"
//                 modalComponent={<DeleteItem product={item} />}
//               />
//             </>
//           </div>
//         ))}
//       <button onClick={() => history.push("/")}>Continue Shopping</button>
//     </div>
//   );
// }
