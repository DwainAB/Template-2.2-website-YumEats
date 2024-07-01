import React from "react";
import ImgResto1 from "../../Assets/imgResto1.jpg"
import ImgResto2 from "../../Assets/imgResto2.jpg"
import ImgResto3 from "../../Assets/imgResto3.jpg"
import "./InfoRestaurant.css"
import textJson from "../TextJson/TextJson.json"

function InfoRestaurant(){

    const formatText = (text) => {
        return text.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ));
      };

    return(
        <div className="containerGlobalInfoRestaurant" id="infoRestaurant">

            <div className="containerTextInfoRestaurant">
                <h2 className="titleInfoRestaurant">Notre restaurant</h2>
                <div className="line"></div>
                <p className="textInfoRestaurant">{formatText(textJson.textInfoRestaurant)}</p>
            </div>

            <div className="containerImgInfoRestaurant">
                <img className="imgInfoRestaurant" src={ImgResto1} alt="" />
                <img className="imgInfoRestaurant" src={ImgResto2} alt="" />
                <img className="imgInfoRestaurant" src={ImgResto3} alt="" />
            </div>
        </div>
    )
}

export default InfoRestaurant