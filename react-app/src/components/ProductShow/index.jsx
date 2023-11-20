import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOneProduct } from "../../store/singleProduct";
import Reviews from "../ProductReviews";

const ProductShow = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const history = useHistory();
  const [previewImage, setPreviewImage] = useState({
    url: "https://cdn.drawception.com/images/panels/2017/5-21/pKkCMdsbbp-1.png",
  });
  const [revAvg, setRevAvg] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  const product = useSelector((state) => state.requestedProduct);

  let imgNum = 0;

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

  return Object.keys(product).length > 0 && +product.id === +productId ? (
    <div id="product-show">
      <h1 id="product-name">{product.name}</h1>
      <h3>
        S{product.price} | Product #:{product.id} | {product.units_available}{" "}
        available
      </h3>
      <div id="product-images-container">
        {/* <img id="preview-image" src={previewImage.url} alt={`Product ${product.id}`} />
        <span id="none-prev">
          {product.ProductImages.length > 0 && product.ProductImages.map(image => (
            image.id !== previewImage.id ? (
              <img className="product-img" id={`img-${imgNum++}`} key={image.id} src={image.url} alt={`Product ${image.id}`} />
            ) : null
          ))}
        </span> */}
      </div>
      <h4 id="product-owner">Sold by {product.seller}</h4>
      <div id="product-details-lower">
        <p id="product-description">{product.description}</p>
        {/* <CallOutBox numReviews={numReviews} avgRating={revAvg.toFixed(1)} product={product} /> */}
      </div>
      {/* <ReviewArea setRevAvg={setRevAvg} numRevs={setNumReviews} revAvg={revAvg} product={product} /> */}
      <Reviews product={product} />
    </div>
  ) : null;
};

export default ProductShow;
