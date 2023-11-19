import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';

import { NavLink } from "react-router-dom";
import { getAllProducts } from "../../store/product";
// import './SpotsIndex.css';

const ProductPage = () => {
  const products = useSelector(state => state.products)
  const prodArr = Object.values(products)
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getAllProducts())
      .then(() => {
        setIsLoaded(true);
      });
  }, [dispatch])

  return isLoaded && (
    <div>
      <h1>Peruse Our Products</h1>
      <div>

        {prodArr.map(product => (
          <a key={product.id} href={`/products/${product.id}`}>
            <div>{product.name}</div>
            <span>${product.price}</span>
            <span>{product.seller}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

export default ProductPage
