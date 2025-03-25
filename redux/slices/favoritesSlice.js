import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loadFavorites = async () => {
  const storedFavorites = await AsyncStorage.getItem('favorites');
  return storedFavorites ? JSON.parse(storedFavorites) : [];
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    setFavorites: (state, action) => action.payload,
    toggleFavorite: (state, action) => {
      const exists = state.find((event) => event.event_date_id === action.payload.event_date_id);
      if (exists) {
        return state.filter((event) => event.event_date_id !== action.payload.event_date_id);
      } else {
        return [...state, action.payload];
      }
    },
  },
});

export const { toggleFavorite, setFavorites } = favoritesSlice.actions;

export const loadFavoritesFromStorage = () => async (dispatch) => {
  const favorites = await loadFavorites();
  dispatch(setFavorites(favorites));
};

export const saveFavoritesToStorage = (favorites) => {
  AsyncStorage.setItem('favorites', JSON.stringify(favorites));
};

export default favoritesSlice.reducer;
