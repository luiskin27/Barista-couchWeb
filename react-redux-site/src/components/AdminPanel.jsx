import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDrink, updateDrink, deleteDrink } from '../features/menu/menuSlice';
import '../styles/admin.css';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.menu.items);

  const [formData, setFormData] = useState({
    name: '', price: '', description: '', image: '', 
    category: '', calories: '', size: ''
  });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const drinkData = {
      name: formData.name,
      price: Number(formData.price),
      description: formData.description,
      image: formData.image,
      category: formData.category,
      calories: Number(formData.calories),
      size: formData.size,
    };

    if (editingId) {
      dispatch(updateDrink({ id: editingId, ...drinkData }));
      setEditingId(null);
    } else {
      dispatch(addDrink(drinkData));
    }

    // очистка формы
    setFormData({
      name: '', price: '', description: '', image: '', 
      category: '', calories: '', size: ''
    });
  };

  const handleEdit = (drink) => {
    setFormData({
      name: drink.name,
      price: drink.price,
      description: drink.description,
      image: drink.image,
      category: drink.category,
      calories: drink.calories,
      size: drink.size,
    });
    setEditingId(drink.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Точно удалить этот напиток?')) {
      dispatch(deleteDrink(id));
    }
  };

  return (
    <section className="admin-panel container">
      <h2>Админ-панель: Управление меню </h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <h3>{editingId ? 'Редактировать напиток' : 'Добавить новый напиток'}</h3>
        
        <input name="name" placeholder="Название" value={formData.name} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Цена (сом)" value={formData.price} onChange={handleChange} required />
        <input name="description" placeholder="Описание" value={formData.description} onChange={handleChange} required />
        <input name="image" placeholder="URL картинки" value={formData.image} onChange={handleChange} required />
        <input name="category" placeholder="Категория (Matcha / Coffee / Frappuccino)" value={formData.category} onChange={handleChange} required />
        <input name="calories" type="number" placeholder="Калории" value={formData.calories} onChange={handleChange} required />
        <input name="size" placeholder="Размер (Tall / Grande / Venti)" value={formData.size} onChange={handleChange} required />

        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            {editingId ? 'Сохранить изменения' : 'Добавить напиток'}
          </button>
          {editingId && (
            <button type="button" className="cancel-btn" onClick={() => {
              setEditingId(null);
              setFormData({ name:'', price:'', description:'', image:'', category:'', calories:'', size:'' });
            }}>
              Отмена
            </button>
          )}
        </div>
      </form>

      <div className="admin-list">
        <h3>Все напитки ({items.length})</h3>
        <div className="admin-grid">
          {items.map(drink => (
            <div key={drink.id} className="admin-card">
              <img src={drink.image} alt={drink.name} />
              <h4>{drink.name}</h4>
              <p className="price">{drink.price} сом</p>
              <div className="card-actions">
                <button onClick={() => handleEdit(drink)} className="edit-btn"> Редактировать</button>
                <button onClick={() => handleDelete(drink.id)} className="delete-btn"> Удалить</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;