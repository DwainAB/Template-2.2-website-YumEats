import React from "react";
import ImgContact from "../../Assets/banner.jpg"
import "./Contact.css"
import textJson from "../TextJson/TextJson.json"

function Contact(){

    const formatText = (text) => {
        return text.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ));
      };

    return(
        <div className="containerGlobalContact" id="contact">

            <div className="containerInfoContact">

                <h2 className="titleContact">Contact</h2>

                <p className="textContact">{formatText(textJson.address)}
                    tel : <span className="textBoldContact">{formatText(textJson.phone)}</span>
                    mail : <span className="textBoldContact">{formatText(textJson.email)}</span>
                </p>

                <p className="textContact">Horaire d'ouverture :<br/>
                <span className="textContact textBoldContact">{formatText(textJson.hourly)}</span></p>
            </div>

            <div className="containerImgContact">
                <img className="imgContact" src={ImgContact} alt="" />
            </div>

        </div>
    )
}

export default Contact