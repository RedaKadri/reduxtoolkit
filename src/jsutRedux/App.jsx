import { Provider, useDispatch, useSelector } from 'react-redux';

import store from './store/reduces';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Voitures from './Voitures';
import UpdateVoiture from './UpdateVoiture';
import SearchVoiture from './SearchVoiture';
import { useEffect } from 'react';
import { fetchVoitures } from './store/actionCreators';

function App() {
	const dispatch = useDispatch();
	const { loading, error } = useSelector((state) => state);

	useEffect(() => dispatch(fetchVoitures()), [dispatch]);

	if (loading) {
		return <div className='text-center'>Loading...</div>;
	}

	if (error) {
		return <div className='text-center'>Error: {error}</div>;
	}

	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Voitures />} />
					<Route
						path='/voiture/:matricule'
						element={<UpdateVoiture />}
					/>
					<Route path='/marque/:marque' element={<SearchVoiture />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
