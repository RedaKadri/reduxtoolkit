import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Voitures from './features/Voitures/components/Voitures';
import UpdateVoiture from './features/Voitures/components/UpdateVoiture';
import SearchVoiture from './features/Voitures/components/SearchVoiture';

import { useDispatch, useSelector } from 'react-redux';
import { fetchVoitures } from './features/Voitures/voitureSlice';
import { useEffect } from 'react';

const App = () => {
	const dispatch = useDispatch();

	const { status, error } = useSelector((state) => state.voitures);

	useEffect(() => {
		if (status === 'idle') dispatch(fetchVoitures());
	}, [dispatch, status]);

	if (status === 'loading') {
		return <div className='text-center'>Loading...</div>;
	}

	if (status === 'failed') {
		return <div className='text-center'>Error: {error}</div>;
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Voitures />} />
				<Route path='/voiture/:matricule' element={<UpdateVoiture />} />
				<Route path='/marque/:marque' element={<SearchVoiture />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
