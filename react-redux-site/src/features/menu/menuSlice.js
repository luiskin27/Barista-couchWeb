// src/features/menu/menuSlice.js   ← НОВЫЙ файл
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import menuData from '../../data/menu.json';  // импортируем JSON

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
    selectedDrink: null  // для DETAIL
  },
  reducers: {
    selectDrink: (state, action) => {
      state.selectedDrink = action.payload;
    },
    clearSelected: (state) => {
      state.selectedDrink = null;
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

export const { selectDrink, clearSelected } = menuSlice.actions;
export default menuSlice.reducer;
