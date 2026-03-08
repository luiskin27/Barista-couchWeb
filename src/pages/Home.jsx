// src/pages/Home.jsx  
import { useSelector } from "react-redux";
import { useEffect } from "react";
import RecipesSection from "../components/RecipesSection";
 
import AdminPanel from "../components/AdminPanel"; 
import "../styles/home.css";

const Home = () => {
  const theme = useSelector(state => state.ui.theme);
  
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <main className="home container">
    
      

   
      

      <AdminPanel />

      <RecipesSection />
      
      
    </main>
  );
};

export default Home;