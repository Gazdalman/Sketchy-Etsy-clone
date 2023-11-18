import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";


function Reviews({ Review }) {
  const dispatch = useDispatch();


  return (

        <>
            <p>
            {Review?.length == 1 ? (<h1>{Review.length} Review</h1>): (<h1>{Review.length} Reviews</h1>)}
            <div style={{ display: "flex", justifyContent: "space-around" }}>
            <label>
                <div
                class="rating"
                style={{ display: "flex", flexDirection: "row" }}
                >
                    <i
                    className={
                        activeRating >= 1 || activeRating > 1 || stars >= 1
                        ? "fa-solid fa-star"
                        : "fa-regular fa-star"
                    }
                    ></i>
                    <i
                    className={
                        activeRating >= 2|| activeRating > 2 || stars >= 2
                        ? "fa-solid fa-star"
                        : "fa-regular fa-star"
                    }
                    ></i>
                    <i
                    className={
                        activeRating >= 3 || activeRating > 3 || stars >= 3
                        ? "fa-solid fa-star"
                        : "fa-regular fa-star"
                    }
                    ></i>
                    <i
                    className={
                        activeRating >= 4 || activeRating > 3 || stars >= 4
                        ? "fa-solid fa-star"
                        : "fa-regular fa-star"
                    }
                    ></i>
                    <i
                    className={
                        activeRating >= 5 || activeRating > 4 || stars >= 5
                        ? "fa-solid fa-star"
                        : "fa-regular fa-star"
                    }
                    ></i>
                </div>
            </label>
            </div>
            </p>
        </>
  );
}

export default Reviews;
