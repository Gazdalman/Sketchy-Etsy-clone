import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';

import { NavLink } from "react-router-dom";
import { getAllProducts } from "../../store/product";
// import './SpotsIndex.css';

const ProductPage = () => {
  const spots = useSelector(state => state.products)

}
