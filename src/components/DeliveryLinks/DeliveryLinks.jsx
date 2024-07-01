import React, { useState } from "react";
import "./DeliveryLinks.css"

function DeliveryLinks({show}){
    //const [links, setLinks] = useState(show)

    return(
        <div className="containerDeliveryLinks">

            {show && (
                <a href="#menu"><div className="containerClickAndCollect">
                    <span class="material-symbols-outlined">shopping_bag</span>
                    <p className="text-delivery">CLICK & COLLECT</p>
                </div></a>
            )}
            
            <a target="blank" href="https://www.order.store/store/saiko-ramen-cantine-victor-hugo/_iwpPVH3QtGwQozBddUjsA">
                <div className="containerLinks">
                    <span className="material-symbols-outlined">directions_bike</span>
                    <p className="text-delivery">LIVRAISON</p>
                </div>
            </a>
        
        </div>
    )
}

export default DeliveryLinks