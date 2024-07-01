import React, { useEffect, useState } from "react";
import Bestseller from "../components/Bestseller/Bestseller";
import Carousel from "../components/Carousel/Carousel";
import InfoProducts from "../components/InfoProducts/InfoProducts";
import Menu from "../components/Menu/Menu";
import Map from "../components/Map/Map";
import InfoRestaurant from "../components/InfoRestaurant/InfoRestaurant";
//import Banner from "../components/Banner/Banner"; //A rajouter si le client souhaite une bannière entre le menu et les infos du restaurant
import Contact from "../components/Contact/Contact";
import { Link } from "react-router-dom";
import DeliveryLinks from "../components/DeliveryLinks/DeliveryLinks";

function Home() {
    const [hasItems, setHasItems] = useState(false);

    useEffect(() => {
        const checkCartItems = () => {
            const cartItems = JSON.parse(localStorage.getItem("foodSaiko")) || [];
            setHasItems(cartItems.length > 0);
        };

        // Vérifier les éléments du panier au montage
        checkCartItems();

        // Ajouter un intervalle pour vérifier périodiquement les changements
        const intervalId = setInterval(checkCartItems, 1000);

        // Nettoyer l'intervalle lors du démontage du composant
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <DeliveryLinks show={true}/>
            <Bestseller />
            <Carousel />
            <InfoProducts />
            <Menu />
            <InfoRestaurant />
            <Map />
            <Contact />
            <Link to="/panier">
                <div className="cart-logo">
                    {hasItems && <div className="cart-indicator"></div>}
                    <span className="material-symbols-outlined">shopping_basket</span>
                </div>
            </Link>
            <style>{`
                .cart-logo {
                    position: fixed;
                    bottom: 40px;
                    right: 40px;
                    z-index: 999;
                    background-color: var(--secondary-color);
                    border-radius: 50%;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    transition: transform 0.3s ease;
                    padding: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .cart-indicator {
                    position: absolute;
                    top: 0;
                    left: 0;
                    transform: translate(-50%, -50%);
                    height: 15px;
                    width: 15px;
                    background-color: var(--primary-color);
                    border-radius: 50%;
                    z-index: 1000;
                }

                .cart-logo span {
                    font-size: 35px;
                    color: #fff;
                }

                .cart-logo:hover {
                    transform: scale(1.1);
                    cursor: pointer;
                    background-color: var(--primary-color);
                }


            `}</style>
        </div>
    );
}

export default Home;
