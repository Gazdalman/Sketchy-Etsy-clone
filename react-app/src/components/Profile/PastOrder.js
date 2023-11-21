import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../store/order";

export default function () {
    const dispatch = useDispatch();
    const allOrders = useSelector((state) => state.orders)
    const [ isLoaded, setIsLoaded ] = useState(false)

    console.log('order state', allOrders)


    useEffect(() => {
        dispatch(getAllOrders())
        .then(() => setIsLoaded(true));

    }, [dispatch]);


    return isLoaded &&(
        <>
            <h1>Past Order</h1>
            {Object.values(allOrders).map((order) => (
                <div key={order.id}>
                    {order.products.map((item) => (
                        <div key={item.id}>
                            <h4>{item.name}</h4>
                            <p>{item.price}</p>
                            <button>Write Review</button>
                            <button>Return Item</button>
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
}
