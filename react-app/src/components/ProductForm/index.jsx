import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductFormPage = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [unitsAvailable, setUnitsAvailable] = useState(0)
  const [preview, setPreview] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)

  let starterKey = -1
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div>
      <h1>What Are Yuh Sellin'?</h1>
      <form>
        <span>
          Product Name:
          <input
            type="text"
            placeholder="Name must be 3-50 characters"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </span>
        <span>
          Product Categories:
          <div>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
          </div>


          {/* <input
          type="text"
          placeholder="Name must be 3-50 characters"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          /> */}
        </span>
      </form>

    </div>

  )
}

export default ProductFormPage
