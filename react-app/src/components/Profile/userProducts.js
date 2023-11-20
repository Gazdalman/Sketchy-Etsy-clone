import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UserProducts({ user }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    // ! dispatch for user's products
    console.log(user);
  }, [dispatch]);
  return <h1>test</h1>;
}
