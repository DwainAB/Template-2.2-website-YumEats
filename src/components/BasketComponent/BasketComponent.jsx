import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./BasketComponent.css";
import textJson from "../TextJson/TextJson.json";
import { loadStripe } from "@stripe/stripe-js";

// Remplacez ceci par votre clé publique Stripe
const STRIPE_PUBLIC_KEY = "pk_test_51PS2vrE8TRppwfoolKn4KJiGRYFUx78J1FBLSelc66CdLHGE08LIgmTY2MSr2SXfNhok5CgOUBWnsfDh4ajCmPPY00qUF0Fpz0";

function BasketComponent() {
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [connectedAccountId, setConnectedAccountId] = useState("acct_1PUaTyCh3kVwqB3M");
    const nameRestaurant = textJson.refRestaurant;
    const [clientData, setClientData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        address: "",
        method: "",
        payment: "",
        ref_restaurant: nameRestaurant
    });
    const navigate = useNavigate();

    const stripePromise = useMemo(
        () =>
            loadStripe(STRIPE_PUBLIC_KEY, {
                stripeAccount: connectedAccountId,
            }),
        [connectedAccountId]
    );

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

        const stripe = await stripePromise;

        try {
            const storedCartItems = JSON.parse(localStorage.getItem('foodSaiko')) || [];
            const orderData = {
                ...clientData,
                cartItems: storedCartItems
            };

            const response = await fetch('https://sasyumeats.com/services/create-checkout-session.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    totalPrice: totalPrice,
                    connectedAccountId: connectedAccountId,
                    restaurantUrl: window.location.origin,
                    orderData: orderData
                }),
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP ! statut : ${response.status}`);
            }

            const session = await response.json();
            if (session.error) {
                throw new Error(session.error);
            }

            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                console.error(result.error.message);
            } else {
                navigate(`/payment-success?session_id=${session.id}`);
            }
        } catch (error) {
            console.error("Erreur lors de la création de la session de paiement : ", error);
            alert('Une erreur est survenue lors de la création de la session de paiement.');
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
            method: "",
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

    const handleFakeSubmit = (e) => {
        e.preventDefault();
        alert('Veuillez remplir tous les champs nécessaires et ajouter des articles au panier.');
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
                <form onSubmit={isSubmitDisabled() ? handleFakeSubmit : handleSubmitForm}>
                    <input type="text" name="firstname" placeholder="Prénom" value={clientData.firstname} onChange={handleFormChange} />
                    <input type="text" name="lastname" placeholder="Nom" value={clientData.lastname} onChange={handleFormChange} />
                    <input type="email" placeholder="email" name="email" value={clientData.email} onChange={handleFormChange} />
                    <input type="tel" placeholder="tel" name="phone" value={clientData.phone} onChange={handleFormChange} />
                    <input type="text" placeholder="adresse" name="address" value={clientData.address} onChange={handleFormChange} />
                    <select name="method" value={clientData.method} onChange={handleFormChange}>
                        <option value="">Livraison / Click and collect ?</option>
                        <option value="A emporter">Click and collect</option>
                        <option value="Livraison">Livraison</option>
                    </select>
                    <select name="payment" value={clientData.payment} onChange={handleFormChange}>
                        <option value="">Choisissez un moyen de payement</option>
                        <option value="Carte bancaire">Carte bancaire</option>
                        <option value="Espèces">Espèces</option>
                    </select>

                    <input type="submit" />
                </form>
            </div>
        </div>
    );
}

export default BasketComponent;