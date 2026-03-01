// src/features/menu/menuSlice.js   
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import menuData from '../../data/menu.json';  

// Имитация асинхронной загрузки (задержка 1.5 секунды)
export const fetchMenu = createAsyncThunk(
  'menu/fetchMenu',
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(menuData.drinks);
      }, 1500);  // ← задержка 1.5 секунды
    });
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    items: [],
    status: 'idle',      // idle | loading | succeeded | failed
    error: null,
    selectedDrink: null  
  },
  reducers: {
    selectDrink: (state, action) => {
      state.selectedDrink = action.payload;
    },
    clearSelected: (state) => {
      state.selectedDrink = null;
    },


//  CRUD 
    addDrink: (state, action) => {
      const maxId = state.items.length > 0 
        ? Math.max(...state.items.map(d => d.id)) 
        : 0;
      const newDrink = {
        id: maxId + 1,
        ...action.payload
      };
      state.items.push(newDrink);
    },
    updateDrink: (state, action) => {
      const index = state.items.findIndex(d => d.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;   // полностью заменяем объект
      }
    },
    deleteDrink: (state, action) => {
      state.items = state.items.filter(d => d.id !== action.payload);
    }
    
  },


  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { selectDrink, clearSelected, addDrink, updateDrink, deleteDrink } = menuSlice.actions;
export default menuSlice.reducer;
