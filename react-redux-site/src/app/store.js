// src/app/store.js
import { configureStore } from '@reduxjs/toolkit'; 

import recipeReducer from '../features/recipe/recipeSlice';  

import uiReducer from '../features/ui/uiSlice';  
export const store = configureStore({
  reducer: {
    recipes: recipeReducer,   
    ui: uiReducer,            
  
  },
});