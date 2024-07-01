import React from "react";
import textJson from "../TextJson/TextJson.json"
import imgProduct from "../../Assets/imgProduct.jpg"

function InfoProducts(){

    const formatText = (text) => {
        return text.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ));
      };

    return(
        <div className="containerGlobalBestseller" id="infoProducts">

            <div className="containerInfoBestseller">
                <h2 className="titleBestseller">Nos produits</h2>
                <p className="textBestseller">{formatText(textJson.textInfoProducts)}</p>
            </div>

            <div className="containerImgBestseller">
                <img className="imgBestseller" src={imgProduct} alt="" />
                <div className="shadowBestseller"></div>
            </div>

        </div>
    )
}

export default InfoProducts