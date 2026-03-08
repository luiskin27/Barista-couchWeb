import { useDispatch } from "react-redux";
import { toggleTheme } from "../features/ui/uiSlice";
import "../styles/header.css";  

const Header = () => {
  const dispatch = useDispatch();

  return (
    <header className="header">
      <div className="header-inner container">
      

<div className="logo">
  <img src="/src/assets/starbucks-logo.png" alt="Barista Trainer" className="logo-img" />
  <span className="logo-text">Barista Trainer</span>
</div>

<nav className="nav">
  <a href="/" className="nav-link">Главная</a>
  <a href="/recipes" className="nav-link">Рецепты</a>
  <a href="https://docs.google.com/forms/d/e/1FAIpQLSebTe2g7R5YEiJs9HZHzOpgESSjZ3nDPOvm4VNWIEzUJGgVxQ/viewform?usp=dialog" target="_blank" className="nav-link quiz-btn">
    Quiz
  </a>
  <a href="/#recipes" className="nav-link">Добавить рецепт</a>
</nav>


       
        <nav className="nav">
          
        </nav>

        
        <button
          className="theme-btn"
          onClick={() => dispatch(toggleTheme())}
        >
          Сменить тему
        </button>
      </div>
    </header>
  );
};

export default Header;