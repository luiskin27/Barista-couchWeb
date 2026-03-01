// src/pages/Home.jsx  
import { useSelector } from "react-redux";
import { useEffect } from "react";
import MenuSection from "../components/MenuSection"; 
import AdminPanel from "../components/AdminPanel"; 
import "../styles/home.css";

const Home = () => {
  const theme = useSelector(state => state.ui.theme);
  
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <main className="home container">
    
      <section className="welcome">
        <h2>Добро пожаловать в MatchaLatte</h2>
        <p>Выберите свой идеальный напиток дня</p>
      </section>

   
      <MenuSection />

      <AdminPanel />
      
      <section className="promo">
        <h3>Акция недели</h3>
        <p>Скидка 20% на все матча-напитки по понедельникам!</p>
      </section>
    </main>
  );
};

export default Home;