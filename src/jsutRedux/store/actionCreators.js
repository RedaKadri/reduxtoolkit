import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addVoiture = (voiture) => {
	return {
		type: actionTypes.ADD_VOITURE,
		voiture,
	};
};
export const deleteVoiture = (Matricule) => {
	return {
		type: actionTypes.DELETE_VOITURE,
		Matricule,
	};
};
export const updateVoiture = (voiture) => {
	return {
		type: actionTypes.UPDATE_VOITURE,
		voiture,
	};
};
export const searchVoiture = (Marque) => {
	return {
		type: actionTypes.SEARCH_VOITURE,
		Marque,
	};
};

export const fetchRequest = () => {
	return {
		type: actionTypes.FETCH_REQUEST,
	};
};

export const fetchSuccess = (voitures) => {
	return {
		type: actionTypes.FETCH_SUCCESS,
		payload: { voitures: voitures },
	};
};

export const fetchFailure = (err) => {
	return {
		type: actionTypes.FETCH_FAILURE,
		payload: { error: err },
	};
};

export const fetchVoitures = function () {
	return function (dispatch, getState) {
		dispatch(fetchRequest());
		axios
			.get('api/voitures.json')
			.then((response) => dispatch(fetchSuccess(response.data.voitures)))
			.catch((err) => dispatch(fetchFailure(err.message)));
	};
};
