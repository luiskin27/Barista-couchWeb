// src/components/RecipesSection.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { 
  fetchRecipes, 
  selectRecipe, 
  clearSelected,
  startEditRecipe,
  deleteRecipe 
} from '../features/recipe/recipeSlice';
import '../styles/recipes.css';

const RecipesSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const { items, status, selectedRecipe } = useSelector(state => state.recipes);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRecipes());
    }
  }, [dispatch]);

  if (status === 'loading') return <div className="loading">Загрузка рецептов... ☕</div>;
  if (status === 'failed') return <div>Ошибка загрузки</div>;

  return (
    <section className="recipes-section">
      <div className="container">
        <h2>Рецепты для тренировки</h2>

        {selectedRecipe ? (
          <div className="recipe-detail">
            {/* Кнопка Назад */}
            <button 
              className="back-btn" 
              onClick={() => dispatch(clearSelected())}
            >
              ← Назад к рецептам
            </button>

            {/* Фото */}
            <img 
              src={selectedRecipe.image} 
              alt={selectedRecipe.name} 
              className="detail-image"
            />

            {/* Название */}
            <h2 className="detail-title">{selectedRecipe.name}</h2>

            {/* Информация */}
            <div className="info">
              <p><strong>Зерна / основа:</strong> {selectedRecipe.grains || 'Не указано'}</p>
              <p><strong>Молоко:</strong> {selectedRecipe.milk || 'Не указано'}</p>
              <p><strong>Температура:</strong> {selectedRecipe.temperature || 'Не указано'}</p>
            </div>

            <h3>Ингредиенты</h3>
            <ul>
              {selectedRecipe.ingredients?.map((ing, i) => <li key={i}>{ing}</li>) || <li>Нет данных</li>}
            </ul>

            <h3>Шаги приготовления</h3>
            <ol>
              {selectedRecipe.steps?.map((step, i) => <li key={i}>{step}</li>) || <li>Нет данных</li>}
            </ol>

            {/* Кнопки Редактировать и Удалить — внизу */}
            <div className="detail-actions">
              <button 
                onClick={() => navigate(`/edit/${selectedRecipe.id}`)}
                className="edit-btn"
              >
                Редактировать рецепт
              </button>

              <button 
                onClick={() => {
                  if (window.confirm(`Удалить рецепт "${selectedRecipe.name}"?`)) {
                    dispatch(deleteRecipe(selectedRecipe.id));
                    dispatch(clearSelected());
                  }
                }}
                className="delete-btn"
              >
                Удалить рецепт
              </button>
            </div>
          </div>
        ) : (
          <div className="recipes-grid">
            {items.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#666', fontSize: '1.2rem' }}>
                Рецептов пока нет. Добавьте в админке!
              </p>
            ) : (
              items.map(recipe => (
                <div 
                  key={recipe.id} 
                  className="recipe-card"
                  onClick={() => dispatch(selectRecipe(recipe))}
                >
                  <img src={recipe.image} alt={recipe.name} />
                  <div className="content">
                    <h3>{recipe.name}</h3>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecipesSection;