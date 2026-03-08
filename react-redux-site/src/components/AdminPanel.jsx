import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addRecipe } from '../features/recipe/recipeSlice';

import '../styles/admin.css'; // если есть стили — подключи, иначе удали строку

const AdminPanel = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [grains, setGrains] = useState('');
  const [milk, setMilk] = useState('');
  const [temperature, setTemperature] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Простая валидация (можно расширить)
    if (!name.trim() || !image.trim()) {
      alert('Название и URL картинки обязательны!');
      return;
    }

    const newRecipe = {
      // id генерируем в slice (там уже есть логика maxId + 1), поэтому можно без id здесь
      name: name.trim(),
      image: image.trim(),
      grains: grains.trim(),
      milk: milk.trim(),
      temperature: temperature.trim(),
      ingredients: ingredients
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean),
      steps: steps
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean),
    };

    dispatch(addRecipe(newRecipe));

    // Очистка формы после успешного добавления
    setName('');
    setImage('');
    setGrains('');
    setMilk('');
    setTemperature('');
    setIngredients('');
    setSteps('');

    alert('Рецепт добавлен!'); // или красивый toast позже
  };

  return (
    <section className="admin container" style={{ padding: '60px 20px' }}>
      <h2>Добавить новый рецепт для тренировки</h2>
      
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
            placeholder="18 г кофе&#10;60 мл воды&#10;150 мл молока"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows={5}
          />
        </div>

        <div className="form-group">
          <label>Шаги приготовления (каждый с новой строки)</label>
          <textarea
            placeholder="1. Приготовить эспрессо&#10;2. Взбить молоко до 65 °C&#10;3. Собрать в чашку"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            rows={8}
          />
        </div>

        <button type="submit">Добавить рецепт</button>
      </form>
    </section>
  );
};

export default AdminPanel;