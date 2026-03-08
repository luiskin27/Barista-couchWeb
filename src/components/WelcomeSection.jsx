// src/components/Hero.jsx
import '../styles/hero.css';  
import matchaImg from '../assets/matcha.jpg';
import latteImg from '../assets/Latte.jpg'; 

const WelcomeSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Стань уверенным бариста с нуля</h1>
        <p>Повторяй рецепты шаг за шагом, запоминай температуры и пропорции</p>
      </div>

      <div className="hero-images">
        <img src={matchaImg} alt="Iced Matcha" className="hero-img" />
        <img src={latteImg} alt="Latte Art" className="hero-img" />
      </div>
    </section>
  );
};

export default Hero;