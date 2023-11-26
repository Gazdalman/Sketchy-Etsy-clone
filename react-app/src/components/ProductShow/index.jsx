import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOneProduct } from "../../store/singleProduct";
import Reviews from "../ProductReviews";
import { addItemToCart, updateQuantity } from "../../store/cart";
import { deleteProductThunk } from "../../store/product";
import OpenModalButton from "../OpenModalButton";
import DeleteProduct from "../DeleteModal/deleteModalProduct";

const ProductShow = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.session.user);
  const [revAvg, setRevAvg] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  const product = useSelector((state) => state.requestedProduct);

  let imgNum = 0;

  if (product) {
    console.log('This is the product', product);
  }

  useEffect(() => {
    const res = dispatch(getOneProduct(productId));
    if (res.broken) {
      history.replace("/not-found");
    }
  }, [dispatch]);

  // useEffect(() => {
  //   if (product && product.ProductImages && product.ProductImages.length > 0) {
  //     setPreviewImage({ ...(product.ProductImages.find((image) => image.preview === true)) });
  //   }

  // }, [product]);

  // if (!isLoaded && rerendered && !product) {
  //   history.replace("/not-found")
  // }

  const edit = (e) => {
    e.preventDefault()
    return history.push(`/products/${productId}/edit`)
  }

  const handleClick = (e, prod) => {
    e.preventDefault();
    const prodId = prod.id;
    if (cart[prodId]) {
      dispatch(updateQuantity(prodId, "inc"));
    } else {
      dispatch(addItemToCart(prodId));
    }
  };

  return Object.keys(product).length > 0 && +product.id === +productId && +product.seller_id ? (
    <div id="product-show">
      <h1 id="product-name">{product.name}</h1>
      <h3>
        ${product.price} | Product #:{product.id} | {+product.units_available > 0 ? `${product.units_available} available` : 'SOLD OUT'}
      </h3>
      <div id="product-images-container">
        <img id="preview-image" src={product.preview} alt={`Product ${product.id} Img`} />
        <span id="none-prev">
          {product.images.length > 0 && product.images.map(image => (
            (
              <img className="product-img" id={`img-${imgNum++}`} key={image.id} src={image.url} alt={`Product ${image.id}`} />
            )
          ))}
        </span>
      </div>
      <h4 id="product-owner">Sold by {product.seller}</h4>
      <div id="product-details-lower">
        <h4 id="prod-cat">Category: {product.category}</h4>
        <p id="product-description">{product.description}</p>
        {/* <CallOutBox numReviews={numReviews} avgRating={revAvg.toFixed(1)} product={product} /> */}
      </div>
      {(user && user.id != product.seller_id) && (
        <button onClick={(e) => handleClick(e, product)}>
          Add to cart
        </button>
      )}
      {(user && user.id == product.seller_id) && (
        <button onClick={edit} >Edit Product</button>
      )}
      {/* <ReviewArea setRevAvg={setRevAvg} numRevs={setNumReviews} revAvg={revAvg} product={product} /> */}
      <Reviews product={product} />
    </div>
  ) : ((product && !product.seller_id) ? <h1>Not Available</h1> : null);
};

export default ProductShow;
