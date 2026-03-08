// src/components/HeroNew.jsx
import '../styles/hero.css';


const HeroNew = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Варить кофе?</h1>
        <h2>Легко</h2>
        <p>Переходи на страницу рецептов и изучай</p>
      </div>
      
      <div className="hero-images">
        <img src="https://cdn.loveandlemons.com/wp-content/uploads/2023/06/iced-matcha-latte.jpg" alt="Iced Matcha Latte" className="hero-img" />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN9l75rAU88oMozXXxdcOI35-YQxvWPoxPfA&s" alt="Latte Art" className="hero-img" />
      </div>
    </section>
  );
};

export default HeroNew;