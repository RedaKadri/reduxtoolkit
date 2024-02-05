import { legacy_createStore } from 'redux';
import { applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

const initialState = {
	loading: false,
	data: [],
	error: '',
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { loading: true, data: [], error: '' };

		case 'FETCH_SUCCESS':
			return { loading: false, data: action.payload.voitures, error: '' };

		case 'FETCH_FAILURE':
			return { loading: false, data: [], error: action.payload.error };

		case 'ADD_VOITURE':
			const { Marque, Modele, Couleur } = action.voiture;
			const Matricule = ~~(Math.random() * 9999);
			const newVoiture = {
				Matricule: Matricule,
				Marque: Marque,
				Modele: Modele,
				Couleur: Couleur,
			};
			return { ...state, data: [...state.data, newVoiture] };

		case 'DELETE_VOITURE':
			const modData = state.data.filter(
				(vt) => vt.Matricule !== action.Matricule,
			);
			return { ...state, data: modData };

		case 'UPDATE_VOITURE':
			const ModifVoit = state.data.map((voit) => {
				if (voit.Matricule === action.voiture.Matricule) {
					return action.voiture;
				}
				return voit;
			});
			return { ...state, data: ModifVoit };

		default:
			return state;
	}
};
export default legacy_createStore(reducer, applyMiddleware(thunk));
