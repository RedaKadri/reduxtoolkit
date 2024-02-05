import { configureStore } from '@reduxjs/toolkit';
import voitureReducer from '../features/Voitures/voitureSlice';

export default configureStore({
	reducer: {
		voitures: voitureReducer,
	},
});
