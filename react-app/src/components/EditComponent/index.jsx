import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import ProductFormPage from "../ProductForm";
import { getOneProduct } from "../../store/singleProduct";

const EditProduct = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false)
  const { productId } = useParams();
  const user = useSelector(state => state.session.user);
  const product = useSelector(state => state.requestedProduct);



  useEffect(() => {
    if (!user) {
      history.replace("/");
      window.alert("Please Log In to edit or create products")
      return null
    }
    dispatch(getOneProduct(productId))
    setIsLoaded(true)

  }, [dispatch]);


  return isLoaded && Object.keys(product).length && user ? (
    <>
      {+user.id === +product.seller_id ? <>
        <ProductFormPage type={"edit"} product={product}/>
      </> : history.push("/")
      }
    </>
  ) : null
}

export default EditProduct;
