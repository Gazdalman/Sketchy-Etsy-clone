import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductFormPage = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [categories, setCategories] = useState([])
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [unitsAvailable, setUnitsAvailable] = useState(0)
  const [preview, setPreview] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)

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
          {categories.map(category => (
            <>
            </>
          ))}
          {/* <input
          type="text"
          placeholder="Name must be 3-50 characters"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          /> */}
          <select
          placeholder="--Category--"
          >
            <option>banana</option>
          </select>
        </span>
      </form>

    </div>

  )
}

export default ProductFormPage
