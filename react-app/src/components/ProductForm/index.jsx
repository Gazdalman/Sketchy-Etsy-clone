import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, editProduct } from "../../store/product";
import { useHistory, useParams } from "react-router-dom";

const ProductFormPage = ({ type, product }) => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState(type == "edit" ? product.name : "");
  const [category, setCategory] = useState(
    type == "edit" ? product.categories : ""
  );
  const [price, setPrice] = useState(type == "edit" ? product.price : "");
  const [description, setDescription] = useState(
    type == "edit" ? product.description : ""
  );
  const [imageLoading, setImageLoading] = useState(false);
  const [prevImg, setPrevImg] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [img4, setImg4] = useState("");
  const [img5, setImg5] = useState("");
  const [unitsAvailable, setUnitsAvailable] = useState(
    type == "edit" ? product.units_available : 1
  );
  const [errors, setErrors] = useState("");
  const [disabled, setDisabled] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false);

  const removeImgs = (e) => {
    if (!e.target.value) {
      setImg1("");
      setImg2("");
      setImg3("");
      setImg4("");
      setImg5("");
    }
    setPrevImg(e.target.files[0]);
  };
  const checkPrice = (price) => {
    if (price < 1) {
      setPrice(1);
      return 1;
    }
    return price;
  };

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!name || name.length < 3 || name.length > 50) setDisabled(true)
    if (!description || description.length < 10) setDisabled(true)
    if (!prevImg && type != 'edit') setDisabled(true)
  }, [name, description, prevImg])

  if (!user) {
    return history.replace("/")
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    product = {
      name,
      description,
      category,
      price,
      units_available: unitsAvailable,
      preview: prevImg,
    };

    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("units_available", unitsAvailable);
    formData.append("preview", prevImg);

    let num = 1;
    for (const img of [img1, img2, img3, img4, img5]) {
      if (img) {
        formData.append(`img${num}`, img);
      }
      num += 1;
    }

    setImageLoading(true);
    const id = await dispatch(createProduct(product, images))
    return history.push(`/products/${id}`)
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    const productData = new FormData()
    productData.append('name', name)
    productData.append('description', description)
    productData.append('category', category)
    productData.append('price', price)
    productData.append('units_available', unitsAvailable)

    const updated = await dispatch(editProduct(productData, product.id))
    if (updated.errors) {
      const errs = {}
      for (const err in updated.errors) {
        const parts = err.split(' : ')
        errs[parts[0]] = parts[1]
      }
      setErrors(errs)
      if ( errors.not_found || errors.unauthorized ) {
        return history.replace("/")
      }
    } else {
      return history.push(`/products/${updated.id}`)
    }
  }

  const goBack = (e) => {
    e.preventDefault()
    return history.goBack()
  }

  return !imageLoading ? (
    <div>
      <h1>What Are Yuh Sellin'?</h1>
      <form
        onSubmit={type !== 'edit' ? handleCreate : handleEdit}
        encType="multipart/form-data"
      >
        <span>
          Product Name*
          {errors.name && <p>{errors.name}</p>}
          <input
            type="text"
            placeholder="Name must be 3-50 characters"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </span>
        <span>
          Product Category*
          {errors.category && <p>{errors.category}</p>}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select...</option>
            <option value="Jackets and Coats">Jackets and Coats</option>
            <option value="Shirts and Tops">Shirts and Tops</option>
            <option value="Bottoms and Pants">Bottoms and Pants</option>
            <option value="Kitchen/Home">Kitchen/Home</option>
            <option value="Bathroom">Bathroom</option>
            <option value="Gardening">Gardening</option>
            <option value="Other">Other</option>
            {/* Add more options as needed */}
          </select>
        </span>
        <span>
          Description*
          {errors.description && <p>{errors.description}</p>}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={2000}
            cols={50}
            rows={5}
            placeholder=
            {'10 or more characters \n(Add any tags at the bottom with an "#" before it)'}
          />
          <p className={`char-count ${2000 - description.length <= 50 ? 'low-count' : ''}`}>
            Characters remaining: {2000 - description.length} / {2000}
          </p>
        </span>
        {type != "edit" && (
          <>
            <span>
              Preview Image*
              <input
                type="file"
                value={undefined}
                onChange={(e) => removeImgs(e)}
                accept="image/*"
              />
            </span>
            <span>
              Add Image
              <input
                type="file"
                disabled={!prevImg}
                value={undefined}
                onChange={(e) => setImg1(e.target.files[0])}
                accept="image/*"
              />
            </span>
            <span>
              Add Image
              <input
                type="file"
                value={undefined}
                disabled={!prevImg}
                onChange={(e) => setImg2(e.target.files[0])}
                accept="image/*"
              />
            </span>
            <span>
              Add Image
              <input
                type="file"
                value={undefined}
                disabled={!prevImg}
                onChange={(e) => setImg3(e.target.files[0])}
                accept="image/*"
              />
            </span>
            <span>
              Add Image
              <input
                type="file"
                disabled={!prevImg}
                value={undefined}
                onChange={(e) => setImg4(e.target.files[0])}
                accept="image/*"
              />
            </span>
            <span>
              Add Image
              <input
                type="file"
                value={undefined}
                disabled={!prevImg}
                onChange={(e) => setImg5(e.target.files[0])}
                accept="image/*"
              />
            </span>
          </>
        )}
        <span>
          Price
          {errors.price && <p>{errors.price}</p>}
          <input
            type="number"
            step=".01"
            value={checkPrice(price)}
            placeholder="$USD"
            onChange={e => setPrice(e.target.value)}
            onBlur={(e) => {
              const parsedValue = parseFloat(e.target.value).toFixed(2);
              setPrice(parsedValue);
            }}
          />
        </span>
        <span>
          Units Available
          {errors.units_available && <p>{errors.units_available}</p>}
          <input
            type="number"
            min={type == 'edit' ? 0 : 1}
            value={unitsAvailable}
            placeholder="# of units you have"
            onChange={(e) => setUnitsAvailable(e.target.value)}
          />
        </span>
        <button type="submit" disabled={disabled}>{type == 'edit' ? 'Edit Product' : 'Create Product'}</button>
        <button onClick={e => goBack(e)}>Cancel</button>
      </form>
    </div>
  ) : (
    <h1>We loading...</h1>
  );
};

export default ProductFormPage;
