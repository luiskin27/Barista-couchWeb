import { createAction } from '@reduxjs/toolkit';

export const startEditRecipe = createAction('recipes/startEditRecipe');
export const cancelEdit = createAction('recipes/cancelEdit');