
import React from 'react';
import './App.css';
import Main from './pages/Main'
import AddRecipe from './pages/AddRecipe'
import RecipeOverview from './pages/RecipeOverview';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Header from './components/Header';


const App = () => {
  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/AddRecipe" element={<AddRecipe />} />
          <Route path="/RecipeOverview/:id" element={<RecipeOverview />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
