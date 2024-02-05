import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateVoiture } from './store/actionCreators';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateVoiture = () => {
	const dispatch = useDispatch();
	const voitures = useSelector((state) => state.data);

	const { matricule } = useParams();
	const navigate = useNavigate();

	const voiture = voitures.find((art) => art.Matricule === Number(matricule));
	const [data, setData] = useState({
		Matricule: voiture.Matricule,
		Marque: voiture.Marque,
		Modele: voiture.Modele,
		Couleur: voiture.Couleur,
	});

	const handleData = (e) => {
		setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	return (
		<div className='m-2 '>
			<label className='w-full max-w-xs form-control' htmlFor='Matricule'>
				<div className='label'>
					<span className='label-text'>Matricule:</span>
				</div>

				<input
					className='w-full max-w-xs input input-bordered input-info'
					type='text'
					name='Matricule'
					value={data.Matricule}
					readOnly
				/>
			</label>
			<label className='w-full max-w-xs form-control' htmlFor='Marque'>
				<div className='label'>
					<span className='label-text'>Marque</span>
				</div>

				<input
					className='w-full max-w-xs input input-bordered input-info'
					type='text'
					name='Marque'
					value={data.Marque}
					onChange={handleData}
				/>
			</label>
			<label className='w-full max-w-xs form-control' htmlFor='Modele'>
				<div className='label'>
					<span className='label-text'>Modele:</span>
				</div>

				<input
					className='w-full max-w-xs input input-bordered input-info'
					type='text'
					name='Modele'
					value={data.Modele}
					onChange={handleData}
				/>
			</label>
			<label className='w-full max-w-xs form-control' htmlFor='Couleur'>
				<div className='label'>
					<span className='label-text'>Couleur:</span>
				</div>

				<input
					className='w-full max-w-xs input input-bordered input-info'
					type='text'
					name='Couleur'
					value={data.Couleur}
					onChange={handleData}
				/>
			</label>

			<button
				className='m-2 btn btn-info px-9'
				onClick={() => {
					dispatch(updateVoiture(data));
					navigate('/');
				}}
			>
				Save
			</button>
		</div>
	);
};

export default UpdateVoiture;
