import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/Logo.png"

import "./LandingPage.css"



function LandingPage() {
    return (
        <>
            <h1>Hello  from Landing </h1>
            <div className="landing-container">
                <img src={logo} alt="logo" style={{width:600, height:600}}/>
                <Link to="/home" >
                    <button
                    id="landing-btn"
                    onClick={{}}
                    >YOU’VE WON $500 CLICK NOW!</button>
                </Link>
            </div>
        </>

    );
}

export default LandingPage
