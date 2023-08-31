import React from 'react';

import Notes from './Notes';
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
	// const {showAlert} = props.showAlert
	let navigate = useNavigate()

	if(!localStorage.getItem('token')){
		navigate('/login')
	}
	return (
		<div>
			<Notes showAlert = {props.showAlert}/>
			
		</div>
	);
};

export default Home;
