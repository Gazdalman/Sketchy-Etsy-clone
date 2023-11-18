import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function Wishlist(){
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)

    console.log('user state', user)

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        //dispatch wishlist
        if (user.id){
            dispatch(user.id).then(() => setIsLoaded(true))
        }

    }, [dispatch])

    // useEffect(() => {
    //     //populate wishlist
    // })


    return(
        <>
        <h1>Wishlist</h1>
        </>
    )
}
