import React from "react";
import "./Map.css";

function Map() {
    return (
        <div className="containerGlobalMap">
            <iframe 
                id="gmap_canvas"
                src="https://maps.google.com/maps?width=1920&amp;height=400&amp;hl=en&amp;q=165%20bd%20victor%20hugo%20%20Saint-ouen-sur-seine+(saiko%20Ramen)&amp;t=&amp;z=11&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
            ></iframe>
            <script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=f6b1f9f5a1ac66edcdb95ee454e0575ead944bc3'></script>
        </div>
    );
}

export default Map;
