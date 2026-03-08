// src/pages/Home.jsx  
import { useSelector } from "react-redux";
import { useEffect } from "react";
import RecipesSection from "../components/RecipesSection";
// import MenuSection from "../components/MenuSection"; 
import AdminPanel from "../components/AdminPanel"; 
import "../styles/home.css";

const Home = () => {
  const theme = useSelector(state => state.ui.theme);
  
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <main className="home container">
    
      

   
      {/* <MenuSection /> */}

      <AdminPanel />

      <RecipesSection />
      
      {/* <section className="promo">
        <h3>Акция недели</h3>
        <p>Скидка 20% на все матча-напитки по понедельникам!</p>
      </section> */}
    </main>
  );
};

export default Home;