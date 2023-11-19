import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getWish } from "../../store/wishlist";


export default function Wishlist() {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const wishlist = useSelector((state) => state.wishlist);
    const allProducts = wishlist.products ? Object.values(wishlist.products) : null
    const [isLoaded, setIsLoaded] = useState(false);

    console.log('wish', wishlist)
    console.log('all product', allProducts)

    useEffect(() =>  {

            if (user){
                dispatch(getWish()).then(() => setIsLoaded(true))
            }

    }, [dispatch]);



  if (!user) {
      history.push("/login")
  }
  return  (
    <>
          <h1>Wishlist</h1>
            { allProducts && allProducts.length > 0 && (
                <>
                    {allProducts.map((product) =>
                        <div className="all-products">
                            <div>{product.name}</div>
                            <div>{product.price}</div>
                        </div>
                    )}
                </>
            )}
    </>
  );

}
