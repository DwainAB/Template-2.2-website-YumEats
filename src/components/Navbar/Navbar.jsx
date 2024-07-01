import React, { useState } from "react";
import Banner from "../../Assets/banner1.png";
import "./Navbar.css";
import textJson from "../TextJson/TextJson.json";
import logo from "../../Assets/logo.png";
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleAnchorClick = (anchor) => {
        navigate('/');
        setTimeout(() => {
            const element = document.getElementById(anchor);
            if (element) {
                const offset = -80; // Ajustez cette valeur selon la hauteur de votre barre de navigation
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = element.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition + offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }, 100);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const formatText = (text) => {
        return text.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    };

    return (
        <div className="containerGlobalNavbar">
            <img className="imageBanner" src={Banner} alt="" />
            <div className="containerShadowNavbar"></div>
            <div className="containerTitleNavbar">
                <img className="logo" src={logo} alt="logo" />
                <h1 className="titleNavbar">{formatText(textJson.restaurantName)}</h1>
            </div>
            <div className={`menu-icon ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <nav className={`navbar ${isOpen ? "open" : ""}`}>
                <Link to="/">
                    <div className="navbarItem" onClick={toggleMenu}>{formatText(textJson.nav1)}</div>
                </Link>
                <Link to="/" onClick={() => handleAnchorClick('carousel')}>
                    <div className="navbarItem" onClick={toggleMenu}>{formatText(textJson.nav2)}</div>
                </Link>
                <Link to="/" onClick={() => handleAnchorClick('menu')}>
                    <div className="navbarItem" onClick={toggleMenu}>{formatText(textJson.nav3)}</div>
                </Link>
                <Link to="/" onClick={() => handleAnchorClick('infoRestaurant')}>
                    <div className="navbarItem" onClick={toggleMenu}>{formatText(textJson.nav4)}</div>
                </Link>
                <Link to='/' onClick={() => handleAnchorClick('contact')}>
                    <div className="navbarItem" onClick={toggleMenu}>{formatText(textJson.nav5)}</div>
                </Link>
            </nav>
        </div>
    );
}

export default Navbar;
