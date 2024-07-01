import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../API/Api";
import "./BasketComponent.css";
import textJson from "../TextJson/TextJson.json";

function BasketComponent() {
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const nameRestaurant = textJson.refRestaurant;
    const [clientData, setClientData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        address: "",
        method: "A emporter",
        payment: "",
        ref_restaurant: nameRestaurant
    });
    const navigate = useNavigate();

    const openingHours = textJson.openingHours;

    const checkIfOpen = () => {
        const now = new Date();
        const currentDay = now.getDay();
        const currentHour = now.getHours() + now.getMinutes() / 60;

        const isOpenNow = openingHours.some(
            ({ day, start, end }) => day === currentDay && currentHour >= start && currentHour < end
        );

        setIsOpen(isOpenNow);
    };

    useEffect(() => {
        checkIfOpen();
        const interval = setInterval(checkIfOpen, 60000); // Vérifier toutes les minutes
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('foodSaiko')) || [];
        setCartItems(storedCartItems);
    }, []);

    useEffect(() => {
        const newTotalPrice = cartItems.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    
        setTotalPrice(newTotalPrice);
    }, [cartItems]);

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        if (isSubmitDisabled()) {
            alert('Veuillez remplir tous les champs nécessaires et ajouter des articles au panier.');
            return;
        }
        try {
            const storedCartItems = JSON.parse(localStorage.getItem('foodSaiko')) || [];
            const orderData = {
                ...clientData,
                cartItems: storedCartItems
            };

            const orderResponseData = await apiService.addClientAndOrder(orderData);
    
            if (orderResponseData.message !== 'Commande ajoutée avec succès.') {
                console.error('Réponse de l\'API commande:', orderResponseData);
                throw new Error('Problème lors de l\'envoi de la commande');
            }

            const emailResponse = await fetch('https://sasyumeats.com/services/sendEmail.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    email: clientData.email,
                    firstName: clientData.firstname,
                    lastName: clientData.lastname
                })
            });
    
            if (!emailResponse.ok) {
                throw new Error('Problème lors de l\'envoi de l\'e-mail de confirmation');
            }
    
            const emailData = await emailResponse.json();
            console.log('Réponse de l\'API e-mail:', emailData);
    
            resetFormData();
    
            alert("Votre commande a bien été envoyée !");
            localStorage.removeItem('foodSaiko');
            navigate('/');
        } catch (error) {
            console.error("Erreur lors de l'envoi du formulaire client : ", error);
            alert('Une erreur est survenue lors de l\'envoi du formulaire.');
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setClientData({ ...clientData, [name]: value });
    };

    function resetFormData() {
        setClientData({
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            address: "",
            method: "A emporter",
            payment: "",
            ref_restaurant: nameRestaurant
        });
    }

    const updateQuantity = (id, delta) => {
        let updatedCartItems = cartItems.map(item => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + delta };
            }
            return item;
        }).filter(item => item.quantity > 0);

        setCartItems(updatedCartItems);
        localStorage.setItem('foodSaiko', JSON.stringify(updatedCartItems));
    };

    const isSubmitDisabled = () => {
        return cartItems.length === 0 || !clientData.firstname || !clientData.lastname || !clientData.email || !clientData.phone || !clientData.address || !clientData.method || !clientData.payment;
    };

    const handleClick = (e) => {
        if (!isOpen) {
            e.preventDefault();
            alert('Le restaurant est actuellement fermé.');
        }
    };

    return (
        <div className="containerGlobalBasket">
            <div className="containerItemsBasket">
                <h2>Panier</h2>
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <div key={item.id} className="basket-item">
                            <p><span className="textGold">{item.quantity} x</span> - {item.title}</p>
                            <div className="container-btn-item">
                                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="basket-empty">
                        <span className="material-symbols-outlined">production_quantity_limits</span>
                        <p>Votre panier est actuellement vide</p>
                    </div>
                )}
                {cartItems.length > 0 ? (<p className="total-price"><span className="textGold">Prix total :</span> {totalPrice.toFixed(2)} €</p> ) : ('')}                   
            </div>

            <div className="containerFormBasket">
                <form onSubmit={handleSubmitForm}>
                    <input type="text" name="firstname" placeholder="Prénom" value={clientData.firstname} onChange={handleFormChange} />
                    <input type="text" name="lastname" placeholder="Nom" value={clientData.lastname} onChange={handleFormChange} />
                    <input type="email" placeholder="email" name="email" value={clientData.email} onChange={handleFormChange} />
                    <input type="tel" placeholder="tel" name="phone" value={clientData.phone} onChange={handleFormChange} />
                    <input type="text" placeholder="adresse" name="address" value={clientData.address} onChange={handleFormChange} />
                    <select name="method" value={clientData.method} onChange={handleFormChange}>
                        <option value="A emporter">Click and Collect</option>
                    </select>
                    <select name="payment" value={clientData.payment} onChange={handleFormChange}>
                        <option value="">Choisissez un moyen de payement</option>
                        <option value="Carte bancaire">Carte bancaire</option>
                        <option value="Espèces">Espèces</option>
                    </select>

                    <input type="submit" value="Commander" onClick={handleClick} disabled={isSubmitDisabled()} />
                    {!isOpen && <p>Le restaurant est actuellement fermé. Les heures d'ouverture sont de 11h à 15h et de 18h à 22h30.</p>}
                </form>
            </div>
        </div>
    );
}

export default BasketComponent;
