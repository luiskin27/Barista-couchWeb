// src/components/Hero.jsx
import '../styles/hero.css';  
import matchaImg from '../assets/matcha.jpg';
import latteImg from '../assets/Latte.jpg'; 

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Your handcrafted ritual starts here</h1>
        <p>Начни день с идеального матча или ароматного кофе</p>
      </div>

      <div className="hero-images">
        <img 
          src={matchaImg}
          alt="Iced Matcha Latte"
          className="hero-img"
        />
        <img 
          src={latteImg}
          alt="Latte Art Coffee"
          className="hero-img"
        />
      </div>
    </section>
  );
};

export default Hero;