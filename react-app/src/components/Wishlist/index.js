import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getWish } from "../../store/wishlist";


export default function Wishlist(){
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const wishlist = useSelector((state) => state.wishlist);
    const [isLoaded, setIsLoaded] = useState(false);


    console.log('wish state ===>', wishlist)

    console.log('user state', user)


    useEffect(() =>  {

            if (user){
                dispatch(getWish()).then(() => setIsLoaded(true))
            }

    }, [dispatch]);


   return (
        <>
        <h1>Wishlist</h1>

        </>
    )
}
