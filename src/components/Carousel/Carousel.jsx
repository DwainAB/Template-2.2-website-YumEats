import React, { useState, useEffect } from "react";
import "./Carousel.css";
import textJson from "../TextJson/TextJson.json";
import { supabase } from '../SUPABASE/Supabase';

function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsToShow, setItemsToShow] = useState(1);
    const [foods, setFoods] = useState([]);
    const nameRestaurant = textJson.refRestaurant;

    useEffect(() => {
        const fetchFoodsAndCategories = async () => {
            try {
                const { data: fetchedFoods, error: foodError } = await supabase
                .from('products')
                .select('*')
                .eq('category_id', "ed107361-0222-4b83-932b-cd4f50c7d584");
                
              if (foodError) throw foodError;
              setFoods(fetchedFoods);
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchFoodsAndCategories();
    }, [nameRestaurant]);

    const formatText = (text) => {
        return text.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsToShow(1);
            } else if (window.innerWidth < 1200) {
                setItemsToShow(2);
            } else {
                setItemsToShow(3);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Définir la taille initiale

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => 
            (prevIndex === 0 ? foods.length - itemsToShow : prevIndex - 1)
        );
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => 
            (prevIndex === foods.length - itemsToShow ? 0 : prevIndex + 1)
        );
    };

    const displayItems = foods.slice(currentIndex, currentIndex + itemsToShow);

    return (
        <div className="containerGlobalCarousel" id="carousel">
            <h2 className="titleCarousel">{formatText(textJson.titleCarousel)}</h2>
            <div className="carousel">
                <button onClick={handlePrevClick} className="arrow left-arrow">&lt;</button>
                <div className="carousel-content">
                    {displayItems.map((item, index) => (
                        <div key={index} className="carousel-item">
                            <img className="imgCarousel" src={`${item.image_url}`} alt={item.title} />
                            <p className="textImgCarousel">{item.title}</p>
                        </div>
                    ))}
                </div>
                <button onClick={handleNextClick} className="arrow right-arrow">&gt;</button>
            </div>
        </div>
    );
}

export default Carousel;
