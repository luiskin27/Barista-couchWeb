// src/components/MenuSection.jsx   ← НОВЫЙ компонент
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenu, selectDrink, clearSelected } from '../features/menu/menuSlice';
import '../styles/menu.css';  // создадим стили ниже

const MenuSection = () => {
  const dispatch = useDispatch();
  const { items, status, selectedDrink } = useSelector(state => state.menu);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMenu());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div className="loading">Загружаем меню... ☕</div>;
  }

  if (status === 'failed') {
    return <div>Ошибка загрузки меню</div>;
  }

  return (
    <section className="menu-section container">
      <h2>Наше меню</h2>

      {selectedDrink ? (
        // DETAIL view
        <div className="drink-detail">
          <button className="back-btn" onClick={() => dispatch(clearSelected())}>
            ← Назад к меню
          </button>
          <img src={selectedDrink.image} alt={selectedDrink.name} />
          <h3>{selectedDrink.name}</h3>
          <p className="price">{selectedDrink.price} сом</p>
          <p>{selectedDrink.description}</p>
          <p><strong>Категория:</strong> {selectedDrink.category}</p>
          <p><strong>Калорий:</strong> {selectedDrink.calories} ккал</p>
          <p><strong>Объём:</strong> {selectedDrink.size}</p>
        </div>
      ) : (
        // LIST view
        <div className="menu-grid">
          {items.map(drink => (
            <div 
              key={drink.id} 
              className="menu-card"
              onClick={() => dispatch(selectDrink(drink))}
            >
              <img src={drink.image} alt={drink.name} />
              <h4>{drink.name}</h4>
              <p className="price">{drink.price} сом</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MenuSection;