import React, { useEffect } from 'react';

const PaymentSuccess = () => {

    useEffect(() => {
        localStorage.clear();
    }, []);

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            marginTop:"70px"
        },
        title: {
            fontSize: '2.5em',
            marginBottom: '1em',
            color: "#fff"
        },
        text: {
            fontSize: '1.5em',
            color: "#fff"
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Merci pour votre commande!</h1>
            <p style={styles.text}>Votre paiement a été effectué avec succès. Un mail de confirmation vous a été envoyé !</p>
        </div>
    );
};

export default PaymentSuccess;