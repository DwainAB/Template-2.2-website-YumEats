import React, { useState, useEffect } from 'react';
import './Menu.css';
import { apiService } from "../API/Api";
import textJson from "../TextJson/TextJson.json";

function Menu() {
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartUpdated, setCartUpdated] = useState(false); // Nouvel état pour suivre les mises à jour du panier
  const nameRestaurant = textJson.refRestaurant;

  useEffect(() => {
      const fetchFoodsAndCategories = async () => {
          try {
              const fetchedFoods = await apiService.getFoods(nameRestaurant);
              const fetchedCategories = await apiService.getAllCategories(nameRestaurant);
              setFoods(fetchedFoods);
              setCategories(fetchedCategories);
          } catch (error) {
              console.error("Erreur lors de la récupération des données :", error);
          }
      };

      fetchFoodsAndCategories();
  }, [nameRestaurant]);

  useEffect(() => {
    const handleResize = () => setItemsPerPage(getItemsPerPage());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function getItemsPerPage() {
    return window.innerWidth <= 1062 ? 6 : 10;
  }

  const filterItems = (items) => {
    if (filter === 'all') return items;
    return items.filter(item => item.category === filter);
  };

  // Get current items
  const filteredItems = filterItems(foods);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredItems.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const addToLocalStorage = (food) => {
    // Récupérer la liste des plats stockés ou initialiser un tableau vide si ce n'est pas le cas
    let storedFoods = JSON.parse(localStorage.getItem('foodSaiko')) || [];

    // Trouver l'index de l'élément s'il existe déjà dans le panier
    const existingFoodIndex = storedFoods.findIndex(item => item.id === food.id);

    if (existingFoodIndex !== -1) {
        // Si l'élément existe déjà, augmenter la quantité
        storedFoods[existingFoodIndex].quantity += 1;
    } else {
        // Si l'élément n'existe pas, l'ajouter avec une quantité initiale de 1
        storedFoods.push({ ...food, quantity: 1 });
    }

    // Sauvegarder le tableau mis à jour dans le localStorage
    localStorage.setItem('foodSaiko', JSON.stringify(storedFoods));

    // Afficher une confirmation ou mettre à jour l'interface utilisateur
    alert(`Ajouté au panier: ${food.title}`);
    setCartUpdated(!cartUpdated); // Mettre à jour l'état pour forcer un re-render si nécessaire
  };

  return (
    <div className="containerGlobalMenu" id='menu'>
      <div className='lineMenu'></div>
      <h2 className="titleMenu">MENU</h2>
      <div className="filter">
        <select id="category-filter" onChange={(e) => { setFilter(e.target.value); setCurrentPage(1); }}>
          <option value="all">Tous</option>
          {categories.map((category, index) => (
            <option key={index} value={category.name}>{category.name}</option>
          ))}
        </select>
      </div>
      <h2 className={`categoryTitle ${filter === 'all' ? 'allProducts' : ''}`}>
        {filter === 'all' ? 'Tous nos produits' : filter.charAt(0).toUpperCase() + filter.slice(1)}
      </h2>
      <div className="menu">
        {currentItems.map((item, index) => (
          <div key={index} className="menu-item">
            <div className='titlePriceProduct'>
                <div className="item-name">{item.title}</div>
                <div className="item-price">{item.price} €</div>
            </div>
            <div className="item-description" data-full-description={item.description}>
              {item.description}
            </div>
            <button onClick={() => addToLocalStorage(item)} className='addLocalStorage'>Ajouter</button>
          </div>
        ))}
      </div>
      <div className="pagination">
        {pageNumbers.map(number => (
          <a href="#menu" key={number}><button onClick={() => paginate(number)} className={number === currentPage ? 'active' : ''}>
            {number}
          </button></a>
        ))}
      </div>
    </div>
  );
}

export default Menu;
