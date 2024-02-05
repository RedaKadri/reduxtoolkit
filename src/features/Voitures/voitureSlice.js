import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchVoitures = createAsyncThunk(
	'voitures/fetchVoitures',
	async () => {
		return new Promise((resolve) => {
			setTimeout(async () => {
				const response = await axios.get('api/voitures.json');
				resolve(response.data.voitures);
			}, 1000);
		});
	},
);

const initialState = { data: [], status: 'idle', error: null };

const voitureSlice = createSlice({
	name: 'voitures',
	initialState,
	reducers: {
		addVoiture: (state, action) => {
			const { Marque, Modele, Couleur } = action.payload;
			const Matricule = ~~(Math.random() * 9999);
			const newVoiture = {
				Matricule: Matricule,
				Marque: Marque,
				Modele: Modele,
				Couleur: Couleur,
			};

			state.data = [...state.data, newVoiture];
		},
		deleteVoiture: (state, action) => {
			state.data = state.data.filter(
				(vt) => vt.Matricule !== action.payload,
			);
		},
		updateVoiture: (state, action) => {
			const ModifVoit = state.data.map((voit) => {
				if (voit.Matricule === action.payload.Matricule) {
					return action.payload;
				}
				return voit;
			});

			state.data = ModifVoit;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchVoitures.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchVoitures.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.data = action.payload;
			})
			.addCase(fetchVoitures.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const { addVoiture, deleteVoiture, updateVoiture } =
	voitureSlice.actions;

export default voitureSlice.reducer;
