// src/pages/RecipesPage.jsx

import RecipesSection from '../components/RecipesSection';  // если компонент называется RecipesSection.jsx
// или import MenuSection from '../components/MenuSection'; — если ты ещё не переименовала его

const RecipesPage = () => {
  return (
    <div className="recipes-page">
      <RecipesSection />  {/* здесь будут показаны все карточки рецептов */}
    </div>
  );
};

export default RecipesPage;