// src/components/AdminPanel.jsx
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { addRecipe, updateRecipe, cancelEdit } from '../features/recipe/recipeSlice';
import { useNavigate } from 'react-router-dom';

import '../styles/admin.css';

const AdminPanel = ({ recipeId = null, isEditing = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Находим рецепт:
  // - если есть recipeId (с отдельной страницы /edit/:id) — ищем по id в items
  // - если нет — берём из Redux (editingRecipe), если редактирование через старый способ
  const recipe = recipeId 
    ? useSelector(state => state.recipes.items.find(r => r.id === Number(recipeId)))
    : useSelector(state => state.recipes.editingRecipe);

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [grains, setGrains] = useState('');
  const [milk, setMilk] = useState('');
  const [temperature, setTemperature] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');

  // форма ктр мы зополняем чтобы добавить рецепт 
  useEffect(() => {
    if (recipe) {
      setName(recipe.name || '');
      setImage(recipe.image || '');
      setGrains(recipe.grains || '');
      setMilk(recipe.milk || '');
      setTemperature(recipe.temperature || '');
      setIngredients(recipe.ingredients?.join('\n') || '');
      setSteps(recipe.steps?.join('\n') || '');
    } else if (!isEditing) {
      
      setName('');
      setImage('');
      setGrains('');
      setMilk('');
      setTemperature('');
      setIngredients('');
      setSteps('');
    }
  }, [recipe, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !image.trim()) {
      alert('Название и URL картинки обязательны!');
      return;
    }

    const recipeData = {
      name: name.trim(),
      image: image.trim(),
      grains: grains.trim(),
      milk: milk.trim(),
      temperature: temperature.trim(),
      ingredients: ingredients.split('\n').map(line => line.trim()).filter(Boolean),
      steps: steps.split('\n').map(line => line.trim()).filter(Boolean),
    };

    if (isEditing && recipe) {
      // обновляем существующий рецепт
      dispatch(updateRecipe({ ...recipeData, id: recipe.id }));
      alert('Рецепт обновлён!');
      navigate('/recipes'); // возвращаем на список рецептов
    } else {
      
      dispatch(addRecipe(recipeData));
      alert('Рецепт добавлен!');
      navigate('/recipes');
    }
  };

  const handleCancel = () => {
    dispatch(cancelEdit());
    navigate('/recipes');
  };

  return (
    <section className="admin container">
      <h2>{isEditing ? 'Редактировать рецепт' : 'Добавить новый рецепт для тренировки'}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Название рецепта *</label>
          <input
            type="text"
            placeholder="Например: Flat White"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>URL картинки *</label>
          <input
            type="url"
            placeholder="https://images.unsplash.com/..."
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Зерна / основа</label>
          <input
            type="text"
            placeholder="100% арабика, средняя обжарка"
            value={grains}
            onChange={(e) => setGrains(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Молоко</label>
          <input
            type="text"
            placeholder="Цельное коровье 3.2% / овсяное"
            value={milk}
            onChange={(e) => setMilk(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Ключевые температуры</label>
          <input
            type="text"
            placeholder="Эспрессо 92–94 °C, молоко 60–65 °C"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Ингредиенты (каждый с новой строки)</label>
          <textarea
            placeholder="18 г кофе\n60 мл воды\n150 мл молока"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows={5}
          />
        </div>

        <div className="form-group">
          <label>Шаги приготовления (каждый с новой строки)</label>
          <textarea
            placeholder="1. Приготовить эспрессо\n2. Взбить молоко до 65 °C\n3. Собрать в чашку"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            rows={8}
          />
        </div>

        <div className="buttons" style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px' }}>
          <button type="submit">
            {isEditing ? 'Сохранить изменения' : 'Добавить рецепт'}
          </button>

          <button type="button" onClick={handleCancel} style={{ background: '#ccc', color: '#333' }}>
            Отмена
          </button>
        </div>
      </form>
    </section>
  );
};

export default AdminPanel;