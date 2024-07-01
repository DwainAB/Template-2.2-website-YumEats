const BASE_URL = 'https://sasyumeats.com/api'; 

export const apiService = {

    getFoods: async (nameRestaurant) => {
        try {
            const response = await fetch(`${BASE_URL}/foods/${nameRestaurant}`);
            return await response.json();
        } catch (error) {
            throw error;
        }
    },


    getAllCategories: async (nameRestaurant) => {
        try {
            const response = await fetch(`${BASE_URL}/foods/categories/${nameRestaurant}`, {
                method: 'GET',
            });
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    addClientAndOrder: async (clientData) => {
        try {
            const response = await fetch(`${BASE_URL}/foods/addClientAndOrder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(clientData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

};
