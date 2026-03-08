// src/pages/EditRecipePage.jsx
import { useParams, useNavigate } from 'react-router-dom';
import AdminPanel from '../components/AdminPanel'; // правильный путь

const EditRecipePage = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ padding: '80px 20px', background: '#f9f9f9' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Только кнопка Назад, без лишних кнопок */}
        <button 
          onClick={() => navigate(-1)}
          style={{
            background: '#006241',
            color: 'white',
            border: 'none',
            padding: '12px 28px',
            borderRadius: '30px',
            cursor: 'pointer',
            fontSize: '1.1rem',
            marginBottom: '40px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
          }}
        >
          ← Назад к рецептам
        </button>

        {/* Заголовок только для редактирования */}
        <h1 style={{
          textAlign: 'center',
          color: '#006241',
          fontSize: '2.5rem',
          marginBottom: '40px'
        }}>
          Редактировать рецепт
        </h1>

        {/* Форма редактирования */}
        <AdminPanel recipeId={Number(recipeId)} isEditing={true} />
      </div>
    </div>
  );
};

export default EditRecipePage;