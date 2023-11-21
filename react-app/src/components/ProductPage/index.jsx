import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { NavLink, useHistory } from "react-router-dom";
import { getAllProducts } from "../../store/product";
import { getWish, addWish } from "../../store/wishlist";

// import './SpotsIndex.css';

const ProductPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session)
  const products = useSelector((state) => state.products)
  const userWish =  useSelector((state) => state.wishlist)
  const prodArr = Object.values(products)
  const [isLoaded, setIsLoaded] = useState(false);


  console.log('user', user)
  console.log('products state', products)
  console.log('user wish', userWish)


  useEffect(() => {

    dispatch(getAllProducts())
      .then(() => {
        setIsLoaded(true);
      });

    dispatch(getWish());

  }, [dispatch]);



  const addToWish = (e, product) => {
      e.preventDefault();

      const productId = product?.id;
      dispatch(addWish(productId));

  };


  return isLoaded && (
    <div>
      <h1>Peruse Our Products</h1>
      <div>

        {prodArr.map(product => (
          <>
            <a key={product.id} href={`/products/${product.id}`}>
              <div>{product.name}</div>
              <span>${product.price}</span>
              <span>{product.seller}</span>
            </a>

            {user && !userWish.products[product.id] && (

              <div  style={{margin: 20}} >
                <button
                 className="add-wish-btn"
                 onClick={(e) => addToWish(e, product)}
                >Add to Wishlist</button>
              </div>
            )}

          </>
        ))}
      </div>
    </div>
  )
}

export default ProductPage;
