import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../store/order";
import { addItemToCart, updateQuantity } from "../../store/cart";


export default function () {
    const dispatch = useDispatch();
    const allOrders = useSelector((state) => state.orders)
    const cart = useSelector((state) => state.cart)
    const [ isLoaded, setIsLoaded ] = useState(false)

    console.log('order state', allOrders)
    console.log('cart', cart)


    useEffect(() => {
        dispatch(getAllOrders())
        .then(() => setIsLoaded(true));

    }, [dispatch]);


    const handleClick = (e) => {
        e.preventDefault();
        e.target.innerText = "No...";
        e.target.style.color = "red";
        if (e.target.innerText == "No...") {
          // * PopUp w/ message => "You don't even know how we got it to you, how do you think you're going to return it -.- "
        }
      };


    const addToCart = (e, item) => {
        e.preventDefault();
        const itemId = item.id;

        if (cart[item.id]) {
            dispatch(updateQuantity(itemId, "inc"));
        }else {
            dispatch(addItemToCart(itemId));
        };

    };

    return isLoaded &&(
        <>
            <h1>History Order</h1>
            {Object.values(allOrders).map((order) => (
                <div key={order.id}>
                    {order.products.map((item) => (
                        <div key={item.id}>
                            <h4>{item.name}</h4>
                            <p>{item.price}</p>
                            <button>Write Review</button>
                            <button
                             onClick={(e) => handleClick(e)}
                            >Return Item</button>
                            <button
                              className="add-to-cart-btn"
                              onClick={(e) => addToCart(e, item) }
                            >Buy Again</button>
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
}
