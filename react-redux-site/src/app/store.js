// src/app/store.js   
import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../features/ui/uiSlice';          
import menuReducer from '../features/menu/menuSlice';    

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    menu: menuReducer,   
  },
});