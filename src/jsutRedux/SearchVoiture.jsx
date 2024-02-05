import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const SearchVoiture = () => {
	const { marque } = useParams();
	const voitures = useSelector((state) =>
		state.data.filter((voiture) => voiture.Marque === marque),
	);

	return (
		<div className='m-5'>
			<table border={1} className='table bg-base-300'>
				<thead>
					<tr>
						<th>Matricule</th>
						<th>Marque</th>
						<th>Modele</th>
						<th>Couleur</th>
					</tr>
				</thead>
				<tbody>
					{voitures.map((voiture, i) => (
						<tr key={i}>
							<td>{voiture.Matricule}</td>
							<td>{voiture.Marque}</td>
							<td>{voiture.Modele}</td>
							<td>{voiture.Couleur}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default SearchVoiture;
