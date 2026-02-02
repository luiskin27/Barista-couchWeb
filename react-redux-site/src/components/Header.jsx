import { useDispatch } from "react-redux";
import { toggleTheme } from "../features/ui/uiSlice";
import "../styles/header.css";  

const Header = () => {
  const dispatch = useDispatch();

  return (
    <header className="header">
      <div className="header-inner container">
      
        <div className="logo">
          <img
            src="/src/assets/starbucks-logo.png"  
            alt="Coffee Shop Logo"
            className="logo-img"
          />
          <span className="logo-text">MatchaLatte</span>  
        </div>

       
        <nav className="nav">
          <a href="#" className="nav-link">Главная</a>
          <a href="#" className="nav-link">Меню</a>
          <a href="#" className="nav-link">О нас</a>
          <a href="#" className="nav-link">Магазин</a>
          <a href="#" className="nav-link">Блог</a>
          <a href="#" className="nav-link">Контакты</a>
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