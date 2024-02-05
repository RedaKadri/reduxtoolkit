import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addVoiture, deleteVoiture } from '../voitureSlice';

import { Link, useNavigate } from 'react-router-dom';

const AddVoiture = () => {
	const [voiture, setVoiture] = useState();
	const dispatch = useDispatch();

	const handleVoitureData = (e) => {
		setVoiture({
			...voiture,
			[e.target.id]: e.target.value,
		});
	};
	const addNewVoiture = (e) => {
		e.preventDefault();
		dispatch(addVoiture(voiture));
	};
	return (
		<form onSubmit={addNewVoiture} className='flex gap-2 m-2'>
			<input
				className='w-full max-w-xs input input-bordered input-info'
				type='text'
				id='Marque'
				placeholder='Marque'
				onChange={handleVoitureData}
			/>
			<input
				className='w-full max-w-xs input input-bordered input-info'
				type='text'
				id='Modele'
				placeholder='Modele'
				onChange={handleVoitureData}
			/>
			<input
				className='w-full max-w-xs input input-bordered input-info'
				type='text'
				id='Couleur'
				placeholder='Couleur'
				onChange={handleVoitureData}
			/>
			<button type='submit' className='btn btn-info'>
				Add article
			</button>
		</form>
	);
};
const SearchVoiture = () => {
	const navigate = useNavigate();

	const Maques = useSelector((state) =>
		state.voitures.data.map((voiture) => voiture.Marque),
	);
	const uniqueMarques = [...new Set(Maques)];

	return (
		<label htmlFor='marques' className='m-2'>
			Marques:{' '}
			<select
				className='w-full max-w-xs select select-primary'
				name='marques'
				id='marques'
				onChange={(e) => {
					navigate(`/marque/${e.target.value}`);
				}}
			>
				<option value='marques'>marques</option>
				{uniqueMarques.map((marque, i) => (
					<option key={i} value={marque}>
						{marque}
					</option>
				))}
			</select>
		</label>
	);
};

const Voitures = () => {
	const voitures = useSelector((state) => state.voitures.data);
	const dispatch = useDispatch();

	return (
		<main>
			<AddVoiture />
			<SearchVoiture />
			<section>
				{voitures.map((voiture, i) => (
					<div
						key={i}
						className='m-2 shadow-xl card w-96 bg-primary text-primary-content'
					>
						<div className='card-body'>
							<h1 className='card-title'>{voiture.Matricule}</h1>
							<p>{voiture.Marque}</p>
							<p>{voiture.Modele}</p>
							<p>{voiture.Couleur}</p>
							<div className='justify-end card-actions'>
								<button
									className='btn btn-error'
									onClick={() =>
										dispatch(
											deleteVoiture(voiture.Matricule),
										)
									}
								>
									Delete
								</button>
								<Link to={`/voiture/${voiture.Matricule}`}>
									<button className='btn btn-warning'>
										Update
									</button>
								</Link>
							</div>
						</div>
					</div>
				))}
			</section>
		</main>
	);
};

export default Voitures;
