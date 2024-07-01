import React from "react";
import ImgBestseller from "../../Assets/imgRamen.jpeg"
import "./Bestseller.css"
import textJson from "../TextJson/TextJson.json"

function Bestseller (){

    const formatText = (text) => {
        return text.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ));
      };

    return(
        <div className="containerGlobalBestseller">

            <div className="containerImgBestseller">
                <img className="imgBestseller" src={ImgBestseller} alt="" />
                <div className="shadowBestseller"></div>
            </div>

            <div className="containerInfoBestseller">
                <h2 className="titleBestseller">{formatText(textJson.titleBestseller)}</h2>
                <p className="textBestseller">{formatText(textJson.textBestseller)}</p>
                <div className="containerBtn"><a className="btnBestseller" target="blanck" href={textJson.redirectionBestseller}>{formatText(textJson.btnBestseller)}</a></div>
            </div>

        </div>
    )
}

export default Bestseller