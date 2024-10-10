import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  selectedLocation: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload;
    },

    setLikeUnLikeToggle: (state, action) => {
      state.selectedLocation = {...state.selectedLocation, isFavourite: !state?.selectedLocation?.isFavourite};
    },
  },
});

export const locationActions = locationSlice.actions;
export default locationSlice.reducer;
