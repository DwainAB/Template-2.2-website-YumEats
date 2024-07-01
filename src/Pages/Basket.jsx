import React from "react";
import BasketComponent from "../components/BasketComponent/BasketComponent";
import DeliveryLinks from "../components/DeliveryLinks/DeliveryLinks"

function Basket (){

    return(
        <div>
            <BasketComponent />
            <DeliveryLinks show={false}/>
        </div>
    )
}

export default Basket