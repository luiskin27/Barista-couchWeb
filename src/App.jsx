import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import RecipesPage from "./pages/RecipesPage"; 
import EditRecipePage from "./pages/EditRecipePage";

function App() {
  return (
    <Router>
      <Header />
  
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/recipes" element={<RecipesPage />} />
  <Route path="/edit/:recipeId" element={<EditRecipePage />} />  
</Routes>
      <Footer />
    </Router>
  );
}

export default App;