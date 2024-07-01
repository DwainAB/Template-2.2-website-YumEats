import React from "react";
import BannerImg from "../../Assets/banner1.png"
import "./Banner.css"

function Banner(){
    return(
        <div className="containerGlobalBanner">
            <img className="bannerImg" src={BannerImg} alt="" />
        </div>
    )
}

export default Banner