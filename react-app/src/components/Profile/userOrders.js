import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";


export default function PastOrder() {
    const dispatch = useDispatch();
    const history = useHistory();


    return (
        <>
            <h1>Past Order</h1>
        </>
    );
}
