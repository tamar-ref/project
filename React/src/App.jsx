import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css'
import Recipes from './assets/features/Recipe/Recipes';
import SignIn from './assets/features/PersonalArea/SignIn'
import LogIn from './assets/features/PersonalArea/LogIn'
import MyRecipes from './assets/features/Recipe/MyRecipes'
import UpdateDetails from './assets/features/PersonalArea/UpdateDetails'
import Recipe from './assets/features/Recipe/Recipe';
import MyRecipe from './assets/features/Recipe/MyRecipe'
import Filter from './assets/features/RecipeActions/Filter';
import Instructions from './assets/features/RecipeActions/Instructions';
import AddRecipe from './assets/features/RecipeActions/AddRecipe';
import UpdateRecipe from './assets/features/RecipeActions/UpdateRecipe';
import MyFilter from './assets/features/RecipeActions/MyFilter';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) ||
  {
    userName: '',
    name: 'אנונימי',
    password: ''
  });
  const [filters, setFilters] = useState({ categories: [], types: [], methods: [], noIngredients: [], yesIngredients: [] });
  const [recipe, setRecipe] = useState(
    JSON.parse(localStorage.getItem('recipe'))
    || {
      name: '',
      userName: '',
      image: '',
      imageFile: '',
      category: 0,
      recipeType: 0,
      description: '',
      methods: ''
    });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('recipe', JSON.stringify(recipe));
  }, [user, recipe]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Recipes user={user} setUser={setUser} setRecipe={setRecipe} filters={filters} setFilters={setFilters} />} />
          <Route path='/signIn' element={<SignIn setUser={setUser} />} />
          <Route path='/logIn' element={<LogIn setUser={setUser} />} />
          <Route path='/myRecipes' element={<MyRecipes user={user} setUser={setUser} setRecipe={setRecipe} filters={filters} setFilters={setFilters} />} />
          <Route path='/updateDetails' element={<UpdateDetails user={user} setUser={setUser} />} />
          <Route path='/recipe' element={<Recipe user={user} setUser={setUser} recipe={recipe} />} />
          <Route path='/myRecipe' element={<MyRecipe user={user} setUser={setUser} recipe={recipe} />} />
          <Route path='/filter' element={<Filter filters={filters} setFilters={setFilters} />} />
          <Route path='/myFilter' element={<MyFilter filters={filters} setFilters={setFilters} />} />
          <Route path='/instructions' element={<Instructions />} />
          <Route path='/addRecipe' element={<AddRecipe user={user} />} />
          <Route path='/updateRecipe' element={<UpdateRecipe user={user} recipe={recipe} />} />
        </Routes >
      </BrowserRouter>
    </>
  );
}

export default App
