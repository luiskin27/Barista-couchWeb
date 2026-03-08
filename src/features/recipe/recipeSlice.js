// src/features/recipe/recipeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import recipesData from '../../data/recipes.json';  

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(recipesData.recipes);
      }, 1500);
    });
  }
);

const recipeSlice = createSlice({
  name: 'recipes',
  
  initialState: {
    items: JSON.parse(localStorage.getItem('baristaRecipes')) || [],
    status: 'succeeded',
    error: null,
    selectedRecipe: null,
    editingRecipe: null   // ← НОВОЕ ПОЛЕ — здесь будет рецепт, который сейчас редактируется
  },

  reducers: {
    selectRecipe: (state, action) => {
      state.selectedRecipe = action.payload;
    },
    clearSelected: (state) => {
      state.selectedRecipe = null;
    },

    addRecipe: (state, action) => {
      const maxId = state.items.length > 0 
        ? Math.max(...state.items.map(r => r.id)) 
        : 0;
      const newRecipe = {
        id: maxId + 1,
        ...action.payload
      };
      state.items.push(newRecipe);
      localStorage.setItem('baristaRecipes', JSON.stringify(state.items));
    },
    
    updateRecipe: (state, action) => {
      const index = state.items.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        localStorage.setItem('baristaRecipes', JSON.stringify(state.items));
      }
      state.editingRecipe = null;  // ← закрываем режим редактирования после сохранения
    },
    
    deleteRecipe: (state, action) => {
      state.items = state.items.filter(r => r.id !== action.payload);
      localStorage.setItem('baristaRecipes', JSON.stringify(state.items));
    },

    // НОВЫЕ редьюсеры для редактирования
    startEditRecipe: (state, action) => {
       state.editingRecipe = action.payload;
    },

    cancelEdit: (state) => {
      state.editingRecipe = null;  // сбрасываем режим редактирования
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { 
  selectRecipe, 
  clearSelected, 
  addRecipe, 
  updateRecipe, 
  deleteRecipe,
  startEditRecipe,     
  cancelEdit
} = recipeSlice.actions;

export default recipeSlice.reducer;