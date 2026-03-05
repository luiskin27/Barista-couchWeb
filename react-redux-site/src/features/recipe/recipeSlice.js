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
  
  // ← Вот здесь замена: старый initialState → новый с localStorage
  initialState: {
    items: JSON.parse(localStorage.getItem('baristaRecipes')) || [],  // загружаем сохранённые рецепты
    status: 'succeeded',   // сразу считаем, что данные загружены (можно оставить 'idle', если хочешь)
    error: null,
    selectedRecipe: null
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
      
      // ← Важно! Сохраняем изменения в localStorage после добавления
      localStorage.setItem('baristaRecipes', JSON.stringify(state.items));
    },
    
    updateRecipe: (state, action) => {
      const index = state.items.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        localStorage.setItem('baristaRecipes', JSON.stringify(state.items)); // сохраняем
      }
    },
    
    deleteRecipe: (state, action) => {
      state.items = state.items.filter(r => r.id !== action.payload);
      localStorage.setItem('baristaRecipes', JSON.stringify(state.items)); // сохраняем
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
        // Можно также сохранить в localStorage после загрузки из json, если нужно
        // localStorage.setItem('baristaRecipes', JSON.stringify(state.items));
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
  deleteRecipe 
} = recipeSlice.actions;

export default recipeSlice.reducer;